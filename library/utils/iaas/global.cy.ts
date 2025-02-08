/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */
import { eim } from "@orch-ui/apis";
import { Status as IconStatus } from "@orch-ui/components";
import { IRuntimeConfig } from "../runtime-config/runtime-config";
import {
  getObservabilityUrl,
  hostPowerStatusToIconStatus,
  hostPowerStatusToString,
  hostProviderStatusToString,
  hostStatusIndicatorToIconStatus,
  hostStatusToString,
} from "./global";

type HostStatusCondition = Record<
  Exclude<eim.Status["type"], undefined>,
  string
>;

describe("the global utilities", () => {
  describe("hostStatusToString", () => {
    it("should return Unspecified", () => {
      expect(hostStatusToString()).to.equal("Unspecified");
    });
    it("should return right consition with first letter uppercase", () => {
      const assertions: HostStatusCondition = {
        STATUS_CONDITION_UNSPECIFIED: "Unspecified",
        STATUS_CONDITION_ERROR: "Error",
        STATUS_CONDITION_RUNNING: "Running",
        STATUS_CONDITION_STOPPED: "Stopped",
        STATUS_CONDITION_DELETED: "Deleted",
        STATUS_CONDITION_INVALIDATED: "Invalidated",
      };
      for (const key in assertions) {
        const expected = hostStatusToString(key as eim.Status["type"]);
        const equals = assertions[key as eim.Status["type"]];
        expect(expected).eq(equals);
      }
    });
  });

  describe("when converting a HostProviderStatus to string", () => {
    it("should support an empty status", () => {
      const res = hostProviderStatusToString(undefined);
      expect(res).to.equal("Unspecified");
    });
    it("should support a non-empty status", () => {
      const res = hostProviderStatusToString({
        name: "test",
        hostStatus: {
          indicator: "STATUS_INDICATION_IDLE",
          message: "Test Running",
          timestamp: 123,
        },
      });
      expect(res).to.equal("Test Running");
    });
  });

  describe("hostStatusIndicatorToIconStatus", () => {
    it("should return correct icon status", () => {
      type IndicatorMapType = {
        [key in eim.GenericStatusRead["indicator"]]: string;
      };
      const indicatorMap: IndicatorMapType = {
        STATUS_INDICATION_IN_PROGRESS: IconStatus.NotReady,
        STATUS_INDICATION_IDLE: IconStatus.Ready,
        STATUS_INDICATION_ERROR: IconStatus.Error,
        STATUS_INDICATION_UNSPECIFIED: IconStatus.Unknown,
      };

      for (const indicator in indicatorMap) {
        const testHost: eim.HostRead = {
          name: "TestHost",
          hostStatus: {
            indicator: indicator as eim.StatusIndicatorRead,
            message: "Sample message",
            timestamp: 123,
          },
        };

        expect(hostStatusIndicatorToIconStatus(testHost)).to.equal(
          indicatorMap[indicator],
        );
      }
    });
  });

  describe("hostPowerStatusToString", () => {
    it("should return right status string", () => {
      const assertions: {
        [key in Exclude<eim.HostPowerState, undefined>]: string;
      } = {
        POWER_STATE_UNSPECIFIED: "Unspecified",
        POWER_STATE_OFF: "Off",
        POWER_STATE_ON: "On",
        POWER_STATE_ERROR: "Error",
      };
      for (const key in assertions) {
        expect(
          hostPowerStatusToString(
            key as Exclude<eim.HostPowerState, undefined>,
          ),
        ).eq(assertions[key as Exclude<eim.HostPowerState, undefined>]);
      }
      expect(hostPowerStatusToString()).to.equal("Unspecified");
    });
  });

  describe("hostPowerStatusToIconStatus", () => {
    it("should return right icon status for power", () => {
      const assertions: {
        [key in Exclude<eim.HostPowerState, undefined>]: string;
      } = {
        POWER_STATE_UNSPECIFIED: IconStatus.Unknown,
        POWER_STATE_OFF: IconStatus.Error,
        POWER_STATE_ON: IconStatus.Ready,
        POWER_STATE_ERROR: IconStatus.Error,
      };
      for (const key in assertions) {
        expect(
          hostPowerStatusToIconStatus(
            key as Exclude<eim.HostPowerState, undefined>,
          ),
        ).eq(assertions[key as Exclude<eim.HostPowerState, undefined>]);
      }
      expect(hostPowerStatusToIconStatus()).to.equal(IconStatus.Unknown);
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
});
