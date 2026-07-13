export default async function (eleventyConfig) {
  eleventyConfig.addCollection('sitemap', collection => {
    const pages = collection.getAll().filter((item) => {
      return item.url &&
        !item.data.excludeFromSitemap;
    });
    // notPaginated.forEach(p => {
    //   if (p.url) {
    //     console.log(`  URL: ${p.url} | Template: ${p.inputPath.split('/').pop()} |  ${p.data?.pagination}`);
    //   }
    // });
    return pages;
  });
}
