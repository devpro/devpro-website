import { DateTime } from "luxon";

export default function (eleventyConfig) {
  eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
    return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "LLLL dd, yyyy");
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat('yyyy-LL-dd');
  });

  eleventyConfig.addFilter("getYear", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat('yyyy');
  });

  eleventyConfig.addFilter("toIsoString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toISO();
  });

  eleventyConfig.addFilter("sortByDate", (array) => {
    return array.slice().sort((a, b) => {
      return DateTime.fromJSDate(a.date, { zone: "utc" }) - DateTime.fromJSDate(b.date, { zone: "utc" });
    });
  });
};
