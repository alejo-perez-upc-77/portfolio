export type LinkKind = "app-store" | "google-play" | "thesis-msc" | "thesis-bsc";

export type ExperienceLink = { label: string; href: string; kind: LinkKind };

export const experiences: Array<{
  company: string;
  role: string;
  period: string;
  location?: string;
  description: string;
  links?: ExperienceLink[];
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
  },
  {
    company: "Scania",
    role: "ML Engineer / Intrapreneurship Program",
    period: "Nov 2022 – Present",
    location: "Stockholm, Sweden",
    description: "Developed enterprise AI Assistant leveraging LLMs and agentic workflows, boosting developer productivity by 10%. Led Innovation Factory Hackathon on load-matching to reduce empty mileage utilizing Snowflake + Spark."
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
    ],
  },
  {
    company: "Hospital Clínic de Barcelona",
    role: "Deep Learning Research – CV",
    period: "2019 – 2020",
    description:
      "Reduced diagnosis time by 30% via deep learning preprocessing pipelines for CNN-based cancer cell classification.",
    links: [
      {
        kind: "thesis-bsc",
        label: "Bachelor thesis (UPCommons)",
        href: "https://hdl.handle.net/2117/182625",
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
  ai_ml: ['Agentic Systems', 'LLM-agnostic Platforms', 'Live Voice Agents', 'Vector DBs', 'RAG'],
  engineering: ['Python', 'Node.js', 'React Native', 'Kafka', 'Neo4j', 'Snowflake', 'Docker', 'CI/CD']
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
