/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  buildColumnOrs,
  HostFilterBuilderState,
  LifeCycleState,
  lifeCycleStateQuery,
  searchableColumns,
  _setLifeCycleState,
  _setOsProfiles,
  _setSearchTerm,
} from "./hostFilterBuilder";

const defaultLifeCycleState: LifeCycleState = LifeCycleState.Provisioned;
const defaultOsProfiles: string[] = ["os1", "os2"];
const defaultSearchTerm: string = "searchTerm1";

describe("When constructing the host filter builder", () => {
  let state: HostFilterBuilderState = {} as HostFilterBuilderState;

  describe("the lifeCycleStateQuery should", () => {
    it("contain a mapping for each lifecycle state", () => {
      // Check that the map has entries for all lifecycle states
      expect(lifeCycleStateQuery.size).to.equal(
        Object.keys(LifeCycleState).length,
      );

      // Check if all enum values have corresponding query mappings
      for (const state in LifeCycleState) {
        if (isNaN(Number(state))) {
          // Skip numeric keys from enum
          expect(
            lifeCycleStateQuery.has(
              LifeCycleState[state as keyof typeof LifeCycleState],
            ),
          ).to.be.true;
        }
      }
    });

    it("return correct query strings for each lifecycle state", () => {
      // Verify specific query strings for each lifecycle state
      expect(lifeCycleStateQuery.get(LifeCycleState.Healthy)).to.include(
        "instance.currentState=INSTANCE_STATE_RUNNING",
      );
      expect(lifeCycleStateQuery.get(LifeCycleState.Provisioned)).to.include(
        "currentState=HOST_STATE_ONBOARDED AND has(instance)",
      );
      expect(lifeCycleStateQuery.get(LifeCycleState.Onboarded)).to.include(
        "currentState=HOST_STATE_ONBOARDED AND NOT has(instance)",
      );
      expect(lifeCycleStateQuery.get(LifeCycleState.Registered)).to.include(
        "currentState=HOST_STATE_REGISTERED OR currentState=HOST_STATE_UNSPECIFIED",
      );

      expect(lifeCycleStateQuery.get(LifeCycleState.All)).to.be.undefined;
    });
  });

  describe("the life cycle state should", () => {
    beforeEach(() => {
      state = {
        lifeCycleState: defaultLifeCycleState,
      };
    });
    it("put raw query for life cycle status in query", () => {
      _setLifeCycleState(state, {
        payload: LifeCycleState.Registered,
        type: "",
      });
      expect(state.filter).to.eq(
        lifeCycleStateQuery.get(LifeCycleState.Registered),
      );
    });
  });

  describe("the search term should", () => {
    beforeEach(() => {
      state = {
        lifeCycleState: defaultLifeCycleState,
      };
    });
    it("put all columns together in final query", () => {
      const result = `(${searchableColumns
        .map((value) => `${value}="${defaultSearchTerm}"`)
        .join(" OR ")})`;
      _setSearchTerm(state, { payload: defaultSearchTerm, type: "" });
      expect(state.filter).to.contain(result);
    });
  });

  describe("the os profiles should", () => {
    beforeEach(() => {
      state = {
        lifeCycleState: LifeCycleState.Registered,
      };
    });
    it("put all values as OR's in final query", () => {
      const result = buildColumnOrs(
        "instance.os.profileName",
        defaultOsProfiles,
      );
      _setOsProfiles(state, { payload: defaultOsProfiles, type: "" });
      expect(state.filter).to.contain(result);
    });
  });
});
