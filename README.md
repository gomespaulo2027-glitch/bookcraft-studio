# BookCraft Studio

Aplicação mobile-first para criação e produção de ebooks, reconstruída a partir do desenvolvimento enviado do Google AI Studio/Stitch.

## Estado atual
- Home Dashboard
- Biblioteca de ebooks
- Book Builder / Manuscript Canvas
- Editor de manuscrito
- Templates iniciais
- Criação e edição de capítulos
- Contagem de palavras
- Autosave local
- Exportação/impressão pelo navegador
- Design system editorial baseado no material Stitch
- IA real via Gemini: outline, geração de capítulos e edição editorial
- IA Studio dedicado com estados de carregamento e erros
- Configuração por variáveis de ambiente, sem chave commitada

## Desenvolvimento local
```bash
npm install
npm run dev
```

Build de produção:
```bash
npm run build
```

## IA real — configuração

Copie `.env.example` para `.env.local` e defina `VITE_GEMINI_API_KEY`. Opcionalmente defina `VITE_GEMINI_MODEL`. Nunca coloque uma chave real no GitHub.

A documentação da integração está em `docs/AI-INTEGRATION.md`. Nesta fase, a chamada Gemini é feita pelo frontend para permitir validação rápida. Antes de produção, a chamada deve migrar para uma função server-side/Edge Function.

## Arquitetura de evolução
O frontend está separado por áreas para permitir adicionar, sem reconstrução do produto:
- Supabase Auth + Database
- IA para outline, geração, reescrita e revisão
- importação DOCX/PDF/TXT
- exportação PDF/EPUB/DOCX
- gestão de capas e metadados
- histórico/versionamento
- PWA/offline

A referência de design e o plano de desenvolvimento estão em `docs/STITCH-DESENVOLVIMENTO.md`.
