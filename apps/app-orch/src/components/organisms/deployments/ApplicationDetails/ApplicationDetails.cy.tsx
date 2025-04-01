/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { adm } from "@orch-ui/apis";
import { deploymentClusterOneAppOneId, vms } from "@orch-ui/utils";
import { printStatus } from "../../../../utils/global"; // TODO: move this to @orch-utils/global/app-orch/global.ts
import ApplicationDetails, { dataCy } from "./ApplicationDetails";
import ApplicationDetailsPom from "./ApplicationDetails.pom";

const pom = new ApplicationDetailsPom(dataCy);
describe("<ApplicationDetails>", () => {
  const app: adm.AppRead = {
    id: "test-app",
    name: "Test Application",
    status: {
      state: "RUNNING",
      message: "A status message",
      summary: {
        total: 0,
        running: 0,
        down: 0,
        type: "",
      },
    },
  };

  const clusterId = "test-cluster-id";

  describe("when the app list is expanded", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getWorkloads]);
      cy.mount(<ApplicationDetails app={app} clusterId={clusterId} />);
      pom.waitForApis();
    });

    describe("application list", () => {
      it("should display general information of current app", () => {
        // Table content
        pom.el.nameValue.contains(app.name!);
        pom.el.namespaceValue.contains("default");
        pom.el.workloadValue.contains("2 Virtual Machine(s), 1 Pod(s)");
      });
      it("should display a list of Workloads", () => {
        pom.el.expandToggle.click();
        vms[deploymentClusterOneAppOneId].appWorkloads!.forEach((vm) => {
          // check that the app id is displayed
          pom.el.applicationDetailsTable.should("contain.text", vm.name);
          // check that the status is displayed
          pom.el.applicationDetailsTable.should(
            "contain.text",
            vm.virtualMachine?.status?.state
              ? printStatus(vm.virtualMachine.status?.state)
              : vm.pod?.status?.state
                ? printStatus(vm.pod?.status?.state)
                : "",
          );
        });
      });
    });

    describe("when a pod action is clicked", () => {
      const podName = "Pod One";
      it("when delete pod action is clicked and delete successfully", () => {
        pom.el.expandToggle.click();
        pom.interceptApis([pom.api.podDeletedSuccess]);
        pom.getRowPopupBySearchText(podName).click();
        pom.getRowPopupOptionsBySearchText(podName).contains("Delete").click();
        pom.waitForApis();
        cy.get(".spark-toast")
          .invoke("text")
          .should("contains", "deleted successfully");
      });
      it("when delete pod action is clicked and failed to delete it", () => {
        pom.el.expandToggle.click();
        pom.interceptApis([pom.api.podDeletedFail]);
        pom.getRowPopupBySearchText(podName).click();
        pom.getRowPopupOptionsBySearchText(podName).contains("Delete").click();
        pom.waitForApis();

        // TODO: check why text is not shown
        // cy.get(".spark-toast")
        //   .invoke("text")
        //   .should("contains", "Error while deleting");

        cy.get(".spark-toast-content").should(
          "have.class",
          "spark-toast-content-state-danger",
        );
      });
    });

    describe("when a vm action is clicked", () => {
      const actions = ["Start", "Stop", "Restart"];
      const vmName = "VM One";
      describe("and the API return an error", () => {
        beforeEach(() => {
          pom.el.expandToggle.click();

          // for each action return the same error
          actions.forEach((action) => {
            cy.intercept(
              {
                method: "PUT",
                url: `**/v1/projects/**/resource/workloads/applications/test-app/clusters/test-cluster-id/virtual-machines/vm-one/${action.toLowerCase()}`,
              },
              {
                statusCode: 400,
                body: { code: 400, message: "Some error" },
              },
            ).as(`${action.toLowerCase()}VmFail`);
          });
        });

        actions.forEach((action) => {
          it(`should ${action} the VM`, () => {
            pom.getRowPopupBySearchText(vmName).click();
            pom.getRowPopupOptionsBySearchText(vmName).contains(action).click();
            cy.wait(`@${action.toLowerCase()}VmFail`);
            cy.get(".spark-toast-content").should(
              "have.class",
              "spark-toast-content-state-danger",
            );
          });
        });
      });

      describe("and the API return successfully", () => {
        beforeEach(() => {
          pom.el.expandToggle.click();

          // for each action return the same error
          actions.forEach((action) => {
            cy.intercept(
              {
                method: "PUT",
                url: `**/v1/projects/**/resource/workloads/applications/test-app/clusters/test-cluster-id/virtual-machines/vm-one/${action.toLowerCase()}`,
              },
              {
                statusCode: 200,
                body: null,
              },
            ).as(`${action.toLowerCase()}VmSuccess`);
          });
        });

        actions.forEach((action) => {
          it(`should ${action} the VM`, () => {
            pom.getRowPopupBySearchText(vmName).click();
            pom.getRowPopupOptionsBySearchText(vmName).contains(action).click();
            cy.wait(`@${action.toLowerCase()}VmSuccess`);
            cy.get(".spark-toast")
              .invoke("text")
              .should("match", /VM .* successfully.*/);
          });
        });
      });
    });
  });

  describe("when the VM list is empty", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getWorkloadsEmpty]);
      cy.mount(<ApplicationDetails app={app} clusterId={clusterId} />);
      pom.el.expandToggle.click();
      pom.waitForApis();
    });

    it("should show minimize icon and display the empty component", () => {
      pom.el.expandToggle.should("have.class", "spark-icon-chevron-up"); // minimize icon
      pom.el.empty.contains("No Workload found");
    });

    it("should show expand icon when list is collapsed", () => {
      // the list is open, now close it
      pom.el.expandToggle.click();
      pom.el.expandToggle.should("have.class", "spark-icon-chevron-down"); // expand icon
    });
  });
});
