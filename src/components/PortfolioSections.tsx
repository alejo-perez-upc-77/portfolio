"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Apple, BookOpen, Play, ScrollText } from "lucide-react";

import type { LinkKind, ExperienceLink } from "../data/cv";
import { experiences, education, skills } from "../data/cv";
import { TechIcon, hasTechIcon, isWordmark, getTechColor } from "./TechIcon";

const LINK_META: Record<
  LinkKind,
  { Icon: LucideIcon; title: string }
> = {
  "app-store": { Icon: Apple, title: "iOS App Store" },
  "google-play": { Icon: Play, title: "Google Play" },
  "thesis-msc": { Icon: ScrollText, title: "Master thesis" },
  "thesis-bsc": { Icon: BookOpen, title: "Bachelor thesis" },
};

const linkListVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
  },
};

const linkItemVariants = {
  hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 380, damping: 28 },
  },
};

const linkItemVariantsReduced = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
};

function ExperienceLinkPill({ link }: { link: ExperienceLink }) {
  const prefersReducedMotion = useReducedMotion();
  const itemVariants = prefersReducedMotion ? linkItemVariantsReduced : linkItemVariants;
  const { Icon: IconComponent } = LINK_META[link.kind];

  return (
    <motion.a
      variants={itemVariants}
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      title={LINK_META[link.kind].title}
      onClick={(e) => e.stopPropagation()}
      className="group/link relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-border-hairline bg-background/60 py-2 pl-2 pr-4 text-sm font-medium text-foreground shadow-sm backdrop-blur-sm transition-[border-color,box-shadow,background-color] duration-300 hover:border-accent/35 hover:bg-muted/10 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-title-accent"
    >
      <motion.span
        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-title-accent/10 text-title-accent ring-1 ring-title-accent/15 transition-[transform,background-color,color] duration-300 group-hover/link:bg-accent/15 group-hover/link:text-accent group-hover/link:ring-accent/25"
        whileHover={
          prefersReducedMotion
            ? undefined
            : { rotate: [0, -6, 6, 0], scale: 1.05 }
        }
        transition={{ duration: 0.45, ease: "easeInOut" }}
      >
        <IconComponent className="size-[18px]" strokeWidth={1.75} aria-hidden />
      </motion.span>
      <span className="text-[13px] tracking-tight">{link.label}</span>
      <motion.span
        className="absolute inset-0 -z-10 bg-gradient-to-r from-accent/0 via-accent/[0.06] to-title-accent/0 opacity-0 transition-opacity duration-500 group-hover/link:opacity-100"
        aria-hidden
      />
    </motion.a>
  );
}


export function PortfolioSections() {
  const prefersReducedMotion = useReducedMotion();

  const dotVariants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3 } } }
    : {
        hidden: { opacity: 0, scale: 0 },
        visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 20 } },
      };

  const lineSegmentVariants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3 } } }
    : {
        hidden: { opacity: 0, scaleY: 0 },
        visible: { opacity: 1, scaleY: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
      };

  return (
    <section className="w-full py-16">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        
        {/* Experience Column */}
        <div className="md:col-span-8 space-y-8">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-serif font-medium mb-12"
          >
            Trajectory
          </motion.h2>

          <div className="relative">
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-8">
                {/* Vertical line segment */}
                <motion.div
                  className="absolute left-[5px] top-0 bottom-0 w-0 border-l-2 border-accent origin-top"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={lineSegmentVariants}
                  aria-hidden
                />

                {/* Dot marker */}
                <motion.div
                  className="absolute left-0 top-9 h-3 w-3 rounded-full bg-accent"
                  data-timeline-dot
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={dotVariants}
                  aria-hidden
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="py-8 border-t border-border-hairline transition-all cursor-pointer hover:bg-muted/5 px-4 -mx-4 rounded-xl group"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
                    <div>
                      <h3 className="text-xl font-bold">{exp.company}</h3>
                      <p className="text-accent font-medium">{exp.role}</p>
                    </div>
                    <div className="text-right text-sm text-secondary font-medium whitespace-nowrap">
                      {exp.period}
                      {exp.location && <span className="block">{exp.location}</span>}
                    </div>
                  </div>
                  <p className="text-foreground/80 leading-relaxed text-sm md:text-base">
                    {exp.description}
                  </p>
                  {exp.media && exp.media.type === "image" && (
                    <img
                      src={exp.media.src}
                      alt={exp.media.alt}
                      className="mt-4 border border-border-hairline rounded-xl"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  )}
                  {exp.media && exp.media.type === "youtube" && (
                    <div className="mt-4 aspect-video w-full overflow-hidden rounded-xl border border-border-hairline">
                      <iframe
                        src={`https://www.youtube.com/embed/${exp.media.videoId}?autoplay=1&mute=1&loop=1&playlist=${exp.media.videoId}&controls=0&showinfo=0&rel=0&modestbranding=1`}
                        title={exp.media.title}
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                  )}
                  {exp.links && exp.links.length > 0 && (
                    <motion.nav
                      className="mt-5 flex flex-wrap gap-2.5"
                      aria-label={`Related links for ${exp.company}`}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, margin: "-40px" }}
                      variants={linkListVariants}
                    >
                      {exp.links.map((link) => (
                        <ExperienceLinkPill key={link.href} link={link} />
                      ))}
                    </motion.nav>
                  )}
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Skills Column */}
        <div className="md:col-span-4 space-y-12">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-serif font-medium mb-8"
            >
              Academic
            </motion.h2>

            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="py-6 border-b border-border-hairline last:border-0"
                >
                  <h3 className="font-bold text-lg leading-tight mb-2">{edu.institution}</h3>
                  <p className="text-accent text-sm mb-2">{edu.degree}</p>
                  <div className="text-xs font-medium text-secondary uppercase tracking-widest">
                    {edu.period} • {edu.location}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
             <motion.h2 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-serif font-medium mb-8"
            >
              Capabilities
            </motion.h2>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="border border-border-hairline p-8 rounded-2xl space-y-6 bg-background/50"
            >
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-secondary mb-3">AI & ML</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.ai_ml.map(skill => {
                    const wm = isWordmark(skill);
                    const color = getTechColor(skill);
                    return (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1.5 text-foreground border border-border-hairline px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
                        style={color ? { backgroundColor: `${color}12`, borderColor: `${color}25` } : undefined}
                      >
                        {hasTechIcon(skill) && <TechIcon name={skill} size={wm ? 14 : 14} />}
                        {wm ? <span className="sr-only">{skill}</span> : skill}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-secondary mb-3">Engineering</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.engineering.map(skill => {
                    const wm = isWordmark(skill);
                    const color = getTechColor(skill);
                    return (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1.5 text-foreground border border-border-hairline px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
                        style={color ? { backgroundColor: `${color}12`, borderColor: `${color}25` } : undefined}
                      >
                        {hasTechIcon(skill) && <TechIcon name={skill} size={wm ? 14 : 14} />}
                        {wm ? <span className="sr-only">{skill}</span> : skill}
                      </span>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
