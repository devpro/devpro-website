# Contributing

## Design

The website is using:

- [Eleventy (11ty)](https://www.11ty.dev/) as static site generator (HTML builder)
- [Pico CSS](https://picocss.com/) as CSS framework (web design)

## File organization

```txt
<root>/
├─ docs/
│  ├─ _includes_/
│  ├─ _layouts/
│  ├─ pages/
│  ├─ posts/
│  │  ├─ YYYY-MM-DD-xxx.md
│  │  └─ <dir>.json           → general frontmatter (metadata) for all files in directory
│  └─ index.md                → home page
└─ eleventy.config.js         → main file
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
