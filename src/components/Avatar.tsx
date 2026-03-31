"use client";

import React, { useState, useEffect, useRef } from 'react';
import { createClient, AnamClient, AnamEvent } from '@anam-ai/js-sdk';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, RefreshCcw, Power, Mic, MicOff } from 'lucide-react';

type SupportedLanguage = 'en' | 'es';

const LANGUAGE_FLAGS: Record<SupportedLanguage, { flag: string; label: string }> = {
  en: { flag: '🇬🇧', label: 'English' },
  es: { flag: '🇪🇸', label: 'Español' },
};

export function Avatar() {
  const [status, setStatus] = useState<'idle' | 'connecting' | 'streaming' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const videoRef = useRef<HTMLVideoElement>(null);
  const clientRef = useRef<AnamClient | null>(null);

  const isInteractive = status === 'idle' || status === 'error';

  const connect = async () => {
    try {
      setStatus('connecting');
      setErrorMessage('');
      setIsMuted(false);

      const res = await fetch('/api/anam/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language }),
      });
      if (!res.ok) {
        throw new Error('Failed to connect to the server (check API keys).');
      }
      
      const { sessionToken } = await res.json();
      if (!sessionToken) {
        throw new Error('Invalid token received from server.');
      }

      // Initialize Anam Client
      const client = createClient(sessionToken);
      clientRef.current = client;

      // Event Listeners for robust state management
      client.addListener(AnamEvent.CONNECTION_ESTABLISHED, () => {
        setStatus('streaming');
      });
      client.addListener(AnamEvent.CONNECTION_CLOSED, () => {
        if (status === 'streaming') {
          setStatus('idle');
        } else if (status === 'connecting') {
          setStatus('error');
          setErrorMessage('Connection closed unexpectedly.');
        }
      });

      // Stream to video element (using ! because ref is attached to the video DOM node)
      await client.streamToVideoElement(videoRef.current!.id);
      
    } catch (err: unknown) {
      const e = err as Record<string, unknown>;
      const errorDetails = JSON.stringify(e, Object.getOwnPropertyNames(e), 2);
      console.error("Avatar Deep Connection Error:", errorDetails);

      const causeStr = e.cause ? (typeof e.cause === 'object' ? JSON.stringify(e.cause) : String(e.cause)) : '';
      const causeDisplay = causeStr ? ` (Cause: ${causeStr})` : '';
      const detailedMessage = `${String(e.name ?? 'Error')}: ${String(e.message ?? 'An unexpected occurrence.')}${causeDisplay}`;

      setErrorMessage(detailedMessage);
      setStatus('error');
    }
  };

  const disconnect = () => {
    if (clientRef.current) {
      clientRef.current.stopStreaming();
      clientRef.current = null;
    }
    setStatus('idle');
    setIsMuted(false);
  };

  const toggleMute = () => {
    if (!clientRef.current) return;
    if (isMuted) {
      clientRef.current.unmuteInputAudio();
      setIsMuted(false);
    } else {
      clientRef.current.muteInputAudio();
      setIsMuted(true);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => disconnect();
  }, []);

  return (
    <div className="relative w-full aspect-[9/16] max-w-sm lg:ml-auto mx-auto overflow-hidden rounded-[2rem] border border-border-hairline shadow-sm bg-background isolate">
      {/* Video Element (always present but hidden until streaming) */}
      <video
        id="anam-avatar-video"
        ref={videoRef}
        autoPlay
        playsInline
        className={`w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${status === 'streaming' ? 'opacity-100' : 'opacity-0'}`}
      />

      <AnimatePresence mode="wait">
        {status === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(4px)" }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10"
          >
            {/* Background layered effect inside the container for idle state */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 to-background/80 -z-10" />
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-20 h-20 mb-6 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20 cursor-pointer"
              onClick={connect}
            >
               <Power className="w-8 h-8 text-accent" />
            </motion.div>
            <h3 className="text-2xl font-serif font-medium mb-2 tracking-tight">Meet Alejo AI</h3>
            <p className="text-sm text-secondary mb-6 max-w-[200px] leading-relaxed">
              Have a conversation with my digital twin powered by agentic AI.
            </p>

            {/* Language selector */}
            <div className="flex items-center gap-2 mb-8">
              {(Object.entries(LANGUAGE_FLAGS) as [SupportedLanguage, { flag: string; label: string }][]).map(([lang, { flag, label }]) => (
                <button
                  key={lang}
                  onClick={() => isInteractive && setLanguage(lang)}
                  disabled={!isInteractive}
                  title={label}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
                    language === lang
                      ? 'bg-accent/15 border-accent/40 text-accent'
                      : 'bg-background/40 border-border-hairline text-secondary hover:border-accent/30 hover:text-foreground'
                  }`}
                >
                  <span className="text-base leading-none">{flag}</span>
                  <span>{label}</span>
                </button>
              ))}
            </div>

            <button
              onClick={connect}
              className="px-8 py-3.5 rounded-full bg-accent text-white font-medium hover:bg-accent/90 transition-all shadow-md shadow-accent/25 active:scale-95"
            >
               Connect Avatar
            </button>
          </motion.div>
        )}

        {status === 'connecting' && (
          <motion.div
            key="connecting"
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-md z-10"
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="mb-4"
            >
              <div className="w-12 h-12 rounded-full border-t-2 border-r-2 border-accent shadow-md shadow-accent/50" />
            </motion.div>
            <p className="text-sm font-medium animate-pulse text-foreground tracking-widest uppercase">Waking up AI...</p>
          </motion.div>
        )}

        {status === 'streaming' && (
          <motion.div
            key="streaming-controls"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.5 }}
            className="absolute top-6 right-6 flex items-center gap-3 z-20"
          >
            <button
              onClick={toggleMute}
              className={`p-3 rounded-full backdrop-blur-md transition-all flex items-center justify-center border border-white/10 shadow-lg ${
                isMuted 
                  ? 'bg-red-500/80 text-white hover:bg-red-500' 
                  : 'bg-background/30 text-foreground hover:bg-background/80'
              }`}
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
            <button
              onClick={disconnect}
              className="p-3 rounded-full bg-background/30 hover:bg-background/80 backdrop-blur-md text-foreground transition-all flex items-center justify-center group border border-white/10 shadow-lg"
              title="Disconnect"
            >
               <Power className="w-5 h-5 group-hover:text-red-500 transition-colors" />
            </button>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-background/95 backdrop-blur-xl p-6 text-center border-t-4 border-red-500 z-10"
          >
            <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
            <h3 className="text-xl font-serif font-medium mb-2">Connection Interrupted</h3>
            <p className="text-sm text-secondary mb-8">{errorMessage}</p>
            <button
              onClick={connect}
              className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-foreground text-background font-medium hover:bg-foreground/90 transition-all shadow-xl active:scale-95"
            >
              <RefreshCcw className="w-4 h-4" /> Try Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
