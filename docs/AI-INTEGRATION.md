# BookCraft Studio — IA real

A camada de IA usa a API Gemini através de um adaptador isolado em `src/lib/gemini.js`.

## Configuração local

1. Crie `.env.local` a partir de `.env.example`.
2. Defina `VITE_GEMINI_API_KEY` com uma chave Gemini válida.
3. Opcionalmente altere `VITE_GEMINI_MODEL`.
4. Execute `npm run dev`.

## Funcionalidades desta fase

- geração de estrutura/outline;
- geração de capítulos;
- reescrita editorial;
- expansão de texto;
- resumo de texto;
- estado de configuração da IA no Book Builder;
- tratamento de erros e carregamento no UI.

## Segurança

O frontend Vite consegue chamar a API diretamente para facilitar o protótipo, mas uma chave Gemini embutida num frontend publicado pode ser extraída pelo utilizador final. Antes de produção, mover as chamadas para uma função server-side (Supabase Edge Function, Cloudflare Worker ou outro backend) e guardar o segredo apenas no servidor.

## Próximas camadas

- Supabase Auth + Database;
- Edge Function para proxy seguro da IA;
- histórico de gerações;
- limites por utilizador/plano;
- importação DOCX/PDF/TXT;
- exportação PDF/EPUB/DOCX;
- capas e metadados;
- PWA/offline.
