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

`check` executa lint, typecheck, formatação, unitários e build. O E2E usa o build previamente gerado e inicia seu próprio servidor na porta 3100. Essa porta deve estar livre.

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

Os arquivos `.github/workflows/ci.yml` e `e2e.yml` foram preparados para quando **este diretório for a raiz do repositório institucional**. Não presumem o diretório pai do espelho ChatGPT como raiz de um repositório GitHub.

Não há remoto GitHub, branch protection, secrets, hosting ou deploy configurados. Os workflows não publicam o site e não enviam mensagens pelo Web3Forms. A tela inclui `noindex` enquanto conteúdo e publicação não forem aprovados.

Antes da publicação, ainda é necessário aprovar conteúdo e layout com UX, configurar o contato e revisar a privacidade, definir domínio/hosting e validar acessibilidade e dispositivos reais.
