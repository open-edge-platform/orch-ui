/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cm } from "@orch-ui/apis";
import { MetadataDisplayPom } from "@orch-ui/components";
import {
  clusterTemplateOneName,
  clusterTemplateOneV1Info,
  IRuntimeConfig,
} from "@orch-ui/utils";
import { store } from "../../../store";
import ClusterTemplatesDropdownPom from "../../atom/ClusterTemplatesDropdown/ClusterTemplatesDropdown.pom";
import ClusterCreation from "./ClusterCreation";
import ClusterCreationPom from "./ClusterCreation.pom";

const pom = new ClusterCreationPom();
describe("<ClusterCreation/>", () => {
  describe("When creating a cluster UI should", () => {
    const metaDataPom = new MetadataDisplayPom();
    const clusterTemplateDropdownPom = new ClusterTemplatesDropdownPom();

    const checkClearState = (empty: boolean) => {
      // check that the redux state has been cleared
      cy.window()
        .its("store")
        .invoke("getState")
        .then((state) => {
          if (empty) {
            expect(state.templateName).to.contain("Select a Template Name");
            expect(state.templateVersion).to.contain(
              "Select a Template Version",
            );
          } else {
            expect(state.templateName).to.contain("5G Template1");
            expect(state.templateVersion).to.contain("v1.0.1");
          }
        });
    };
    beforeEach(() => {
      pom.interceptApis([
        pom.api.getSites,
        pom.api.getRegions,
        pom.api.getInstances,
      ]);
      clusterTemplateDropdownPom.interceptApis([
        clusterTemplateDropdownPom.api.getTemplatesSuccess,
      ]);

      const runtimeConfig: IRuntimeConfig = {
        DOCUMENTATION_URL: "",
        VERSIONS: {},
        AUTH: "",
        KC_CLIENT_ID: "",
        KC_REALM: "",
        KC_URL: "",
        SESSION_TIMEOUT: 0,
        OBSERVABILITY_URL: "",
        TITLE: "",
        MFE: { CLUSTER_ORCH: "false", APP_ORCH: "false", INFRA: "false" },
        API: {},
        DOCUMENTATION: [],
      };
      // @ts-ignore
      window.store = store;
      cy.mount(<ClusterCreation />, {
        runtimeConfig,
        reduxStore: store,
      });
    });

    describe("on metadata form validation", () => {
      beforeEach(() => {
        pom.fillSpecifyNameAndTemplates(
          "cluster-1",
          clusterTemplateOneName,
          clusterTemplateOneV1Info.version,
        );
        pom.el.nextBtn.click();

        pom.selectSites(store);
        pom.el.nextBtn.click();

        pom.selectHostNode(store);
        pom.el.nextBtn.click();

        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(10);
      });

      it("should disable Next button on field validation errors", () => {
        pom.fillMetadata("Customer", "Culvers");
        pom.metadataForm.root.should("contain.text", "Must be lower case");
        pom.el.nextBtn.should("have.class", "spark-button-disabled");
      });

      // TODO: OPEN SOURCE MIGRATION TEST FAIL
      xit("should enable Next button if field validation doesnt have errors", () => {
        pom.fillMetadata("customer", "culvers");
        pom.el.nextBtn.should("not.have.class", "spark-button-disabled");
      });

      it("should enable Next button if field with validation errors is deleted", () => {
        pom.fillMetadata("Customer", "culvers");
        pom.el.nextBtn.should("have.class", "spark-button-disabled");
        pom.metadataForm.el.delete.click();
        pom.el.nextBtn.should("not.have.class", "spark-button-disabled");
      });
    });

    describe("execute `Specify Name and Template` to `Review` steps", () => {
      beforeEach(() => {
        pom.fillSpecifyNameAndTemplates(
          "cluster-1",
          clusterTemplateOneName,
          clusterTemplateOneV1Info.version,
        );
        pom.el.nextBtn.click();

        pom.selectSites(store);
        pom.el.nextBtn.click();

        pom.selectHostNode(store);
        pom.el.nextBtn.click();

        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(1000); //Need some breathing room so as to not interfere with the typing
        pom.fillMetadata("customer", "culvers");

        // Goto Review Step
        pom.el.nextBtn.click();
      });

      it("should verify cluster details in review", () => {
        pom.el.clusterName.should("have.text", "cluster-1");
        metaDataPom
          .getByIndex(0)
          .should("contain.text", "region = region-uswest");
        metaDataPom.getTagByIndex(0).should("have.text", "R");

        metaDataPom.getByIndex(1).should("contain.text", "meta = data");
        metaDataPom.getByIndex(2).should("contain.text", "customer = culvers");
      });

      // Upon clicking `Create` button test various with api response
      describe("when cluster create is clicked in review", () => {
        const expectedClusterReq: cm.ClusterSpec = {
          name: "cluster-1",
          labels: {
            customer: "culvers",
            region: "region-uswest",
            meta: "data",
          },
          template: "5G Template1-v1.0.1",
          nodes: [
            {
              role: "worker",
              id: "4c4c4544-0044-4210-8031-c2c04f305233",
            },
          ],
        };

        const expectedMetaReq = {
          metadata: [
            { key: "region", value: "region-uswest" },
            { key: "meta", value: "data" },
            { key: "customer", value: "culvers" },
          ],
        };

        it("should create a cluster successfully", () => {
          pom.interceptApis([pom.api.createClusterSuccess]);
          pom.interceptApis([pom.api.createMetaSuccess]);
          pom.el.nextBtn.click(); // this is now Create buttton
          pom.el.nextBtn.should("have.class", "spark-button-disabled");

          cy.get(`@${pom.api.createClusterSuccess}`)
            .its("request.body")
            .should("deep.equal", expectedClusterReq);

          cy.get(`@${pom.api.createMetaSuccess}`)
            .its("request.body")
            .should("deep.equal", expectedMetaReq);

          pom.root
            .find(".spark-toast-content-message")
            .should("contain.text", "Cluster is created");

          // check that the redux state has been cleared
          pom.getPath().should("eq", "/clusters");
          checkClearState(true);
        });
        it("should remove disable on button and show error when failed in creating cluster", () => {
          pom.interceptApis([pom.api.createClusterFail]);
          pom.el.nextBtn.click(); // this is now Create buttton
          pom.el.nextBtn.should("have.class", "spark-button-disabled");

          pom.root
            .find(".spark-toast-content-message")
            .should("contain.text", "Failed to create cluster");

          pom.getPath().should("not.eq", "/clusters"); // should stay in same page
          pom.el.nextBtn.should("not.have.class", "spark-button-disabled");
          // check that the redux state is unaffected and page is not changed
          checkClearState(false);
        });
        it("should show error when failed in creating metadata for cluster and redirect to clusters page", () => {
          pom.interceptApis([pom.api.createClusterSuccess]);
          pom.interceptApis([pom.api.createMetaError]);
          pom.el.nextBtn.click(); // this is now Create buttton
          pom.el.nextBtn.should("have.class", "spark-button-disabled");

          pom.root
            .find(".spark-toast-content-message")
            .should(
              "contain.text",
              "Cluster created successfully. Failed to store Metadata in the metadata-broker, this will not affect functionality.",
            );

          pom.el.nextBtn.should("have.class", "spark-button-disabled");
          // run common tests checks
          pom.getPath().should("eq", "/clusters"); // should stay in same page
          // check that the redux state is unaffected and page is not changed
          checkClearState(true);
        });
      });
    });

    it("clear cluster data on cancel", () => {
      pom.el.clusterName.type("cluster-1");
      pom.clusterTemplateDropdown.selectDropdownValue(
        pom.clusterTemplateDropdown.root,
        "clusterTemplateDropdown",
        clusterTemplateOneName,
        clusterTemplateOneName,
      );
      pom.clusterTemplateVersionDropdown.selectDropdownValue(
        pom.clusterTemplateVersionDropdown.root,
        "clusterTemplateVersionDropdown",
        clusterTemplateOneV1Info.version,
        clusterTemplateOneV1Info.version,
      );

      checkClearState(false);
      pom.el.cancelBtn.click();
      checkClearState(true);
    });
  });
});
