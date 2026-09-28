import React,{useState} from 'react';
import {generateChapter,generateOutline,isGeminiConfigured,rewriteText} from './lib/gemini';

const words=(s='')=>s.trim()?s.trim().split(/\s+/).length:0;

export default function AILab({project,setProject,setScreen}){
 const [selected,setSelected]=useState(project.chapters[0]?.id||1);
 const [busy,setBusy]=useState('');
 const [error,setError]=useState('');
 const chapter=project.chapters.find(c=>c.id===selected)||project.chapters[0];
 const run=async(label,fn)=>{setError('');setBusy(label);try{await fn()}catch(e){setError(e.message)}finally{setBusy('')}};
 const outline=()=>run('outline',async()=>{const data=await generateOutline(project);const chapters=(data.chapters||[]).map((c,i)=>({id:i+1,title:c.title||'Capítulo '+(i+1),purpose:c.purpose||'',keyPoints:c.keyPoints||[],status:'draft',words:0,content:''}));setProject({...project,chapters});setSelected(1)});
 const generate=()=>run('chapter',async()=>{const text=await generateChapter(project,chapter);const chapters=project.chapters.map(c=>c.id===chapter.id?{...c,content:text,words:words(text),status:'generated'}:c);setProject({...project,chapters});setScreen('editor')});
 const rewrite=()=>run('rewrite',async()=>{if(!chapter.content.trim())throw new Error('O capítulo ainda está vazio. Gere ou escreva conteúdo primeiro.');const text=await rewriteText(project,chapter,'Melhore a clareza, a estrutura, a naturalidade e o ritmo. Preserve a intenção e os factos.');const chapters=project.chapters.map(c=>c.id===chapter.id?{...c,content:text,words:words(text),status:'edited'}:c);setProject({...project,chapters})});
 return <section className="page ai-lab"><div className="section-head"><div><span className="eyebrow">BOOKCRAFT AI</span><h1>Motor editorial</h1><p className="lead">Esta área já chama o modelo Gemini configurado no ambiente. Use-a para validar a camada de IA antes de ligar o backend seguro.</p></div><span className={isGeminiConfigured()?'ai-ready':'ai-off'}>{isGeminiConfigured()?'● Gemini ligado':'● Gemini não configurado'}</span></div>
 {error&&<div className="ai-error">{error}<button onClick={()=>setError('')}>×</button></div>}
 {!isGeminiConfigured()&&<div className="ai-setup"><b>Configuração necessária</b><p>Crie <code>.env.local</code>, defina <code>VITE_GEMINI_API_KEY</code> e reinicie o Vite.</p></div>}
 <div className="ai-grid"><article className="ai-card"><span>01</span><h2>Construir estrutura</h2><p>Analisa título, público, tom e tema para criar um outline de 6–10 capítulos.</p><button className="primary" disabled={!!busy||!isGeminiConfigured()} onClick={outline}>{busy==='outline'?'A gerar…':'✦ Gerar outline'}</button></article>
 <article className="ai-card"><span>02</span><h2>Escrever capítulo</h2><select value={selected} onChange={e=>setSelected(Number(e.target.value))}>{project.chapters.map(c=><option key={c.id} value={c.id}>{c.id}. {c.title}</option>)}</select><p>Gera um capítulo desenvolvido usando a arquitetura atual do livro.</p><button className="primary" disabled={!!busy||!isGeminiConfigured()} onClick={generate}>{busy==='chapter'?'A escrever…':'✦ Gerar capítulo'}</button></article>
 <article className="ai-card"><span>03</span><h2>Editar capítulo</h2><p>Aplica uma revisão editorial ao capítulo selecionado, preservando intenção e factos.</p><button className="primary" disabled={!!busy||!isGeminiConfigured()} onClick={rewrite}>{busy==='rewrite'?'A editar…':'✦ Melhorar com IA'}</button></article></div>
 <div className="ai-context"><b>Contexto enviado ao modelo</b><span>{project.title} · {project.audience} · {project.tone} · {project.chapters.length} capítulos</span></div>
 </section>
}
