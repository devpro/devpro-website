import { expect, test } from '../fixtures.ts';

test('the blog lists the posts by year and opens one', async ({ page, ui: { home, blog } }) => {
  await home.goto();
  await home.openAllPosts();
  await expect(blog.title).toHaveText('Blog');
  await expect(blog.years).toBeVisible();
  await expect(blog.recentPosts).toBeVisible();

  await blog.post('New DevPro website is live!').click();
  await expect(page).toHaveURL('/new-devpro-website-is-live/');
  await expect(blog.title).toHaveText('New DevPro website is live!');
  await expect(blog.breadcrumb.getByRole('link', { name: 'Blog' })).toBeVisible();
});

test('a year lists only its posts', async ({ page, ui: { blog } }) => {
  await blog.goto();
  await blog.year(2017).click();
  await expect(page).toHaveURL('/blog/2017/');
  await expect(blog.post('Puppet')).toBeVisible();
  await expect(blog.page.getByRole('main').getByRole('link').filter({ hasText: 'Eleventy' })).toHaveCount(0);
});

test('a code block of a post has its copy button', async ({ ui: { site } }) => {
  await site.goto('/easily-configure-http-redirects-in-eleventy-for-static-sites/');
  await expect(site.page.locator('pre').first()).toBeVisible();
  await expect(site.page.getByRole('button', { name: /copy/i }).first()).toBeVisible();
});

test('the images of a post are resized and load', async ({ ui: { site } }) => {
  await site.goto('/minio-container-images-gone-best-alternatives-2025/');
  const image = site.page.getByRole('img', { name: 'Docker Hub Search for MinIO' });
  await expect(image).toBeVisible();
  expect(await image.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
});
