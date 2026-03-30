import { NextResponse } from 'next/server';
import { LangfuseClient } from '@langfuse/client';
import { getFormattedCVText } from '../../../../data/cv';

export async function POST() {
  try {
    const apiKey = process.env.ANAM_API_KEY;
    const personaId = process.env.ANAM_AI_PERSONA_ID;

    if (!apiKey || !personaId) {
      return NextResponse.json(
        { error: 'Missing Anam AI configuration in .env' },
        { status: 500 }
      );
    }

    const langfuse = new LangfuseClient({
      publicKey: process.env.LANGFUSE_PUBLIC_KEY,
      secretKey: process.env.LANGFUSE_SECRET_KEY,
      baseUrl: process.env.LANGFUSE_BASE_URL,
    });
    console.log('[Anam Session] Langfuse client initialized. Fetching prompt: "alejo-avatar-system-prompt"');

    const promptObj = await langfuse.prompt.get('alejo-avatar-system-prompt', { label: 'production' });
    const systemPrompt = promptObj.compile({ cv_data: getFormattedCVText() });
    console.log(`[Anam Session] Compiled system prompt successfully (${systemPrompt.length} characters).`);

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
          voiceId: persona.voice?.id,
          llmId: persona.llmId,
          systemPrompt: systemPrompt,
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
