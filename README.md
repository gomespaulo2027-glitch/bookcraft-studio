# BookCraft Studio

Aplicação web **mobile-first** para criação, edição e produção de ebooks.

## Estado atual

O projeto já possui:

- Dashboard e biblioteca de ebooks.
- Book Builder e criação de capítulos.
- Editor rich-text baseado em `contentEditable`.
- Metadados de publicação e referências.
- Importação de TXT, DOCX e PDF.
- Exportação para PDF, DOCX e EPUB.
- IA Studio e ações de IA no editor.
- Gemini integrado através da Supabase Edge Function `bookcraft-ai`.
- Supabase Auth, Database, RLS e Storage.
- Capas e metadados.
- PWA com manifest, ícone e service worker.
- CI de build com GitHub Actions.

## Estrutura

```
.
├── .github/workflows/       # CI
├── docs/                    # documentação técnica
├── public/                  # assets públicos e PWA
├── src/
│   ├── lib/                # integrações e utilitários
│   ├── AILab.jsx
│   ├── App.jsx
│   ├── AuthPanel.jsx
│   ├── ImportPanel.jsx
│   ├── main.jsx
│   └── styles.css
├── .env.example
├── index.html
├── package.json
└── vite.config.js
```

## Desenvolvimento

```bash
npm install
npm run dev
npm run build
```

O CI usa Node 20, `npm install` e `npm run build`.

## Configuração

O frontend usa:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_GEMINI_MODEL` (opcional)

A chave privada **`GEMINI_API_KEY` não pertence ao frontend**. Ela deve permanecer exclusivamente no ambiente da Edge Function `bookcraft-ai`.

Não criar, commitar ou pedir chaves privadas dentro deste repositório.

## IA

O fluxo atual é:

```
React/Vite
   │
   └── Supabase client
          │
          └── Edge Function: bookcraft-ai
                    │
                    └── GEMINI_API_KEY
```

O adaptador do frontend está em `src/lib/gemini.js`.

Consulte `docs/AI-INTEGRATION.md` antes de alterar a integração.

## Supabase

A arquitetura está documentada em `docs/SUPABASE-ARCHITECTURE.md`.

O frontend deve usar somente a publishable key. Service-role keys e outros segredos nunca devem ser expostos no browser.

## PWA

O service worker está em `public/sw.js`. A estratégia atual prioriza rede para navegação e JS/CSS, evitando que deployments novos fiquem escondidos por assets antigos.

## Documentação

Comece por `docs/README.md` e `docs/PROJECT-STATUS.md`.

## Regras para manutenção / Lovable

1. Preserve funcionalidades já implementadas.
2. Faça alterações incrementais.
3. Não recrie a arquitetura inteira para corrigir um único problema.
4. Não exponha segredos.
5. Não altere Supabase/Edge Functions sem verificar o impacto no frontend.
6. Após alterações, execute `npm run build`.
7. Registre cada correção importante em um commit objetivo.

O objetivo é manter o repositório como a **fonte organizada do código**, enquanto problemas específicos de ambiente podem ser resolvidos no Lovable sem apagar ou substituir o trabalho existente.
