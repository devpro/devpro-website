import { join } from 'node:path';
import { expect, test } from '../fixtures.ts';

// Pictures to look at, not assertions: run with `task test:screenshots`, files land in e2e/screenshots.
test.skip(!process.env.SCREENSHOTS, 'SCREENSHOTS=1 takes them');

const dir = join(import.meta.dirname, '../screenshots');
const pages = [
  ['home', '/'],
  ['blog', '/blog/'],
  ['post', '/new-devpro-website-is-live/'],
  ['guides', '/guides/'],
  ['guide', '/guide/container-images/'],
  ['projects', '/projects/'],
  ['services', '/services/'],
  ['talks', '/talks/'],
  ['news', '/news/'],
  ['about', '/about/'],
  ['search', '/search/'],
] as const;

for (const [name, width, height] of [['desktop', 1920, 1080], ['laptop', 1440, 900], ['mobile', 390, 844]] as const) {
  for (const theme of ['dark', 'light'] as const) {
    test(`every page at ${name} width in ${theme} theme`, async ({ page, ui: { site } }) => {
      await page.addInitScript((value) => localStorage.setItem('theme', value), theme);
      await page.setViewportSize({ width, height });
      for (const [page_, path] of pages) {
        await site.goto(path);
        await expect(site.footer).toBeVisible();
        await page.screenshot({ path: join(dir, `${name}-${theme}-${page_}.png`), fullPage: true });
      }
    });
  }
}
