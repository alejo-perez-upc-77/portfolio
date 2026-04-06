"use client";

import React from "react";
import { motion } from "framer-motion";

const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/alejo-perez-gomez-858422172/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        {/* Hand-drawn effect via dasharrays and slight rotations */}
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" strokeDasharray="4 2" />
        <rect x="2" y="9" width="4" height="12" rx="1" transform="rotate(-2 4 15)" />
        <circle cx="4" cy="4" r="2" fill="currentColor" fillOpacity="0.2" transform="rotate(5 4 4)" />
      </svg>
    )
  },
  {
    name: "GitHub",
    url: "https://github.com/alejo-ai-labs",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        {/* Sketchy handmade look */}
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" strokeDasharray="3 1" transform="rotate(1 12 12)" />
        <path d="M9 18c-4.51 2-5-2-7-2" strokeDasharray="2 3" />
      </svg>
    )
  }
];

export function SocialLinks() {
  return (
    <div className="flex gap-4 items-center">
      {socialLinks.map((link, index) => (
        <motion.a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.15, rotate: index % 2 === 0 ? 5 : -5, y: -4 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="p-3 rounded-full border border-border-hairline text-muted flex items-center justify-center shadow-sm hover:text-accent hover:border-accent/30 transition-all group bg-background"
          aria-label={link.name}
        >
          <div className="opacity-80 group-hover:opacity-100 transition-opacity drop-shadow-sm">
            {link.icon}
          </div>
        </motion.a>
      ))}
    </div>
  );
}
