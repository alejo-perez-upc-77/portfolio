"use client";

import { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Apple, ArrowUpRight, BookOpen, ChevronLeft, ChevronRight, GitFork, Play, ScrollText } from "lucide-react";

import { projects } from "../data/cv";
import type { LinkKind, ExperienceLink } from "../data/cv";
import { TechIcon, hasTechIcon, isWordmark, getTechColor } from "./TechIcon";

const LINK_META: Record<LinkKind, { Icon: LucideIcon; title: string }> = {
  "app-store": { Icon: Apple, title: "iOS App Store" },
  "google-play": { Icon: Play, title: "Google Play" },
  "thesis-msc": { Icon: ScrollText, title: "Master thesis" },
  "thesis-bsc": { Icon: BookOpen, title: "Bachelor thesis" },
  "github": { Icon: GitFork, title: "GitHub repository" },
};

function ProjectTechPill({ name }: { name: string }) {
  const wm = isWordmark(name);
  const color = getTechColor(name);
  return (
    <span
      className="inline-flex items-center gap-1.5 text-foreground border border-border-hairline px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
      style={color ? { backgroundColor: `${color}12`, borderColor: `${color}25` } : undefined}
    >
      {hasTechIcon(name) && <TechIcon name={name} size={wm ? 14 : 14} />}
      {wm ? <span className="sr-only">{name}</span> : name}
    </span>
  );
}

function ProjectLinkPill({ link }: { link: ExperienceLink }) {
  const { Icon: IconComponent } = LINK_META[link.kind];
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      title={LINK_META[link.kind].title}
      onClick={(e) => e.stopPropagation()}
      className="group/link inline-flex items-center gap-2.5 rounded-full border-2 border-accent/40 bg-accent/5 py-2 pl-2 pr-3.5 text-sm font-semibold text-accent shadow-sm transition-[border-color,box-shadow,background-color,color] duration-300 hover:border-accent hover:bg-accent/10 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-title-accent cursor-pointer"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent ring-1 ring-accent/25 transition-[background-color,color] duration-300 group-hover/link:bg-accent/20">
        <IconComponent className="size-[18px]" strokeWidth={1.75} aria-hidden />
      </span>
      <span className="text-[13px] tracking-tight underline underline-offset-2 decoration-accent/40 group-hover/link:decoration-accent">
        {link.label}
      </span>
      <ArrowUpRight className="size-3.5 opacity-60 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:opacity-100" aria-hidden />
    </a>
  );
}

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
};

export function ProjectsCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const constraintsRef = useRef<HTMLDivElement>(null);

  const paginate = useCallback(
    (dir: number) => {
      setDirection(dir);
      setCurrent((prev) => {
        const next = prev + dir;
        if (next < 0) return projects.length - 1;
        if (next >= projects.length) return 0;
        return next;
      });
    },
    [],
  );

  const DRAG_THRESHOLD = 50;
  const project = projects[current];

  return (
    <section className="w-full py-16">
      <div className="flex items-center justify-between mb-12">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-serif font-medium"
        >
          Projects
        </motion.h2>

        {projects.length > 1 && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => paginate(-1)}
              aria-label="Previous project"
              className="flex size-10 items-center justify-center rounded-full border border-border-hairline text-foreground transition-colors duration-200 hover:bg-muted/10 hover:border-accent/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-title-accent cursor-pointer"
            >
              <ChevronLeft className="size-5" strokeWidth={1.5} />
            </button>
            <span className="text-sm text-secondary font-medium tabular-nums min-w-[3ch] text-center">
              {current + 1}/{projects.length}
            </span>
            <button
              onClick={() => paginate(1)}
              aria-label="Next project"
              className="flex size-10 items-center justify-center rounded-full border border-border-hairline text-foreground transition-colors duration-200 hover:bg-muted/10 hover:border-accent/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-title-accent cursor-pointer"
            >
              <ChevronRight className="size-5" strokeWidth={1.5} />
            </button>
          </div>
        )}
      </div>

      <div
        ref={constraintsRef}
        className="relative overflow-hidden rounded-2xl border border-border-hairline"
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.article
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.3}
            onDragEnd={(_e, info) => {
              if (info.offset.x > DRAG_THRESHOLD) paginate(-1);
              else if (info.offset.x < -DRAG_THRESHOLD) paginate(1);
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="p-8 md:p-10 cursor-grab active:cursor-grabbing"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Text side */}
              <div className="space-y-5">
                <h3 className="text-2xl font-bold">{project.title}</h3>
                <p className="text-foreground/80 leading-relaxed text-sm md:text-base">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {project.tech.map((t) => (
                    <ProjectTechPill key={t} name={t} />
                  ))}
                </div>

                {project.links && project.links.length > 0 && (
                  <nav
                    className="flex flex-wrap gap-2.5 pt-2"
                    aria-label={`Links for ${project.title}`}
                  >
                    {project.links.map((link) => (
                      <ProjectLinkPill key={link.href} link={link} />
                    ))}
                  </nav>
                )}
              </div>

              {/* Image side */}
              {project.image && (
                <div className="max-w-xs mx-auto overflow-hidden rounded-xl border border-border-hairline group/img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    className="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover/img:scale-110"
                    draggable={false}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>
          </motion.article>
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      {projects.length > 1 && (
        <div className="flex justify-center gap-2 mt-6" role="tablist" aria-label="Project slides">
          {projects.map((p, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to ${p.title}`}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-title-accent ${
                i === current
                  ? "w-6 bg-accent"
                  : "w-2 bg-border-hairline hover:bg-accent/40"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
