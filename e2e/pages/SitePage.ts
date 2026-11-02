import type { Locator, Page } from '@playwright/test';

/** What every page has: the header with its menu and icons, the breadcrumb, the title and the footer. */
export class SitePage {
  readonly page: Page;
  readonly menu: Locator;
  readonly breadcrumb: Locator;
  readonly title: Locator;
  readonly footer: Locator;
  readonly themeSwitcher: Locator;

  constructor(page: Page) {
    this.page = page;
    // The header repeats its links in a hamburger menu for narrow screens, hidden on wide ones.
    this.menu = page.locator('header .main-menu');
    this.breadcrumb = page.getByRole('navigation', { name: 'breadcrumb' });
    this.title = page.getByRole('heading', { level: 1 });
    this.footer = page.getByRole('contentinfo');
    this.themeSwitcher = page.getByRole('link', { name: 'Switch theme' });
  }

  async goto(path = '/'): Promise<void> {
    await this.page.goto(path);
  }

  menuLink(title: string): Locator {
    return this.menu.getByRole('link', { name: title, exact: true });
  }

  footerLink(label: string): Locator {
    return this.footer.getByRole('link', { name: label, exact: true });
  }

  async openFromMenu(title: string): Promise<void> {
    await this.menuLink(title).click();
  }

  async openSearch(): Promise<void> {
    await this.page.getByRole('link', { name: 'Search' }).click();
  }

  async theme(): Promise<string | null> {
    return this.page.locator('html').getAttribute('data-theme');
  }

  async switchTheme(): Promise<void> {
    await this.themeSwitcher.click();
  }
}
