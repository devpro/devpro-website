# Bitnami alternatives

This is an on-going study, started in October 2025, about secured container images and Helm charts for individuals and companies.

:::note

This report is shared for informational purposes only.
It was prepared objectively and may not be exhaustive.
Please share any feedback by creating an [Issue](https://github.com/devpro/tech-notes/issues).

:::

## Context

[Bitnami](https://bitnami.com/), acquired by VMware in 2019 (and later under Broadcom in 2023), has long provided popular open-source container images and Helm charts for applications like PostgreSQL, Redis, WordPress, and more.

These were freely available on Docker Hub and as OCI artifacts, making them a staple for Kubernetes deployments.

However, effective August 28, 2025 (with public catalog deletion postponed to September 29, 2025, after community feedback),
[Bitnami announced major changes](https://news.broadcom.com/app-dev/broadcom-introduces-bitnami-secure-images-for-production-ready-containerized-applications) ([bitnami/charts #35164](https://github.com/bitnami/charts/issues/35164)) under the "Bitnami Secure Images" initiative:

- **Free tier limitations**: Only a curated subset of hardened images (under `docker.io/bitnamisecure`) remains freely available, limited to the latest tag for development use.
No versioned tags, no updates for legacy images
- **Legacy migration**: All existing images and charts move to `docker.io/bitnamilegacy` without further support
- **Paid model**: Full access to hardened, production-ready images, charts, SBOMs, CVE transparency, and enterprise support requires a subscription
- **Helm charts impact**: The source code at [bitnami/charts](https://github.com/bitnami/charts) remains open (Apache 2.0 license), but deploying them will fail out-of-the-box as the container images do not exist anymore

## Community alternatives

### Bitnami latest secure images

 We can keep using [charts.bitnami.com/bitnami](https://github.com/bitnami/charts) by switching to images from [hub.docker.com/bitnamisecure](https://hub.docker.com/u/bitnamisecure).

Pros:

- 🟢 Easiest path to keep using Bitnami Helm charts
- 🟢 Important list of applications

Cons:

- 🔴 Images with latest tag only

### CloudPirates

[CloudPirates](../../organizations/companies/cloudpirates/cloudpirates.md), a German company created in 2021, provide Cloud Native Solutions.

Pros:

- 🟢 Free
- 🟢 Open source Helm charts

Cons:

- 🟠 Not a global company
- 🟠 Doesn't provide images
- 🔴 Limited catalog (14 applications)

Related blog posts:

- [Bitnami Helm Charts: What will change from August 2025 (and what you should do now)](https://www.cloudpirates.io/knowledge/blog/bitnami-helm-charts-was-sich-ab-august-2025-aendert-und-was-du-jetzt-tun-solltest-) - July 24, 2025
- [Our open source Helm Charts as a Bitnami alternative](https://www.cloudpirates.io/knowledge/blog/unsere-open-source-helm-charts-als-bitnami-alternative) - August 22, 2025

### Invidual contributors

Some individuals produce good quality content, such as [11notes images](https://hub.docker.com/u/11notes) ([code](https://github.com/11notes) are minimal, rootless builds ([reddit post](https://www.reddit.com/r/elevennotes/comments/1nqv13c/knowhow_distroless_container_images_why_you/)).

Pros:

- 🟢 Free
- 🟢 Open source

Cons:

- 🟠 Artifact quality may vary (CVEs, ease-of-use, documentation)
- 🔴 No support or guarantee

### Official upstream images

For many technologies, official images are availables [Docker Hub](https://hub.docker.com/) and Helm charts on [Artifact Hub](https://artifacthub.io/).

Pros:

- 🟢 Free
- 🟢 Open source Helm charts

Cons:

- 🟠 Artifact quality may vary (CVEs, ease-of-use)
- 🔴 Multiple sources to monitor and maintain

### Percona

[Percona](../../organizations/companies/percona/percona.md) is an open source database software, support, and services company started in 2006.

Pros:

- 🟢 Free
- 🟢 Open source Helm charts

Cons:

- 🟠 Specific to databases
- 🟠 Not the easiest to install and use
- 🔴 Not on the most recent versions

## Company offerings

### ActiveState

[ActiveState](../../organizations/companies/activestate/activestate.md) provides secure container images.

Pros:

- 🟢 Free catalog of secured images
- 🔵 Full customization for paid customers

Cons:

- 🟠 Only 24 applications in the free catalog
- 🔴 No Helm charts

Related blog post:

- [Navigate the Upcoming Bitnami Changes with ActiveState](https://www.activestate.com/blog/navigate-the-upcoming-bitnami-changes-with-activestate/) - September 4, 2025

### Broadcom

[Bitnami Secure Images](../../organizations/companies/broadcom/bitnami.md) is the new offering that replaces original Bitnami application catalog.

Pros:

- 🟢 Easiest path to keep using Bitnami Helm charts
- 🟢 Important list of applications

Cons:

- 🟠 Not open source
- 🔴 No free access

### ChainGuard

[Chainguard images](../../organizations/companies/chainguard/chainguard.md) is an offering from the trending company Chainguard, created in 2021.

Pros:

- 🟢 Important list of applications (1 753)
- 🟢 Free to start using with the "Starter Images"
- 🟢 Focus on security
- 🔵 Helm charts for paid customers

Cons:

- 🟠 Not open source
- 🔴 "Starter Images" with latest tag only

### Docker

[Hardened Images](../../organizations/companies/docker/hardened-images.md) is a Premium service offered by Docker.

Pros:

- 🟢 Interesting catalog of secured images

Cons:

- 🔴 No free access
- 🔴 No Helm charts

Related blog post:

- [Broadcom’s New Bitnami Restrictions? Migrate Easily with Docker](https://www.docker.com/blog/broadcoms-new-bitnami-restrictions-migrate-easily-with-docker/) - Aug 30, 2025

### Minimus

[Minimus product](../../organizations/companies/minimus/minimus.md) is focused on security.

Pros:

- 🟢 Invidual plan is free
- 🟢 All manadatory features in organization plan (FIPS/STIG, air gap)
- 🔵 Helm charts for paid customers

Cons:

- 🟠 No self-registering
- 🟠 Not open source
- 🔴 Images with latest tag only in individual plan

### RapidFort

[RapidFort Curated Images](../../organizations/companies/rapidfort/rapidfort.md) is an offering part of RapidFort platform.

Pros:

- 🟢 Focused on security and minimal images with a unique approach
- 🟢 Open source community images
- 🟢 Fast reply on contacts
- 🔵 Very large catalog
- 🔵 Web platform with Kubernetes monitoring (agent)

Cons:

- 🟠 No self-registering
- 🔴 No Helm charts

Related blog post:

- [Bitnami Goes Behind Paywall: RapidFort's Curated Near-Zero CVE Images Offer Superior Alternative](https://www.rapidfort.com/blog/bitnami-goes-behind-paywall-rapidforts-curated-near-zero-cve-images-offer-superior-alternative) - September 5, 2025

### Red Hat

[Red Hat Ecosystem Catalog](../../organizations/companies/redhat/ecosystem-catalog.md) is provided by Red Hat partner ecosystem.

Pros:

- 🟢 Provided by a leader in Linux / Cloud Native

Cons:

- 🟠 Not open source
- 🔴 No free access

### SUSE

[SUSE Application Collection](../../organizations/companies/suse/application-collection.md) is a service provided by the company which provided the first Linux distribution for enterprises.

Pros:

- 🟢 Provided by a company with extensive expertise on securing systems
- 🟢 Very nice websites / user experience
- 🟢 Helm charts
- 🟢 Catalog keeps growing with priority given on customer requests

Cons:

- 🟠 Limited set of applications
- 🟠 Not open source
- 🔴 No free/individual access

## Use cases

### MongoDB server

:::info

Vulnerabilities were checked with [Trivy](../../organizations/companies/aqua/trivy.md) and size retrieved with [Skopeo](../../organizations/communities/containers/skopeo.md)

:::

Company      | Free image                                | <span title="Last run 2025-10-07">CVEs</span>           | Size   | Helm charts
-------------|-------------------------------------------|---------------------------------------------------------|--------|---------------------------------------------------
Broadcom     | `bitnamisecure/mongodb:latest`            | <span title="MEDIUM: 1, HIGH: 1">🟠</span> 2            | 280 MB | `oci://registry-1.docker.io/bitnamicharts/mongodb`
Chainguard   | `cgr.dev/chainguard/mongodb:latest`       | <span title="MEDIUM: 0, HIGH: 0">🟢</span> 0            | 104 MB | For paid customers only
CloudPirates | Official images from software vendors     | <span title="MEDIUM: 1, HIGH: 1">🟠</span> 2            | N/A    | `oci://registry-1.docker.io/cloudpirates/mongodb`
MongoDB      | `docker.io/mongo:8.0.15`                  | <span title="MEDIUM: 1, HIGH: 1">🟠</span> 2            | 254 MB | Community chart is complicated to use
Percona      | `percona/percona-server-mongodb:7.0`      | <span title="LOW: 37, MEDIUM: 19, HIGH: 1">🔴</span> 57 | 182 MB | Chart is not easy to use
RapidFort    | `rapidfort/mongodb-official:8.0.14-noble` | <span title="MEDIUM: 1, HIGH: 1">🟠</span> 2            | 232 MB | N/A
