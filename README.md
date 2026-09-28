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

## Desenvolvimento local
```bash
npm install
npm run dev
```

Build de produção:
```bash
npm run build
```

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
