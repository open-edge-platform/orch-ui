/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { assignedWorkloadHostTwoUuid as hostTwoGuid } from "../data";
import { metadataExample } from "../data/metadatas";
import { assignedWorkloadHostFour as hostTwo, hostFourMetadata } from "./hosts";
import { instanceOne, instanceTwo } from "./instances";
import { osUbuntu } from "./osresources";
import { siteRestaurantTwo, siteSantaClara } from "./sites";
import { StoreUtils } from "./utils";

describe("The Utils", () => {
  describe("convert host", () => {
    xit("should conver infra.HostRead to Host correctly", () => {
      const hostTwoGeneral: infra.HostResourceRead = {
        inheritedMetadata: hostFourMetadata,
        uuid: hostTwoGuid,
        name: "Host 2",
        site: siteRestaurantTwo,
        metadata: metadataExample,
        instance: instanceTwo,
      };
      expect(StoreUtils.convertToGeneralHost(hostTwo)).deep.equal(
        hostTwoGeneral,
      );
    });
    xit("should convert infra.HostRead to infra.HostWrite correctly", () => {
      const hostTwoWrite: infra.HostResourceWrite = {
        uuid: hostTwoGuid,
        name: "Host 2",
        site: siteSantaClara,
        metadata: metadataExample,
      };
      expect(StoreUtils.convertToWriteHost(hostTwo)).deep.equal(hostTwoWrite);
    });
  });
  describe("convert instance", () => {
    it("should conver InstanceReadModified to Instance correctly", () => {
      const instanceOneGeneral: infra.InstanceResource = {
        name: "Instance One",
        kind: "INSTANCE_KIND_METAL",
        os: osUbuntu,
      };
      expect(StoreUtils.convertToGeneralInstance(instanceOne)).deep.equal(
        instanceOneGeneral,
      );
    });
    xit("should conver InstanceReadModified to infra.InstanceWrite correctly", () => {
      const instanceOneWrite: infra.InstanceResourceWrite = {
        name: "Instance One",
        kind: "INSTANCE_KIND_METAL",
        os: osUbuntu,
        hostID: "",
        osID: "",
      };
      expect(StoreUtils.convertToWriteInstance(instanceOne)).deep.equal(
        instanceOneWrite,
      );
    });
  });
});
