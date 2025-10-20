# Contributing

## Solution design

### Dependencies

The website is using:

1. [Eleventy (11ty)](https://www.11ty.dev/) as static site generator (HTML builder)

    With the plugins:

    - [11ty/eleventy-plugin-syntaxhighlight](https://github.com/11ty/eleventy-plugin-syntaxhighlight)

2. [Pico CSS](https://picocss.com/) as CSS framework (web design)

3. [Luxon](https://moment.github.io/luxon/) as wrapper for JavaScript dates and times

4. [Prism](https://prismjs.com/) as lightweight, extensible syntax highlighter

5. [Pagefind](https://pagefind.app/) as static search engine

6. [markdown-it](https://github.com/markdown-it/markdown-it) as Markdown parser (already used by Eleventy but needed for additional filters)

7. [js-yaml](https://github.com/nodeca/js-yaml) as YAML data loader (js/json by default with Eleventy global data)

### File organization

```txt
<root>/
├─ src/
│  ├─ _data/
│  │  ├─ <type>.js
│  │  └─ <type>.json
│  │  └─ <type>.yaml
│  ├─ _include/
│  │  └─ <part>.json
│  ├─ _layouts/
│  │  └─ <part>.njk
│  ├─ _plugins/
│  │  └─ <type>-plugin.js
│  ├─ assets/
│  │  └─ css/
│  │     └─ global.css
│  │  └─ scripts/
│  │     └─ <component>.js
│  ├─ news/
│  │  ├─ <news>.md
│  │  └─ news.json
│  ├─ pages/
│  │  ├─ <page>.md
│  │  └─ pages.json
│  ├─ posts/
│  │  ├─ YYYY-MM-DD-xxx.md
│  │  └─ posts.json
│  ├─ templates/
│  │  ├─ <template>.njk
│  │  └─ templates.json
│  └─ index.md                  → home page
└─ eleventy.config.js           → main file for Eleventy
```

## Local run

Install JavaScript dependencies:

```bash
npm install
```

Run locally the website:

```bash
npm start
```

## Tips

- Get collection length

```njk
{% set postsCount = collections.posts | length %}
```

- Add a comma while displaying a list

```njk
{% for tag in tags %}
  <a href="/tags/{{ tag | slug }}">{{ tag }}</a>{% if not loop.last %}, {% endif %}
{% endfor %}
```

- Eleventy ignore files in folders starting with an underscore while building site files
