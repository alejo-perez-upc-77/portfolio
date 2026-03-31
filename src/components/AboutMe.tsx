"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { aboutMe } from "../data/cv";

export function AboutMe() {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="w-full py-16"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Image column */}
        {!imageError && (
          <div className="flex justify-center md:justify-start">
            <img
              src={aboutMe.imageSrc}
              alt={aboutMe.imageAlt}
              onError={() => setImageError(true)}
              className="w-full max-w-sm rounded-2xl border border-border-hairline object-cover"
            />
          </div>
        )}

        {/* Text column */}
        <div className={imageError ? "md:col-span-2" : ""}>
          <h2 className="text-4xl font-serif font-medium mb-6 text-foreground">
            {aboutMe.heading}
          </h2>
          <p className="font-sans text-foreground/80 leading-relaxed max-w-2xl">
            {aboutMe.narrative}
          </p>
        </div>
      </div>
    </motion.section>
  );
}
