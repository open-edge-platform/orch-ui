/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import Gpu from "./Gpu";
import GpuPom from "./Gpu.pom";

const pom = new GpuPom();
describe("<Gpu />", () => {
  const gpu: infra.HostgpuResourceRead = {
    capabilities: ["capabilities1", "capabilities2"],
    description: "description",
    deviceName: "deviceName",
    product: "model",
    pciId: "pci_identifier",
    vendor: "vendor",
  };
  describe("with well formatted data", () => {
    beforeEach(() => {
      cy.mount(<Gpu data={[gpu]} />);
    });
    it("renders properly", () => {
      pom.el.gpuTable.should("be.visible");
    });
    it("displays correct amount of rows", () => {
      pom.table.getRows().should("have.length", 1);
    });
  });
  describe("with empty cabalities", () => {
    it("displays 'deviceName' for the corresponding column", () => {
      cy.mount(<Gpu data={[{ ...gpu, capabilities: [] }]} />);
      pom.table.getCell(1, 1).contains("deviceName");
    });
    it("displays 'N/A' for the corresponding column", () => {
      cy.mount(<Gpu data={[{ ...gpu, capabilities: [] }]} />);
      pom.table.getCell(1, 3).contains("N/A");
    });
  });
});
