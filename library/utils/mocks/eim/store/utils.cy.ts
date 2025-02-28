/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import {
  assignedWorkloadHostTwoUuid as hostTwoGuid,
  regionUsWestId,
} from "../data";
import { metadataExample } from "../data/metadatas";
import { assignedWorkloadHostFour as hostTwo, hostFourMetadata } from "./hosts";
import { instanceOne, instanceTwo } from "./instances";
import { osUbuntu } from "./osresources";
import { siteRestaurantTwo, siteSantaClara } from "./sites";
import { StoreUtils } from "./utils";

describe("The Utils", () => {
  describe("convert host", () => {
    xit("should conver eim.HostRead to Host correctly", () => {
      const hostTwoGeneral: eim.Host = {
        currentPowerState: "POWER_STATE_ON",
        inheritedMetadata: {
          location: hostFourMetadata,
        },
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
    xit("should conver eim.HostRead to eim.HostWrite correctly", () => {
      const hostTwoWrite: eim.HostWrite = {
        currentPowerState: "POWER_STATE_ON",
        inheritedMetadata: {
          ou: [
            {
              key: "region",
              value: regionUsWestId,
            },
          ],
          location: [
            {
              key: "region",
              value: regionUsWestId,
            },
            {
              key: "state",
              value: "Arizona",
            },
            {
              key: "city",
              value: "Phoenix",
            },
          ],
        },
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
      const instanceOneGeneral: eim.Instance = {
        name: "Instance One",
        kind: "INSTANCE_KIND_METAL",
        os: osUbuntu,
      };
      expect(StoreUtils.convertToGeneralInstance(instanceOne)).deep.equal(
        instanceOneGeneral,
      );
    });
    xit("should conver InstanceReadModified to eim.InstanceWrite correctly", () => {
      const instanceOneWrite: eim.InstanceWrite = {
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
