export type LinkKind = "app-store" | "google-play" | "thesis-msc" | "thesis-bsc" | "github";

export type ExperienceLink = { label: string; href: string; kind: LinkKind };

export type ExperienceMedia =
  | { type: "image"; src: string; alt: string }
  | { type: "youtube"; videoId: string; title: string };

export const experiences: Array<{
  company: string;
  role: string;
  period: string;
  location?: string;
  description: string;
  links?: ExperienceLink[];
  media?: ExperienceMedia;
}> = [
  {
    company: "Uniplay Learning",
    role: "AI Lead – Agentic Systems",
    period: "2024 – Present",
    location: "Stockholm (Remote)",
    description:
      "Architected and led full ownership of AI agentic features and real-time voice agents for interactive microlearning scenarios with live evaluation feedback. Designed LLM-agnostic, fault-tolerant AI platforms spanning backend services, memory systems, and gamification.",
    links: [
      {
        kind: "app-store",
        label: "App Store",
        href: "https://apps.apple.com/se/app/uniplay/id6740267350?l=en-GB",
      },
      {
        kind: "google-play",
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.uniplay.uniplay&pcampaignid=web_share",
      },
    ],
    media: {
      type: "youtube",
      videoId: "bwEoiBHezTc",
      title: "Uniplay Learning platform demo",
    },
  },
  {
    company: "Scania",
    role: "ML Engineer / Intrapreneurship Program",
    period: "Nov 2022 – Present",
    location: "Stockholm, Sweden",
    description: "Developed enterprise AI Assistant leveraging LLMs and agentic workflows, boosting developer productivity by 10%. Won a special prize at the Innovation Factory Hackathon, earning a position in Scania's intrapreneurship program. Explored and prototyped LoadMatch, a load-matching venture to reduce empty mileage, as part of the intrapreneurship program utilizing Snowflake + Spark."
  },
  {
    company: "Huawei Sweden",
    role: "Data Scientist – Master Thesis (Honors)",
    period: "Jan 2022 – Jul 2022",
    description:
      "Researched predictive models for 5G wireless channels using probabilistic and deep learning approaches.",
    links: [
      {
        kind: "thesis-msc",
        label: "Master thesis (DiVA)",
        href: "https://urn.kb.se/resolve?urn=urn:nbn:se:liu:diva-186248",
      },
      {
        kind: "github",
        label: "GitHub",
        href: "https://github.com/alejo-perez-upc-77/CrossBand_ChannelPrediction_MasterThesis",
      },
    ],
  },
  {
    company: "Hospital Clínic de Barcelona",
    role: "Deep Learning Research – CV",
    period: "2019 – 2020",
    description:
      "Reduced diagnosis time by 30% via deep learning preprocessing pipelines for CNN-based cancer cell classification. Bachelor thesis paper selected for the CASEIB Biomedical Engineering Congress.",
    links: [
      {
        kind: "thesis-bsc",
        label: "Bachelor thesis (UPCommons)",
        href: "https://hdl.handle.net/2117/182625",
      },
      {
        kind: "github",
        label: "GitHub",
        href: "https://github.com/alejo-perez-upc-77/GANs-Lymphocytes-Bachelor_Thesis",
      },
    ],
  },
];

export const education = [
  {
    institution: "Linköping University",
    degree: "MSc Statistics & Machine Learning",
    period: "2020 – 2022",
    location: "Sweden"
  },
  {
    institution: "Universitat Politècnica de Catalunya",
    degree: "BSc Biomedical Engineering",
    period: "2015 – 2020",
    location: "Spain"
  }
];

export const skills = {
  ai_ml: ['TensorFlow', 'MLFlow', 'Agentic Systems', 'LLM-agnostic Platforms', 'Live Voice Agents', 'Vector DBs', 'RAG'],
  engineering: ['Python', 'TypeScript', 'Next.js', 'React Native', 'Node.js', 'tRPC', 'Effect', 'Kafka', 'PostgreSQL', 'Redis', 'Neo4j', 'Snowflake', 'Docker', 'Terraform', 'AWS', 'Azure', 'n8n', 'Firecrawl', 'CI/CD']
};

export type Project = {
  title: string;
  description: string;
  tech: string[];
  image?: string;
  links?: ExperienceLink[];
};

export const projects: Project[] = [
  {
    title: "Expiria",
    description:
      "A smart expiry-tracking app powered by multimodal LLMs. Snap a photo of your groceries and let AI extract expiration dates, suggest recipes before food goes bad, and reduce waste. Built end-to-end with a React Native frontend, Node.js backend, Prisma ORM over SQLite, and multimodal LLM pipelines for image understanding.",
    tech: ["React Native", "Node.js", "Prisma", "SQLite", "Multimodal LLMs"],
    image: "/images/expiria-screenshot.png",
    links: [
      {
        kind: "github",
        label: "GitHub",
        href: "https://github.com/alejo-ai-labs/expire-ai",
      },
    ],
  },
  {
    title: "This Portfolio",
    description:
      "The site you're looking at right now. Features an interactive AI avatar powered by Anam.ai, prompt management via Langfuse, and a clean editorial design built with React and Next.js.",
    tech: ["React", "Next.js", "Anam.ai", "Langfuse", "TypeScript"],
    links: [
      {
        kind: "github",
        label: "GitHub",
        href: "https://github.com/alejo-ai-labs/portfolio",
      },
    ],
  },
];

export const aboutMe = {
  heading: "About Me",
  narrative:
    "Born and raised in Spain, I pursued biomedical engineering at Universitat Politècnica de Catalunya, where I discovered the power of AI through a deep learning research project at Hospital Clínic de Barcelona. That spark led me to Sweden, where I earned an MSc in Statistics & Machine Learning at Linköping University. Today I help companies build AI-powered products — from agentic systems and real-time voice agents to LLM platforms — combining 8+ years of hands-on engineering with a deep curiosity for what's next.",
  imageSrc: "/images/imageCV.jpeg",
  imageAlt: "Alejo Perez portrait photo",
};

export function getFormattedCVText(): string {
  const parts: string[] = [];

  parts.push("PROFESSIONAL EXPERIENCE");
  experiences.forEach(exp => {
    const location = exp.location ? `, based in ${exp.location}` : "";
    parts.push(`${exp.company}, ${exp.role} (${exp.period}${location}): ${exp.description}`);
  });

  parts.push("EDUCATION");
  education.forEach(edu => {
    const location = edu.location ? ` in ${edu.location}` : "";
    parts.push(`${edu.degree} at ${edu.institution}${location}, graduated ${edu.period}.`);
  });

  parts.push("TECHNICAL SKILLS");
  parts.push(`AI and Machine Learning: ${skills.ai_ml.join(", ")}.`);
  parts.push(`Engineering and tools: ${skills.engineering.join(", ")}.`);

  return parts.join("\n\n");
}
