/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import {
  HostConfigForm,
  HostConfigFormStatus,
  HostConfigSteps,
  validateStep,
} from "./configureHost";

describe("configureHost Reducer", () => {
  let state: HostConfigForm = {} as HostConfigForm;
  describe("the validateStep function", () => {
    describe("on the Select Site step", () => {
      beforeEach(() => {
        state = {
          formStatus: {
            currentStep: HostConfigSteps["Select Site"],
          } as HostConfigFormStatus,
          hosts: {
            hostId: {
              siteId: undefined,
            } as infra.HostResourceWrite,
          },
          autoOnboard: false,
          autoProvision: false,
        };
      });
      it("should disable the next button when the Site is selected", () => {
        state.formStatus.enableNextBtn = true;
        state.hosts["hostId"].siteId = undefined;
        expect(validateStep(state).formStatus.enableNextBtn).to.eq(false);
      });
      it("should enable the next button when the Site is selected", () => {
        state.formStatus.enableNextBtn = false;
        state.hosts["hostId"].siteId = "site-123";
        expect(validateStep(state).formStatus.enableNextBtn).to.eq(true);
      });
    });
    describe("on the Host Details step", () => {
      beforeEach(() => {
        state = {
          formStatus: {
            currentStep: HostConfigSteps["Enter Host Details"],
          } as HostConfigFormStatus,
          hosts: {
            hostId: {
              name: "",
            } as infra.HostResourceWrite,
          },
          autoOnboard: false,
          autoProvision: false,
        };
      });
      it("should disable the next button when the name is empty", () => {
        state.formStatus.enableNextBtn = true;
        state.hosts["hostId"].name = "";
        expect(validateStep(state).formStatus.enableNextBtn).to.eq(false);
      });
      it("should disable the next button when the osId is empty", () => {
        state.formStatus.enableNextBtn = true;
        state.hosts["hostId"].name = "valida-name";
        state.hosts["hostId"].instance = undefined;
        expect(validateStep(state).formStatus.enableNextBtn).to.eq(false);
        state.hosts["hostId"].instance = { osID: undefined };
        expect(validateStep(state).formStatus.enableNextBtn).to.eq(false);
      });
      it("should enable the next button when the name and osId are present", () => {
        state.formStatus.enableNextBtn = false;
        state.hosts["hostId"].name = "TestName";
        state.hosts["hostId"].instance = {
          osID: "os-123",
          securityFeature: "SECURITY_FEATURE_NONE",
        };
        expect(validateStep(state).formStatus.enableNextBtn).to.eq(true);
      });
    });
  });
});
