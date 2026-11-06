# ADR 0001 — Base técnica e compatibilidade

Data: 2026-11-05. Base aprovada pelo responsável; detalhes técnicos implementados para validação, sem aprovação visual ou editorial implícita.

## Decisão

Adotar Next.js 16.4.5, React 19.3.1, next-intl 4.14.9, next-themes 0.4.6, Tailwind 4.3.4 e Sass 1.107.1. Usar Node 24.22.2 e npm 11.19.1, disponíveis no ambiente. Fixar versões diretas e manter lockfile.

TypeScript 6.0.3 é a versão estável mais recente na linha aceita por `typescript-eslint` 8.72.1, cujo intervalo é `>=4.8.4 <6.1.0`. O TypeScript 7.0.2 era o lançamento estável mais novo na consulta, mas não pertence a esse intervalo. Não ignorar conflitos de dependência para adotá-lo.

Usar ESLint 10.14.0 com `@eslint/js`, `typescript-eslint`, o plugin oficial `@next/eslint-plugin-next` e `eslint-plugin-react-hooks`, em configuração explícita. O preset completo `eslint-config-next` traz plugins com requisitos limitados a ESLint 9, já sem suporte. A configuração explícita preserva regras recomendadas de JavaScript, TypeScript, Next/Core Web Vitals e React Hooks sem forçar esses plugins incompatíveis. Acessibilidade automatizada será verificada com axe-core; o plugin JSX a11y não foi adicionado por incompatibilidade de peer dependency com ESLint 10.

A seleção foi baseada em consultas de versão, engines e peerDependencies no registro npm e inspeção dos pacotes. Estabilidade e atualização significam um conjunto suportado e testado, não a combinação indiscriminada das maiores versões.

## Estilos

Manter Tailwind em CSS e Sass em módulos isolados, sem diretivas Tailwind dentro de SCSS. Tokens CSS como fonte única. Tailwind v4 não foi projetado para preprocessadores; validar explicitamente esta coexistência no build e no navegador antes de aceitar a fundação.

## Idioma, tema e fonte

- URLs `/pt-BR` e `/en`; pt-BR como padrão, sem detecção automática ou cookie de idioma nesta etapa.
- Tema inicial do sistema, escolha explícita persistida em `huet-theme`.
- Onest autohospedada por pacote, licença OFL preservada. Sem solicitação a fonte remota.

## Consequências e acompanhamento

Revisar compatibilidade a cada atualização de dependência. Não usar `--force`, `--legacy-peer-deps` ou desabilitar verificações. Registrar alertas de auditoria e escopo de exposição; não aplicar override de versão major transitiva apenas para zerar o contador.

Referências: [Next.js](https://nextjs.org/docs/app/getting-started/installation), [Sass no Next.js](https://nextjs.org/docs/app/guides/sass), [next-intl](https://next-intl.dev/docs/routing/setup), [Tailwind](https://tailwindcss.com/docs/compatibility).
