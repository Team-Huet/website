# ADR 0004 — Artefato e workflow do GitHub Pages

Data: 2026-11-11. Preparação local em resposta à tentativa de publicação gratuita informada pelo responsável. Especificação: [008](../../../specs/008-github-pages/spec.md). Publicação e aprovação editorial não são presumidas.

## Contexto e decisão

O repositório público `Team-Huet/website` possui Pages habilitado segundo a API pública e usa GitHub Actions como fonte segundo a captura do responsável. O endereço `https://team-huet.github.io/website/` retornou HTTP 404 nesta verificação. O workflow anterior apenas executava checkout e setup-node, sem gerar ou publicar arquivos.

Usar as ações oficiais `configure-pages`, `upload-pages-artifact` e `deploy-pages`. Versões estáveis e SHAs consultados na API pública de releases e tags; entradas conferidas no `action.yml` de cada SHA. Build com leitura de conteúdo e Pages; escrita de Pages e token OIDC limitados ao job de publicação. Nenhum PAT ou secret adicional introduzido. O upload depende de `npm run check` e de E2E completos no runner.

A exportação precisa incluir `index.html` na raiz. Gerá-lo em `postbuild`, usando o prefixo centralizado e textos do catálogo pt-BR. Redirecionamento por HTML funciona sem JavaScript e há um link de fallback. O documento mantém `noindex`. A prévia passa a servir esse arquivo real, em vez de simular um redirect ausente no artefato.

O caminho informado por `configure-pages` é comparado ao `productionBasePath` no pós-build. Uma futura alteração de domínio ou nome de repositório deve atualizar essa decisão; um caminho divergente interrompe o build em vez de publicar recursos quebrados.

## Limites operacionais

O envio deste workflow para `main` passa a acionar publicação automática depois das verificações; isso deve estar explícito ao responsável antes do envio. A publicação manual também é possível pelo botão Run workflow, mas o job deploy só executa em `main`.

GitHub Pages entrega a 404 global, não as regras de seleção de idioma do servidor de prévia. Os E2E locais não comprovam a configuração remota nem substituem a inspeção após o deployment. O script Node da prévia não será enviado ao Pages: somente `out/` é publicado.

Referências: [workflows de Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [404 no Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site) e documentação local de exportação estática do Next.js 16.4.5.
