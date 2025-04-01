/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import { regionPortland } from "@orch-ui/utils";
import Region from "./Region";
import RegionPom from "./Region.pom";

describe("<Region />", () => {
  const pom: RegionPom = new RegionPom();
  describe("when the API are responding correctly", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.regionsListSuccess]);
      cy.mount(<Region />);
      pom.waitForApis();
    });
    it("should render a list of regions", () => {
      cy.contains("Regions");
      const regions: eim.GetV1ProjectsByProjectNameRegionsApiResponse =
        pom.getDetailOfApi(pom.api.regionsListSuccess, "response");
      pom.regionsTable.getRows().should("have.length", regions.regions?.length);
    });
    it("should render Add button", () => {
      cy.get("button").contains("Add").click();
    });

    it("should delete region", () => {
      pom.delete(regionPortland.resourceId!, regionPortland.name!);
    });
  });

  //xdescribe("when authentication is enabled", () => {
  // const runtimeConfig = {
  //   AUTH: "",
  //   KC_CLIENT_ID: "",
  //   KC_REALM: "",
  //   KC_URL: "",
  //   SESSION_TIMEOUT: 0,
  //   OBSERVABILITY_URL: "testUrl",
  //   TITLE: "",
  //   MFE: {},
  // };
  // FIXME understand why plugin-transform-modules-commonjs fails the build
  // xdescribe("when the user is read-only should", () => {
  //   beforeEach(() => {
  //     cy.stub(shared, "checkAuthAndRole").callsFake(() => {
  //       return false;
  //     });
  //     pom.interceptApis([pom.api.regionsListSuccess]);
  //     cy.mount(<Region />, { runtimeConfig });
  //     pom.waitForApis();
  //   });

  //   it("disable the add button", () => {
  //     pom.el.add.should("be.disabled");
  //   });
  // });
  //});
});
