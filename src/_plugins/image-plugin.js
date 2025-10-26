import path from 'node:path';
import Image from '@11ty/eleventy-img';
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';

export default async function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyImageTransformPlugin);
  eleventyConfig.addFilter('getTransformedUrl', async (src, page) => {
    if (!src) {
      return null;
    }
    console.info(src);
    const inputDir = path.dirname(page.inputPath);
    const imagePath = path.resolve(inputDir, src);
    const outputDir = path.dirname(page.outputPath);
    const urlPath = page.url;

    const stats = await Image(imagePath, {
      widths: [1200],
      formats: ["jpg"],
      outputDir: outputDir,
      urlPath: urlPath,
      filenameFormat: function (hash, src, width, format) {
        return `${hash}-${width}.${format}`;
      },
    });
    return stats.jpeg[0].url;
  });
}
