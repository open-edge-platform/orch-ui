# E2E Tests

## Setup

After deploying the orchestrator on Coder and setting up all required
certificates and routers, create the default MT setup with:

```shell
mage tenantUtils:createDefaultMtSetup
```

## Test Execution

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
CYPRESS_LOG_FOLDER=logs npx cypress run --e2e
```

To customize the orchestrator password:

```shell
CYPRESS_ORCH_DEFAULT_PASSWORD="Pleaseletme1n\!" npx cypress run --e2e
```

## Best Practices

- Add reusable test cases in the `cypress/e2e/pages` folder.
- Ensure to clean up the records created during testing
  inside the `after` block of each smoke test.
