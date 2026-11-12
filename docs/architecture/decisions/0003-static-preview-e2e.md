# ADR 0003 — Prévia e E2E da exportação estática

Data: 2026-11-11. Correção local da falha de inicialização do Playwright reportada pelo responsável no GitHub Actions. Não configura publicação.

## Decisão

Substituir `next start` no script `start` por uma prévia HTTP dos arquivos em `out/`, usando módulos nativos do Node.js já exigido pelo projeto. Não adicionar dependência de servidor nem baixar `serve@latest` durante o CI. O Playwright inicia a prévia na porta 3100 e aguarda uma página exportada real antes dos testes.

Centralizar `/website` em `src/config/paths.ts`, consumido pela configuração Next.js, pela prévia e pelos testes. O Next.js expõe o prefixo efetivo em `NEXT_PUBLIC_BASE_PATH` durante a compilação. Links HTML nativos, bandeiras e a imagem da Hero usam esse prefixo; `next/link` mantém seu próprio tratamento de `basePath`. A troca de idioma continua sendo navegação nativa, com carregamento do documento e inicialização do tema.

A URL base do Playwright termina em `/website/`; os testes navegam por caminhos relativos para preservar esse prefixo e verificam as URLs com barra final, conforme `trailingSlash: true`. As verificações existentes de idioma, tema, acessibilidade, animação e menu são preservadas.

## Regras e limites da prévia

- Escutar somente em `127.0.0.1`, servir apenas arquivos dentro de `out/`, restringir métodos a GET/HEAD e não listar diretórios.
- Entregar recursos com seu tipo de conteúdo; arquivos ausentes retornam 404, sem fallback de SPA que possa esconder links quebrados.
- Redirecionar diretórios para URLs com barra final. Na implementação inicial, a raiz era redirecionada no servidor; a [ADR 0004](0004-github-pages.md) substitui isso por `out/index.html` com redirecionamento HTML, compartilhado pela prévia e pelo Pages.
- Entregar os documentos localizados de erro com status 404 para URLs inexistentes sob um idioma conhecido; usar `404.html` nos demais casos.
- Acesso direto à página explícita `/website/en/404/` ou `/website/pt-BR/404/` continua retornando 200, pois é um documento existente. O status 404 é aplicado apenas quando o caminho solicitado não existe.

Essas regras modelam o comportamento esperado da hospedagem para a prévia local e o CI. Não provam que GitHub Pages ou outro provedor esteja configurado assim. Proxy/middleware segue ausente do artefato estático. A adaptação de redirects e respostas 404 no host real permanece uma etapa separada.

## Validação

Testes de navegador sobre os arquivos exportados e testes HTTP para MIME, HEAD, redirecionamento, erros localizados, caminhos fora do prefixo, métodos e bloqueio de acesso a arquivos do projeto. Resultados e limites registrados em [validation.md](../../../specs/001-project-foundation/validation.md).

Referências: [Playwright webServer](https://playwright.dev/docs/test-webserver), [Next.js Static Exports](https://nextjs.org/docs/app/guides/static-exports) e documentação equivalente da versão instalada.
