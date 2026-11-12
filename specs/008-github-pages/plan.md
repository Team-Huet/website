# Plano — 008

- Completar `.github/workflows/deploy.yml` com jobs de build e deploy, gatilhos de push em `main` e acionamento manual. O job de publicação usa o ambiente `github-pages`, depende do build e recebe somente `pages: write` e `id-token: write`.
- Executar `npm run check` e a matriz E2E antes do upload. Evitar alteração automática do `next.config.ts` pelo `configure-pages`; a configuração estática já existe.
- Gerar `out/index.html` por `postbuild` com redirecionamento HTML imediato e link de fallback. Reutilizar os textos existentes do catálogo português e manter `noindex`. Verificar o caminho informado pelo Pages quando disponível.
- Servir esse documento na prévia, eliminando o redirecionamento HTTP que escondia sua ausência. Validar a entrada por HTTP e em navegador com JavaScript desativado.
- Conferir SHAs e entradas das ações oficiais, formatação, lint, tipos, unitários, build e E2E local. Manter WebKit local adiado, sem removê-lo do workflow remoto.
- Após autorização do envio que ativa a publicação: commit/push, acompanhar o workflow e conferir a URL retornada pelo deployment. Se houver bloqueio nas configurações do GitHub, fornecer passos específicos ao responsável.
