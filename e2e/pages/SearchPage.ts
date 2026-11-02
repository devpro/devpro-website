import type { Locator, Page } from '@playwright/test';
import { SitePage } from './SitePage.ts';

/** The Pagefind search, whose index is built after the site. */
export class SearchPage extends SitePage {
  readonly input: Locator;
  readonly results: Locator;

  constructor(page: Page) {
    super(page);
    this.input = page.getByRole('search', { name: 'Search this site' }).getByRole('textbox');
    this.results = page.locator('.pagefind-ui__result');
  }

  async goto(): Promise<void> {
    await super.goto('/search/');
  }

  async search(text: string): Promise<void> {
    await this.input.fill(text);
  }

  result(title: string): Locator {
    return this.results.getByRole('link', { name: title });
  }
}
