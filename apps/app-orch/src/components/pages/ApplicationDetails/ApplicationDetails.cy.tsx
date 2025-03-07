/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { applicationDetailsResponse } from "@orch-ui/utils";
import ApplicationDetails from "./ApplicationDetails";
import ApplicationDetailsPom from "./ApplicationDetails.pom";

const pom = new ApplicationDetailsPom();
describe("<ApplicationDetails>", () => {
  const mountCfg = {
    routerProps: {
      initialEntries: [
        `/application/${applicationDetailsResponse.application.name}/version/${applicationDetailsResponse.application.version}`,
      ],
    },
    routerRule: [
      {
        path: "/application/:appName/version/:version",
        element: <ApplicationDetails />,
      },
    ],
  };
  describe("when the Application can't be found", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.appDetailsError]);
      cy.mount(<div />, mountCfg);
      pom.waitForApis();
    });
    it("should render", () => {
      pom.root.should("exist");
      pom.empty.el.emptyTitle.should(
        "have.text",
        "Failed at fetching application details",
      );
    });
  });
  describe("when the Application is loaded", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.appDetails]);
      cy.mount(<div />, mountCfg);
      pom.waitForApis();
    });
    it("should render", () => {
      pom.root.should("exist");
      pom.empty.el.emptyTitle.should("not.exist");
    });
  });
});
