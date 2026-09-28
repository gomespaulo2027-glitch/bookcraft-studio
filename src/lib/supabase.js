import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = () =>
  Boolean(supabaseUrl && supabasePublishableKey);

export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabasePublishableKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

export async function getCurrentUser() {
  if (!supabase) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user;
}

export async function saveManuscript(project, userId) {
  if (!supabase) throw new Error('Supabase não configurado.');
  const payload = {
    id: project.remoteId || undefined,
    user_id: userId,
    title: project.title,
    metadata: {
      subtitle: project.subtitle,
      author: project.author,
      audience: project.audience,
      tone: project.tone,
      topic: project.topic,
    },
    content_json: {
      chapters: project.chapters,
    },
    updated_at: new Date().toISOString(),
  };

  const query = project.remoteId
    ? supabase.from('manuscripts').upsert(payload).select().single()
    : supabase.from('manuscripts').insert(payload).select().single();

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function listManuscripts(userId) {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('manuscripts')
    .select('id,title,metadata,content_json,created_at,updated_at')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function uploadUserFile(bucket, path, file) {
  if (!supabase) throw new Error('Supabase não configurado.');
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { upsert: true, contentType: file.type || undefined });
  if (error) throw error;
  return data;
}
