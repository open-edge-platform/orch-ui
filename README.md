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

## Edge Orchestrator Mirco Front Ends

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

Read more about {Name} in the \[User
Guide\](<https://website-name.com>).


See the \[Documentation\](<https://website-name.com>) to get started
using {Name}.

## License

{Project Name} is licensed under \[license
name\](https://website-name.com).

Last Updated Date: {January 17, 2025}
