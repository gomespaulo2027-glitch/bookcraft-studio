# Desenvolvimento do BookCraft Studio

Fonte: export do Google AI Studio enviado em 28/09/2026.

O pacote Stitch contém cinco ecrãs de referência:
- Home Dashboard
- Guided Ebook Creator / Create Wizard
- AI Book Builder Workspace
- Ebook Editor
- Ebook Studio Brand Mark

## Direção visual
- Deep Indigo Ink: #312E81
- Electric Iris: #6366F1
- Manuscript Sage: #059669
- Headings: Newsreader / Georgia fallback
- Interface: Plus Jakarta Sans / system fallback
- Mobile-first, editorial, clean, com superfícies brancas e bordas hairline.

## Estado desta implementação
Esta primeira versão transforma a referência visual em uma aplicação web funcional:
- navegação entre Início, Meus Ebooks, Book Builder, Editor e Templates;
- criação de capítulos;
- edição de título, subtítulo, autor, público, tom e tema;
- editor de manuscrito;
- contagem de palavras;
- autosave local via localStorage;
- impressão/exportação pelo navegador;
- templates iniciais.

## Próximas integrações
1. Persistência em Supabase.
2. Autenticação.
3. IA para outline, geração, expansão, resumo, reescrita e revisão.
4. Importação de DOCX/PDF/TXT.
5. Exportação real para PDF/EPUB/DOCX.
6. Capas e metadados.
7. Histórico/versionamento.
8. PWA/offline.
