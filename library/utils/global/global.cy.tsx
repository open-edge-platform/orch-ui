/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Direction, Operator } from "../interfaces/Pagination";
import { IRuntimeConfig } from "../runtime-config/runtime-config";
import {
  clearAllStorage,
  convertUTCtoOrchUIDate,
  convertUTCtoOrchUIDateTime,
  copyToClipboard,
  downloadFile,
  getFilter,
  getOrder,
  getSessionTimeout,
  getStringPoperty,
  humanFileSize,
  Leaves,
  mergeRecursive,
  rfc3339ToDate,
  stripTrailingSlash,
} from "./global";

describe("the global utilities", () => {
  describe("getStringPoperty", () => {
    it("should return expected string property", () => {
      expect(
        getStringPoperty(
          {
            propA: {
              name: "testing",
            },
          },
          "propA.name",
        ),
      ).to.equal("testing");
    });
  });

  describe("convertUTCtoOrchUIDate", () => {
    it("should return expected Edge-Native Software Platform date", () => {
      expect(convertUTCtoOrchUIDate("14 Jun 2017")).to.equal("14 Jun 2017");
    });
  });

  describe("convertUTCtoOrchUIDateTime", () => {
    it("should return expected Edge-Native Software Platform date", () => {
      // In case fail when we run locally with different timezone
      expect(convertUTCtoOrchUIDateTime("14 Jun 2017 12:00:00 PDT")).contains(
        "Jun 2017",
      );
    });
  });

  describe("rfc3339ToDate", () => {
    it("should return expected Edge-Native Software Platform date", () => {
      expect(rfc3339ToDate("14 Jun 2017")).contains("6/14/2017");
      expect(
        rfc3339ToDate("2017-01-15T01:30:15.01Z", true, {
          locale: "en-US",
          zone: "Europe/London",
        }),
      ).contains("1/15/2017");
    });
  });

  describe("humanFileSize", () => {
    it("should return expected file size", () => {
      expect(humanFileSize(2048)).to.deep.equal({ value: "2.00", units: "kB" });
    });
  });

  describe("getSessionTimeout", () => {
    beforeEach(() => {
      const cfg: IRuntimeConfig = {
        TITLE: "",
        AUTH: "false",
        KC_URL: "",
        KC_REALM: "",
        KC_CLIENT_ID: "",
        SESSION_TIMEOUT: 1800,
        OBSERVABILITY_URL: "",
        MFE: {
          APP_ORCH: "true",
          INFRA: "true",
          CLUSTER_ORCH: "true",
          ADMIN: "false",
        },
        API: {},
      };
      window.__RUNTIME_CONFIG__ = cfg;
    });
    it("should return correct session timeout value", () => {
      expect(getSessionTimeout()).to.equal(1800);
    });
  });

  describe("downloadFile", () => {
    it("should download file correctly", () => {
      downloadFile("testing", "testing.txt");
      // eslint-disable-next-line
      cy.wait(3000);
      cy.readFile("cypress/downloads/testing.txt").should(
        "contains",
        "testing",
      );
    });

    it("should download file correctly (new line case)", () => {
      downloadFile("apiVersion: v1\nkind: Config", "testing.yaml");
      // eslint-disable-next-line
      cy.wait(3000);
      cy.readFile("cypress/downloads/testing.yaml").should(
        "contains",
        "apiVersion: v1\nkind: Config",
      );
    });
  });

  describe("copyToClipboard", () => {
    it("should content to clipboard correctly", () => {
      const onSuccess = cy.stub().as("onSuccess");
      cy.mount(
        <button onClick={() => copyToClipboard("testing", onSuccess)}>
          Copy
        </button>,
      );
      cy.get("button").click();
      cy.window().then((win) => {
        win.navigator.clipboard.readText().then((text) => {
          expect(text).to.eq("testing");
          cy.get("@onSuccess").should("have.been.called");
        });
      });
    });
  });

  describe("getFilter", () => {
    interface Test {
      name: string;
      description: string;
      nest: {
        a: string;
        b: string;
      };
    }
    const fieldsList: Leaves<Test>[] = ["name", "description", "nest.a"];
    it("should return empty string", () => {
      expect(getFilter<Test>("", fieldsList, Operator.OR)).to.equal(undefined);
    });
    it("should return expected filter string", () => {
      expect(getFilter<Test>("testing", fieldsList, Operator.OR)).to.equal(
        "name=testing OR description=testing OR nest.a=testing",
      );
    });
    it("should return expected filter string with quotes", () => {
      expect(
        getFilter<Test>("testing", fieldsList, Operator.OR, true),
      ).to.equal('name="testing" OR description="testing" OR nest.a="testing"');
    });
    it("should use mapping if provided", () => {
      expect(
        getFilter<Test>("testing", fieldsList, Operator.OR, false, {
          "nest.a": "remapped",
        }),
      ).to.equal("name=testing OR description=testing OR remapped=testing");
    });
  });

  describe("getOrder", () => {
    interface Test {
      name: string;
      description: string;
    }
    it("should return expected orderBy string", () => {
      expect(getOrder<Test>("name", Direction.ASC)).to.equal("name asc");
    });
    it("should return empty string", () => {
      expect(getOrder<Test>(null, null)).to.equal(undefined);
    });
    it("should return orderBy without asc", () => {
      expect(getOrder<Test>("name", Direction.ASC, true)).to.equal("name");
    });
  });

  describe("mergeRecursive", () => {
    const obj1 = {
      key1: "val1",
      key2: {
        inside1: 10,
        inside2: {
          deep1: 20,
        },
      },
    };

    const obj2 = {
      key2: {
        inside2: {
          deep2: 40,
        },
        inside3: 40,
      },
      key3: "val3",
    };
    it("should merge two objects", () => {
      const merged = mergeRecursive(obj1, obj2);
      expect(merged).to.deep.equal({
        key1: "val1",
        key2: {
          inside1: 10,
          inside2: {
            deep1: 20,
            deep2: 40,
          },
          inside3: 40,
        },
        key3: "val3",
      });
    });
  });

  describe("stripTrailingSlash", () => {
    it("should url without trailing slash", () => {
      expect(stripTrailingSlash("https://with-trailing-slash.com/")).to.equal(
        "https://with-trailing-slash.com",
      );
      expect(stripTrailingSlash("https://with-trailing-slash.com")).to.equal(
        "https://with-trailing-slash.com",
      );
    });
  });

  describe("clearAllStorage", () => {
    beforeEach(() => {
      // Set up localStorage, sessionStorage, and cookies
      localStorage.setItem("testLocalStorageKey", "testLocalStorageValue");
      sessionStorage.setItem(
        "testSessionStorageKey",
        "testSessionStorageValue",
      );
    });

    it("should clear localStorage, sessionStorage, and cookies", () => {
      // Verify initial values
      expect(localStorage.getItem("testLocalStorageKey")).to.equal(
        "testLocalStorageValue",
      );
      expect(sessionStorage.getItem("testSessionStorageKey")).to.equal(
        "testSessionStorageValue",
      );

      // Call the function
      clearAllStorage();

      // Verify that localStorage and sessionStorage are cleared
      expect(localStorage.getItem("testLocalStorageKey")).to.be.null;
      expect(sessionStorage.getItem("testSessionStorageKey")).to.be.null;
    });
  });
});
