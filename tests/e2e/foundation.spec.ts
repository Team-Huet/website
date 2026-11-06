import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

for (const locale of ['pt-BR', 'en'] as const) {
  for (const theme of ['light', 'dark'] as const) {
    test(`${locale} / ${theme}: conteúdo, estilos, acesso e adaptação`, async ({
      page,
    }, testInfo) => {
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('console', (message) => {
        if (message.type() === 'error') errors.push(message.text());
      });
      await page.emulateMedia({ colorScheme: theme, reducedMotion: 'reduce' });
      await page.goto(`/${locale}`);
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
      await expect(page.getByRole('heading', { level: 1 })).toContainText(
        locale === 'en' ? 'Data infrastructure' : 'Infraestrutura de dados',
      );
      await expect(page.locator('header nav')).toHaveCSS('display', 'flex');
      await expect(page.locator('header')).toHaveCSS('display', 'flex');
      await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'auto');
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
      const scan = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();
      expect(scan.violations).toEqual([]);
      await page.screenshot({
        path: testInfo.outputPath(`${locale}-${theme}.png`),
        fullPage: true,
      });
      expect(errors).toEqual([]);
    });
  }
}

test('troca de idioma mantém o tema escolhido e a preferência persiste', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/pt-BR');
  await page
    .getByRole('button', { name: 'Alternar entre tema claro e escuro' })
    .click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  const flag = page.locator('header nav img');
  await expect(flag).toHaveCount(1);
  await expect(flag).toHaveAttribute('src', '/flags/br.svg');
  await page.getByRole('link', { name: 'Read in English' }).click();
  await expect(flag).toHaveAttribute('src', '/flags/us.svg');
  await expect(page).toHaveURL(/\/en$/);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('link', { name: 'Ler em português brasileiro' }).click();
  await expect(flag).toHaveAttribute('src', '/flags/br.svg');
  await expect(page).toHaveURL(/\/pt-BR$/);
});

test('raiz usa português e endereços inexistentes retornam 404', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/pt-BR$/);
  const response = await page.goto('/en/missing');
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole('heading', { name: 'Page not found' }),
  ).toBeVisible();
  await page.getByRole('link', { name: 'Back to home' }).click();
  await expect(page).toHaveURL(/\/en$/);
});

test('atalho de teclado alcança o conteúdo e a âncora funciona', async ({
  page,
}) => {
  await page.goto('/pt-BR');
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('link', { name: 'Ir para o conteúdo' }),
  ).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('main')).toBeFocused();
  await page.getByRole('link', { name: 'Conheça a iniciativa' }).click();
  await expect(page).toHaveURL(/#initiative$/);
  await expect(page.locator('#initiative-title')).toBeInViewport();
});

test('conteúdo reflui em 320 pixels CSS', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/en');
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('anima a entrada do título e respeita a preferência por movimento reduzido', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/pt-BR');

  const firstLine = page
    .getByRole('heading', { level: 1 })
    .locator('span')
    .first();
  await expect(firstLine).not.toHaveCSS('animation-name', 'none');
  await expect(firstLine).toHaveCSS('animation-iteration-count', '1');

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(firstLine).toHaveCSS('animation-name', 'none');
  await expect(firstLine).toHaveCSS('opacity', '1');
  await expect(page.locator('#initiative-title')).toHaveCSS(
    'animation-name',
    'none',
  );
});

test('trajetórias se movem por padrão e permitem pausar e retomar', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/pt-BR');
  const point = page.locator('main svg path[pathLength]').first();
  await expect(point).toHaveCSS('animation-play-state', 'running');
  const offset = () =>
    point.evaluate((node) => getComputedStyle(node).strokeDashoffset);
  const start = await offset();
  await expect.poll(offset).not.toBe(start);
  await page.getByRole('button', { name: 'Pausar animação' }).click();
  await expect(point).toHaveCSS('animation-play-state', 'paused');
  await page.getByRole('button', { name: 'Animar trajetórias' }).click();
  await expect(point).toHaveCSS('animation-play-state', 'running');

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  await expect(point).toHaveCSS('animation-play-state', 'paused');
  await page.getByRole('button', { name: 'Animar trajetórias' }).click();
  await expect(point).toHaveCSS('animation-play-state', 'running');
});

test('menu do cabeçalho dá acesso às seções e à página Sobre, inclusive em tela estreita', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const locale of ['pt-BR', 'en']) {
    await page.goto('/' + locale);
    await expect(page.locator('footer nav')).toHaveCount(0);
    const menu = page.locator('header summary');
    await menu.focus();
    await menu.press('Enter');
    await menu.press('Escape');
    await expect(menu).toBeFocused();
    const links = page.locator('header details a[href^="#"]');
    await expect(page.locator('header details a')).toHaveCount(3);
    await expect(links).toHaveCount(2);
    for (const link of await links.all()) {
      await menu.click();
      const href = await link.getAttribute('href');
      await link.click();
      await expect(page.locator('header details')).not.toHaveAttribute(
        'open',
        '',
      );
      await expect(page.locator('main section' + href)).toBeInViewport();
    }
    await expect(page.locator('#contact')).toContainText('joao@huet.io');
    await expect(page.locator('form, #collaboration, #about')).toHaveCount(0);
    await menu.click();
    await page.locator('header a[href$="/about"]').click();
    await expect(page).toHaveURL(new RegExp('/' + locale + '/about$'));
    await expect(page.locator('main h1')).toHaveText(
      locale === 'en' ? 'About HUET' : 'Sobre a HUET',
    );
    await page.locator('header a[hreflang]').click();
    const other = locale === 'en' ? 'pt-BR' : 'en';
    await expect(page).toHaveURL(new RegExp('/' + other + '/about$'));
    await menu.click();
    await page.locator('header a[href$="#contact"]').click();
    await expect(page.locator('#contact')).toBeInViewport();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBe(320);
  }
});
