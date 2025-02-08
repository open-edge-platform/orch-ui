# IaaS

> Warning: This readme file is outdated.

## Running in dev mode

When running the IaaS application locally, you might want to spin up a mock server, you can do that by:

```shell
REACT_LP_MOCK_API=true npm start
```

If you are running IaaS standalone and want to enable HMR, you can run this command before starting the server:

```shell
REACT_FM_HMR=true
```

## Running against a real API server

In order to contact a real API server while running the UI on your local machine and explicit [CORS](https://developer.mozilla.org/en-US/docs/Glossary/CORS) header must be set.
That can be done by installing the IaaS helm chart providing the following flag:

```shell
--set serviceArgs.allowedCorsOrigins="http://localhost:8080\,http://localhost:8082"
```

or by adding these lines to the value file.

```yaml
serviceArgs:
  allowedCorsOrigins: "http://localhost:8080,http://localhost:8082"
```

NOTE that if the IaaS services are deployed using the `mi-umbrella` chart, the parameters must we wrapped under `mi-api` to take effect, eg:
`--set mi-api.serviceArgs.allowedCorsOrigins="http://localhost:8080\,http://localhost:8082"`

> If you need to run the UI locally against a remote API server managed by someone else, make sure the above settings are applied.

When running the UI itself, we can then configure the appropriate API server in `public/runtime-config.js`:

```js
...
  API: {
    FM: "https://infra.kind.internal",
    CO: "https://cluster-orch.kind.internal",
    MB: "https://metadata.kind.internal",
  },
...
```

## Running Standalone FM (fleet management)

With a coder environment that has the Orch UI's deployed at <https://web-ui.kind.internal>, the followng can be done to run FM (infrastructure) as a standalone application.

1. Delete the web-ui pods

```
helm delete -n orch-ui-system web-ui
```

2. Install the standalone chart

```
helm install -n orch-ui-system fm-ui ./deploy/ -f ./deploy/examples/mi-standalone-apis.yaml
```

3. Wait for the pods to restart. You should now see a `fm-ui` pod running alongside the `medata-broker`. Visit <https://web-ui.kind.internal/>

## Testing `component-libary` changes from local source

You can test the changes to the `component-library` by installing it from
local sources:

> NOTE this assumes that the `component-library` repo is cloned site to side
> to the `fleet-management` repo

```shell
export COMPONENT_LIBRARY_DIR="../frameworks.edge.one-intel-edge.orch-ui.component-library"
npm install $COMPONENT_LIBRARY_DIR/packages/apis
npm install $COMPONENT_LIBRARY_DIR/packages/components
npm install $COMPONENT_LIBRARY_DIR/packages/poms
npm install $COMPONENT_LIBRARY_DIR/packages/utils
npm install $COMPONENT_LIBRARY_DIR/tests
```
