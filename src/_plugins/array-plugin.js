export default function (eleventyConfig) {
  eleventyConfig.addFilter("first", function (array, size) {
    return [...array].slice(0, size);
  });
};
