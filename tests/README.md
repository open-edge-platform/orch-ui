# E2E tests

## Setup

After deploying the orchestrator on coder, and setting up all required
certificates and routers, create the default MT setup with:

```shell
mage tenantUtils:createDefaultMtSetup
```

## Test execution

To run all E2E tests:

```shell
npx cypress run
```

To execute a single test suite, you can run the following command:

```shell
npx cypress run --e2e -s cypress/e2e/admin-smoke.cy.ts
```

To customize the `logs` folder location, use:

```shell
CYPRESS_LOG_FOLDER=logs npx cypress run
```

## Best practices

Add reusable testcases in cypress/e2e/pages folder
Ensure to clean up the records created during testing inside after block of each smoke test
