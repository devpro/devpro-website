import type { Locator, Page } from '@playwright/test';
import { SitePage } from './SitePage.ts';

/** The home page, with its welcome text, the three most recent posts and the latest news. */
export class HomePage extends SitePage {
  readonly welcome: Locator;
  readonly recentPosts: Locator;
  readonly latestNews: Locator;

  constructor(page: Page) {
    super(page);
    this.welcome = page.getByRole('heading', { name: 'Welcome to my digital hub' });
    this.recentPosts = page.locator('.grid > div').filter({ has: page.getByRole('heading', { name: 'Recent blog posts' }) });
    this.latestNews = page.locator('.grid > div').filter({ has: page.getByRole('heading', { name: 'Latest news' }) });
  }

  async goto(): Promise<void> {
    await super.goto('/');
  }

  postLinks(): Locator {
    return this.recentPosts.getByRole('link').filter({ hasNotText: 'All posts' });
  }

  async openAllPosts(): Promise<void> {
    await this.recentPosts.getByRole('link', { name: 'All posts' }).click();
  }
}
