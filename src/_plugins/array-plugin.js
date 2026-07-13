export default function (eleventyConfig) {
  eleventyConfig.addFilter("first", function (array, size) {
    return [...array].slice(0, size);
  });

  eleventyConfig.addFilter("withAnyTag", function (array, tags) {
    return array.filter(item => (item.data.tags || []).some(tag => tags.includes(tag)));
  });
};
