# Validação — 008

Data: 2026-11-11. Preparação local validada; commit separado e push autorizados pelo responsável após ser informado de que o envio ativará a publicação automática. Resultado remoto ainda pendente.

## Diagnóstico e verificações

- API pública de `Team-Huet/website`: repositório público, branch padrão `main`, Pages habilitado. A captura do responsável mostra GitHub Actions como fonte. GET do endereço esperado `https://team-huet.github.io/website/` retornou 404 antes da correção.
- Workflow existente: somente checkout e setup-node. Ausência de instalação, build, upload de artefato e deploy confirmada no arquivo local.
- Releases, tags e `action.yml` oficiais consultados por HTTPS: checkout v7.0.1, setup-node v7.1.0, configure-pages v6.0.0, upload-pages-artifact v5.0.0, deploy-pages v5.0.1. SHAs completos registrados no YAML.
- YAML lido por PyYAML; conferidos dependência `build` → `deploy`, ambiente `github-pages`, permissões do deploy, diretório `out` e SHAs das ações. Isso não equivale à execução do workflow no GitHub.

## Resultados locais

- `NEXT_TELEMETRY_DISABLED=1 PAGES_BASE_PATH=/website npm run check`: passou — lint, typecheck, formatação, 6 unitários e build. O ciclo npm executou `postbuild` e gerou `out/index.html`.
- `npm run test:e2e -- --project=chromium --project=firefox --project=mobile-chromium`: **42 testes passaram**. Incluem navegação da raiz, duas línguas, dois temas, axe-core, recursos estáticos, layout responsivo, animação e nova entrada HTML com JavaScript desativado. Nenhum teste desativado.
- Preparação com `PAGES_BASE_PATH=/outro-repositorio`: falhou conforme esperado antes de gravar o arquivo, impedindo publicação com prefixo divergente.
- `git diff --check` e formatação dos documentos: verificados ao encerrar a preparação.

## Limites e próximo passo

O build e os navegadores foram executados com comunicação local fora do sandbox. WebKit local permanece adiado conforme decisão anterior; o workflow instala e executa WebKit no runner junto aos demais projetos. Não foram executados Safari real, dispositivos físicos ou nova aprovação visual/editorial.

O envio deste workflow para `main` acionará a primeira publicação e habilitará atualizações automáticas após as verificações. A autorização específica foi concedida pelo responsável em 2026-11-11: “Separa novo commit e suba”. Depois do envio, conferir resultado do ambiente `github-pages` e endereço público; não inferir sucesso de deploy a partir do build local.

O Pages usará a 404 global do artefato. A seleção de página 404 por idioma na prévia é apenas cobertura local; não será configurada no GitHub por esse workflow.
