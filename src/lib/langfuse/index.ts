import { LangfuseClient } from "@langfuse/client";

export const LANGFUSE_PROMPT_NAME = "alejo-avatar-system-prompt";
export const LANGFUSE_PROMPT_LABEL = "production";

export function getLangfuseClient(): LangfuseClient {
  return new LangfuseClient({
    publicKey: process.env.LANGFUSE_PUBLIC_KEY,
    secretKey: process.env.LANGFUSE_SECRET_KEY,
    baseUrl: process.env.LANGFUSE_BASE_URL,
  });
}

