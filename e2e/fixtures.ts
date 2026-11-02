import { test as base, expect, type Page } from '@playwright/test';
import { BlogPage, HomePage, SearchPage, SitePage } from './pages/index.ts';

/** Every page object, on one browser page. */
export function pagesOf(page: Page) {
  return {
    site: new SitePage(page),
    home: new HomePage(page),
    blog: new BlogPage(page),
    search: new SearchPage(page),
  };
}

export type Pages = ReturnType<typeof pagesOf>;

export const test = base.extend<{ ui: Pages }>({
  // The production build loads GoatCounter, and a test run is not a visit to count.
  page: async ({ page }, use) => {
    await page.route('**/gc.zgo.at/**', (route) => route.abort());
    await use(page);
  },
  ui: async ({ page }, use) => {
    await use(pagesOf(page));
  },
});

export { expect };
