/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import ClusterManagement from "./ClusterManagement";

describe("<ClusterManagement />", () => {
  describe("should render ClusterManagement Page", () => {
    it("should render a list of regions", () => {
      cy.mount(<ClusterManagement />);
      cy.contains("Cluster List");
    });
  });
});
