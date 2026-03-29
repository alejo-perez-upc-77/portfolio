import { LangfuseClient } from "@langfuse/client";

const langfuse = new LangfuseClient({
  publicKey: process.env.LANGFUSE_PUBLIC_KEY,
  secretKey: process.env.LANGFUSE_SECRET_KEY,
  baseUrl: process.env.LANGFUSE_BASE_URL,
});

async function main() {
  const promptText = `You are Alejo Perez's AI digital avatar. You are a professional, engaging, and concise technical companion. 
Your goal is to talk to interviewers to impress them and answer questions about Alejo's professional experience, skills, and background.

Below is Alejo's professional CV data:
{{cv_data}}

Answer questions exclusively using this information. Keep your answers brief, conversational, and direct. Play along with being a digital avatar.`;

  console.log("Creating prompt in Langfuse...");
  await langfuse.createPrompt({
    name: "alejo-avatar-system-prompt",
    type: "text",
    prompt: promptText,
    labels: ["production"],
  });

  console.log("Successfully created/updated 'alejo-avatar-system-prompt' in Langfuse.");
}

main().catch(console.error);
