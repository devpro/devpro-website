import { expect, test } from '../fixtures.ts';

test('the theme starts dark, switches to light and stays light on the next page', async ({ ui: { home, blog } }) => {
  await home.goto();
  await expect.poll(() => home.theme()).toBe('dark');
  await home.switchTheme();
  await expect.poll(() => home.theme()).toBe('light');
  await blog.goto();
  await expect.poll(() => blog.theme()).toBe('light');
});
