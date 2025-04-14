/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import { instanceOne, instanceTwo } from "@orch-ui/utils";
import { OsConfig } from "./OsConfig";
import { OsConfigPom } from "./OsConfig.pom";

const pom = new OsConfigPom();
describe("<OsConfig/>", () => {
  const os: eim.OperatingSystemResourceRead = {
    resourceId: "currentOsId",
    name: "currentOsName",
    sha256: "currentOsSha256",
    updateSources: [],
    osType: "OPERATING_SYSTEM_TYPE_IMMUTABLE",
  };

  it("should render empty", () => {
    cy.mount(<OsConfig />);
    pom.root.should("exist");
    pom.root.should("contain.text", "(Not set)");
  });
  it("should render any update", () => {
    cy.mount(
      <OsConfig
        instance={{
          ...instanceOne,
          currentOs: os,
          desiredOs: {
            resourceId: "desiredOsId",
            name: "desiredOsName",
            sha256: "desiredOsSha256",
            updateSources: [],
            osType: "OPERATING_SYSTEM_TYPE_IMMUTABLE",
          },
        }}
      />,
    );
    pom.el.osUpdate.should("exist");
  });
  it("should render not any update", () => {
    cy.mount(
      <OsConfig
        instance={{
          ...instanceOne,
          currentOs: os,
          desiredOs: os,
        }}
      />,
    );
    pom.el.osUpdate.should("not.exist");
  });
  it("should render component with os name", () => {
    cy.mount(
      <OsConfig
        instance={{
          ...instanceOne,
          currentOs: os,
        }}
      />,
    );
    pom.el.osUpdate.should("exist");
    pom.root.should("contain.text", "currentOsName");
  });
  it("should render icon when added", () => {
    cy.mount(<OsConfig instance={instanceTwo} iconOnly />);
    pom.el.icon.should("be.visible");
  });
});
