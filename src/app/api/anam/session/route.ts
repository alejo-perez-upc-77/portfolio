import { NextResponse } from 'next/server';
import {
  getLangfuseClient,
  LANGFUSE_PROMPT_NAME,
  LANGFUSE_PROMPT_LABEL,
} from '@/lib/langfuse';
import { getFormattedCVText } from '@/data/cv';

type SupportedLanguage = 'en' | 'es';

const SUPPORTED_LANGUAGES: SupportedLanguage[] = ['en', 'es'];

const LANGUAGE_INSTRUCTIONS: Record<SupportedLanguage, string> = {
  en: 'Language: Always speak and respond exclusively in English. Never mix languages.',
  es: 'Language: Always speak and respond exclusively in Spanish (Español). Never mix languages.',
};

/**
 * Per-language voice overrides. Fall back to the persona's voice when not set.
 * avatarId is shared across languages (same visual avatar).
 * Add ANAM_VOICE_ID_ES (etc.) to .env when the Spanish voice is ready.
 */
const VOICE_ID_BY_LANG: Record<SupportedLanguage, string | undefined> = {
  en: process.env.ANAM_VOICE_ID_EN,
  es: process.env.ANAM_VOICE_ID_ES,
};

export async function POST(req: Request) {
  try {
    const apiKey = process.env.ANAM_API_KEY;
    const personaId = process.env.ANAM_AI_PERSONA_ID;

    if (!apiKey || !personaId) {
      return NextResponse.json(
        { error: 'Missing Anam AI configuration in .env' },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const rawLang: string = body?.language ?? 'en';
    const language: SupportedLanguage = SUPPORTED_LANGUAGES.includes(rawLang as SupportedLanguage)
      ? (rawLang as SupportedLanguage)
      : 'en';

    console.log(`[Anam Session] Language selected: "${language}"`);

    const langfuse = getLangfuseClient();
    console.log(`[Anam Session] Fetching prompt: "${LANGFUSE_PROMPT_NAME}"`);

    const promptObj = await langfuse.prompt.get(LANGFUSE_PROMPT_NAME, { label: LANGFUSE_PROMPT_LABEL });
    const basePrompt = promptObj.compile({ cv_data: getFormattedCVText() }) as string;
    const systemPrompt = `${basePrompt}\n\n${LANGUAGE_INSTRUCTIONS[language]}`;
    console.log(`[Anam Session] Compiled system prompt (${systemPrompt.length} chars, lang: ${language}).`);

    console.log('[Anam Session] Fetching persona details from Anam AI to override system prompt...');
    const personaResponse = await fetch(`https://api.anam.ai/v1/personas/${personaId}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    if (!personaResponse.ok) {
      console.error('Anam Persona Fetch Error:', await personaResponse.text());
      return NextResponse.json(
        { error: 'Failed to fetch persona details from Anam AI' },
        { status: personaResponse.status }
      );
    }
    const persona = await personaResponse.json();

    const voiceId = VOICE_ID_BY_LANG[language] ?? persona.voice?.id;
    console.log(`[Anam Session] Using voiceId: ${voiceId ?? 'persona default'}`);

    console.log('[Anam Session] Requesting session token from Anam AI...');
    const response = await fetch('https://api.anam.ai/v1/auth/session-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        personaConfig: {
          name: persona.name,
          avatarId: persona.avatar?.id,
          voiceId,
          llmId: persona.llmId,
          systemPrompt,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Anam API Error:', errorData);
      return NextResponse.json(
        { error: 'Failed to mint session token from Anam AI' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Anam API Request Failed:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
