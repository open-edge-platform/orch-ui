/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cm } from "@orch-ui/apis";
import { MetadataPair } from "@orch-ui/components";
import {
  getTrustedComputeCluster,
  metadataPairToObject,
  objectToMetadataPair,
} from "./global";

describe("The Utils", () => {
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
          "This cluster contains at least one host that has Secure Boot and Full Disk Encryption enabled.",
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

    it("should return compatible when tcEnabled is true", () => {
      const result = getTrustedComputeCluster(undefined, true);
      expect(result).to.deep.equal({
        text: "Compatible",
        tooltip:
          "This cluster contains at least one host that has Secure Boot and Full Disk Encryption enabled.",
      });
    });

    it("should return not compatible when tcEnabled is false", () => {
      const result = getTrustedComputeCluster(undefined, false);
      expect(result).to.deep.equal({
        text: "Not compatible",
        tooltip:
          "This cluster does not contain any host that has Secure Boot and Full Disk Encryption enabled.",
      });
    });
  });

  describe("objectToMetadataPair", () => {
    it("should convert object to metadata pair correctly", () => {
      const data = {
        key1: "value1",
        key2: "value2",
      };
      const result = objectToMetadataPair(data);
      expect(result).to.deep.equal([
        { key: "key1", value: "value1" },
        { key: "key2", value: "value2" },
      ]);
    });
    it("should return empty array when object is empty", () => {
      const data = {};
      const result = objectToMetadataPair(data);
      expect(result).to.deep.equal([]);
    });
  });

  describe("metadataPairToObject", () => {
    it("should convert metadata pair to object correctly", () => {
      const pairs = [
        { key: "key1", value: "value1" },
        { key: "key2", value: "value2" },
      ];
      const result = metadataPairToObject(pairs);
      expect(result).to.deep.equal({
        key1: "value1",
        key2: "value2",
      });
    });
    it("should return empty object when pairs are empty", () => {
      const pairs: MetadataPair[] = [];
      const result = metadataPairToObject(pairs);
      expect(result).to.deep.equal({});
    });
  });
});
