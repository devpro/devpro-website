import { expect, test } from '../fixtures.ts';

test('the search finds a post by a word of its content', async ({ page, ui: { home, search } }) => {
  await home.goto();
  await home.openSearch();
  await search.search('MinIO');
  await expect(search.result('MinIO container images gone').first()).toBeVisible();
  await search.result('MinIO container images gone').first().click();
  await expect(page).toHaveURL(/minio-container-images-gone/);
});

test('a word no page holds finds nothing', async ({ ui: { search } }) => {
  await search.goto();
  await search.search('zzqxjv');
  await expect(search.page.getByText(/No results/)).toBeVisible();
  await expect(search.results).toHaveCount(0);
});
