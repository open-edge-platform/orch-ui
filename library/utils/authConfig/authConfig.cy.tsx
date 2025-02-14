/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { Role } from "../interfaces/Role";
import { IRuntimeConfig } from "../runtime-config/runtime-config";
import { SharedStorage } from "../shared-storage/shared-storage";
import { authority, decodeToken, hasRealmRole } from "./authConfig";

const sampleToken =
  "eyJhbGciOiJQUzUxMiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI0QWY0emFEeWlzTkxMQ2pLcGE5d3JjcExWdXRDRjNTSUxLVTlVWDlySW8wIn0.eyJleHAiOjE3MzE3MDA3NzEsImlhdCI6MTczMTY5NzE3MSwiYXV0aF90aW1lIjoxNzMxNjk3MTY4LCJqdGkiOiI2ZjYyYTM5My1kMGU2LTQ1ZjItOGU0ZS1iZmE4M2I2ZWI2OWEiLCJpc3MiOiJodHRwczovL2tleWNsb2FrLmtpbmQuaW50ZXJuYWwvcmVhbG1zL21hc3RlciIsInN1YiI6ImU4ZTBiNTBkLWEyNmItNDVkOS1iOGViLTM1NjMwMmNlNmRhNCIsInR5cCI6IkJlYXJlciIsImF6cCI6IndlYnVpLWNsaWVudCIsInNpZCI6Ijg1NzM0MDJkLTM0NDgtNDI5MS1hZGVhLTc0OTVlNmE0YTBkMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyI0MDk4M2U1Zi00NjY2LTRmMTMtYWE3MC0wNmYxYzE4Y2QzYjlfaW0tciIsIjQwOTgzZTVmLTQ2NjYtNGYxMy1hYTcwLTA2ZjFjMThjZDNiOV90Yy1yIiwiNDA5ODNlNWYtNDY2Ni00ZjEzLWFhNzAtMDZmMWMxOGNkM2I5X2VuX29iIiwiNDA5ODNlNWYtNDY2Ni00ZjEzLWFhNzAtMDZmMWMxOGNkM2I5X2NsLXIiLCJpbmZyYS1tYW5hZ2VyLWNvcmUtd3JpdGUtcm9sZSIsIjg4ZTRhMGJkLTZlNWEtNDFjYS05YWRkLTNhNzI0MWQxODMyOF9wcm9qZWN0LWRlbGV0ZS1yb2xlIiwiY2x1c3RlcnMtd3JpdGUtcm9sZSIsIjQwOTgzZTVmLTQ2NjYtNGYxMy1hYTcwLTA2ZjFjMThjZDNiOV9hbHJ0LXIiLCJub2RlLWFnZW50LXJlYWR3cml0ZS1yb2xlIiwic2VjcmV0cy1yb290LXJvbGUiLCJhcHAtcmVzb3VyY2UtbWFuYWdlci13cml0ZS1yb2xlIiwiY2x1c3RlcnMtcmVhZC1yb2xlIiwiODhlNGEwYmQtNmU1YS00MWNhLTlhZGQtM2E3MjQxZDE4MzI4X3Byb2plY3Qtd3JpdGUtcm9sZSIsIjQwOTgzZTVmLTQ2NjYtNGYxMy1hYTcwLTA2ZjFjMThjZDNiOV9yZWctYSIsInVtYV9hdXRob3JpemF0aW9uIiwiY2x1c3Rlci1hcnRpZmFjdHMtcmVhZC1yb2xlIiwib3JnLXJlYWQtcm9sZSIsImNhdGFsb2ctcmVzdHJpY3RlZC13cml0ZS1yb2xlIiwiYXBwLWRlcGxveW1lbnQtbWFuYWdlci1yZWFkLXJvbGUiLCI0MDk4M2U1Zi00NjY2LTRmMTMtYWE3MC0wNmYxYzE4Y2QzYjlfY2wtdHBsLXIiLCJhbGVydHMtcmVhZC1yb2xlIiwiNDA5ODNlNWYtNDY2Ni00ZjEzLWFhNzAtMDZmMWMxOGNkM2I5X2FscnQtcnciLCI0MDk4M2U1Zi00NjY2LTRmMTMtYWE3MC0wNmYxYzE4Y2QzYjlfY2wtcnciLCJvcmctd3JpdGUtcm9sZSIsImNhdGFsb2ctb3RoZXItcmVhZC1yb2xlIiwiNDA5ODNlNWYtNDY2Ni00ZjEzLWFhNzAtMDZmMWMxOGNkM2I5X2FvLXJ3IiwiNDA5ODNlNWYtNDY2Ni00ZjEzLWFhNzAtMDZmMWMxOGNkM2I5X2NhdC1ydyIsImluZnJhLW1hbmFnZXItY29yZS1yZWFkLXJvbGUiLCJhbGVydC1yZWNlaXZlcnMtd3JpdGUtcm9sZSIsInJzLWFjY2Vzcy1yIiwiNDA5ODNlNWYtNDY2Ni00ZjEzLWFhNzAtMDZmMWMxOGNkM2I5X2NsLXRwbC1ydyIsIjg4ZTRhMGJkLTZlNWEtNDFjYS05YWRkLTNhNzI0MWQxODMyOF9wcm9qZWN0LXVwZGF0ZS1yb2xlIiwiYWNjb3VudC9tYW5hZ2UtYWNjb3VudCIsImFsZXJ0LXJlY2VpdmVycy1yZWFkLXJvbGUiLCJhY2NvdW50L3ZpZXctcHJvZmlsZSIsIjg4ZTRhMGJkLTZlNWEtNDFjYS05YWRkLTNhNzI0MWQxODMyOF9wcm9qZWN0LXJlYWQtcm9sZSIsImNhdGFsb2ctcmVzdHJpY3RlZC1yZWFkLXJvbGUiLCJhZG1pbiIsIjQwOTgzZTVmLTQ2NjYtNGYxMy1hYTcwLTA2ZjFjMThjZDNiOV9lbi1hZ2VudC1ydyIsImFwcC1zZXJ2aWNlLXByb3h5LXJlYWQtcm9sZSIsInJlbGVhc2Utc2VydmljZS1hY2Nlc3MtdG9rZW4tcmVhZC1yb2xlIiwiZW4tYWdlbnQtcnciLCJvcmctZGVsZXRlLXJvbGUiLCI0MDk4M2U1Zi00NjY2LTRmMTMtYWE3MC0wNmYxYzE4Y2QzYjlfY2F0LXIiLCJvZmZsaW5lX2FjY2VzcyIsImNsdXN0ZXItdGVtcGxhdGVzLXdyaXRlLXJvbGUiLCJycy1wcm94eS1yIiwiYWxlcnQtZGVmaW5pdGlvbnMtcmVhZC1yb2xlIiwiZGVmYXVsdC1yb2xlcy1tYXN0ZXIiLCJjYXRhbG9nLXB1Ymxpc2hlci1yZWFkLXJvbGUiLCJhbGVydC1kZWZpbml0aW9ucy13cml0ZS1yb2xlIiwiYXBwLXZtLWNvbnNvbGUtd3JpdGUtcm9sZSIsIjQwOTgzZTVmLTQ2NjYtNGYxMy1hYTcwLTA2ZjFjMThjZDNiOV9yZWctciIsImFwcC1kZXBsb3ltZW50LW1hbmFnZXItd3JpdGUtcm9sZSIsImNyZWF0ZS1yZWFsbSIsImNsdXN0ZXItdGVtcGxhdGVzLXJlYWQtcm9sZSIsImNsdXN0ZXItYXJ0aWZhY3RzLXdyaXRlLXJvbGUiLCJjYXRhbG9nLW90aGVyLXdyaXRlLXJvbGUiLCJvcmctdXBkYXRlLXJvbGUiLCI0MDk4M2U1Zi00NjY2LTRmMTMtYWE3MC0wNmYxYzE4Y2QzYjlfaW0tcnciLCJjYXRhbG9nLXB1Ymxpc2hlci13cml0ZS1yb2xlIiwiODhlNGEwYmQtNmU1YS00MWNhLTlhZGQtM2E3MjQxZDE4MzI4XzQwOTgzZTVmLTQ2NjYtNGYxMy1hYTcwLTA2ZjFjMThjZDNiOV9tIiwiYXBwLXNlcnZpY2UtcHJveHktd3JpdGUtcm9sZSIsImFwcC1yZXNvdXJjZS1tYW5hZ2VyLXJlYWQtcm9sZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InRlbGVtZXRyeS1jbGllbnQiOnsicm9sZXMiOlsidmlld2VyIiwiZWRpdG9yIiwiYWRtaW4iXX0sInJlZ2lzdHJ5LWNsaWVudCI6eyJyb2xlcyI6WyJyZWdpc3RyeS1lZGl0b3Itcm9sZSIsInJlZ2lzdHJ5LXZpZXdlci1yb2xlIiwicmVnaXN0cnktYWRtaW4tcm9sZSJdfSwibWFzdGVyLXJlYWxtIjp7InJvbGVzIjpbInZpZXctcmVhbG0iLCJ2aWV3LWlkZW50aXR5LXByb3ZpZGVycyIsIm1hbmFnZS1pZGVudGl0eS1wcm92aWRlcnMiLCJpbXBlcnNvbmF0aW9uIiwiY3JlYXRlLWNsaWVudCIsIm1hbmFnZS11c2VycyIsInF1ZXJ5LXJlYWxtcyIsInZpZXctYXV0aG9yaXphdGlvbiIsInF1ZXJ5LWNsaWVudHMiLCJxdWVyeS11c2VycyIsIm1hbmFnZS1ldmVudHMiLCJtYW5hZ2UtcmVhbG0iLCJ2aWV3LWV2ZW50cyIsInZpZXctdXNlcnMiLCJ2aWV3LWNsaWVudHMiLCJtYW5hZ2UtYXV0aG9yaXphdGlvbiIsIm1hbmFnZS1jbGllbnRzIiwicXVlcnktZ3JvdXBzIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX0sImNsdXN0ZXItbWFuYWdlbWVudC1jbGllbnQiOnsicm9sZXMiOlsiYmFzZS1yb2xlIiwicmVzdHJpY3RlZC1yb2xlIiwic3RhbmRhcmQtcm9sZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUgcm9sZXMiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6IkFsbCBHcm91cHMiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhbGwtZ3JvdXBzLWV4YW1wbGUtdXNlciIsImdpdmVuX25hbWUiOiJBbGwiLCJmYW1pbHlfbmFtZSI6Ikdyb3VwcyIsImVtYWlsIjoiYWdAZXhhbXBsZS5jb20ifQ.J5J9ubB9E9Mjg_qvAd_nFlYwdMd_aKQdnJVEzayrOxLg_qcZMlKc0l6zFa5q34pjhXv22AG984F16vwr15_SrtVC4XqJf2eIoTiNRgc4j7bqau7nhextJEnuWWKwthKj7HFu63p3pMxdb2b1WD6Mci8a46Jkp4mkUvIa4gvJvojP9r_QEkTf2lOS-9Z_PJNimXOkCmqe3aTJ6Nn6HKjJgiPR6Y3Mlo84Jnfhvihy5mNVG8-CTLoyC1ao4btFVQz4xtmXpTp3bw-u-jRph5YXhUWSwIM1nFxcL5qjtzeobl_Upy7zeb7X_fjZ82NzkubynB40T-IqDPsUmu3XBYl2OqsRvojnvlZhfwQuybsYJvttlBP2aO-OS5VgbFgBKtwUz8daSGd9uCzcwy4SRZarEEJphibmQoCP9eICob8pOLDDReNwkE2Lzm4I69gM7UNDg7lVc7338ZqWTNEhmAiaAV96Awwa30CNdBYARV_4D7aDRcSZa3Jc-WUhcK6eFKw_TNGOND88m8COMmTCtEdyQkUWpfj9x0djECMxMW7Si4_qH4FhpR99AvtkqT_7aHaIfg2A9ge3oE7Uly_P_4oMyy1mSY0zr06Hu1_fixSqhqDZPRiwnqGMxIYALqSTAlyGjN0DsaLqQbqu-1LSZ-XaSjQ0zyRWTADUfbsOxsK3UbI";

describe("The authConfig file", () => {
  beforeEach(() => {
    const cfg: IRuntimeConfig = {
      AUTH: "",
      KC_URL: "",
      KC_REALM: "",
      KC_CLIENT_ID: "",
      SESSION_TIMEOUT: 0,
      OBSERVABILITY_URL: "",
      MFE: {
        APP_ORCH: "true",
        FM: "true",
        CLUSTER_ORCH: "true",
        ADMIN: "false",
      },
      TITLE: "",
      API: {},
      DOCUMENTATION: [],
      VERSIONS: {},
    };
    window.__RUNTIME_CONFIG__ = cfg;
  });

  describe("decodeToken", () => {
    it("should parse the token", () => {
      const res = decodeToken(sampleToken);
      expect(res).to.haveOwnProperty("realm_access");
    });

    it("should NOT parse the token", () => {
      //@ts-ignore
      expect(() => {
        decodeToken("foobar");
      }).to.throw;
    });
  });

  describe("hasRealmRole", () => {
    const setUserToken = (token: string) => {
      sessionStorage.setItem(
        `oidc.user:${authority}:${
          window.__RUNTIME_CONFIG__
            ? window.__RUNTIME_CONFIG__.KC_CLIENT_ID
            : "ui"
        }`,
        JSON.stringify({ access_token: token }),
      );
    };
    const setProject = (uid: string) => {
      SharedStorage.project = {
        name: "testing",
        uID: uid,
      };
    };
    describe("when the user has roles for the current project", () => {
      beforeEach(() => {
        setProject("40983e5f-4666-4f13-aa70-06f1c18cd3b9");
        setUserToken(sampleToken);
      });

      const roles = Object.values(Role);
      roles.forEach((r) => {
        it(`should return true for role ${r}`, () => {
          const res = hasRealmRole(r);
          expect(res).to.be.true;
        });
      });
    });

    describe("when the user does not have roles for the current project", () => {
      beforeEach(() => {
        setProject("1560e208-d551-4444-a447-d314cf437b87");
        setUserToken(sampleToken);
      });

      const nonProjectRoles = Object.values(Role).filter(
        (role) => !role.startsWith("project"),
      );
      nonProjectRoles.forEach((r) => {
        it(`should return false for role ${r}`, () => {
          const res = hasRealmRole(r);
          expect(res).to.be.false;
        });
      });
    });
  });
});
