/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { adm } from "@orch-ui/apis";
import { Status } from "@orch-ui/components";
import { admStatusToText, admStatusToUIStatus, isUpdating } from "./global";

describe("The AppDeploymentManager Utils", () => {
  describe("admStatusToUIStatus", () => {
    it("should convert correctly", () => {
      const assertions: {
        [key in Exclude<adm.DeploymentStatusRead["state"], undefined>]: string;
      } = {
        RUNNING: Status.Ready,
        DOWN: Status.Error,
        INTERNAL_ERROR: Status.Error,
        DEPLOYING: Status.NotReady,
        UPDATING: Status.NotReady,
        TERMINATING: Status.NotReady,
        UNKNOWN: Status.Unknown,
        ERROR: Status.Unknown,
        NO_TARGET_CLUSTERS: Status.Unknown,
      };
      for (const key in assertions) {
        expect(
          admStatusToUIStatus({
            state: key as Exclude<adm.DeploymentStatusRead["state"], undefined>,
          }),
        ).eq(
          assertions[
            key as Exclude<adm.DeploymentStatusRead["state"], undefined>
          ],
        );
      }
      expect(admStatusToUIStatus()).eq(Status.Unknown);
    });
  });
  describe("admStatusToText", () => {
    it("should return a readable string", () => {
      const assertions: {
        [key in Exclude<adm.DeploymentStatusRead["state"], undefined>]: string;
      } = {
        RUNNING: "Running",
        DOWN: "Down",
        INTERNAL_ERROR: "Internal error",
        DEPLOYING: "Deploying",
        UPDATING: "Updating",
        TERMINATING: "Terminating",
        UNKNOWN: "Unknown",
        ERROR: "Error",
        NO_TARGET_CLUSTERS: "No target_clusters",
      };
      for (const key in assertions) {
        expect(
          admStatusToText({
            state: key as Exclude<adm.DeploymentStatusRead["state"], undefined>,
          }),
        ).eq(
          assertions[
            key as Exclude<adm.DeploymentStatusRead["state"], undefined>
          ],
        );
      }
      expect(admStatusToText()).eq("unknown status");
      expect(admStatusToText({ message: "some message" })).eq("some message");
    });
  });

  describe("isUpdating", () => {
    it("should return true", () => {
      const assertions: adm.DeploymentStatusRead["state"][] = ["DEPLOYING"];
      for (const key of assertions) {
        expect(isUpdating(key as adm.DeploymentStatusRead["state"])).eq(true);
      }
    });
    it("should return false", () => {
      const assertions: adm.DeploymentStatusRead["state"][] = [
        "UNKNOWN",
        "RUNNING",
        "DOWN",
        "INTERNAL_ERROR",
      ];
      for (const key of assertions) {
        expect(isUpdating(key as adm.DeploymentStatusRead["state"])).eq(false);
      }
    });
  });
});
