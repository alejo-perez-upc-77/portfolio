"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

type IconEntry = {
  darkFile?: string;
  lightFile?: string;
  file?: string;
  /** true when the SVG already contains the tech name as text */
  isWordmark: boolean;
  /** brand color used for pill fill */
  color: string;
  /** rendered width in px (for wordmarks this controls the logo width; for icons it's both w+h) */
  iconSize?: number;
};

export const TECH_ICON_MAP: Record<string, IconEntry> = {
  // AI & ML
  "TensorFlow": { darkFile: "tensorflow-wordmark-dark.svg", lightFile: "tensorflow-wordmark-light.svg", isWordmark: true, color: "#FF6F00", iconSize: 110 },
  "MLFlow": { file: undefined, isWordmark: false, color: "#0194E2" },
  "Vector DBs": { darkFile: "qdrant-wordmark-dark.svg", lightFile: "qdrant-wordmark-light.svg", isWordmark: true, color: "#DC244C", iconSize: 70 },
  "Python": { file: "python.svg", isWordmark: false, color: "#3776AB", iconSize: 18 },
  "RAG": { file: undefined, isWordmark: false, color: "#6B7280" },

  // Engineering
  "Node.js": { file: "nodejs.svg", isWordmark: false, color: "#539E43" },
  "React Native": { darkFile: "react_wordmark_dark.svg", lightFile: "react_wordmark_light.svg", isWordmark: true, color: "#61DAFB", iconSize: 70 },
  "Kafka": { darkFile: "apache-kafka-wordmark-dark.svg", lightFile: "apache-kafka-wordmark-light.svg", isWordmark: true, color: "#231F20", iconSize: 70 },
  "Docker": { file: "docker.svg", isWordmark: false, color: "#2496ED" },
  "CI/CD": { file: undefined, isWordmark: false, color: "#6B7280" },
  "TypeScript": { file: "typescript.svg", isWordmark: false, color: "#3178C6", iconSize: 18 },
  "PostgreSQL": { darkFile: "postgresql-wordmark-dark.svg", lightFile: "postgresql-wordmark-light.svg", isWordmark: true, color: "#4169E1", iconSize: 70 },
  "Redis": { file: "redis.svg", isWordmark: false, color: "#DC382D" },
  "AWS": { darkFile: "aws_dark.svg", lightFile: "aws_light.svg", isWordmark: true, color: "#FF9900", iconSize: 40 },
  "Azure": { file: "azure.svg", isWordmark: false, color: "#0078D4" },
  "Terraform": { file: "terraform.svg", isWordmark: false, color: "#7B42BC", iconSize: 18 },
  "n8n": { darkFile: "n8n-wordmark-dark.svg", lightFile: "n8n-wordmark-light.svg", isWordmark: true, color: "#EA4B71", iconSize: 40 },
  "Effect": { darkFile: "effect_dark.svg", lightFile: "effect_light.svg", isWordmark: false, color: "#2D2D2D" },
  "tRPC": { darkFile: "trpc_wordmark_dark.svg", lightFile: "trpc_wordmark_light.svg", isWordmark: true, color: "#2596BE", iconSize: 50 },
  "Firecrawl": { darkFile: "firecrawl-dark-wordmark.svg", lightFile: "firecrawl-wordmark.svg", isWordmark: true, color: "#FF6A00", iconSize: 70 },
  "Next.js": { darkFile: "nextjs_logo_dark.svg", lightFile: "nextjs_logo_light.svg", isWordmark: true, color: "#000000", iconSize: 60 },
  "Snowflake": { file: undefined, isWordmark: false, color: "#29B5E8" },
  "Neo4j": { file: undefined, isWordmark: false, color: "#008CC1" },
  "Prisma": { darkFile: "prisma_dark.svg", lightFile: "prisma.svg", isWordmark: false, color: "#2D3748", iconSize: 18 },
  "SQLite": { file: undefined, isWordmark: false, color: "#003B57" },
  "Multimodal LLMs": { file: undefined, isWordmark: false, color: "#8B5CF6" },
  "Anam.ai": { file: undefined, isWordmark: false, color: "#10B981" },
  "Langfuse": { file: undefined, isWordmark: false, color: "#F59E0B" },
  "React": { darkFile: "react_wordmark_dark.svg", lightFile: "react_wordmark_light.svg", isWordmark: true, color: "#61DAFB", iconSize: 70 },
};

interface TechIconProps {
  name: string;
  className?: string;
  size?: number;
}

export function TechIcon({ name, className = "", size = 14 }: TechIconProps) {
  const mounted = useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot);
  const { resolvedTheme } = useTheme();

  const entry = TECH_ICON_MAP[name];
  if (!entry) return null;

  const isDark = !mounted || resolvedTheme === "dark";
  const file = entry.file ?? (isDark ? entry.darkFile : entry.lightFile);
  if (!file) return null;

  // For wordmarks: iconSize = rendered width, height auto via aspect ratio
  // For icons: iconSize = both width and height (square)
  const resolvedSize = entry.iconSize ?? (entry.isWordmark ? size * 5 : size);

  /* eslint-disable @next/next/no-img-element */
  return (
    <img
      src={`/tech-icons/${file}`}
      alt=""
      style={
        entry.isWordmark
          ? { width: resolvedSize, height: "auto" }
          : { width: resolvedSize, height: resolvedSize }
      }
      className={`inline-block shrink-0 object-contain transition-opacity duration-200 ${mounted ? "opacity-100" : "opacity-0"} ${className}`}
      aria-hidden="true"
    />
  );
}

export function hasTechIcon(name: string): boolean {
  return name in TECH_ICON_MAP;
}

export function isWordmark(name: string): boolean {
  return TECH_ICON_MAP[name]?.isWordmark ?? false;
}

export function getTechColor(name: string): string | undefined {
  return TECH_ICON_MAP[name]?.color;
}
