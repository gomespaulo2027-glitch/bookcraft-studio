# BookCraft Studio + Supabase

## Projeto conectado

- Project: bookcraft-studio
- Region: eu-west-1
- Database: PostgreSQL 17
- API URL: https://whadpxzatojkkmuifmjs.supabase.co

## Estado inicial verificado

As tabelas existentes são:

- public.profiles
- public.manuscripts
- public.content_anchors

Todas têm RLS ativado.

## Segurança aplicada

As policies restringem perfis, manuscritos e âncoras ao utilizador autenticado dono dos dados.

Também foram criados índices para as foreign keys:

- manuscripts(user_id)
- content_anchors(manuscript_id)

## Storage

Foram criados três buckets privados:

- bookcraft-imports — DOCX/PDF/TXT e outros ficheiros de origem
- bookcraft-covers — capas
- bookcraft-exports — PDF/EPUB/DOCX gerados

Os objetos devem usar o primeiro segmento do caminho como o UUID do utilizador:

`<user-id>/<manuscript-id>/<filename>`

As policies de Storage limitam acesso ao próprio utilizador.

## Cliente

O frontend usa apenas a publishable key:

`VITE_SUPABASE_PUBLISHABLE_KEY`

Nunca colocar service_role/secret key no frontend.

## Próximas camadas

1. Autenticação Supabase Auth
2. Sincronização automática do editor
3. Importação DOCX/PDF/TXT
4. Exportação PDF/EPUB/DOCX
5. Capas e metadados
6. Edge Function para IA, retirando a chave Gemini do browser
7. PWA/offline
8. Publicação
