import { execSync } from 'child_process';
import { load as yamlLoad, YAML11_SCHEMA } from 'js-yaml';
import markdownIt from 'markdown-it';
import syntaxHighlightPlugin from '@11ty/eleventy-plugin-syntaxhighlight';
import footnote_plugin from 'markdown-it-footnote';
import arrayPlugin from './src/_plugins/array-plugin.js';
import contentPlugin from './src/_plugins/content-plugin.js';
import datePlugin from './src/_plugins/date-plugin.js';
import feedPlugin from './src/_plugins/feed-plugin.js';
import imagePlugin from './src/_plugins/image-plugin.js';
import stringPlugin from './src/_plugins/string-plugin.js';

export default function (eleventyConfig) {
  const markdownOptions = {
    html: true,
    breaks: true,
    linkify: true
  };
  let markdownParser = markdownIt(markdownOptions);
  // eleventyConfig.setLibrary('md', markdownParser);

  // keeps draft content out of the built site
  eleventyConfig.ignores.add('src/_drafts/**');

  // adds yaml support in global data
  // YAML 1.1 schema keeps js-yaml v4 behavior, e.g. dates parsed as Date objects
  eleventyConfig.addDataExtension('yaml, yml', contents => yamlLoad(contents, { schema: YAML11_SCHEMA }));

  // copies assets to built site
  eleventyConfig
    .addPassthroughCopy({
      'node_modules/@picocss/pico/css/pico.min.css': 'css/pico.min.css',
      'node_modules/prismjs/themes/prism-tomorrow.css': 'css/prism-tomorrow.css',
      'src/assets/css': 'css',
      'src/assets/images': 'images',
      'src/assets/scripts': 'scripts'
    });

  // adds filters and collections
  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(footnote_plugin));
  eleventyConfig.addPlugin(syntaxHighlightPlugin);
  eleventyConfig.addPlugin(arrayPlugin);
  eleventyConfig.addPlugin(contentPlugin, markdownParser);
  eleventyConfig.addPlugin(datePlugin);
  eleventyConfig.addPlugin(feedPlugin);
  eleventyConfig.addPlugin(imagePlugin);
  eleventyConfig.addPlugin(stringPlugin);

  // forces full page reload on hot reload (needed for code copy button JS that is updating the DOM)
  eleventyConfig.setServerOptions({
    domDiff: false
  });

  // builds the search data after site build
  eleventyConfig.on('eleventy.after', () => {
    execSync('npx -y pagefind --site _site', { encoding: 'utf-8' });
  });

  return {
    dir: {
      input: 'src',
      includes: '_includes',
      layouts: '_layouts',
      output: '_site'
    }
  };
};
