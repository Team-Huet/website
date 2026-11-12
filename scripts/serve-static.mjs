import { createServer } from 'node:http';
import { readFile, realpath, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { parseArgs } from 'node:util';
import { URL } from 'node:url';
import { productionBasePath } from '../src/config/paths.ts';

const { values } = parseArgs({
  options: { port: { type: 'string', default: '3000' } },
});
const port = Number(values.port);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('Porta inválida. Use --port entre 1 e 65535.');
}
const root = await realpath('out').catch(() => {
  throw new Error(
    'Exportação ausente. Execute npm run build antes de npm start.',
  );
});
const fallback = await readFile(resolve(root, '404.html'));
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.txt': 'text/plain; charset=utf-8',
  '.rsc': 'text/x-component',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

// Prévia local: monta out/ no mesmo basePath usado no build, sem fallback SPA.
createServer(async (req, res) => {
  const send = (status, body, type = 'text/html; charset=utf-8') => {
    res.writeHead(status, {
      'Content-Type': type,
      'Cache-Control': 'no-store',
    });
    res.end(req.method === 'HEAD' ? undefined : body);
  };
  if (!['GET', 'HEAD'].includes(req.method)) {
    res.setHeader('Allow', 'GET, HEAD');
    return send(405, 'Method not allowed', 'text/plain');
  }
  let pathname;
  let search;
  try {
    const url = new URL(req.url, 'http://localhost');
    pathname = decodeURIComponent(url.pathname);
    search = url.search;
  } catch {
    return send(400, 'Bad request', 'text/plain');
  }
  const redirect = (location) => {
    res.writeHead(308, { Location: location });
    res.end();
  };
  if (pathname === productionBasePath)
    return redirect(`${productionBasePath}/${search}`);
  if (!pathname.startsWith(`${productionBasePath}/`))
    return send(404, fallback);
  const relative = pathname.slice(productionBasePath.length + 1);
  const segments = relative.split('/');
  if (
    segments.some((part) => part.startsWith('.')) ||
    relative.includes('\\') ||
    relative.includes('\0')
  ) {
    return send(404, fallback);
  }
  try {
    let file = await realpath(resolve(root, relative));
    if (file !== root && !file.startsWith(root + sep))
      return send(404, fallback);
    if ((await stat(file)).isDirectory()) {
      if (!pathname.endsWith('/')) return redirect(`${pathname}/${search}`);
      file = await realpath(resolve(file, 'index.html'));
    }
    if (!file.startsWith(root + sep)) return send(404, fallback);
    return send(
      200,
      await readFile(file),
      types[extname(file)] ?? 'application/octet-stream',
    );
  } catch (error) {
    if (!['ENOENT', 'ENOTDIR'].includes(error.code))
      return send(500, 'Internal server error', 'text/plain');
    // Regras da prévia; a hospedagem real precisará configurar o mesmo comportamento.
    const locale = segments[0];
    if (locale === 'pt-BR' || locale === 'en') {
      return send(
        404,
        await readFile(resolve(root, locale, '404/index.html')).catch(
          () => fallback,
        ),
      );
    }
    return send(404, fallback);
  }
}).listen(port, '127.0.0.1', () => {
  process.stdout.write(
    `Prévia estática: http://127.0.0.1:${port}${productionBasePath}/\n`,
  );
});
