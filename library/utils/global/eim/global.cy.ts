/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim, enhancedEimSlice } from "@orch-ui/apis";
import {
  assignedWorkloadHostOne,
  assignedWorkloadHostTwo,
  instanceOne,
  instanceTwo,
  regionPortland,
  regionUsWest,
  repeatedScheduleOnRegion,
  repeatedScheduleOnSite,
  siteBoston,
} from "../../mocks";
import { IRuntimeConfig } from "../../runtime-config/runtime-config";
import { getObservabilityUrl } from "../global";
import {
  generateClusterName,
  getTrustedComputeCompatibility,
  inheritedScheduleToString,
  isOSUpdateAvailable,
} from "./global";

describe("The Utils", () => {
  describe("generateClusterName", () => {
    it("should create cluster name correctly", () => {
      expect(generateClusterName("test", "test")).eq("test-test");
      expect(generateClusterName("Te st", "test")).eq("Te-st-test");
      expect(generateClusterName("Test", "te st")).eq("Test-te-st");
      expect(generateClusterName("te st", "te St")).eq("te-st-te-St");
    });
  });
  describe("inheritedScheduleToString", () => {
    const convertSingleSchedule2ToScheduleMaintenance = (
      maintenance: eim.SingleSchedule,
    ): enhancedEimSlice.ScheduleMaintenance => ({
      name: maintenance.name,
      scheduleStatus: maintenance.scheduleStatus,
      type: "repeat-weekly",
      repeated: {
        cronDayMonth: maintenance.cronDayMonth,
        cronDayWeek: maintenance.cronDayWeek,
        cronHours: maintenance.cronHours,
        cronMinutes: maintenance.cronMinutes,
        cronMonth: maintenance.cronMonth,
        durationSeconds: maintenance.durationSeconds,
      },
      targetSite: maintenance.targetSite as eim.SiteRead,
      targetHost: maintenance.targetHost as eim.HostRead,
      targetRegion: maintenance.targetRegion as eim.RegionRead,
    });
    it("should show the inheritance of site maintenance for a host", () => {
      expect(
        inheritedScheduleToString(
          convertSingleSchedule2ToScheduleMaintenance(repeatedScheduleOnSite),
          "host",
          assignedWorkloadHostOne,
        ),
      ).eq(siteBoston.name);
    });

    it("should show the inheritance of region maintenance for a subregion", () => {
      expect(
        inheritedScheduleToString(
          convertSingleSchedule2ToScheduleMaintenance(repeatedScheduleOnRegion),
          "region",
          regionPortland,
        ),
      ).eq(regionUsWest.name);
    });

    it("should show no inheritance when maintenance is on local region", () => {
      expect(
        inheritedScheduleToString(
          convertSingleSchedule2ToScheduleMaintenance(repeatedScheduleOnRegion),
          "region",
          regionUsWest,
        ),
      ).eq("-");
    });

    it("should show no inheritance when maintenance is on local site", () => {
      expect(
        inheritedScheduleToString(
          convertSingleSchedule2ToScheduleMaintenance(repeatedScheduleOnSite),
          "site",
          siteBoston,
        ),
      ).eq("-");
    });
  });
  describe("isOSUpdateAvailable", () => {
    it("should return true if update available for os", () => {
      expect(isOSUpdateAvailable(instanceTwo)).eq(true);
    });
    it("should return false if no update available for os", () => {
      expect(isOSUpdateAvailable(instanceOne)).eq(false);
    });
  });

  describe("getObservabilityUrl", () => {
    beforeEach(() => {
      const config: IRuntimeConfig = {
        AUTH: "",
        KC_CLIENT_ID: "",
        KC_REALM: "",
        KC_URL: "",
        SESSION_TIMEOUT: 0,
        OBSERVABILITY_URL: "",
        MFE: {},
        TITLE: "",
        API: {},
        DOCUMENTATION: [],
        VERSIONS: {},
      };
      window.__RUNTIME_CONFIG__ = config;
    });
    it("if set, should return the URL", () => {
      window.__RUNTIME_CONFIG__.OBSERVABILITY_URL = "testUrl";
      expect(getObservabilityUrl()).to.equal("testUrl");
    });
    it("if NOT set, should return undefined", () => {
      window.__RUNTIME_CONFIG__.OBSERVABILITY_URL = "";
      expect(getObservabilityUrl()).to.equal(undefined);
    });
  });

  describe("getTrustedComputeCompatibility", () => {
    it("should return Compatible when Secure Boot and Full Disk Encryption are enabled and the host is onboarded and running", () => {
      const result = getTrustedComputeCompatibility(assignedWorkloadHostOne);
      expect(result).to.equal({
        text: "Compatible",
        tooltip: "This host has Secure Boot and Full Disk Encryption enabled.",
      });
    });

    it("should return Not compatible when Secure Boot and Full Disk Encryption are disabled", () => {
      const result = getTrustedComputeCompatibility(assignedWorkloadHostTwo);
      expect(result).to.equal({
        text: "Not compatible",
        tooltip: "This host has Secure Boot and Full Disk Encryption disabled.",
      });
    });
  });
});
