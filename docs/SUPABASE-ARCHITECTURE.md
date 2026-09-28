# BookCraft Studio + Supabase

## Projeto

- Project: bookcraft-studio
- Region: eu-west-1
- Database: PostgreSQL 17
- API URL: https://whadpxzatojkkmuifmjs.supabase.co

## Dados

Tabelas principais:

- `public.profiles`
- `public.manuscripts`
- `public.content_anchors`

As tabelas têm RLS ativado e as policies restringem os dados ao utilizador autenticado proprietário.

## Storage

Buckets privados usados pelo projeto:

- `bookcraft-imports` — ficheiros de origem.
- `bookcraft-covers` — capas.
- `bookcraft-exports` — ficheiros gerados.

Padrão de caminho:

`<user-id>/<manuscript-id>/<filename>`

## Cliente

O frontend usa somente:

`VITE_SUPABASE_URL`

`VITE_SUPABASE_PUBLISHABLE_KEY`

Nunca colocar service-role key ou outro segredo no frontend.

## Autenticação

A aplicação usa Supabase Auth. O fluxo de autenticação deve produzir uma sessão válida antes de chamadas protegidas à Edge Function.

## IA

A Edge Function `bookcraft-ai` está no backend.

Responsabilidade:

- autenticar o utilizador;
- ler `GEMINI_API_KEY` server-side;
- chamar Gemini;
- devolver o resultado ao cliente.

A chave Gemini não é uma variável Vite e não deve ser adicionada ao `.env.example`.

## Manutenção

Alterações de schema, RLS, Auth, Storage ou Edge Functions devem ser feitas de forma incremental e verificadas antes de modificar o frontend.

Para o estado consolidado do projeto, consulte `docs/PROJECT-STATUS.md`.
