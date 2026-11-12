import { expect, test } from '@playwright/test';
import { productionBasePath } from '../../src/config/paths';

test('prévia entrega arquivos reais, HEAD e 404 sem fallback de SPA', async ({
  request,
}) => {
  const home = await request.head('pt-BR/');
  expect(home.status()).toBe(200);
  expect(home.headers()['content-type']).toContain('text/html');
  expect(await home.body()).toHaveLength(0);

  const image = await request.get('art/hand-points.webp');
  expect(image.status()).toBe(200);
  expect(image.headers()['content-type']).toBe('image/webp');

  for (const path of [
    'missing.js',
    '/pt-BR/',
    '/package.json',
    `${productionBasePath}/%2e%2e%2fpackage.json`,
  ]) {
    const response = await request.get(path);
    expect(response.status()).toBe(404);
    expect(await response.text()).not.toContain('"dependencies"');
  }
  const post = await request.post('pt-BR/');
  expect(post.status()).toBe(405);
});

test('prévia aplica redirecionamento e páginas de erro localizadas', async ({
  request,
}) => {
  const root = await request.get('./', { maxRedirects: 0 });
  expect(root.status()).toBe(308);
  expect(root.headers().location).toBe(`${productionBasePath}/pt-BR/`);
  for (const locale of ['pt-BR', 'en']) {
    const missing = await request.get(`${locale}/missing/nested/`);
    expect(missing.status()).toBe(404);
    expect(await missing.text()).toContain(`lang="${locale}"`);
    const explicit = await request.get(`${locale}/404/`);
    expect(explicit.status()).toBe(200);
    expect(await explicit.text()).toBe(await missing.text());
  }
});
