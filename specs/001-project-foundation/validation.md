# Validação — 001

## Revisão da composição visual em 2026-11-06

A proposta local dá destaque ao título em Onest, usa o azul institucional na segunda linha e separa a apresentação da iniciativa com uma linha fina. A composição aguarda revisão do responsável.

O build de produção gerou as páginas em português e inglês. Os 24 testes passaram em Chromium, Firefox e Chromium móvel emulado, incluindo os exames automatizados de acessibilidade dos dois temas e idiomas. A prévia em português retornou HTTP 200. As capturas atualizadas em `artifacts/` mostram a nova composição. A inspeção visual do desktop escuro em português e do celular claro em inglês confirmou que os títulos e parágrafos cabem nas respectivas colunas. WebKit segue adiado.

## Movimento na página inicial em 2026-11-06

A revisão acrescentou entrada escalonada ao título, resposta da seta ao foco e ao ponteiro e entrada da seção da iniciativa vinculada à rolagem nos navegadores compatíveis. Os efeitos usam CSS e respeitam a preferência de movimento reduzido. O build e os 6 testes unitários passaram. Os 27 testes de navegador passaram em Chromium, Firefox e Chromium móvel emulado, incluindo a verificação de movimento normal e reduzido. WebKit continua pendente.

A pedido do responsável, a abertura recebeu trajetórias abstratas com pontos em movimento contínuo. A animação inicia automaticamente na preferência padrão. Com movimento reduzido, o visitante pode iniciá-la pelo botão. A nova rodada passou no build, nos 6 testes unitários e nos 30 testes de navegador, incluindo deslocamento dos pontos, pausa e retomada.

## Correção do build com exportação estática — 2026-11-11

O build foi reproduzido com a falha `Missing: "rest"` na rota `/[locale]/[...rest]`. A correção substitui essa rota genérica por `/[locale]/404`, reutilizando o componente de erro localizado. Justificativa e limites em [ADR 0002](../../docs/architecture/decisions/0002-static-export-not-found.md).

- `NEXT_TELEMETRY_DISABLED=1 npm run check`: passou na solução final — lint, tipos, formatação, 6 testes em 2 arquivos e build com Turbopack. Arquivos estáticos gerados em `out/`.
- Inspeção automatizada dos HTMLs exportados com Node/JSDOM: páginas inicial, Sobre e 404 nos dois idiomas têm `html lang` correto e H1. Nas páginas 404, título e link de retorno correspondem ao catálogo do idioma e o link respeita `/website`. A página global `out/404.html` também foi gerada com H1 `404`.
- A primeira verificação de tipos após a remoção da rota encontrou referências antigas em `.next/dev/types`. Apenas esse cache gerado foi removido; a execução completa seguinte passou sem alterar as regras de TypeScript.
- O build precisou de comunicação local entre processos fora do sandbox restrito. A trava temporária deixada pela execução anterior interrompida foi removida após verificar a ausência de processo Node ativo.
- O build avisa que Proxy/middleware não executa na exportação estática. O redirecionamento da raiz e a entrega de 404s arbitrárias dependem da preparação da hospedagem.
- E2E e revisão visual não executados nesta correção de parâmetros. A configuração E2E atual usa `next start`, incompatível com `output: 'export'`; sua adaptação para servir `out/` permanece pendente. Nenhuma publicação foi realizada.

## Revisão posterior do fundo da abertura

Em 2026-11-06 as trajetórias passaram a ocupar o fundo da abertura. A nova rodada passou no build, nos 6 testes unitários e nos 30 testes de navegador. A inspeção das capturas atualizadas em `artifacts/` incluiu desktop claro e escuro e celular emulado. A avaliação estética do responsável e o teste em WebKit seguem pendentes.

## Rede de partículas, Aurora Text e alternância de tema

A revisão local de 2026-11-06 passou no build, nos 6 testes unitários e nos 30 testes de navegador. A inspeção das capturas abrangeu desktop nos dois temas e celular emulado. No Chromium, uma verificação adicional confirmou os estados de hover do Sol e da Lua, 24 cores intermediárias ou finais distintas durante a troca de fundo, o nome acessível do título e a pausa das animações independentes do Aurora Text e do cursor.

## Registro inicial

Data: 2026-11-05, America/Sao_Paulo. Ambiente: Ubuntu 26.04.1, Node 24.22.2, npm 11.19.1. Entrega local, sem publicação.

## Resultado

Fundação implementada, com instalação reproduzível e verificações locais aprovadas na cobertura abaixo. Aceitação humana ainda pendente. Não é uma declaração de conformidade WCAG do site final.

| Verificação                 | Comando ou método                                                                    | Resultado                                                                         |
| --------------------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| Instalação limpa            | `npm ci --no-fund`                                                                   | Passou; sem conflitos de dependências pares.                                      |
| Integridade                 | `npm ls --depth=0` e comparação de versões diretas com lockfile                      | Passou; versões exatas, sem prereleases diretos.                                  |
| Lint                        | `npm run lint`                                                                       | Passou, sem avisos.                                                               |
| Tipos                       | `npm run typecheck`                                                                  | Passou.                                                                           |
| Formatação                  | `npm run format:check`                                                               | Passou.                                                                           |
| Unitários/componentes       | `npm test`                                                                           | 6 testes passaram em 2 arquivos.                                                  |
| Build                       | `NEXT_TELEMETRY_DISABLED=1 npm run build`                                            | Passou com Turbopack; `/pt-BR` e `/en` pré-renderizados.                          |
| Navegadores                 | `npm run test:e2e -- --project=chromium --project=firefox --project=mobile-chromium` | 24 testes passaram.                                                               |
| Acessibilidade automatizada | axe-core nos dois idiomas e temas, nos três projetos executados                      | Nenhuma violação nos critérios automatizáveis configurados.                       |
| Revisão de capturas         | Capturas desktop escuro e mobile claro inspecionadas                                 | Sem recorte ou sobreposição observados; aprovação visual do responsável pendente. |
| Smoke HTTP                  | GET `/pt-BR` na prévia local                                                         | HTTP 200.                                                                         |
| Dependências de produção    | `npm audit --omit=dev --json`                                                        | Zero vulnerabilidades conhecidas informadas pelo registro na consulta.            |

Os 24 testes de navegador incluem conteúdo/idioma/tema, estilos computados de Tailwind e SCSS, movimento reduzido, ausência de overflow, axe-core, persistência do tema entre idiomas e reload, redirecionamento da raiz, 404 localizada, skip link por teclado, âncora e reflow em 320 pixels CSS. Capturas e relatório HTML foram produzidos em `test-results/` e `playwright-report/`, ignorados pelo Git.

No ambiente desta tarefa, os navegadores foram baixados em `/tmp/huet-playwright`; foi usado `PLAYWRIGHT_BROWSERS_PATH=/tmp/huet-playwright` para executar o E2E. A instalação normal usa o cache padrão do Playwright. O build precisou de permissão de comunicação local entre processos no ambiente restrito; não houve mudança para Webpack nem alteração de versão do Next.js.

## Correção encontrada pelos testes

A primeira rodada do axe-core identificou que o nome acessível do seletor de idioma não continha as siglas visíveis EN/PT. Os rótulos passaram a incluir a sigla e a descrição no idioma de destino. A suíte completa executada passou após essa correção. Nenhuma regra foi desativada para resolver o problema.

## Alerta de dependência de desenvolvimento

`npm audit` completo informa **10 alertas moderados relacionados à mesma vulnerabilidade transitiva do minimatch**, propagada por ferramentas de lint/TypeScript. Não foram informados alertas altos ou críticos. O conjunto de produção auditado separadamente retornou zero.

Referência: [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249). O advisory descreve amplificação de padrões de glob, com consumo excessivo de CPU/memória em condições específicas; a correção indicada começa em 11.0.1. As ferramentas atuais dependem de intervalos anteriores.

Pendência: acompanhar atualizações compatíveis das ferramentas e reavaliar antes de ativar o repositório/CI e antes de publicar. Não foi aplicado `audit fix --force`, downgrade do framework ou override major transitivo sem validação. O resultado da auditoria não equivale a uma revisão completa de segurança.

## Cobertura pendente

- **WebKit local:** não executado. Faltam `libevent-2.1-7t64`, `libavif16` e `libmanette-0.2-0`. Em 2026-11-05 o responsável escolheu explicitamente deixar essa validação pendente. Nenhuma biblioteca do sistema foi instalada por esta tarefa.
- **Safari iOS real, Edge real, Samsung Internet e dispositivos físicos:** não testados.
- **Leitor de tela, zoom nativo e auditoria manual completa de WCAG:** pendentes. Reflow automatizado em 320 pixels não substitui todos esses testes.
- **GitHub Actions:** arquivos preparados, sem execução remota, remoto GitHub, secrets ou branch protection configurados. O workflow E2E inclui instalação de bibliotecas no runner, mas isso não comprova sua execução.
- **Conteúdo e identidade:** textos pt-BR/en, composição inicial e tema claro aguardam aprovação editorial/visual. O wordmark textual não é logo vetorial oficial.
- **Contato, SEO de produção e publicação:** fora desta fundação; não implementados/configurados.

## Retomada do WebKit, quando o responsável decidir

No Ubuntu deste ambiente, instalar manualmente as bibliotecas indicadas pelo Playwright:

```bash
sudo apt-get install libevent-2.1-7t64 libavif16 libmanette-0.2-0
```

Após a confirmação do responsável, executar o projeto `webkit` da suíte. Não pedir senha no chat e não considerar a instalação realizada sem confirmação/evidência.
