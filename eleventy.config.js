import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import datePlugin from "./docs/_plugins/datePlugin.js";

export default function (eleventyConfig) {
  eleventyConfig
    .addPassthroughCopy({
      'node_modules/@picocss/pico/css/pico.min.css': 'css/pico.min.css',
      'node_modules/prismjs/themes/prism-okaidia.css': 'css/prism-okaidia.css',
      'docs/assets/css': 'css'
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
