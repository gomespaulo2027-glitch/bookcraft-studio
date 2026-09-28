# Estado do projeto

**Atualizado:** 28/09/2026

## Produto

BookCraft Studio é uma aplicação web mobile-first para criação, edição e publicação de ebooks.

## Implementado

- Dashboard e navegação principal.
- Biblioteca de ebooks.
- Book Builder / criação de manuscrito.
- Editor rich-text baseado em contentEditable.
- Capítulos, título, subtítulo, autor, público, tom e tema.
- Contagem de palavras.
- Importação TXT, DOCX e PDF.
- Exportação/impressão e geração de PDF, DOCX e EPUB.
- IA Studio e ações de IA no editor.
- Gemini através da Supabase Edge Function bookcraft-ai.
- Supabase Auth e persistência de dados.
- Capas e metadados.
- Referências bibliográficas.
- PWA: manifest, ícone e service worker.
- CI de build com GitHub Actions.
- Diagnóstico de configuração do frontend separado do segredo Gemini do backend.

## Arquivos principais

- src/App.jsx — aplicação principal, navegação e editor.
- src/AILab.jsx — área de IA.
- src/AuthPanel.jsx — autenticação.
- src/ImportPanel.jsx — importação de documentos.
- src/lib/gemini.js — cliente da IA; chama bookcraft-ai.
- src/lib/supabase.js — cliente Supabase.
- src/lib/importers.js — importadores.
- src/lib/exporters.js — exportadores.
- src/styles.css — sistema visual.
- src/main.jsx — entrada da aplicação e PWA.
- public/sw.js — service worker.
- public/manifest.webmanifest — manifesto PWA.

## Infraestrutura externa

### Supabase

Projeto: bookcraft-studio

Responsabilidades: autenticação, PostgreSQL, RLS, Storage e Edge Function bookcraft-ai.

### Gemini

A chave privada GEMINI_API_KEY pertence ao ambiente da Edge Function. Não deve aparecer no frontend, .env.example, commits, logs ou documentação pública.

### Deploy

O frontend é preparado para deploy Vite/Vercel.

## Verificação local

npm install
npm run dev
npm run build

## CI

.github/workflows/ci.yml executa checkout, Node 20, npm install e npm run build.

## Próximas prioridades

1. Resolver/validar o fluxo de IA no ambiente de desenvolvimento/deploy com o Lovable.
2. Testar autenticação real.
3. Testar persistência e sincronização do editor.
4. Testar importação e exportação em dispositivos móveis.
5. Testar PWA após cada deploy.
6. Só depois avançar para versionamento, publicação e funcionalidades adicionais.

## Regra de manutenção

Não alterar várias camadas ao mesmo tempo sem necessidade. Cada correção deve ser pequena, verificável e registrada em commit com mensagem objetiva.
