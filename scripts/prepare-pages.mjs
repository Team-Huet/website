import { access, readFile, writeFile } from 'node:fs/promises';
import { productionBasePath } from '../src/config/paths.ts';

if (
  process.env.PAGES_BASE_PATH !== undefined &&
  process.env.PAGES_BASE_PATH !== productionBasePath
) {
  throw new Error(
    'O basePath do projeto não corresponde ao endereço configurado no GitHub Pages.',
  );
}

await access('out/pt-BR/index.html');
await access('out/en/index.html');
await access('out/404.html');
const messages = JSON.parse(await readFile('messages/pt-BR.json', 'utf8'));
const escapeHtml = (value) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      })[char],
  );
const destination = `${productionBasePath}/pt-BR/`;

// Pages entrega arquivos: a entrada precisa funcionar sem Proxy ou servidor Node.
await writeFile(
  'out/index.html',
  `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex, nofollow">
    <meta http-equiv="refresh" content="0; url=${escapeHtml(destination)}">
    <title>${escapeHtml(messages.Metadata.title)}</title>
  </head>
  <body>
    <main><a href="${escapeHtml(destination)}">${escapeHtml(messages.Navigation.portuguese)}</a></main>
  </body>
</html>
`,
);
