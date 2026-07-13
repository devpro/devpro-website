# Backlog

This file lists the pending work and improvement ideas for the devpro.fr website.

## Navigation rework: topic paths

The goal is to rework the navigation around curated "paths" that guide visitors through a specific topic instead of flat content-type lists (Blog, Guides, News).
A path is a landing page for one topic that gathers the related guides, blog posts, talks, and news items in a suggested reading order.
Candidate paths based on the existing content are Containers & Kubernetes, .NET, Web development, GitOps & DevOps, and Static websites.

Task                                                                                                        | Notes
------------------------------------------------------------------------------------------------------------|--------------------------------------------------------
Define the list of topic paths and their slugs                                                              | Start from the existing tags and guide categories
Add a `paths` data file (YAML) describing each path with title, description, and ordered content references | Same approach as `services.yaml` and `projects.yaml`
Create a `path.njk` template with pagination over the paths data                                            | Mirror the `guides.njk` and `news-year.njk` patterns
Add a topic tag on news items and blog posts so they can be attached to a path automatically                | Guides already do this through the `relatedTags` front matter and the `withAnyTag` filter
Extend the guide layout related-content idea to talks and news                                              | The guide layout currently lists blog posts only
Replace or complement the top navigation entries with the paths                                             | `src/_data/navigation.js` is the single place to update
Add a "Start here" section on the home page pointing to the paths                                           | The home layout already has a two-column grid to extend

## Technical improvements

Task                                                                | Notes
--------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------
Make blog card excerpts link-free                                   | The card is wrapped in a link, so any excerpt with a link or a linkified bare domain produces invalid nested anchors and broken styling
Remove the dead `markdownParser` setup in `eleventy.config.js`      | `setLibrary` is commented out, only `contentPlugin` receives the parser
Run pagefind from the local dependency instead of `npx -y pagefind` | `npx -y` may download a different version than the one pinned in `package.json`
Align the `license` field in `package.json` with the LICENSE file   | package.json says ISC while the LICENSE file is CC BY-NC-ND 4.0
Fill in the `author` and `keywords` fields in `package.json`        | Currently empty
Add a link checker to CI                                            | External news links rot quickly
Add an HTML validator or accessibility check to CI                  | For example pa11y or html-validate on the `_site` output
