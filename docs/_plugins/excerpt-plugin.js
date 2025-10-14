export default function (eleventyConfig, markdownParser) {
  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: '<!-- more -->'
  });

  eleventyConfig.addFilter('toHtml', (content) => {
    return markdownParser.renderInline(content);
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
