/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim, enhancedEimSlice } from "@orch-ui/apis";
import {
  hostOne,
  instanceOne,
  instanceTwo,
  regionPortland,
  regionUsWest,
  repeatedScheduleOnRegion,
  repeatedScheduleOnSite,
  siteBoston,
} from "../../mocks";
import {
  generateClusterName,
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
      targetSite: maintenance.targetSite,
      targetHost: maintenance.targetHost as eim.HostRead,
      targetRegion: maintenance.targetRegion,
    });
    it("should show the inheritance of site maintenance for a host", () => {
      expect(
        inheritedScheduleToString(
          convertSingleSchedule2ToScheduleMaintenance(repeatedScheduleOnSite),
          "host",
          hostOne,
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
});
