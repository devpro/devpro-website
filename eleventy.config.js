import { execSync } from 'child_process';
import markdownIt from "markdown-it";
import syntaxHighlightPlugin from "@11ty/eleventy-plugin-syntaxhighlight";
import arrayPlugin from './docs/_plugins/array-plugin.js';
import blogPlugin from './docs/_plugins/blog-plugin.js';
import datePlugin from "./docs/_plugins/date-plugin.js";
import stringPlugin from "./docs/_plugins/string-plugin.js";

const markdownOptions = {
  html: true,
  breaks: false,
  linkify: true
};

export default function (eleventyConfig) {
  let markdownParser = markdownIt(markdownOptions);
  // eleventyConfig.setLibrary('md', markdownParser);

  // copies assets to built site
  eleventyConfig
    .addPassthroughCopy({
      'node_modules/@picocss/pico/css/pico.min.css': 'css/pico.min.css',
      'node_modules/prismjs/themes/prism-tomorrow.css': 'css/prism-tomorrow.css',
      'docs/assets/css': 'css',
      'docs/assets/scripts': 'scripts'
    });

  // adds filters
  eleventyConfig.addPlugin(syntaxHighlightPlugin);
  eleventyConfig.addPlugin(arrayPlugin);
  eleventyConfig.addPlugin(blogPlugin, markdownParser);
  eleventyConfig.addPlugin(datePlugin);
  eleventyConfig.addPlugin(stringPlugin);

  eleventyConfig.addCollection("tagList", function(collectionApi) {
    const tagsSet = new Set();
    collectionApi.getAll().forEach(item => {
      const tags = item.data.tags || [];
      tags.filter(tag => !['posts'].includes(tag)).forEach(tag => tagsSet.add(tag));
    });
    return [...tagsSet].sort();
  });

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
      input: 'docs',
      includes: '_includes',
      layouts: '_layouts',
      output: '_site'
    }
  };
};
