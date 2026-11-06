# 001 — Fundação do projeto

Método: SDD v0.1. Estado: fundação implementada e validada localmente, aguardando revisão humana. Escopo e base técnica autorizados na conversa em 2026-11-05. WebKit local adiado por decisão do responsável; consultar `validation.md`. Critérios detalhados abaixo são a operacionalização proposta; aceitação final não está presumida.

## Objetivo e contexto

Estabelecer uma base local executável e verificável para o site institucional, preservando o briefing e a independência da plataforma de dados. Usar versões estáveis e atuais, conforme solicitação expressa do responsável.

## Escopo

- Documentar visão, escopo, regras operacionais, decisões, plano e tarefas.
- Preparar Next.js App Router, React e TypeScript com dependências compatíveis e lockfile.
- Verificar next-intl com pt-BR/en e next-themes com preferência do sistema e escolha persistente.
- Verificar Tailwind em CSS e Sass em CSS Modules separados, compartilhando tokens CSS.
- Criar uma tela mínima institucional para exercitar a fundação, com textos propostos derivados do briefing.
- Preparar e executar verificações estáticas, testes de comportamento e build.
- Preparar workflows CI/E2E sem publicação ou configuração remota.

## Exclusões

Homepage completa, design system definitivo, animações elaboradas, formulário e envios reais, SEO de produção, ativos oficiais de marca, configuração GitHub remota, hosting e deploy.

## Requisitos e critérios de aceitação

| ID  | Requisito                   | Verificação                                                                                                                                             |
| --- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| F01 | Base estável e reproduzível | Versões exatas registradas; instalação limpa pelo lockfile; ausência de versão prerelease direta.                                                       |
| F02 | Rotas e idioma              | `/pt-BR` e `/en` carregam; `html lang` e mensagens correspondem; rota inválida retorna 404.                                                             |
| F03 | Tema                        | Preferência do sistema no primeiro acesso; escolha persistida; mudança sem perda de idioma; sem erros de hidratação.                                    |
| F04 | Estilos                     | Build compila uma utilidade Tailwind e um módulo SCSS; tokens consumidos por ambos; nenhum Tailwind importado por Sass.                                 |
| F05 | Acesso e adaptação          | Tela mínima utilizável por teclado e zoom; foco visível, contraste e ausência de overflow em tamanhos representativos.                                  |
| F06 | QA                          | Lint, typecheck, formatação, unitários e build passam; testes E2E/a11y executados quando o ambiente permitir, com limites documentados.                 |
| F07 | CI                          | Workflows preparados com permissões mínimas e sem deploy ou envios externos; não alegar execução no GitHub.                                             |
| F08 | Honestidade editorial       | Nenhuma afirmação de disponibilidade de plataforma/produto; textos e aparência da tela inicial identificados como pendentes de revisão na documentação. |
| F09 | Isolamento                  | Trabalho contido em `huet-website/`; referências sincronizadas preservadas.                                                                             |

## Dependências e decisões abertas

Base técnica aprovada explicitamente. Versões exatas serão registradas após consulta ao registro e validação local. Conteúdo final, marca, tema claro definitivo, matriz de dispositivos reais, privacidade, domínio, hospedagem, destinatário e configuração de contato seguem pendentes.

Revisão humana e Safari iOS real não podem ser substituídos por resultados automatizados. Nenhum resultado desta fundação prova conformidade WCAG do site final.
