# Application Orchestration UI

## Running in Development Mode

When running the `apps/app-orch` locally,
you might want to spin up a mock server.
You can do that by using the following command:

```shell
REACT_LP_MOCK_API=true npm start
```

For Hot Module Replacement (HMR),
use the following command before starting the server:

```shell
REACT_MA_HMR=true
```
