const DEFAULT_MODEL = 'gemini-3.1-flash-lite';

function getConfig() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const model = import.meta.env.VITE_GEMINI_MODEL || DEFAULT_MODEL;
  if (!apiKey) {
    throw new Error('VITE_GEMINI_API_KEY não configurada. Crie um ficheiro .env.local com a sua chave Gemini.');
  }
  return { apiKey, model };
}

async function generate(prompt, options = {}) {
  const { apiKey, model } = getConfig();
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: options.temperature ?? 0.7,
          topP: options.topP ?? 0.95,
          maxOutputTokens: options.maxOutputTokens ?? 8192,
          ...(options.responseMimeType ? { responseMimeType: options.responseMimeType } : {})
        }
      })
    }
  );

  const data = await response.json();
  if (!response.ok) {
    const message = data?.error?.message || `Gemini API respondeu com HTTP ${response.status}`;
    throw new Error(message);
  }

  const text = data?.candidates?.[0]?.content?.parts?.map(part => part.text || '').join('').trim();
  if (!text) throw new Error('A IA não devolveu conteúdo.');
  return text;
}

export async function generateOutline(project) {
  const prompt = `Você é o motor editorial do BookCraft Studio.
Crie uma estrutura profissional de livro em português de Angola.

Dados:
Título: ${project.title}
Subtítulo: ${project.subtitle}
Autor: ${project.author}
Público: ${project.audience}
Tom: ${project.tone}
Tema central: ${project.topic}

Retorne SOMENTE JSON válido no formato:
{"chapters":[{"title":"...","purpose":"...","keyPoints":["...","..."]}]}

Crie entre 6 e 10 capítulos, com progressão lógica. Não use markdown.`;
  const raw = await generate(prompt, { responseMimeType: 'application/json', temperature: 0.55 });
  return JSON.parse(raw);
}

export async function generateChapter(project, chapter) {
  const prompt = `Você é um escritor/editor profissional do BookCraft Studio.
Escreva o capítulo abaixo em português de Angola, mantendo um estilo ${project.tone}, claro, natural e profissional.

Livro: ${project.title}
Subtítulo: ${project.subtitle}
Público: ${project.audience}
Tema: ${project.topic}
Capítulo: ${chapter.title}
Objetivo do capítulo: ${chapter.purpose || 'Desenvolver o tema com profundidade e aplicação prática.'}
Pontos-chave: ${(chapter.keyPoints || []).join('; ')}

Produza um texto editorial desenvolvido, com subtítulos quando forem úteis, exemplos concretos e transições naturais. Não mencione IA, prompts ou o BookCraft. Não invente referências académicas. Retorne apenas o texto do capítulo.`;
  return generate(prompt, { temperature: 0.72, maxOutputTokens: 12000 });
}

export async function rewriteText(project, chapter, instruction) {
  const prompt = `Atue como editor profissional.
Livro: ${project.title}
Público: ${project.audience}
Tom: ${project.tone}
Capítulo: ${chapter.title}

Texto original:
---
${chapter.content}
---

Instrução editorial: ${instruction}

Reescreva preservando a intenção e os factos do texto. Melhore clareza, coesão, ritmo e naturalidade. Não acrescente afirmações factuais não sustentadas. Retorne apenas a versão revista.`;
  return generate(prompt, { temperature: 0.45, maxOutputTokens: 10000 });
}

export async function expandText(project, chapter) {
  return rewriteText(project, chapter, 'Expanda o texto com explicações, um exemplo prático e transições melhores. Preserve o conteúdo existente e evite repetição.');
}

export async function summarizeText(project, chapter) {
  return rewriteText(project, chapter, 'Crie uma versão mais concisa, removendo redundâncias sem perder as ideias essenciais.');
}

export function isGeminiConfigured() {
  return Boolean(import.meta.env.VITE_GEMINI_API_KEY);
}
