/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { arm } from "@orch-ui/apis";
import { MetadataPair } from "@orch-ui/components";
import { parseError } from "@orch-ui/utils";
import ApplicationDetailsServicePom, {
  mockEndpointData,
} from "../components/organisms/deployments/ApplicationDetailsServices/ApplicationDetailsServices.pom";
import { RootState, store } from "../store";
import {
  generateMetadataPair,
  generateName,
  invalidateCacheByTagname,
  printName,
  printStatus,
} from "./global";

const appResourceManager = arm.resourceManager;

describe("the global utilities", () => {
  describe("generateName", () => {
    it("should return expected string property", () => {
      expect(generateName("default profile")).to.equal("default-profile");
    });
  });
  describe("printName", () => {
    it("should return expected string property", () => {
      expect(printName("name")).to.equal("name");
      expect(printName("name", "display name")).to.equal("display name (name)");
    });
  });
  describe("printStatus", () => {
    it("should return expected string property", () => {
      expect(printStatus("STATE_TESTING")).to.equal("Testing");
    });
  });
  describe("invalidateTagByTagName", { retries: 2 }, () => {
    const endpointPom = new ApplicationDetailsServicePom();
    const cacheApiArg: arm.EndpointsServiceListAppEndpointsApiArg = {
      appId: "test-app",
      clusterId: "test-cluster-id",
      projectName: "",
    };
    let state: RootState;

    before(() => {
      invalidateCacheByTagname("EndpointsService", store.dispatch);

      // Call to cache data
      endpointPom.interceptApis([endpointPom.api.getEndpointList]);
      store.dispatch(
        appResourceManager.endpoints.endpointsServiceListAppEndpoints.initiate(
          cacheApiArg,
        ),
      );
      endpointPom.waitForApi([endpointPom.api.getEndpointList]);
    });

    it("should see stored cache", () => {
      // execute after getting cache data
      store
        .dispatch(
          appResourceManager.endpoints.endpointsServiceListAppEndpoints.initiate(
            cacheApiArg,
          ),
        )
        .then(() => {
          // Get updated store after call
          state = store.getState();

          // Read status and cached data with rtk.select()
          const { status, data, error } =
            appResourceManager.endpoints.endpointsServiceListAppEndpoints.select(
              cacheApiArg,
            )(state);

          expect(status).to.be.eq("fulfilled");
          expect(error ?? "no error").to.be.eq("no error");
          expect(data).to.deep.include(mockEndpointData);
        });
    });

    it("should invalidate cache to call new api", () => {
      // Note: not including this line will make the test fail, by `status = fulfilled`
      invalidateCacheByTagname("EndpointsService", store.dispatch);

      // See app endpoints call upon invalidate cache
      endpointPom.interceptApis([endpointPom.api.getEndpointListFail]);
      store.dispatch(
        appResourceManager.endpoints.endpointsServiceListAppEndpoints.initiate(
          cacheApiArg,
        ),
      );
      endpointPom.waitForApi([endpointPom.api.getEndpointListFail]);

      // Get updated store
      state = store.getState();

      // Check that the cache for the tag is invalidated via uncached `API error`. Read status with rtk.select().
      const { status, error } =
        appResourceManager.endpoints.endpointsServiceListAppEndpoints.select(
          cacheApiArg,
        )(state);

      // This will be `pending` as no api response will yeild `error` prompting to retry
      expect(status).not.to.be.eq("fulfilled");
      expect(parseError(error).status).to.be.eq(400);
    });
  });
  describe("generateMetadataPair", () => {
    const expectedPairs: MetadataPair[] = [
      {
        key: "oneKey",
        value: "one-value",
      },
      {
        key: "twoKey",
        value: "two-value",
      },
    ];
    it("should return expected metadata pairs", () => {
      expect(
        generateMetadataPair({
          oneKey: "one-value",
          twoKey: "two-value",
        }),
      ).to.deep.equal(expectedPairs);
    });
  });
});
