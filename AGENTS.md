# HUET — instruções operacionais

## Contexto e autoridade

- Este diretório contém exclusivamente o site institucional HUET, independente da plataforma de dados.
- Fonte de contexto: `HUET_Codex_Briefing_Completo_SDD_v0.1.md`, lido integralmente. Não presumir acesso a conversas anteriores.
- A iniciativa ainda está em planejamento e não está formalmente constituída. Não afirmar disponibilidade de datasets, APIs, produtos, investidores ou parcerias sem evidência e aprovação editorial.
- A autorização inicial de desenvolvimento e da base técnica foi dada pelo responsável em 2026-11-05. Não pedir novamente autorização para trabalho local abrangido por ela. Decisões ainda pendentes, publicação e integrações externas continuam sujeitas aos respectivos limites.
- Não modificar arquivos sincronizados do diretório pai nem qualquer conteúdo em `sources/`.
- Instruções atuais do responsável prevalecem sobre referências documentais. Registrar mudanças de decisão; nunca inventar aprovação.

## Disciplina SDD v0.1

- Trabalhar nas specs e tarefas autorizadas. Ler `spec.md`, `plan.md` e `tasks.md` antes de implementar a etapa correspondente.
- Esta fundação não aprova o conteúdo editorial, a composição visual definitiva ou a publicação.
- Distinguir decisões aprovadas, recomendações, pendências e escopo futuro.
- Usar critérios verificáveis e manter estados de execução honestos. Não chamar SDD v0.1 de v0.2.
- Não criar arquivos vazios em massa nem adicionar dependências sem necessidade. A autorização inicial já permite preparar a base técnica aprovada.
- Registrar justificativas técnicas em `docs/architecture/decisions/` e evidências em documentos da spec.

## Arquitetura e dependências

- Base aprovada: Next.js App Router, React, TypeScript, next-intl, next-themes, ESLint, Prettier, Vitest, React Testing Library, Playwright e axe-core.
- Preferir versões estáveis e atuais, verificar requisitos e dependências pares e fixar as versões resolvidas no lockfile. Não usar beta, RC ou canary por conveniência.
- Componentes React próprios. Não usar shadcn/ui ou biblioteca completa que imponha aparência de template.
- Tailwind CSS + Sass/SCSS, com CSS Modules quando apropriado. Validar processamento separado; não colocar diretivas Tailwind em Sass.
- Fonte única para tokens. Não duplicar valores de tema, tipografia, espaçamento ou breakpoints entre sistemas.
- Não adicionar Autoprefixer por hábito nem bibliotecas pesadas para efeitos simples.
- Usar React Bits para os efeitos visuais escolhidos, incorporando apenas os componentes necessários e preservando suas licenças. Não usar Magic UI. Motion, Three.js e R3F exigem justificativa e decisão.

**Troca de idioma e persistência do tema**

- Enquanto cada idioma tiver seu próprio documento HTML, usar um link de navegação nativa no seletor de idiomas. Assim, ao clicar na bandeira, o navegador carrega o documento de destino com o script de inicialização do tema.
- Preservar o idioma selecionado na URL e a preferência de tema na chave `huet-theme`.
- Ao alterar o seletor de idiomas ou o provedor de tema, testar o percurso português → inglês → português no servidor de desenvolvimento. Verificar que o console permanece sem erros e que o tema escolhido persiste durante a navegação e após recarregar a página.

## Identidade visual e originalidade

- Usar ênfase semântica permanente em negrito nos termos selecionados de Nossa missão (linguagem, centro, dados linguísticos, inteligência artificial, visão computacional, tecnologias e línguas de sinais) e O desafio (mãos, expressões faciais e movimentos do corpo), além de Nossa proposta (registros de LIBRAS, trecho da interação, observações linguísticas e condições de uso), incluindo os equivalentes em inglês. Nos parágrafos e nas respostas da proposta, usar preto no tema claro e branco gelo no escuro. O negrito herda a cor de leitura. Com ponteiro preciso, somente o termo sob o mouse assume o azul de texto do tema (`--accent-text`), com transição de 200 ms e respeito a movimento reduzido. Os termos do título conservam azul no tema claro e dourado no escuro. Usar o peso nativo da Onest para a ênfase em negrito.

- Direção tecnológica, moderna, sofisticada, levemente minimalista e inspirada em dados espaciais: Spatial Language + Data Constellation.
- Usar Onest no hero, nos títulos H1–H3, nos destaques editoriais, na leitura contínua e na interface. Reservar Michroma à composição do wordmark HUET. Servir ambas localmente com as licenças.
- Tratar o logotipo HUET como marca independente das fontes de títulos e de interface. Preservar o desenho do wordmark textual atual até a aprovação de arte oficial.
- Preservar a paleta Deep Intelligence e o azul institucional `#009EE0`.
- Aplicar o azul-marinho `#08192B` como fundo de todas as páginas no tema escuro. Usar o dourado institucional `#D6B36A` no Gradient Text do React Bits da segunda linha do título e no cursor de terminal. Derivar tons mais profundos para garantir contraste no tema claro.
- Não tratar o tema claro sugerido, o logo vetorial, o favicon ou a tagline provisória como definitivamente aprovados.
- Proibir aparência de template genérico de IA/Codex: cartões repetitivos, glows, gradientes decorativos, sombras excessivas, ícones sem função, layouts copiados e animações sem propósito.
- Consultar o design system e as specs antes de mudar a interface. Cada seção deve ter composição adequada ao conteúdo.
- **Funcionar tecnicamente não equivale a aprovação visual.** Revisão humana é obrigatória nos marcos de aceitação.
- Não copiar elementos distintivos de terceiros. Referências são orientação geral.
- Não inventar sinais de LIBRAS. Representações linguísticas reais precisam de validação; abstrações não são sinais.

## Animação de fundo

- Usar a página inicial para explorar um fundo tecnológico que represente dados em movimento. Pontos podem percorrer trajetórias e conectar nós no espaço. Tratar essa composição como uma abstração visual da iniciativa.
- O movimento deve ser perceptível desde a abertura, inclusive no celular e com o cursor parado. Concentrar as conexões nas áreas livres e reservar espaço visual para a leitura do título e dos parágrafos nos dois temas.
- Manter a camada gráfica fora da navegação por teclado e da árvore de acessibilidade, deixando cliques, toque e rolagem disponíveis para o conteúdo. Oferecer um controle acessível para pausar e retomar o movimento contínuo. Com `prefers-reduced-motion`, começar com a composição estática e permitir ativação manual.
- Ajustar a quantidade de pontos à área da tela. Verificar legibilidade, fluidez da rolagem e funcionamento da pausa na prévia antes de estender o efeito a outras seções.

## Responsividade e navegadores

- Mobile-First; preservar informação essencial em mobile, tablet e desktop.
- Chrome, Firefox, Safari e Edge modernos, com atenção ao Safari iOS. Samsung Internet é teste adicional recomendado.
- Usar CSS padronizado, media queries e `@supports`. Não criar SCSS por navegador sem problema reproduzido.
- Verificar overflow, orientação, tipografia, toque, menus, temas e idiomas em tamanhos relevantes.
- Testes em WebKit não equivalem à validação de Safari em iPhone real. Documentar a cobertura efetiva.

## Acessibilidade

- WCAG 2.2 AA é meta formal. Validar critérios aplicáveis por testes manuais e automatizados antes de alegar conformidade.
- Sem painel/menu especial, zoom personalizado ou botão extra de alto contraste.
- Preservar HTML semântico, headings coerentes, teclado nativo, foco visível, contraste, zoom nativo e nomes acessíveis.
- Informação não pode depender só de cor. Imagens informativas precisam de alternativas textuais; decoração deve ser ignorada por leitores de tela.
- Formulários devem ter labels, erros claros e feedback. Marcar corretamente o idioma da página e das opções de idioma.
- Respeitar `prefers-reduced-motion`, evitar flashes e manter alvos de toque adequados.

## Conteúdo, privacidade e contato

- Português brasileiro é a base editorial; inglês exige revisão. Centralizar mensagens traduzíveis, incluindo erros e metadados.
- Não inventar estatísticas, nomes, contatos, depoimentos, parceiros ou fatos históricos. Texto proposto não é texto aprovado.
- HUET não é um aplicativo de tradução. Não misturar o site com a plataforma de dados.
- Sobre a HUET tem página própria por idioma. O menu do cabeçalho aponta para essa página e para as seções da inicial.
- A seção Contato exibe somente o endereço provisório `joao@huet.io` como texto. Não realizar envios. Colaboração foi retirada da navegação e do conteúdo.

## QA e GitHub Actions

- Executar lint, typecheck, formatação, testes relevantes e build. Não desabilitar verificações para obter resultado verde.
- Validar temas, idiomas, formulário quando implementado, responsividade, navegadores, acessibilidade e aparência.
- Reportar comandos, resultados e limitações. Não afirmar testes não executados ou aprovação visual não recebida.
- Workflows em `.github/workflows/`, CI e E2E proporcionais, permissões mínimas e ações confiáveis.
- Manter segredos fora do repositório. Não afirmar que GitHub, branch protection, runners ou secrets estão configurados sem evidência.
- Não configurar deploy automático nem publicar sem autorização específica.

## Comunicação e ações manuais

- Comunicar em português brasileiro claro, com termos técnicos explicados e passos sequenciais.
- Informar mudanças, testes, pendências e próximos passos sem exagerar resultados.
- Quando GitHub, domínio, hosting, permissões ou Web3Forms exigirem ação manual, explicar o procedimento e os dados necessários, então aguardar confirmação.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
