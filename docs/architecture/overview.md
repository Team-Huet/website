# Arquitetura da fundação

## Base aprovada

Next.js App Router, React, TypeScript, next-intl, next-themes, Tailwind CSS, Sass, componentes próprios, ESLint/Prettier, Vitest/RTL, Playwright e axe-core. Aprovação expressa em 2026-11-05, com prioridade para versões estáveis e atualizadas.

As versões exatas estão em `package.json` e `package-lock.json`. Compatibilidade entre ferramentas é requisito: um lançamento estável mais novo que o intervalo aceito por outra dependência não deve ser instalado à força.

## Requisição e idioma

`src/proxy.ts` encaminha a raiz para pt-BR e mantém prefixos explícitos. `src/i18n/request.ts` resolve o idioma com `next/root-params`, disponível na versão adotada, e carrega o catálogo correspondente. O layout raiz fica em `app/[locale]/layout.tsx`, onde `html lang` recebe o idioma correto.

Essa organização adapta a árvore de referência à versão atual do App Router/next-intl: não há um segundo layout raiz definindo idioma global. Os dois idiomas são pré-renderizados quando suportado pelo build. Caminhos inexistentes usam a página 404 localizada.

## Renderização e tema

Conteúdo e metadados no servidor. O provider de temas e seu botão são componentes cliente. A marcação do botão é estável entre servidor e cliente; a aparência dos ícones depende do atributo CSS aplicado pelo tema. O script de next-themes aplica o tema inicial, e a escolha fica em armazenamento local.

## Pipeline de estilos

`globals.css` é a entrada Tailwind via PostCSS. Arquivos `.module.scss` são compilados pelo suporte Sass do Next.js e não importam Tailwind. Tokens de cor, espaçamento e tipografia residem em custom properties CSS. A tela usa composição fluida sem duplicar uma escala de breakpoints em Sass.

## Limites

Não há backend de contato, API de dados, autenticação, analytics ou dependência da plataforma. Metadados estão localizados, mas URL canônica, Open Graph, sitemap e estratégia de indexação de produção aguardam domínio e conteúdo aprovados.

## Qualidade

Testes de componentes/catálogos, testes de navegação e acessibilidade, lint, verificação de tipos, formatação e build. O arquivo de validação da spec registra os resultados reais. Workflows locais preparados não significam que GitHub Actions tenha sido ativado ou executado remotamente.
