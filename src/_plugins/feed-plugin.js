import { feedPlugin } from '@11ty/eleventy-plugin-rss';
import websiteData from "./../_data/website.js";

export default function (eleventyConfig) {
  // creates RSS feed (see https://www.11ty.dev/docs/plugins/rss/)
  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/feed.xml",
    collection: {
      name: "posts",
      limit: 20,
    },
    metadata: {
      language: "en",
      title: websiteData.title,
      subtitle: websiteData.subtitle,
      base: websiteData.baseUrl,
      author: {
        name: websiteData.author.name,
        email: websiteData.author.email
      }
    }
  });
};
