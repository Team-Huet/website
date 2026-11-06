# Plano técnico — 001

Estado: abordagem técnica para a fundação autorizada; aceitação humana pendente.

## Estrutura

- Projeto independente na subpasta `huet-website/`, sem Git remoto ou publicação automática.
- App Router com `[locale]` como layout raiz, contendo `html lang` e `body`. Essa estrutura evita um layout superior fixando o idioma errado. Ajuste técnico em relação à árvore de referência, seguindo a estrutura recomendada pelo next-intl.
- `src/proxy.ts` para o roteamento de idiomas quando requerido pela versão estável do Next.js.
- Mensagens em `messages/pt-BR.json` e `messages/en.json`; pt-BR como padrão, seleção explícita por URL.
- Provider cliente para next-themes; conteúdo institucional renderizado no servidor.
- Tokens CSS centralizados; Tailwind no arquivo `.css`; componentes específicos com `.module.scss` sem `@apply`, `@theme` ou importações Tailwind.
- Fonte Onest distribuída localmente por pacote com licença incluída, caso a distribuição seja confirmada.

## Responsabilidades

Tailwind: utilitários de composição. SCSS Modules: aparência própria dos componentes. CSS custom properties: valores semânticos de cor, espaço e tipografia compartilhados. Não duplicar breakpoints em ambos os sistemas; a tela mínima deve privilegiar layout fluido.

## Testes

Vitest/RTL para comportamento relevante de componentes e integridade dos catálogos; Playwright para rotas, idioma, tema, persistência, teclado, overflow e ausência de erro de hidratação; axe-core para critérios automatizáveis nos dois temas e idiomas. Build e smoke HTTP verificam integração real do pipeline de estilos.

## Riscos

- Tailwind v4 declara que não foi projetado para preprocessadores Sass. Manter entradas separadas e comprovar compilação/renderização; não declarar compatibilidade universal.
- Recursos novos de versões estáveis podem mudar configuração. Consultar documentação e não aplicar receitas antigas automaticamente.
- Tema inicial precisa evitar diferenças de hidratação; controles dependentes do cliente devem ter estado inicial estável.
- Testes automatizados não provam aprovação visual, cobertura de Safari real ou conformidade WCAG completa.
- Sem domínio/editorial finais, não publicar metadados de produção nem sitemap com URL inventada.

## Referências verificadas em 2026-11-05

- https://nextjs.org/docs/app/getting-started/installation
- https://nextjs.org/docs/app/guides/sass
- https://next-intl.dev/docs/routing/setup
- https://tailwindcss.com/docs/compatibility
- https://github.com/pacocoursey/next-themes
