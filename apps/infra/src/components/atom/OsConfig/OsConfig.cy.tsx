/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { instanceOne, instanceTwo } from "@orch-ui/utils";
import { OsConfig } from "./OsConfig";
import { OsConfigPom } from "./OsConfig.pom";

const pom = new OsConfigPom();
describe("<OsConfig/>", () => {
  const os: infra.OperatingSystemResourceRead = {
    resourceId: "currentOsId",
    name: "Ubuntu",
    sha256: "currentOsSha256",
    osType: "OS_TYPE_IMMUTABLE",
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
          os: os,
          osUpdateAvailable: "Ubuntu",
          updatePolicy: {
            name: "Ubuntu",
            updateSources: [],
            targetOs: {
              resourceId: "ubuntuOsId",
              name: "Ubuntu",
              sha256: "desiredOsSha256",
              osType: "OS_TYPE_IMMUTABLE",
            },
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
          osUpdateAvailable: "",
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
          os: os,
          osUpdateAvailable: "Ubuntu",
        }}
      />,
    );
    pom.el.osUpdate.should("exist");
    pom.root.should("contain.text", "Ubuntu");
  });
  it("should render icon when added", () => {
    cy.mount(
      <OsConfig
        instance={{ ...instanceTwo, osUpdateAvailable: "Ubuntu" }}
        iconOnly
      />,
    );
    pom.el.icon.should("be.visible");
  });
});
