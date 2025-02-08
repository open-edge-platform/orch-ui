/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */
import { arm } from "@orch-ui/apis";
import { Status } from "@orch-ui/components";
import { deploymentOne, deploymentTwo } from "@orch-ui/utils";
import {
  displayNamedItemSort,
  generateAppWorkloadStatus,
  generateContainerStatus,
  generateContainerStatusIcon,
} from "./app-catalog";

type VMState = Record<
  Exclude<arm.VirtualMachineStatus["state"], undefined>,
  string
>;
type PodStatusUI = Record<Exclude<arm.PodStatus["state"], undefined>, string>;

describe("the app-catalog utilities", () => {
  describe("displayNamedItemSort", () => {
    it("should return 1", () => {
      expect(displayNamedItemSort(deploymentOne, deploymentTwo)).to.equal(-1);
    });
    it("should return -1", () => {
      expect(displayNamedItemSort(deploymentTwo, deploymentOne)).to.equal(1);
    });
  });
  describe("generateContainerStatus", () => {
    it("should return expected string property", () => {
      expect(generateContainerStatus({ containerStateRunning: {} })).to.equal(
        "Running",
      );
      expect(
        generateContainerStatus({ containerStateTerminated: { exitCode: 0 } }),
      ).to.equal("Terminated(Success)");
      expect(
        generateContainerStatus({ containerStateTerminated: { exitCode: 1 } }),
      ).to.equal("Terminated(Fail)");
      expect(generateContainerStatus({ containerStateWaiting: {} })).to.equal(
        "Waiting",
      );
    });
  });
  describe("generateContainerStatusIcon", () => {
    it("should return expected string property", () => {
      expect(
        generateContainerStatusIcon({ containerStateRunning: {} }),
      ).to.equal(Status.Ready);
      expect(
        generateContainerStatusIcon({
          containerStateTerminated: { exitCode: 0 },
        }),
      ).to.equal(Status.Ready);
      expect(
        generateContainerStatusIcon({
          containerStateTerminated: { exitCode: 1 },
        }),
      ).to.equal(Status.Error);
      expect(
        generateContainerStatusIcon({ containerStateWaiting: {} }),
      ).to.equal(Status.NotReady);
    });
  });
  describe("generateAppWorkloadStatus", () => {
    it("should return expected string property", () => {
      const assertionsVM: VMState = {
        STATE_RUNNING: Status.Ready,
        STATE_PROVISIONING: Status.Ready,
        STATE_MIGRATING: Status.Ready,
        STATE_STARTING: Status.Ready,
        STATE_TERMINATING: Status.Ready,
        STATE_WAITING_FOR_VOLUME_BINDING: Status.Ready,
        STATE_CRASH_LOOP_BACKOFF: Status.Error,
        STATE_ERROR_DATA_VOLUME: Status.Error,
        STATE_ERROR_IMAGE_PULL: Status.Error,
        STATE_ERROR_IMAGE_PULL_BACKOFF: Status.Error,
        STATE_ERROR_PVC_NOT_FOUND: Status.Error,
        STATE_ERROR_UNSCHEDULABLE: Status.Error,
        STATE_PAUSED: Status.Unknown,
        STATE_STOPPED: Status.Unknown,
        STATE_STOPPING: Status.Unknown,
      };

      for (const key in assertionsVM) {
        const state = key as keyof VMState;
        const aw: arm.AppWorkload = {
          type: "TYPE_VIRTUAL_MACHINE",
          virtualMachine: { status: { state: state } },
          id: "testing",
          name: "testing",
        };
        const expected = generateAppWorkloadStatus(aw);
        const equals = assertionsVM[state];
        expect(expected).eq(equals);
      }
      const assertionsPod: PodStatusUI = {
        STATE_RUNNING: Status.Ready,
        STATE_SUCCEEDED: Status.Ready,
        STATE_PENDING: Status.Unknown,
        STATE_FAILED: Status.Error,
      };
      for (const key in assertionsPod) {
        const state = key as keyof PodStatusUI;
        const aw: arm.AppWorkload = {
          type: "TYPE_POD",
          pod: { status: { state: state } },
          id: "testing",
          name: "testing",
        };
        expect(generateAppWorkloadStatus(aw)).eq(assertionsPod[state]);
      }
    });
  });
});
