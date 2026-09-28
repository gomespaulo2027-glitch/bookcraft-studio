# BookCraft Studio — integração de IA

## Arquitetura atual

A aplicação chama o Gemini através da Edge Function do Supabase:

```
UI React
  -> src/lib/gemini.js
  -> supabase.functions.invoke("bookcraft-ai")
  -> Supabase Edge Function
  -> GEMINI_API_KEY (segredo server-side)
  -> Gemini API
```

A chave Gemini privada **não deve ser colocada no Vite, no browser ou no GitHub**.

## Frontend

`src/lib/gemini.js` é o único adaptador principal da aplicação para a IA.

O frontend precisa apenas da configuração pública do Supabase:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

O modelo padrão atualmente usado pelo adaptador é `gemini-3.1-flash-lite`.

## Edge Function

A função é:

`bookcraft-ai`

Ela:

1. recebe a requisição autenticada;
2. valida a sessão Supabase;
3. lê `GEMINI_API_KEY` do ambiente da Edge Function;
4. chama a API Gemini;
5. devolve somente o texto necessário ao frontend.

## Diagnóstico

O estado mostrado na interface distingue:

- configuração pública do cliente Supabase;
- configuração privada do Gemini no backend.

Portanto, uma mensagem sobre configuração do Supabase no browser não deve ser interpretada como prova de que a `GEMINI_API_KEY` está ausente no backend.

## Segurança

Nunca:

- adicionar `GEMINI_API_KEY` ao `.env.example`;
- colocar a chave em código React;
- imprimir a chave em logs;
- enviar a chave em mensagens, issues ou commits;
- pedir ao utilizador para colar a chave no chat.

## Validação

Para alterações na IA:

```bash
npm run build
```

Depois validar o fluxo autenticado no ambiente de deploy.

## Contexto para manutenção

O problema de ambiente/execução da IA pode ser investigado separadamente no Lovable. Não é necessário substituir a arquitetura do repositório para isso.
