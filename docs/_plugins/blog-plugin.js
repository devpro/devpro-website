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

  // eleventyConfig.addPairedShortcode('excerpt', function (content, post) {
  //   let excerpt = post.data.excerpt || post.data.page?.excerpt;
  //   if (!excerpt) {
  //     // Fallback: Extract first paragraph if no explicit excerpt
  //     const firstParaMatch = post.templateContent.match(/<p>(.*?)<\/p>/);
  //     excerpt = firstParaMatch ? firstParaMatch[1] : '';
  //   }
  //   return this.env.filters.mdInline(excerpt);
  // });
};
