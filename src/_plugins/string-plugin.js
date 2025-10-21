export default function (eleventyConfig) {
  eleventyConfig.addFilter("capitalize", (str) => {
    if (!str) return str;
    return str
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  });

  eleventyConfig.addFilter("replaceHyphens", (str) => {
    if (!str) return str;
    return str.replace(/-/g, " ");
  });

  eleventyConfig.addFilter("trim", function (value) {
    if (typeof value !== "string") {
      return value;
    }
    return value.trim();
  });
};
