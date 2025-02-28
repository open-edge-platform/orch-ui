/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { cyGet } from "@orch-ui/tests";
import { assignedWorkloadHostThree as hostThree } from "@orch-ui/utils";
import ResourceDetails, { ResourceTypeTitle } from "./ResourceDetails";
import ResourceDetailsPom from "./ResourceDetails.pom";

let pom: ResourceDetailsPom;

describe("<ResourceDetails/>", () => {
  // TODO: potentially make this generic to avoid boilerplate
  it("should work with memory data", () => {
    if (!hostThree.memoryBytes) throw new Error("Memory data missing");
    pom = new ResourceDetailsPom();
    const memory = hostThree.memoryBytes;
    const title: ResourceTypeTitle = "Memory";

    cy.mount(<ResourceDetails title={title} data={memory} />);

    pom.el.memory.should("be.visible");
  });

  it("should work with storage data", () => {
    if (!hostThree.hostStorages) throw new Error("Storage data missing");
    pom = new ResourceDetailsPom(undefined, "storageTable");
    const storage = hostThree.hostStorages;
    const title: ResourceTypeTitle = "Storage";

    cy.mount(<ResourceDetails title={title} data={storage} />);

    const rows = pom.table.getRows();
    rows.should("have.length", storage.length);
  });

  it("should work with gpu data", () => {
    if (!hostThree.hostGpus) throw new Error("GPU data missing");
    pom = new ResourceDetailsPom(undefined, "gpuTable");
    const gpu = hostThree.hostGpus;
    if (!gpu) throw new Error("GPU data missing");
    const title: ResourceTypeTitle = "GPUs";

    cy.mount(<ResourceDetails title={title} data={gpu} />);

    const rows = pom.table.getRows();
    rows.should("have.length", gpu.length);
  });

  xit("should work with interface data", () => {
    if (!hostThree.hostNics) throw new Error("Interface data missing");
    pom = new ResourceDetailsPom(undefined, "interfaceTable");
    const interfaces = hostThree.hostNics;
    if (!interfaces) throw new Error("Interfaces data missing");
    const title: ResourceTypeTitle = "Interfaces";

    cy.mount(<ResourceDetails title={title} data={interfaces} />);

    cy.get(".spark-heading").should("have.length", hostThree.hostNics?.length);

    const firstInterface = hostThree.hostNics?.[0] ?? {};

    cyGet("interface").contains(firstInterface.deviceName!).click();
    cy.get(".spark-heading + div").should("contain.text", "DOWN");
    cy.get(".spark-heading + div").should("contain.text", firstInterface.mtu);
    cy.get(".spark-heading + div").should(
      "contain.text",
      firstInterface.macAddr,
    );
    firstInterface.ipaddresses?.forEach((ip) => {
      cy.get(".spark-heading + div").should("contain.text", ip.address);
    });
    cy.get(".spark-heading + div").should(
      "contain.text",
      firstInterface.pciIdentifier,
    );
    cy.get(".spark-heading + div").should(
      "contain.text",
      firstInterface.sriovVfsNum,
    );
    cy.get(".spark-heading + div").should(
      "contain.text",
      firstInterface.sriovVfsTotal,
    );
  });

  it("should work with USB data", () => {
    if (!hostThree.hostUsbs) throw new Error("USB data missing");
    pom = new ResourceDetailsPom(undefined, "usbTable");
    const usb = hostThree.hostUsbs;
    if (!usb) throw new Error("USB data missing");
    const title: ResourceTypeTitle = "USB";

    cy.mount(<ResourceDetails title={title} data={usb} />);

    const rows = pom.table.getRows();
    rows.should("have.length", usb.length);
  });
});
