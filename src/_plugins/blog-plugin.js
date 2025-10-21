export default function (eleventyConfig, markdownParser) {
  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: '<!-- more -->'
  });

  eleventyConfig.addFilter('toHtml', (content) => {
    return markdownParser.renderInline(content);
  });

  eleventyConfig.addFilter("filterByYear", (posts, year) => {
    return posts.filter(post => {
      const postYear = new Date(post.date).getFullYear();
      return postYear === year;
    });
  });

  eleventyConfig.addCollection("tagList", function(collectionApi) {
    const tagsSet = new Set();
    collectionApi.getAll().forEach(item => {
      const tags = item.data.tags || [];
      tags.filter(tag => !['posts'].includes(tag)).forEach(tag => tagsSet.add(tag));
    });
    return [...tagsSet].sort();
  });
};
