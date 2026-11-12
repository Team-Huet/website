# HUET — site institucional

SDD v0.1. Desenvolvimento local iniciado em 5 de novembro de 2026.

Esta versão local reúne a página inicial e a página Sobre a HUET em português e inglês, com menu no cabeçalho. Os textos e a composição seguem para revisão humana.

## Contexto

HUET é uma iniciativa em planejamento voltada à infraestrutura de dados linguísticos de LIBRAS. Este projeto contém apenas o front-end institucional e é independente da plataforma de dados.

Referência principal: `HUET_Codex_Briefing_Completo_SDD_v0.1.md`, fornecido pelo responsável. O original foi lido em `/home/fedked/Downloads/` e não foi alterado nem copiado para distribuição pública.

## Executar localmente

Requisitos: Node.js 24.22.2 (registrado em `.nvmrc`) e npm 11.19.1. Não é necessário configurar credenciais nesta etapa.

```bash
npm ci
npm run dev
```

Abrir `http://127.0.0.1:3000/pt-BR` ou `http://127.0.0.1:3000/en`.

O idioma padrão é pt-BR. A escolha de idioma fica na URL. O tema inicialmente acompanha o sistema; uma escolha explícita é persistida localmente como `huet-theme`.

## Verificações

```bash
npm run check
npx playwright install chromium firefox webkit
npm run test:e2e
```

`check` executa lint, typecheck, formatação, unitários e build. O E2E usa os arquivos exportados em `out/` e inicia seu próprio servidor estático na porta 3100, sob `/website/`. Essa porta deve estar livre. Não utiliza `next start`, incompatível com `output: 'export'`.

Para conferir o mesmo artefato manualmente:

```bash
npm run build
npm start
```

Abrir `http://127.0.0.1:3000/website/pt-BR/`. Para outra porta, usar `npm start -- --port 3100`. O servidor de prévia escuta somente em `127.0.0.1`, serve `out/` e aplica o prefixo centralizado em `src/config/paths.ts`. Em desenvolvimento (`npm run dev`), os endereços continuam sem `/website`.

O `postbuild` gera `out/index.html` com redirecionamento HTML de `/website/` para português, inclusive sem JavaScript. A prévia serve esse mesmo arquivo. Para caminhos inexistentes, a prévia seleciona a página 404 do idioma; essa seleção é uma regra local e não é exportada como middleware. GitHub Pages utiliza a página global `out/404.html`.

Os testes cobrem a tela mínima nos dois idiomas e temas, navegação por teclado, persistência de tema, rotas, overflow, reflow e critérios de acessibilidade automatizáveis. Chromium, Firefox e WebKit são a matriz automatizada; o perfil mobile em Chromium é emulação, não aparelho real.

Resultados efetivamente executados e limitações estão em [validation.md](specs/001-project-foundation/validation.md). A aprovação visual/editorial e a avaliação manual de acessibilidade são separadas dos testes.

## Organização

- `AGENTS.md`: regras operacionais.
- `docs/project/`: visão, escopo e roadmap.
- `docs/architecture/`: arquitetura e decisões técnicas.
- `specs/001-project-foundation/`: requisitos, plano, tarefas e evidências da primeira etapa.
- `messages/`: catálogos pt-BR/en.
- `src/app/[locale]/`: layout raiz localizado e página institucional.
- `src/i18n/`: rotas, navegação e carregamento das mensagens.
- `src/components/`: componentes React próprios.
- `src/styles/globals.css`: Tailwind e tokens compartilhados.
- `tests/`: testes de componentes, catálogos e navegação.

## Design System e tipografia

Tailwind é processado a partir de CSS; Sass é usado apenas em módulos de componentes, sem diretivas Tailwind. Ambos consomem custom properties CSS centralizadas. A coexistência é validada pelo build e pelos testes de renderização desta configuração; não pressupõe suporte geral do Tailwind a preprocessadores.

- **Onest** é a fonte principal dos títulos, do texto e da interface. O token de títulos `--font-display` acompanha `--font-sans`, inclusive no hero.
- **Marca HUET** usa `--font-wordmark` para preservar a composição textual do cabeçalho e do rodapé independentemente da tipografia editorial. A arte definitiva segue pendente.

As duas fontes são distribuídas localmente. As licenças SIL OFL estão em `public/fonts/Michroma-LICENSE.txt` e `public/fonts/Onest-LICENSE.txt`.

## Contato

A seção exibe o endereço de demonstração `joao@huet.io` como texto. O endereço definitivo depende de confirmação antes da publicação.

## GitHub e publicação

O remoto é o repositório público [Team-Huet/website](https://github.com/Team-Huet/website). A captura fornecida pelo responsável em 2026-11-11 mostra GitHub Actions como fonte de Pages. O workflow de publicação preparado localmente em `.github/workflows/deploy.yml` executa verificações, gera `out/`, roda E2E e publica o artefato com as ações oficiais do GitHub. CI e E2E independentes permanecem ativos.

Após enviar o workflow para `main`, cada push nessa branch aciona uma publicação, condicionada ao sucesso das verificações. Também é possível executar **Actions → Publicar no GitHub Pages → Run workflow**, selecionando `main`. Em **Settings → Pages**, manter **Source: GitHub Actions**; não é necessário criar outro workflow pelo botão Configure.

O endereço esperado para este repositório é `https://team-huet.github.io/website/`. A confirmação deve usar a URL retornada pelo job `deploy` e uma abertura do site após o sucesso. Reexecutar o workflow antigo sem enviar as alterações não aplica a correção. Se o ambiente `github-pages` exigir aprovação, o GitHub exibirá uma etapa de revisão do deployment.

O workflow não requer token pessoal nem secret adicional; usa `GITHUB_TOKEN` e OIDC com permissões limitadas. Não presumir que branch protection ou proteções de ambiente estejam configuradas. Publicação não implica aprovação editorial/visual, conformidade WCAG ou validação de dispositivos reais. A tela continua com `noindex` e contato provisório, sem formulário ou envios externos.

Preparação e evidências: [spec 008](specs/008-github-pages/spec.md). O estado de uma execução remota só deve ser considerado confirmado após sua verificação.
