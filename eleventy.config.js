export default function (eleventyConfig) {
  eleventyConfig
    .addPassthroughCopy({
      'node_modules/@picocss/pico/css/pico.min.css': 'css/pico.min.css',
      'docs/assets/scripts': 'assets/scripts'
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
