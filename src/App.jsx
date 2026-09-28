import React,{useEffect,useMemo,useState} from 'react';
import {isGeminiConfigured} from './lib/gemini';
import AILab from './AILab';

const seed={id:'book-1',title:'O Meu Próximo Livro',subtitle:'Transforme uma ideia em um manuscrito profissional',author:'Autor',audience:'Geral',tone:'Autoritativo e Analítico',topic:'',chapters:[
{id:1,title:'Introdução',status:'draft',words:0,content:''},
{id:2,title:'O problema',status:'draft',words:0,content:''},
{id:3,title:'A solução',status:'draft',words:0,content:''}
]};

function load(){try{return JSON.parse(localStorage.getItem('bookcraft-project')||'null')||seed}catch{return seed}}
function save(v){localStorage.setItem('bookcraft-project',JSON.stringify(v))}
function countWords(s=''){return s.trim()?s.trim().split(/\\s+/).length:0}

export default function App(){
 const [project,setProject]=useState(load);
 const [screen,setScreen]=useState('home');
 const [active,setActive]=useState(1);
 const [saved,setSaved]=useState(true);
 useEffect(()=>{save(project);setSaved(true)},[project]);
 const chapter=project.chapters.find(c=>c.id===active)||project.chapters[0];
 const total=useMemo(()=>project.chapters.reduce((n,c)=>n+c.words,0),[project]);
 const update=(patch)=>{setSaved(false);setProject(p=>({...p,...patch}))};
 const updateChapter=(patch)=>update({chapters:project.chapters.map(c=>c.id===chapter.id?{...c,...patch}:c)});
 const addChapter=()=>{const id=Math.max(0,...project.chapters.map(c=>c.id))+1;setProject(p=>({...p,chapters:[...p.chapters,{id,title:'Novo capítulo',status:'draft',words:0,content:''}]}));setActive(id);setScreen('builder')};

 return <div className="app">
  <header className="top"><div className="brand" onClick={()=>setScreen('home')}><span className="mark">✦</span><span>BookCraft <b>Studio</b></span></div><div className="top-actions"><span className={saved?'saved':'saving'}>{saved?'● Guardado':'● A guardar…'}</span><span className="ai-status">{isGeminiConfigured()?'IA ligada':'IA não configurada'}</span><button onClick={()=>setScreen('editor')}>Abrir editor</button></div></header>
  <div className="layout">
   <aside className="sidebar">
    <nav>{[['home','⌂','Início'],['library','▣','Meus Ebooks'],['builder','✦','Book Builder'],['editor','✎','Editor'],['ai','✦','IA Studio'],['templates','▤','Templates']].map(([id,i,l])=><button className={screen===id?'active':''} onClick={()=>setScreen(id)} key={id}><span>{i}</span>{l}</button>)}</nav>
    <div className="side-bottom"><small>BOOKCRAFT STUDIO</small><p>Crie, edite e prepare ebooks profissionais.</p></div>
   </aside>
   <main className="main">
    {screen==='home'&&<Home project={project} total={total} setScreen={setScreen} addChapter={addChapter}/>}
    {screen==='library'&&<Library project={project} setScreen={setScreen}/>}
    {screen==='builder'&&<Builder project={project} setProject={setProject} active={active} setActive={setActive} addChapter={addChapter} setScreen={setScreen}/>}
    {screen==='editor'&&<Editor project={project} chapter={chapter} updateChapter={updateChapter} setScreen={setScreen}/>}
    {screen==='ai'&&<AILab project={project} setProject={setProject} setScreen={setScreen}/>}
    {screen==='templates'&&<Templates setProject={setProject} setScreen={setScreen}/>}
   </main>
  </div>
 </div>
}

function Home({project,total,setScreen,addChapter}){return <section className="page">
 <div className="hero"><div><span className="eyebrow">STUDIO</span><h1>Transforme ideias em <em>livros</em>.</h1><p>Um espaço editorial com IA para estruturar, escrever, editar e preparar o seu ebook.</p></div><button className="primary" onClick={()=>setScreen('builder')}>✦ Começar um ebook</button></div>
 <div className="stats"><div><b>{total.toLocaleString('pt-AO')}</b><span>palavras</span></div><div><b>{project.chapters.length}</b><span>capítulos</span></div><div><b>Rascunho</b><span>estado atual</span></div></div>
 <div className="section-head"><h2>Projeto ativo</h2><button onClick={()=>setScreen('editor')}>Continuar a editar →</button></div>
 <article className="book-card"><div className="cover"><span>✦</span><strong>{project.title}</strong><small>{project.author}</small></div><div className="book-info"><span className="badge">DRAFT</span><h3>{project.title}</h3><p>{project.subtitle}</p><div className="progress"><i style={{width:Math.min(100,total/200)}}/></div><small>{total.toLocaleString('pt-AO')} palavras · {project.chapters.length} capítulos</small><div><button className="primary small" onClick={()=>setScreen('builder')}>Abrir Book Builder</button><button className="ghost" onClick={addChapter}>+ Capítulo</button></div></div></article>
 </section>}

function Library({project,setScreen}){return <section className="page"><div className="section-head"><div><span className="eyebrow">BIBLIOTECA</span><h1>Meus Ebooks</h1></div><button className="primary" onClick={()=>setScreen('builder')}>+ Novo ebook</button></div><div className="grid"><article className="project-card" onClick={()=>setScreen('builder')}><div className="mini-cover"><span>✦</span><b>{project.title}</b></div><h3>{project.title}</h3><p>{project.chapters.length} capítulos · Rascunho</p></article></div></section>}

function Builder({project,setProject,active,setActive,addChapter,setScreen}){const [form,setForm]=useState(project);useEffect(()=>setForm(project),[project]);return <section className="page builder"><div className="builder-head"><div><span className="eyebrow">BOOK BUILDER · 1 DE 3</span><h1>Manuscript Canvas</h1><p>Defina visão, público, tom e arquitetura antes de gerar o manuscrito.</p></div><button className="primary" onClick={()=>{setProject(form);setScreen('editor')}}>Gerar estrutura →</button></div>
 <div className="canvas"><div className="form"><label>Título<input value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/></label><label>Subtítulo / Hook<textarea value={form.subtitle} onChange={e=>setForm({...form,subtitle:e.target.value})}/></label><label>Autor<input value={form.author} onChange={e=>setForm({...form,author:e.target.value})}/></label><label>Tema central<textarea value={form.topic} placeholder="Qual transformação o livro entrega?" onChange={e=>setForm({...form,topic:e.target.value})}/></label><div><label>Público<select value={form.audience} onChange={e=>setForm({...form,audience:e.target.value})}><option>Geral</option><option>Empreendedores</option><option>Estudantes</option><option>Profissionais</option><option>Académico</option></select></label><label>Tom<select value={form.tone} onChange={e=>setForm({...form,tone:e.target.value})}><option>Autoritativo e Analítico</option><option>Conversacional e Envolvente</option><option>Académico e Rigoroso</option><option>Inspirador e Visionário</option></select></label></div></div>
 <aside className="outline"><div className="section-head"><h2>Capítulos</h2><button onClick={addChapter}>+</button></div>{form.chapters.map(c=><button key={c.id} className={active===c.id?'chapter active':'chapter'} onClick={()=>setActive(c.id)}><span>{String(c.id).padStart(2,'0')}</span><strong>{c.title}</strong><small>{c.words} palavras</small></button>)}</aside></div></section>}

function Editor({project,chapter,updateChapter,setScreen}){if(!chapter)return null;return <section className="page editor"><div className="editor-head"><button className="ghost" onClick={()=>setScreen('builder')}>← Book Builder</button><div><span className="eyebrow">MANUSCRIPT EDITOR</span><h1>{chapter.title}</h1></div><button className="primary" onClick={()=>window.print()}>Exportar / Imprimir</button></div><div className="toolbar"><button>H1</button><button>H2</button><button><b>B</b></button><button><i>I</i></button><button>❝</button><button>☷</button><span/><button className="ai">✦ Reescrever com IA</button></div><div className="paper"><input className="chapter-title" value={chapter.title} onChange={e=>updateChapter({title:e.target.value})}/><textarea autoFocus value={chapter.content} placeholder="Comece a escrever o capítulo…\n\nUse o botão de IA para trabalhar em cima do seu próprio texto." onChange={e=>updateChapter({content:e.target.value,words:countWords(e.target.value)})}/></div><div className="editor-foot"><span>{chapter.words.toLocaleString('pt-AO')} palavras</span><span>Capítulo {chapter.id} de {project.chapters.length}</span></div></section>}

function Templates({setProject,setScreen}){const use=(name,subtitle,chapters)=>{setProject({...seed,id:'new-'+Date.now(),title:name,subtitle,chapters:chapters.map((t,i)=>({id:i+1,title:t,status:'draft',words:0,content:''}))});setScreen('builder')};return <section className="page"><span className="eyebrow">TEMPLATES</span><h1>Comece com uma estrutura</h1><p className="lead">Modelos editoriais para reduzir o trabalho de página em branco.</p><div className="template-grid"><button onClick={()=>use('Guia Prático','Um guia orientado à transformação',['Introdução','O problema','Fundamentos','Método passo a passo','Exemplos práticos','Checklist','Conclusão'])}><b>Guia Prático</b><span>7 capítulos · ação e aplicação</span></button><button onClick={()=>use('Livro de Negócios','Estratégia, análise e execução',['Contexto','Diagnóstico','Estratégia','Operação','Casos','Métricas','Plano de ação','Conclusão'])}><b>Livro de Negócios</b><span>8 capítulos · executivo</span></button><button onClick={()=>use('Manual Completo','Referência aprofundada',['Introdução','Conceitos','Fundamentos','Processos','Boas práticas','Casos','Ferramentas','Perguntas frequentes','Conclusão'])}><b>Manual Completo</b><span>9 capítulos · aprofundado</span></button></div></section>}
