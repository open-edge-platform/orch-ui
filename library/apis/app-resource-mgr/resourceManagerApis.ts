import { appResourceManagerApi as api } from "./apiSlice";
export const addTagTypes = [] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({}),
    overrideExisting: false,
  });
export { injectedRtkApi as resourceManager };
export const {} = injectedRtkApi;
