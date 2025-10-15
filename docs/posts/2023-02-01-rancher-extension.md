---
title: Rancher Extension creation
tags: [how-to, kubernetes, frontend]
---

Rancher Extensions is a feature introduced in Rancher v2.7.

<!-- more -->

## Create the extension

Follow [Getting started](https://rancher.github.io/dashboard/extensions/extensions-getting-started):

```bash
# creates skeleton
yarn create @rancher/app rancher-extensions-samples
cd rancher-extensions-samples
rm .vscode/settings.json
```

Look at existing extensions

- [kubewarden/ui](https://github.com/kubewarden/ui)
- [rancher/elemental-ui](https://github.com/rancher/elemental-ui)
- [rancher/ui-plugin-examples](https://github.com/rancher/ui-plugin-examples)

## Run locally

Start a Rancher instance:

```bash
docker run --name local_rancher --privileged -d --restart=unless-stopped -p 3001:443 -p 3000:80 rancher/rancher:v2.7-head
docker logs local_rancher  2>&1 | grep "Bootstrap Password:"
```

Open the local Rancher instance on [localhost:3001](https://localhost:3001) in a browser and enabled Extensions from the Configuration sub-menu.

Run a local environment:

```bash
yarn install
API=https://localhost:3001 yarn dev
```

Open the instance in a browser (the link is displayed in previous command output)

Clean-up:

```bash
docker stop local_rancher
docker rm local_rancher
```

## Troubleshoot issues

`yarn` must be installed, if not run:

```bash
npm install -g yarn
```

By default, `yarn install` won't work on recent Node.js version (for exemple in March 2023, expected version if 16, doesn't work Node.JS 19, see [releases](https://nodejs.org/en/download/releases/)), in that case run:

```bash
yarn install --ignore-engines
# (optional) shows why a package is required
yarn why @achrinza/node-ipc
```
