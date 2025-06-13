# File Structure

```text
📁 mocks
├── 📁 api-x
│    ├── 📁 data
│    │    ├── 📁 ids
│    │    │    └── 📄 <entity>.ts
│    │    └── 📄 <entity>.ts
│    ├── 📁 handlers
│    │    └── 📄 <entity>.ts
│    ├── 📁 store
│    │    └── 📄 <entity>.ts
│    ├── 📄 base-url.ts
│    ├── 📄 data.helpers.ts
│    └── 📄 store.helpers.ts
├── 📁 api-group
│    ├── 📁 api-y
│    │    └── ...
│    └── 📁 api-y
│         └── ...
├── 📄 base-store.ts
├── 📄 index.ts
└── 📄 mock-utils.ts
```

`<entity>.ts` file represents api entity, e.g.: hosts, regions.

### base-store.ts

Base class for entity `store` class.

### index.ts

Barrel file to export:

- ids
- generated entities
- stores
- handlers (one variable with the collection of all handlers)

### mock-utils.ts

Class containing static helper methods for general use in mocks.

### api/data/ids

Directory for files (e.g., hosts, regions) that will export an object of `id` values of pre-generated entities (usually `resourceId`).

### api/data

Directory for entity files (e.g., hosts, regions) that contain pre-generated mock entities. These entities are generated using helper functions from `data.helpers.ts` and exported as named constants. Example:

```
const hostRamUsageAlertDefinition = generateAlertDefinition(
  AlertDefinitionIds.HOST_RAM_USAGE,
  "HostRAMUsage",
  { state: "new" },
);
...

export const generateAlertDefinition = (
  id: AlertDefinitionId,
  name: string,
  rest?: Partial<Omit<omApi.AlertDefinition, "id" | "name">>,
): omApi.AlertDefinition => ({
  id,
  name,
  state: "applied",
  values: { threshold: "30", duration: "30s" },
  ...rest,
});

```

### api/handlers

Directory for MSW handler files (e.g., hosts, regions) that will contain REST handlers existing for this entity.

### api/store

Directory for store implementation files (e.g., hosts, regions). A typical store needs to provide implementation for:

- convert - method to create entity (Read) from the request body (Write),
- list/get/post/put/delete - optionally provide own implementation if the base one is not relevant.

Store files should not contain any data structures.

### base-url.ts

Common part of the address used in `handlers` rest method definitions. This file might define more than one base address.

### data.helpers.ts

Set of functions (`generate...`) used to help to generate entities.
They should provide parameters for important/required/unique properties of the entity.
Last parameter should allow to optionally fill the rest of entity properties or override default values:

```
rest: Partial<Omit<EntityType, "fieldA" | "fieldB">>
```

### store.helpers.ts

Set of functions used to operate on one or more stores to calculate required data.

# Import style

Inside `mocks` imports to its own files should be `relative`. Avoid using imports from `@orch-ui/utils`.
