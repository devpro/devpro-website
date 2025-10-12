import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import datePlugin from "./docs/_plugins/datePlugin.js";

export default function (eleventyConfig) {
  eleventyConfig
    .addPassthroughCopy({
      'node_modules/@picocss/pico/css/pico.min.css': 'css/pico.min.css',
      'node_modules/prismjs/themes/prism-tomorrow.css': 'css/prism-tomorrow.css',
      // 'node_modules/prismjs/themes': 'css',
      'docs/assets/css': 'css',
      'docs/assets/scripts': 'scripts'
    });

  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(datePlugin);

  return {
    dir: {
      input: 'docs',
      includes: '_includes',
      layouts: '_layouts',
      output: '_site'
    }
  };
};
