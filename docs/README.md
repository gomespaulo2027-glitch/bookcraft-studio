# BookCraft Studio — documentação

Este diretório concentra a documentação técnica do projeto.

## Documentos

| Documento | Finalidade |
|---|---|
| [PROJECT-STATUS.md](./PROJECT-STATUS.md) | Estado atual, componentes implementados e pendências |
| [AI-INTEGRATION.md](./AI-INTEGRATION.md) | Arquitetura da IA e fluxo Gemini |
| [SUPABASE-ARCHITECTURE.md](./SUPABASE-ARCHITECTURE.md) | Auth, Database, RLS, Storage e Edge Functions |
| [STITCH-DESENVOLVIMENTO.md](./STITCH-DESENVOLVIMENTO.md) | Referência visual e origem do design |

## Regra importante

Segredos e chaves privadas nunca devem ser commitados neste repositório.

- Frontend: apenas variáveis públicas VITE_* necessárias ao cliente.
- Backend/Edge Function: segredos como GEMINI_API_KEY.
- O código do frontend não deve conter a chave Gemini privada.

## Para o Lovable

O ponto de entrada é o README.md. Antes de alterar código, consulte também PROJECT-STATUS.md, AI-INTEGRATION.md e SUPABASE-ARCHITECTURE.md.

Preserve a arquitetura existente e faça alterações incrementais. Evite recriar funcionalidades que já estão implementadas.
