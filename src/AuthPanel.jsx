import React,{useEffect,useState} from 'react';
import {isSupabaseConfigured,supabase} from './lib/supabase';

export default function AuthPanel({user,setUser}){
 const [email,setEmail]=useState('');
 const [busy,setBusy]=useState(false);
 const [message,setMessage]=useState('');
 const [error,setError]=useState('');

 useEffect(()=>{
  if(!supabase) return;
  supabase.auth.getUser().then(({data})=>setUser(data.user||null));
  const {data:{subscription}}=supabase.auth.onAuthStateChange((_event,session)=>setUser(session?.user||null));
  return ()=>subscription.unsubscribe();
 },[setUser]);

 const login=async e=>{
  e.preventDefault(); setBusy(true); setError(''); setMessage('');
  try{
   const {error}=await supabase.auth.signInWithOtp({email,options:{emailRedirectTo:window.location.origin}});
   if(error) throw error;
   setMessage('Link de acesso enviado para o seu email.');
  }catch(err){setError(err.message)}finally{setBusy(false)}
 };
 const logout=async()=>{await supabase.auth.signOut();setUser(null)};
 if(!isSupabaseConfigured()) return <div className="auth-panel"><b>Supabase não configurado</b><p>Defina VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY no ambiente.</p></div>;
 if(user) return <div className="auth-panel auth-user"><div><span className="eyebrow">CONTA</span><strong>{user.email}</strong></div><button className="ghost" onClick={logout}>Sair</button></div>;
 return <div className="auth-panel"><span className="eyebrow">BOOKCRAFT CLOUD</span><h2>Guardar os seus livros na nuvem</h2><p>Entre com um link enviado por email. Não é necessário memorizar uma palavra-passe.</p><form onSubmit={login}><input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="seu@email.com"/><button className="primary" disabled={busy}>{busy?'A enviar…':'Enviar link de acesso'}</button></form>{message&&<div className="auth-message">{message}</div>}{error&&<div className="ai-error">{error}</div>}</div>
}