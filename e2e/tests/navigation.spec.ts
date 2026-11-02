import { expect, test } from '../fixtures.ts';

const menu = [['Blog', '/blog/'], ['Guides', '/guides/'], ['Projects', '/projects/'], ['Services', '/services/']] as const;
const footer = [['About', '/about/'], ['Talks', '/talks/'], ['News', '/news/'], ['Legal Mentions', '/legal-mentions/']] as const;

test('the home page welcomes, with the recent posts and the latest news', async ({ ui: { home } }) => {
  await home.goto();
  await expect(home.welcome).toBeVisible();
  await expect(home.postLinks()).toHaveCount(3);
  await expect(home.latestNews.getByRole('link').first()).toBeVisible();
  await expect(home.breadcrumb).toHaveCount(0);
});

for (const [title, path] of menu) {
  test(`the menu opens ${title}, marked as the current page`, async ({ page, ui: { home, site } }) => {
    await home.goto();
    await home.openFromMenu(title);
    await expect(page).toHaveURL(path);
    await expect(site.title).toHaveText(title);
    await expect(site.breadcrumb).toContainText(title);
  });
}

for (const [label, path] of footer) {
  test(`the footer opens ${label}`, async ({ page, ui: { home, site } }) => {
    await home.goto();
    await home.footerLink(label).click();
    await expect(page).toHaveURL(path);
    await expect(site.title).toBeVisible();
  });
}

// The redirection names the production address, so it is read rather than followed out of the local site.
test('a page that moved redirects to its new address', async ({ request }) => {
  const moved = await (await request.get('/choosing-a-minio-container-image/')).text();
  expect(moved).toContain('url=https://devpro.fr/minio-container-images-gone-best-alternatives-2025/');
  expect((await request.get('/minio-container-images-gone-best-alternatives-2025/')).ok()).toBe(true);
});

test('the feed, the sitemap and robots.txt are served', async ({ request }) => {
  for (const path of ['/feed.xml', '/sitemap.xml', '/robots.txt']) {
    expect((await request.get(path)).ok(), path).toBe(true);
  }
});
