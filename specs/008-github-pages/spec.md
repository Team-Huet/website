# 008 — Publicação estática no GitHub Pages

SDD v0.1. Data: 2026-11-11. Solicitação atual: corrigir a tentativa de publicação gratuita no GitHub Pages. Preparação local validada. O responsável autorizou commit separado e push, incluindo ativação da publicação automática, em 2026-11-11; resultado remoto ainda pendente. Isso não presume aprovação editorial ou visual.

## Objetivo e escopo

Preparar o projeto existente para publicar os arquivos estáticos de `out/` no repositório público `Team-Huet/website`, com GitHub Actions como fonte. Preservar `/website`, idiomas, temas e `noindex`. Não contratar serviços, configurar domínio próprio ou expor credenciais.

## Critérios

- G01: workflow instala pelo lockfile, executa verificações e E2E, envia `out/` como artefato e publica somente após sucesso do job de build, com ações oficiais fixadas por SHA e permissões mínimas.
- G02: a raiz `/website/` entrega um documento real que abre `/website/pt-BR/`, inclusive sem JavaScript, sem depender do Proxy ou de redirecionamento exclusivo da prévia.
- G03: navegação e recursos continuam funcionando sob `/website` nos dois idiomas; rota inválida não deve ser convertida em uma homepage com status 200.
- G04: registrar resultados locais, limitações do Pages e passos remotos. Não afirmar publicação antes de verificar o deployment e o endereço público.

## Limites

A 404 global `out/404.html` é a página de erro entregue pelo Pages. As regras locais de seleção de 404 por idioma não são transferidas automaticamente ao host. Localização da 404 global e domínio próprio são trabalhos posteriores. Revisão editorial/visual e Safari real permanecem pendentes.
