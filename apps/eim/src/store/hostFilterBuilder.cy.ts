/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import {
  buildColumnOrs,
  HostFilterBuilderState,
  LifeCycleState,
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
      expect(state.query).to.eq("(registered)");
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
        .join(",")})`;
      _setSearchTerm(state, { payload: defaultSearchTerm, type: "" });
      expect(state.query).to.contain(result);
    });
  });

  describe("the os profiles should", () => {
    beforeEach(() => {
      state = {
        lifeCycleState: LifeCycleState.Registered,
      };
    });
    it("put all values as OR's in final query", () => {
      const result = buildColumnOrs("osProfile", defaultOsProfiles);
      _setOsProfiles(state, { payload: defaultOsProfiles, type: "" });
      expect(state.query).to.contain(result);
    });
  });
});
