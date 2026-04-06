"use client";

import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SocialLinks } from "@/components/SocialLinks";

const NAV_SECTIONS = [
  { id: "about", label: "About" },
  { id: "trajectory", label: "Trajectory" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

export function NavigationBar() {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const sectionIds = NAV_SECTIONS.map((s) => s.id);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first entry that is intersecting (topmost visible section)
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top
          );

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "-80px 0px -40% 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  function handleNavClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) {
    e.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <nav
      className="sticky top-0 z-50 bg-background border-b border-border-hairline"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="font-serif font-bold text-3xl tracking-tighter text-title-accent cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-title-accent rounded-sm"
        >
          Alejo<span>.</span>
        </a>

        {/* Section links + controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Section navigation links — hidden on very small screens */}
          <ul className="hidden sm:flex items-center gap-1">
            {NAV_SECTIONS.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={(e) => handleNavClick(e, section.id)}
                  className={`px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-title-accent ${
                    activeSection === section.id
                      ? "text-accent"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>

          <ThemeToggle />
          <SocialLinks />
        </div>
      </div>
    </nav>
  );
}
