# Orchestrator Web User Interface Build and Deploy Guide

This guide provides steps to update an existing KinD cluster with custom UI changes.

The UI consists of five different micro front-ends (MFEs), each deployed via a separate Docker container and Helm chart.

The MFEs include:

- admin
- infra
- cluster-orch
- app-orch

---

## Build Docker Image

In general to build an MFEs `apps/<name>` from the root of the repository, use the following command:

```bash
make docker-build -C apps/<name>
```

> Note: `<name>` can be replaced with `admin`, `app-orch`, `cluster-orch`, `infra` or `root`.

The above command builds a Docker image tagged with the name of the MFE and the version specified in the corresponding `VERSION` file. To build an image with a custom registry, tag, or version, use the following command:

```bash
DOCKER_REGISTRY=<registry-name> DOCKER_REPOSITORY=edge-orch/orch-ui VERSION=dev-version-1 make docker-build -C apps/<name> 
```

> Note: Ensure that `<registry-name>` is consistent across all commands referenced in this guide.

## Load Docker Image into KinD (Kubernetes in Docker)

> Note: This method works only if the orchestrator is deployed in KinD and the cluster name is `kind` (unless configured with KIND_CLUSTER_NAME=`<my-cluster>`). For KinD to recognize the built image, it must be loaded into the cluster.

To load the image into KinD, use the following command:

```bash
DOCKER_REGISTRY=<registry-name> DOCKER_REPOSITORY=edge-orch/orch-ui  VERSION=dev-version-1 make docker-kind-load -C apps/<name>
```

> Note: Ensure that `<registry-name>` matches the registry used to build the image.

## Method 1: Update Coder with Locally Built Images

To update the cluster configuration for deployment, locate the configuration in the `edge-manageability-framework` repository (e.g., `dev-coder-minimal`) and modify it as shown below:

```yaml
postCustomTemplateOverwrite:
  web-ui-root:
    image:
      registry:
        name: <registry-name>
      pullPolicy: <IfNotPresent|Always|Never>
      repository: edge-orch/orch-ui/root
      tag: "dev-version-1"
  web-ui-app-orch:
    image:
      registry:
        name: <registry-name>
      pullPolicy: <IfNotPresent|Always|Never>
      repository: edge-orch/orch-ui/app-orch
      tag: "dev-version-1"
  web-ui-cluster-orch:
    image:
      registry:
        name: <registry-name>
      pullPolicy: <IfNotPresent|Always|Never>
      repository: edge-orch/orch-ui/cluster-orch
      tag: "dev-version-1"
  web-ui-infra:
    image:
      registry:
        name: <registry-name>
      pullPolicy: <IfNotPresent|Always|Never>
      repository: edge-orch/orch-ui/cluster-orch
      tag: "dev-version-1"
  web-ui-admin:
    image:
      registry:
        name: <registry-name>
      pullPolicy: <IfNotPresent|Always|Never>
      repository: edge-orch/orch-ui/admin
      tag: "dev-version-1"
```

> Note: If you only build one app you will only provide an image override for that app under the `postCustomTemplateOverwrite:`.

## Method 2: Publish Images to a Hosted/Cloud-Based Registry

To build and publish images to an online registry (e.g., DockerHub), use the following commands

```shell
VERSION=<my-tag> DOCKER_REGISTRY=<registry-name> make docker-build
VERSION=<my-tag> DOCKER_REGISTRY=<registry-name> make docker-push
```

## Apply the Docker Image Change for a UI App

To apply the Docker image change for a UI app, navigate to the `edge-manageability-framework` repository. For any cluster configuration (e.g., `dev-coder-minimal`), use the following command:

```bash
mage deploy:orchLocal dev-coder-minimal
```

## Update an existing deployment with custom charts

> Note: This step is required only in rare cases where changes are made to the Helm charts. For testing UI code changes, refer to the sections above.

If you are making changes to the Helm charts, configure ArgoCD to use a GitHub repository as the source for the UI Helm charts. For example, update the application template files in the edge-manageability-framework repository. These templates are located in the argocd/applications/templates/ folder.

> [!NOTE]
> You need to replace the YAML block in `edge-manageability-framework` repo, 
> within an application template file located at `argocd/applications/templates/` with the lines below,
> not merge them.
>
> ```diff
> -   - repoURL: {{ required "A valid chartRepoURL entry required!" .Values.argo.chartRepoURL }}
> -     chart: orch-ui/charts/orch-ui-admin
> -     targetRevision: 2.0.4
> +   - repoURL: https://github.com/open-edge-platform/orch-ui
> +     path: apps/admin/deploy/
> +     targetRevision: <your-dev-branch>
> ```

The following example contains the ClusterOrch, AppOrch, Root, Infra, Admin, and Metadata Broker charts, but you most likely will be testing one at a time

> Note: replace `<your-dev-branch>` with the UI branch within `orch-ui` repo.

### web-ui-root.yaml

```yaml
- repoURL: https://github.com/open-edge-platform/orch-ui
  path: apps/root/deploy/
  targetRevision: <your-dev-branch>
```

### web-ui-app-orch.yaml

```yaml
- repoURL: https://github.com/open-edge-platform/orch-ui
  path: apps/app-orch/deploy/
  targetRevision: <your-dev-branch>
```

### web-ui-cluster-orch.yaml

```yaml
- repoURL: https://github.com/open-edge-platform/orch-ui
  path: apps/cluster-orch/deploy/
  targetRevision: <your-dev-branch>
```

### web-ui-infra.yaml

```yaml
- repoURL: https://github.com/open-edge-platform/orch-ui
  path: apps/infra/deploy/
  targetRevision: <your-dev-branch>
```

### web-ui-admin.yaml

```yaml
- repoURL: https://github.com/open-edge-platform/orch-ui
  path: apps/admin/deploy/
  targetRevision: <your-dev-branch>
```

After making any changes in any of the above files, commit your changes into a `dev branch` that's part of the `edge-manageability-framework`.

## Apply the Helm Chart for a UI MFE

For any cluster-configuration, say `dev-coder-minimal`, use the following command to apply the helm chart changes:

```bash
mage deploy:orchLocal dev-coder-minimal
```
