---
title: "Easily configure HTTP redirects in Eleventy for static sites"
tags: [static-site]
---

Learn how to manage HTTP redirects in Eleventy for static sites using a simple template and global data file.

<!-- more -->

Perfect for GitHub Pages and maintaining a seamless user experience!

## Context

Websites, pages, or domains may change over time, and some hosting providers limit configuration options.
In my case, my static site is hosted on GitHub Pages, which does not support `.htaccess` files for redirects.

## Idea

Ensure that the redirect template is not part of a collection, such as posts.
Otherwise, it might appear on the website, which is undesirable.

Redirects should be seamless and transparent to users.

## Define a global data file

An efficient way to manage redirects is to create a global data file named `src/_data/redirections.json`:

```json
[
  {
    "origin": "/my-old-link/",
    "destination": "/my-new-one/"
  }
]
```

## Create a redirect template

Create a new file named `src/templates/redirect.njk`:

{% raw %}

```njk
---
pagination:
  data: redirections
  size: 1
  alias: redirect
permalink: /{{ redirect.origin | slugify }}/
eleventyComputed:
  newLocation: "{{ website.baseUrl }}{{ redirect.destination }}"
layout: ""
eleventyExcludeFromCollections: true
excludeFromSitemap: true
---
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0;url={{ newLocation }}">
  <title>Redirecting...</title>
  <link rel="canonical" href="{{ newLocation }}">
  <script>
    window.location.replace("{{ newLocation }}");
  </script>
</head>

<body>
  <p>This page has moved to <a href="{{ newLocation }}">a new location</a>.</p>
</body>

</html>
```

{% endraw %}

This template uses a meta refresh tag for automatic redirects, a canonical link for SEO, and a JavaScript fallback.
The eleventyExcludeFromCollections and excludeFromSitemap settings prevent the redirect pages from appearing in navigation or sitemaps.

## Testing the redirect

Now, visiting the old URL (e.g., /my-old-link/) will automatically redirect users to the new URL (e.g., /my-new-one/) seamlessly.

Test locally using `npx eleventy --serve` or verify after deploying to GitHub Pages.

## Going forward

Now that the setup is done, your only action to manage HTTP redirects (list, add, remove, edit) is by looking and editing the file `src/_data/redirections.json`.
