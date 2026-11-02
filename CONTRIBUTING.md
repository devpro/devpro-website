# Contributing

## Solution design

### Dependencies

The website is using:

1. [Eleventy (11ty)](https://www.11ty.dev/) as static site generator (HTML builder)

    With the plugins:

    - [11ty/eleventy-plugin-syntaxhighlight](https://github.com/11ty/eleventy-plugin-syntaxhighlight)
    - [11ty/eleventy-plugin-rss](https://github.com/11ty/eleventy-plugin-rss)
    - [@11ty/eleventy-img](https://github.com/11ty/eleventy-img)

2. [Pico CSS](https://picocss.com/) as CSS framework (web design)

3. [Luxon](https://moment.github.io/luxon/) as wrapper for JavaScript dates and times

4. [Prism](https://prismjs.com/) as lightweight, extensible syntax highlighter

5. [Pagefind](https://pagefind.app/) as static search engine

6. [markdown-it](https://github.com/markdown-it/markdown-it) as Markdown parser (already used by Eleventy but needed for additional filters)

    With the plugins:

    - [markdown-it/markdown-it-footnote](https://github.com/markdown-it/markdown-it-footnote)

7. [js-yaml](https://github.com/nodeca/js-yaml) as YAML data loader (js/json by default with Eleventy global data)

### File organization

```txt
<root>/
├── src/
│   ├── _data/
│   │   └── news/
│   │       └── 2025.css
│   │   ├── <type>.js
│   │   ├── <type>.json
│   │   └── <type>.yaml
│   ├── _include/
│   │   └── <part>.json
│   ├── _layouts/
│   │   └── <part>.njk
│   ├── _plugins/
│   │   └── <type>-plugin.js
│   ├── assets/
│   │   └── css/
│   │       └── global.css
│   │   └── scripts/
│   │       └── <component>.js
│   ├── pages/
│   │   ├── <page>.md
│   │   └── pages.json
│   ├── posts/
│   │   ├── YYYY-MM-DD-xxx.md
│   │   └── posts.json
│   ├── templates/
│   │   ├── <template>.njk
│   │   └── templates.json
│   └── index.md                  → home page
├── e2e/
│   ├── pages/                    → page objects
│   ├── tests/                    → Playwright specs
│   └── playwright.config.ts
├── eleventy.config.js            → main file for Eleventy
└── Taskfile.yml                  → commands
```

## Local run

[Task](https://taskfile.dev) runs the commands, `task` listing them.

Install the npm packages and the Playwright browser:

```bash
task install
```

Run the website with hot reload:

```bash
task start
```

## End-to-end tests

[Playwright](https://playwright.dev) checks the built site, served from `_site` as GitHub Pages does.
A page object of `e2e/pages` holds the locators of a page, and the specs of `e2e/tests` only use them.
The `build-test` job of the CI runs them, IstarCI giving it the Playwright image of `.istarci.yml`.

```bash
task test:e2e
task test:e2e -- tests/search.spec.ts
```

Screenshots of every page, at three widths in both themes, land in `e2e/screenshots`:

```bash
task test:screenshots
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

## Run the pipeline locally

[IstarCI](https://github.com/devpro/istarci) runs the GitHub Actions pipeline in Docker before the push.
`istarci add` and `istarci install-hook` set it up for this repository.
`task ci:wait` waits for the run of the last commit and prints the log of each job that failed.
