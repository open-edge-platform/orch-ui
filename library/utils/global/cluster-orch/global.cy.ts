/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cm } from "@orch-ui/apis";
import { Status } from "@orch-ui/components";
import {
  clusterStatusToIconStatus,
  clusterStatusToText,
  getTrustedComputeCluster,
} from "./global";

describe("The Utils", () => {
  describe("clusterStatusToText", () => {
    it("should convert status to text correctly", () => {
      const assertions: {
        [key in Exclude<cm.ClusterInfo["status"], undefined>]: string;
      } = {
        init: "Init",
        creating: "Creating",
        reconciling: "Reconciling",
        active: "Running",
        updating: "Updating",
        removing: "Removing",
        inactive: "Down",
        error: "Error",
      };
      for (const key in assertions) {
        expect(
          clusterStatusToText(
            key as Exclude<cm.ClusterInfo["status"], undefined>,
          ),
        ).eq(assertions[key as Exclude<cm.ClusterInfo["status"], undefined>]);
      }
      expect(clusterStatusToText()).eq("unknown");
    });
  });

  describe("clusterStatusToIconStatus", () => {
    it("should return status correctly", () => {
      const assertions: {
        [key in Exclude<cm.ClusterInfo["status"], undefined>]: string;
      } = {
        init: Status.Ready,
        creating: Status.NotReady,
        reconciling: Status.NotReady,
        active: Status.Ready,
        updating: Status.NotReady,
        removing: Status.NotReady,
        inactive: Status.Error,
        error: Status.Error,
      };
      for (const key in assertions) {
        expect(
          clusterStatusToIconStatus(
            key as Exclude<cm.ClusterInfo["status"], undefined>,
          ),
        ).eq(assertions[key as Exclude<cm.ClusterInfo["status"], undefined>]);
      }
      expect(clusterStatusToIconStatus()).eq(Status.Unknown);
    });
  });

  describe("getTrustedComputeCluster", () => {
    it("should return compatible when trusted-compute-compatible label is true", () => {
      const cluster = {
        labels: {
          "trusted-compute-compatible": "true",
        },
      } as cm.ClusterInfoRead;
      const result = getTrustedComputeCluster(cluster);
      expect(result).to.deep.equal({
        text: "Compatible",
        tooltip:
          "This cluster contain at least one host that has Secure Boot and Full Disk Encryption enabled.",
      });
    });

    it("should return not compatible when trusted-compute-compatible label is false", () => {
      const cluster = {
        labels: {
          "trusted-compute-compatible": "false",
        },
      } as cm.ClusterInfoRead;
      const result = getTrustedComputeCluster(cluster);
      expect(result).to.deep.equal({
        text: "Not compatible",
        tooltip:
          "This cluster does not contain any host that has Secure Boot and Full Disk Encryption enabled.",
      });
    });

    it("should return not compatible when trusted-compute-compatible label is missing", () => {
      const cluster = {
        labels: {},
      } as cm.ClusterInfoRead;
      const result = getTrustedComputeCluster(cluster);
      expect(result).to.deep.equal({
        text: "Not compatible",
        tooltip:
          "This cluster does not contain any host that has Secure Boot and Full Disk Encryption enabled.",
      });
    });
  });
});
