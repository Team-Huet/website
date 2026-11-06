# Tarefas — 001

Estados: pendente, em andamento, verificado, aguardando revisão. Um arquivo escrito não prova que o comportamento foi validado.

| Tarefa                                                   | Critérios | Dependência               | Estado                                           |
| -------------------------------------------------------- | --------- | ------------------------- | ------------------------------------------------ |
| T01 Registrar contexto, regras, escopo e plano           | F08, F09  | Briefing e autorização    | Verificado; documentação criada                  |
| T02 Consultar versões estáveis e preparar dependências   | F01       | Aprovação da base técnica | Verificado; instalação limpa e lockfile          |
| T03 Implementar rotas, catálogos e tela mínima           | F02, F08  | T02                       | Verificado; revisão editorial pendente           |
| T04 Implementar tema e provar pipeline CSS/SCSS          | F03, F04  | T02                       | Verificado; build e testes de navegador          |
| T05 Preparar ferramentas e testes pertinentes            | F05, F06  | T03, T04                  | Verificado; 6 unitários e 24 E2E passaram        |
| T06 Preparar workflows sem deploy                        | F07       | T05                       | Arquivos preparados; execução GitHub pendente    |
| T07 Executar verificações e registrar evidências         | F01–F09   | T03–T06                   | Evidências registradas; limites em validation.md |
| T08 Apresentar fundação e pendências para revisão humana | F08       | T07                       | Aguardando revisão                               |

## Pendências explícitas

- WebKit local: adiado pelo responsável em 2026-11-05; depende de bibliotecas do Ubuntu.
- Avaliação manual de acessibilidade e dispositivos reais: pendente.
- Aprovação editorial/visual e tema claro definitivo: pendente.
- Alertas moderados transitivos nas ferramentas de desenvolvimento: acompanhar e resolver/reavaliar antes de ativar CI/publicação.
- GitHub remoto e publicação: não configurados; dependem de etapas posteriores autorizadas.

Consultar [validation.md](validation.md) para comandos, resultados e limitações. Nenhuma tarefa desta spec implica conclusão das specs 002–007.
