import {supabase,isSupabaseConfigured} from './supabase';

const DEFAULT_MODEL='gemini-3.1-flash-lite';

async function generate(prompt,options={}){
 if(!isSupabaseConfigured()||!supabase) throw new Error('Supabase/BookCraft AI não configurado.');
 const {data,error}=await supabase.functions.invoke('bookcraft-ai',{body:{model:options.model||DEFAULT_MODEL,prompt,temperature:options.temperature??.7,maxOutputTokens:options.maxOutputTokens??8192,responseMimeType:options.responseMimeType}});
 if(error) throw new Error(error.message||'Falha ao chamar o BookCraft AI.');
 if(!data?.text) throw new Error(data?.error||'A IA não devolveu conteúdo.');
 return data.text;
}
export async function generateOutline(project){const prompt=`Você é o motor editorial do BookCraft Studio. Crie uma estrutura profissional de livro em português de Angola.\n\nDados:\nTítulo: ${project.title}\nSubtítulo: ${project.subtitle}\nAutor: ${project.author}\nPúblico: ${project.audience}\nTom: ${project.tone}\nTema central: ${project.topic}\n\nRetorne SOMENTE JSON válido no formato: {"chapters":[{"title":"...","purpose":"...","keyPoints":["...","..."]}]}\nCrie entre 6 e 10 capítulos, com progressão lógica. Não use markdown.`;return JSON.parse(await generate(prompt,{responseMimeType:'application/json',temperature:.55}));}
export async function generateChapter(project,chapter){const prompt=`Você é um escritor/editor profissional do BookCraft Studio. Escreva o capítulo abaixo em português de Angola, mantendo um estilo ${project.tone}, claro, natural e profissional.\n\nLivro: ${project.title}\nSubtítulo: ${project.subtitle}\nPúblico: ${project.audience}\nTema: ${project.topic}\nCapítulo: ${chapter.title}\nObjetivo: ${chapter.purpose||'Desenvolver o tema com profundidade e aplicação prática.'}\nPontos-chave: ${(chapter.keyPoints||[]).join('; ')}\n\nProduza texto editorial desenvolvido, com subtítulos quando úteis, exemplos concretos e transições naturais. Não mencione IA, prompts ou BookCraft. Não invente referências. Retorne apenas o texto.`;return generate(prompt,{temperature:.72,maxOutputTokens:12000});}
export async function rewriteText(project,chapter,instruction){const prompt=`Atue como editor profissional.\nLivro: ${project.title}\nPúblico: ${project.audience}\nTom: ${project.tone}\nCapítulo: ${chapter.title}\n\nTexto original:\n---\n${chapter.content}\n---\n\nInstrução editorial: ${instruction}\n\nReescreva preservando intenção e factos. Melhore clareza, coesão, ritmo e naturalidade. Não acrescente afirmações factuais não sustentadas. Retorne apenas a versão revista.`;return generate(prompt,{temperature:.45,maxOutputTokens:10000});}
export async function expandText(project,chapter){return rewriteText(project,chapter,'Expanda o texto com explicações, um exemplo prático e transições melhores. Preserve o conteúdo existente e evite repetição.');}
export async function summarizeText(project,chapter){return rewriteText(project,chapter,'Crie uma versão mais concisa, removendo redundâncias sem perder as ideias essenciais.');}
export function isGeminiConfigured(){return isSupabaseConfigured()&&Boolean(supabase);}
export function getGeminiSetupState(){return isSupabaseConfigured()&&Boolean(supabase)?'ready':'supabase-client-missing';}
