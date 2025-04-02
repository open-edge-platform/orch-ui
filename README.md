<!---
  SPDX-FileCopyrightText: (C) 2022 Intel Corporation
  SPDX-License-Identifier: Apache-2.0
-->

# Orchestrator GUI Web User Interface

## Overview

This implements the web user interface for the Orchestrator, allowing the user to do most of the features of the product in an intuitive, visual, manor without having learn all the complexities of the APIs.  That being said, everything the Web UI does and shows comes from the APIs.  This UI is intended for the day to day edge operators, who want to be able to:

- Register, Onboard and Provision hosts
- Create and manage Clusters
- Create and manage Projects
- Create Deployment Packages
- Deploy and manage Deployments
- Create applications and view and edit them in a catalog
- Schedule maintenance windows
- View alerts
- View the state of the system
- View Cluster templates and import new templates

## Get Started

### Edge Orchestrator Mirco Front Ends

This project is a "mono-repo" example of micro front ends (MFEs), with minimal amount of configuration per project.

> Note that MFEs and libraries are being moved to independent repost

There are 5 apps in this repository:

- root - glues everything together, displays the other apps
- app-orch - Manages Application Catalog and Deployments
- cluster-orch - Manages the Clusters
- infra - Manages the Hosts (Edge Infratructure)
- admin - The administrator features (settings and alerts)

In addition, there is a common library that is shared across all apps.

(Note: All sub-projects are React based)

```mermaid
graph TD
    linkStyle default interpolate basis
    A[Root]

    A -->|HTTP| B(Cluster Orch)
    A -->|HTTP| D[Admin]
    A -->|HTTP| E[App Orch]
    A -->|HTTP| F[Infrastructure]
    G[Shared Library]

    style G fill:#ccc,stroke:#999,stroke-width:1px,color:#000,stroke-dasharray: 5 5
```

## Develop

Before developing UI related features or tests in Orchestrator GUI Web User Interface, following development prerequisites are required:

- [Node JS](https://nodejs.org/en/download)

  ```bash
  node -v
  v23.6.0
  ```

- To install [Node JS dependencies](https://www.npmjs.com/) for Orchestrator GUI Web User Interface, execute following command at base folder of repo:

  ```bash
  npm ci
  ```

The code for UI is written in [React](https://react.dev/). The React component code follows the pattern by taking the reference from [Atomic Design](https://atomicdesign.bradfrost.com/chapter-2/).

- To run development server execute following command at base folder of repo:

  ```bash
  npm run app:<mfe-app-name> # <mfe-app-name> can be app-orch, cluster-orch, root, admin and infra.
  ```

> Note: `<mfe-app-name>` can be app-orch, cluster-orch, root, admin and infra.

The test codes are written with Cypress. To test Orchestrator GUI Web User Interface,

```bash
cd tests/<mfe-app-name> # change current working directory to `mfe testing folder within tests folder`
npx cypress open # [--component <component|e2e> --spec ../../apps/<mfe-app-name>/src/components/<path-to-test-files>]

# Alternatively to `cypress open` (for GUI), you can also run cypress with CLI using below command
npx cypress run # [--component <component|e2e> --spec ../../apps/<mfe-app-name>/src/components/<path-to-test-files>]
```

For testing your changes in a virtual machine with deployment, refer to [Build and Deploy Guide](./docs/build.md) documentation.

## Contribute

To learn how to contribute to the project, see the [Contributor's Guide](./CONTRIBUTING.md)

## Community and Support

To learn more about the project, its community, and governance, visit the Edge Orchestrator Community. For support, start with Troubleshooting or contact us.

## License

Orchestrator GUI Web User Interface is licensed under \[Apache-2.0](./LICENSES/Apache-2.0.txt).

Last Updated Date: {March 24, 2025}
