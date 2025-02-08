/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { hostThree, humanFileSize } from "@orch-ui/utils";
import { ResourceTypeTitle } from "./ResourceDetails";
import { HostResourcesCpuRead } from "./resourcedetails/Cpu";
import ResourceIndicator from "./ResourceIndicator";
import ResourceIndicatorPom from "./ResourceIndicator.pom";

/* eslint-disable @typescript-eslint/no-empty-function */
const pom = new ResourceIndicatorPom();
describe("<ResourceIndicator/>", () => {
  it("should work with cpu data", () => {
    const coreValues = hostThree.cpuCores ?? 0;

    const title: ResourceTypeTitle = "CPUs";

    cy.mount(
      <ResourceIndicator
        data={
          [
            {
              cores: coreValues,
              model: "model",
            },
          ] as HostResourcesCpuRead[]
        }
        onClickCategory={() => {}}
        units="cores"
        title={title}
        value={coreValues.toString() ?? "0"}
      />,
    );

    pom.el.title.contains(title);
    pom.el.value.contains(`${coreValues} cores`);
  });

  it("should work with storage data", () => {
    if (!hostThree.hostStorages) throw new Error("Storage data missing");
    const storage = hostThree.hostStorages;

    const coreValues = storage.reduce((total, storage) => {
      return total + Number(storage.capacityBytes);
    }, 0);

    const title: ResourceTypeTitle = "Storage";

    const fileSize = humanFileSize(coreValues);
    if (!fileSize)
      throw new Error("coreValues is null, test can't mount component");
    cy.mount(
      <ResourceIndicator
        data={storage}
        onClickCategory={() => {}}
        units="tb"
        title={title}
        value={fileSize.value}
      />,
    );

    pom.el.title.contains(title);
    pom.el.value.contains("3.49 tb");
  });
  it("should work with interface data", () => {
    if (!hostThree.hostNics) throw new Error("Interface data missing");
    const interfaces = hostThree.hostNics;
    const coreValues = interfaces.length.toString();
    const title: ResourceTypeTitle = "Interfaces";

    cy.mount(
      <ResourceIndicator
        data={interfaces}
        onClickCategory={() => {}}
        units=""
        title={title}
        value={coreValues}
      />,
    );

    pom.el.title.contains(title);
    pom.el.value.contains("4");
  });
  it("should work with memory data", () => {
    if (!hostThree.memoryBytes) throw new Error("Memory data missing");
    const memory = hostThree.memoryBytes;
    const title: ResourceTypeTitle = "Memory";

    const fileSize = humanFileSize(parseInt(memory));
    if (!fileSize)
      throw new Error("memory is null, test can't mount component");
    cy.mount(
      <ResourceIndicator
        data={memory}
        onClickCategory={() => {}}
        units="gb"
        title={title}
        value={fileSize.value}
      />,
    );

    pom.el.title.contains(title);
    pom.el.value.contains("1.00 gb");
  });
  it("should work with gpu data", () => {
    if (!hostThree.hostGpus) throw new Error("GPU data missing");
    const gpu = hostThree.hostGpus;
    const coreValues = gpu.length.toString();
    const title: ResourceTypeTitle = "GPUs";

    cy.mount(
      <ResourceIndicator
        data={gpu}
        onClickCategory={() => {}}
        units="gpu"
        title={title}
        value={coreValues}
      />,
    );

    pom.el.title.contains(title);
    pom.el.value.contains("5");
  });

  it("should work with USB data", () => {
    if (!hostThree.hostUsbs) throw new Error("USB data missing");
    const usb = hostThree.hostUsbs ?? [];
    const coreValues = usb.length.toString();
    const title: ResourceTypeTitle = "USB";

    cy.mount(
      <ResourceIndicator
        data={usb}
        onClickCategory={() => {}}
        units=""
        title={title}
        value={coreValues}
      />,
    );

    pom.el.title.contains(title);
    pom.el.value.contains(usb.length);
  });
});
