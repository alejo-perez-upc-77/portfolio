"use client";

import React from "react";
import { PopupButton } from "react-calendly";
import { motion } from "framer-motion";

export function CalendarBooking() {
  const [root, setRoot] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    setRoot(document.body);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full flex flex-col items-center"
    >
      <div className="text-center mb-8 max-w-2xl">
        <h2 className="text-4xl md:text-5xl font-serif font-medium tracking-tight mb-4">
          Let&apos;s Collaborate
        </h2>
        <p className="text-lg text-secondary mb-8">
          Book a session on my calendar to discuss AI architecture, agentic systems, or your next big idea.
        </p>
        {root ? (
          <PopupButton
            url="https://calendly.com/alejperz7"
            text="Schedule a call"
            rootElement={root}
            className="px-8 py-3.5 rounded-full bg-accent text-white font-medium font-sans hover:bg-accent/90 transition-all duration-300 shadow-md shadow-accent/25 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-title-accent"
          />
        ) : (
          <a
            href="https://calendly.com/alejperz7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3.5 rounded-full bg-accent text-white font-medium font-sans hover:bg-accent/90 transition-all duration-300 shadow-md shadow-accent/25 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-title-accent"
          >
            Schedule a call
          </a>
        )}
      </div>
    </motion.div>
  );
}
