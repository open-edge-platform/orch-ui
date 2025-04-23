# Infrastructure

> Warning: This README file is outdated.

[CORS]: https://developer.mozilla.org/en-US/docs/Glossary/CORS

## Running in Development Mode

When running the Infrastructure application locally,
you might want to spin up a mock server.
You can do that by using the following command:

```shell
REACT_MOCK_API=true npm start
```

If you are running Infrastructure standalone and want to enable HMR,
you can run this command before starting the server:

```shell
REACT_INFRA_HMR=true
```

## Running against a real API server

To contact a real API server while running the UI on your local machine,
an explicit [CORS] header must be set.
This can be done by installing the Infrastructure helm chart
and providing the following flag:

```shell
--set serviceArgs.allowedCorsOrigins="http://localhost:8080\,http://localhost:8082"
```

Alternatively, you can add these lines to the `values.yaml` file:

```yaml
serviceArgs:
  allowedCorsOrigins: "http://localhost:8080,http://localhost:8082"
```

Note that if the Infrastructure services are deployed
using the `mi-umbrella` chart, the parameters must be wrapped
under `mi-api` to take effect, e.g.:

```shell
--set mi-api.serviceArgs.allowedCorsOrigins="http://localhost:8080,http://localhost:8082"
```

> If you need to run the UI locally against a remote API server
> managed by someone else, make sure the above settings are applied.

When running the UI itself,
configure the appropriate API server in `public/runtime-config.js`:

```js
...
  API: {
    INFRA: "https://infra.kind.internal",
    CO: "https://cluster-orch.kind.internal",
    MB: "https://metadata.kind.internal",
  },
...
```

## Running Standalone Infrastructure

With a Coder environment that has
the Orch UI deployed at <https://web-ui.kind.internal>,
the following steps can be taken to run
INFRA (Infrastructure) as a standalone application:

1. Delete the web-ui pods:

```shell
helm delete -n orch-ui-system web-ui
```

1. Install the standalone chart:

```shell
helm install -n orch-ui-system fm-ui ./deploy/ -f ./deploy/examples/mi-standalone-apis.yaml
```

1. Wait for the pods to restart.
   You should now see an `fm-ui` pod running alongside the `metadata-broker`.
   Visit <https://web-ui.kind.internal/>
