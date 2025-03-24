# Build

The UI is comprised of 5 different micro front-ends and each one of them is deployed via a separate Docker container and Helm chart.

For simplicity every MFE can be build from the root of the repository with the followin command:

```bash
make docker-build -C apps/<name>
```

The above command will build a Docker image tagged as the name of the MFE and the version container in the corresponding `VERSION` file.

To build an image with a different registry, tag or version the following command is available

```bash
DOCKER_REGISTRY=<registry> DOCKER_REPOSITORY=edge-orch/orch-ui  VERSION=dev make docker-build -C apps/<name>
```

## Update an existing deployment with custom images

Custom built images can easily be used in ArgoCD to test development code. In order to do that locate the cluster-configuration you are using to deploy (these configurations are defined in the `edge-manageability-framework` repository, for example: `dev-coder-minimal`) and modify it as in the following example:

```yaml
postCustomTemplateOverwrite:
  web-ui-root:
    image:
      registry:
        name: amr-registry-pre.caas.intel.com
      pullPolicy: Always
      repository: edge-orch/orch-ui
      tag: "dev"
  web-ui-app-orch:
    image:
      registry:
        name: amr-registry-pre.caas.intel.com
      pullPolicy: Always
      repository: edge-orch/orch-ui
      tag: "dev"
  web-ui-cluster-orch:
    image:
      registry:
        name: amr-registry-pre.caas.intel.com
      pullPolicy: Always
      repository: edge-orch/orch-ui
      tag: "dev"
  web-ui-fm:
    image:
      registry:
        name: amr-registry-pre.caas.intel.com
      repository: edge-orch/orch-ui
      pullPolicy: Always
      tag: "dev"
  web-ui-admin:
    image:
      registry:
        name: amr-registry-pre.caas.intel.com
      pullPolicy: Always
      repository: edge-orch/orch-ui
      tag: "dev"
```

## Update an existing deployment with custom charts

> Note that this is only needed in the (rare) case of changes to the helm-charts. To test UI code changes refer to the section above.

If you are making changes to the helm-charts you can configure ArgoCD to use a
Github repository as source for the UI helm chart(s).

> The following example contains the ClusterOrch, AppOrch, Root, EIM, Admin, and Metadata Broker charts, but you most
> likely will be testing one at a time

<!--
1. Update `mage/Magefile.go` to add the repository to ArgoCD

```go
var privateRepos = []string{
	"https://github.com/open-edge-platform/orch-utils",
	"https://github.com/open-edge-platform/edge-manageability-framework",
	"https://github.com/open-edge-platform/orch-ui",
}
```
then run `mage argo:login argo:repoAdd`

> NOTE: when the repository will be moved to open-source, this won't be needed anymore
 -->

Update the application template file in the `edge-manageability-framework` repo.
These templates are located in the ``argocd/applications/templates/` folder

**web-ui-root.yaml**

```yaml
- repoURL: https://github.com/open-edge-platform/orch-ui
  path: apps/root/deploy/
  targetRevision: <your-dev-branch>
```

**web-ui-app-orch.yaml**

```yaml
- repoURL: https://github.com/open-edge-platform/orch-ui
  path: apps/app-orch/deploy/
  targetRevision: <your-dev-branch>
```

**web-ui-cluster-orch.yaml**

```yaml
- repoURL: https://github.com/open-edge-platform/orch-ui
  path: apps/cluster-orch/deploy/
  targetRevision: <your-dev-branch>
```

**web-ui-fm.yaml**

```yaml
- repoURL: https://github.com/open-edge-platform/orch-ui
  path: apps/infra/deploy/
  targetRevision: <your-dev-branch>
```

**web-ui-admin.yaml**

```yaml
- repoURL: https://github.com/open-edge-platform/orch-ui
  path: apps/admin/deploy/
  targetRevision: <your-dev-branch>
```
