import type { Locator, Page } from '@playwright/test';
import { SitePage } from './SitePage.ts';

/** The blog, with its links to the posts of each year and the most recent posts. */
export class BlogPage extends SitePage {
  readonly years: Locator;
  readonly recentPosts: Locator;

  constructor(page: Page) {
    super(page);
    this.years = page.getByRole('heading', { name: 'Posts by year' });
    this.recentPosts = page.getByRole('heading', { name: 'Most recent posts' });
  }

  async goto(): Promise<void> {
    await super.goto('/blog/');
  }

  // A year is a link styled as a button, so its role is button.
  year(year: number): Locator {
    return this.page.getByRole('main').getByRole('button', { name: String(year), exact: true });
  }

  // A post is a card whose whole surface is the link.
  post(title: string): Locator {
    return this.page.getByRole('main').getByRole('link').filter({ hasText: title }).first();
  }
}
