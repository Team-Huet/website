# ADR 0002 — Rota 404 na exportação estática

Data: 2026-11-11. Correção local do erro de build informado pelo responsável, mantendo `output: 'export'` e o `basePath` já configurados. Não autoriza publicação.

## Contexto e decisão

O layout `[locale]` gera os idiomas, mas a rota `[locale]/[...rest]`, usada exclusivamente para chamar `notFound()`, não fornecia o parâmetro `rest`. O Next.js 16.4.5 exige todos os parâmetros dinâmicos na exportação estática e rejeita também uma lista vazia.

Substituir a rota genérica `[...rest]` por uma rota explícita `404`, reutilizando o componente `not-found.tsx` existente. O layout fornece todos os parâmetros necessários (`locale`), permitindo exportar documentos completos em `/pt-BR/404` e `/en/404`, sem inventar caminhos para uma rota genérica que nunca renderiza conteúdo.

## Limites

O tratamento de URLs arbitrárias em hospedagem estática depende do servidor que entrega os arquivos e de seu suporte a `404.html`. Esta correção não implementa uma 404 localizada para cada endereço desconhecido no host.

As páginas explícitas `/pt-BR/404` e `/en/404` são documentos estáticos localizados, não regras de resposta HTTP. O host deve entregar a página adequada com status 404 ao receber um endereço inexistente. Sem essa configuração, a 404 global padrão continua sendo o fallback; a antiga captura localizada de URLs arbitrárias via `[...rest]` deixa de existir. O arquivo `[locale]/not-found.tsx` é preservado para erros emitidos dentro de rotas localizadas.

O Proxy de idiomas não executa no artefato estático. O comando `next start` usado inicialmente pelo E2E não serve uma exportação estática. A prévia local e os testes foram adaptados posteriormente conforme [ADR 0003](0003-static-preview-e2e.md); configurar redirecionamento da raiz e páginas de erro na hospedagem real continua pendente.

## Referências

- Documentação da versão instalada: `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-static-params.md` e `node_modules/next/dist/docs/01-app/02-guides/static-exports.md`.
- [Requisitos de generateStaticParams](https://nextjs.org/docs/messages/generate-static-params).
- Evidências locais em [validation.md](../../../specs/001-project-foundation/validation.md).
