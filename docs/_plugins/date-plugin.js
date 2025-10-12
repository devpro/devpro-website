import { DateTime } from "luxon";

export default function (eleventyConfig) {
  eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
    return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat('yyyy-LL-dd');
  });
};
