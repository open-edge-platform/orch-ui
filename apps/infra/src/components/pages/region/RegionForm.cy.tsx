/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cyGet } from "@orch-ui/tests";
import * as x from "@orch-ui/utils";
import { createChildRoutes } from "../../../routes/routes";
import { setupStore } from "../../../store/store";
import RegionForm from "./RegionForm";
import RegionFormPom from "./RegionForm.pom";

const pom = new RegionFormPom("regionForm");
describe("<RegionForm />", () => {
  describe("when the API are responding correctly", () => {
    describe("when updating a region", () => {
      beforeEach(() => {
        pom.interceptApis([
          pom.api.getRegionMocked,
          pom.api.getRegions,
          pom.api.getTelemetryProfilesMetricsMocked,
          pom.api.getTelemetryProfilesLogsMocked,
          pom.api.getTelemetryGroupsMetricsMocked,
          pom.api.getTelemetryGroupsLogsMocked,
        ]);
        cy.mount(<RegionForm />, {
          routerProps: {
            initialEntries: [`/regions/${pom.testRegion.resourceId}`],
          },
          routerRule: createChildRoutes(),
        });
        pom.waitForApi([
          pom.api.getRegionMocked,
          pom.api.getTelemetryGroupsMetricsMocked,
          pom.api.getTelemetryGroupsLogsMocked,
        ]);
      });
      it("should render region detail page", () => {
        pom.waitForApi([
          pom.api.getRegions,
          pom.api.getTelemetryProfilesMetricsMocked,
          pom.api.getTelemetryProfilesLogsMocked,
        ]);
        cy.contains("Us-West");
        pom.el.name.should("have.attr", "value", pom.testRegion.name);
      });

      it("should update region (picking an existing type)", () => {
        pom.interceptApis([
          pom.api.updateRegionMocked,
          pom.api.postMetadata,
          pom.api.getTelemetryProfilesMetricsMocked,
          pom.api.getTelemetryProfilesLogsMocked,
        ]);

        pom.el.name.should("have.attr", "value", "Us-West");
        pom.el.name.clear().type("Us-West-Updated");
        pom.regionType.select("State");
        pom.el.create.contains("Save").click();
        pom.waitForApis();

        cy.get(`@${pom.api.updateRegionMocked}`)
          .its("request.body")
          .then((req) => {
            expect(req.metadata[0].key).to.eq("state");
            expect(req.metadata[0].value).to.eq("us-west-updated");
          });
        cy.get(`@${pom.api.postMetadata}`)
          .its("request.body")
          .then((req) => {
            expect(req).to.deep.eq({
              metadata: [{ key: "state", value: "us-west-updated" }],
            });
          });

        pom.getPath().should("be.eq", "/locations");
      });

      it("should update region (creating a new type)", () => {
        pom.interceptApis([
          pom.api.updateRegionMocked,
          pom.api.postMetadata,
          pom.api.getTelemetryProfilesMetricsMocked,
          pom.api.getTelemetryProfilesLogsMocked,
        ]);

        pom.el.name.should("have.attr", "value", "Us-West");
        pom.el.name.clear().type("Us-West-Updated");
        pom.regionType.type("-Updated");
        pom.el.create.contains("Save").click();
        pom.waitForApis();

        cy.get(`@${pom.api.updateRegionMocked}`)
          .its("request.body")
          .then((req) => {
            expect(req.metadata[0].key).to.eq("area-updated");
            expect(req.metadata[0].value).to.eq("us-west-updated");
          });
        cy.get(`@${pom.api.postMetadata}`)
          .its("request.body")
          .then((req) => {
            expect(req).to.deep.eq({
              metadata: [{ key: "area-updated", value: "us-west-updated" }],
            });
          });

        pom.getPath().should("be.eq", "/locations");
      });

      xit("should delete region", () => {
        pom.el.regionFormPopup.click().get("[data-cy='Delete']").click();

        pom.interceptApis([pom.api.deleteRegion]);
        //pom.confirmationDialog.el.confirmBtn.contains("Delete").click();
        // TODO: need a new SI-pom class in @orch-ui/poms
        cyGet("confirmBtn").click();
        pom.waitForApis();

        cy.get(`@${pom.api.deleteRegion}`)
          .its("request.url")
          .then((url: string) => {
            const match = url.match(pom.testRegion.resourceId!);
            expect(match && match.length > 0).to.eq(true);
          });
      });

      // TODO: test shoulnd't end just waitin for API, needs an assertion check
      xit("should successfully modify region name and region parent", () => {
        pom.interceptApis([pom.api.updateRegion, pom.api.postMetadata]);
        pom.el.name.should("have.attr", "value", pom.testRegion.name);
        pom.el.name.type("-modified");
        pom.el.name.should(
          "have.attr",
          "value",
          `${pom.testRegion.name}-modified`,
        );
        pom.parentRegion.select("Us East");
        pom.el.create.click();
        pom.waitForApis();
      });
    });

    describe("when updating a region in parent region", () => {
      beforeEach(() => {
        pom.interceptApis([
          pom.api.getRegionMockedWithParent,
          pom.api.getRegions,
          pom.api.getTelemetryProfilesMetricsMocked,
          pom.api.getTelemetryProfilesLogsMocked,
          pom.api.getTelemetryGroupsMetricsMocked,
          pom.api.getTelemetryGroupsLogsMocked,
        ]);
        cy.mount(<RegionForm />, {
          routerProps: {
            initialEntries: [
              `/regions/parent/${x.regionUsWestId}/${x.regionSalemId}`,
            ],
          },
          routerRule: createChildRoutes(),
          reduxStore: setupStore({
            locations: {
              branches: [],
              expandedRegionIds: [],
              isLoadingTree: false,
            },
          }),
        });
        pom.waitForApi([
          pom.api.getRegionMockedWithParent,
          pom.api.getTelemetryProfilesMetricsMocked,
          pom.api.getTelemetryProfilesLogsMocked,
          pom.api.getTelemetryGroupsMetricsMocked,
          pom.api.getTelemetryGroupsLogsMocked,
        ]);
      });

      xit("should update region", () => {
        pom.interceptApis([pom.api.updateRegionMocked, pom.api.postMetadata]);

        pom.el.name.should("have.value", "Salem");
        pom.el.name.clear().type("Salem-Updated");
        pom.regionType.select("State");

        pom.el.create.contains("Save").click();
        pom.waitForApis();

        cy.get(`@${pom.api.updateRegionMocked}`)
          .its("request.body")
          .then((req) => {
            expect(req.metadata[0].key).to.eq("state");
            expect(req.metadata[0].value).to.eq("salem-updated");
          });
        cy.get(`@${pom.api.postMetadata}`)
          .its("request.body")
          .then((req) => {
            expect(req).to.deep.eq({
              metadata: [{ key: "state", value: "salem-updated" }],
            });
          });
      });
    });

    describe("when creating a new region", () => {
      const name = "New-Region";
      beforeEach(() => {
        cy.stub(x, "checkAuthAndRole").callsFake(() => {
          return false;
        });

        pom.interceptApis([pom.api.getRegions]);
        cy.mount(<RegionForm />, {
          routerProps: { initialEntries: ["/regions/new"] },
          routerRule: createChildRoutes(),
        });
        pom.waitForApis();
      });

      it("should validate required field", () => {
        pom.interceptApis([pom.api.createRegionMocked, pom.api.postMetadata]);
        pom.el.name.should("have.attr", "value", "");
        pom.el.name.type(name);
        pom.el.name.clear();
        pom.el.name
          .parentsUntil(".spark-text-field-container")
          .should("contain.text", "Name is required");
      });

      it("should validate on invalid name with special symbol", () => {
        pom.interceptApis([pom.api.createRegionMocked, pom.api.postMetadata]);
        pom.el.name.type("host-name@");
        pom.el.name
          .parentsUntil(".spark-text-field-container")
          .should(
            "contain.text",
            "Name must start and end with alphanumeric characters, and may contain periods or hyphens in between.",
          );
      });

      it("take name only upto 20 characters for region name", () => {
        pom.interceptApis([pom.api.createRegionMocked, pom.api.postMetadata]);
        pom.el.name.type("region-0123456789123456");
        pom.el.name.should("have.value", "region-0123456789123");
      });

      it("take name show error for less than minimum for region name", () => {
        pom.interceptApis([pom.api.createRegionMocked, pom.api.postMetadata]);
        pom.el.name.type("h");
        pom.el.name
          .parentsUntil(".spark-text-field-container")
          .should("contain.text", "Name must be at least 2 characters");
      });

      it("should validate on invalid type with special symbol", () => {
        pom.interceptApis([pom.api.createRegionMocked, pom.api.postMetadata]);
        pom.el.name.type(name);
        pom.regionType.type("-type@");
        pom.regionType.root.should(
          "contain.text",
          "Region Type only contain alphanumeric characters, symbols (. -) only and cannot end with a symbol",
        );
      });

      it("take name only upto 20 characters for region type", () => {
        pom.interceptApis([pom.api.createRegionMocked, pom.api.postMetadata]);
        pom.el.name.type(name);
        pom.regionType.type("region-0123456789123456");
        pom.regionType.root.should(
          "contain.text",
          "Region Type only contain alphanumeric characters, symbols (. -) only and cannot end with a symbol",
        );
      });

      xit("should successfully create a new region (picking an existing type)", () => {
        pom.interceptApis([pom.api.createRegionMocked, pom.api.postMetadata]);

        pom.el.name.should("have.attr", "value", "");
        pom.el.name.type(name);
        pom.regionType.select("State");
        pom.el.create.click();
        pom.waitForApis();

        cy.get(`@${pom.api.createRegionMocked}`)
          .its("request.body")
          .then((req) => {
            expect(req.metadata[0].key).to.eq("state");
            expect(req.metadata[0].value).to.eq("new-region");
          });
        cy.get(`@${pom.api.postMetadata}`)
          .its("request.body")
          .then((req) => {
            expect(req).to.deep.eq({
              metadata: [{ key: "state", value: "new-region" }],
            });
          });
      });

      it("should successfully create a new region (creating a new type)", () => {
        pom.interceptApis([pom.api.createRegionMocked, pom.api.postMetadata]);
        pom.el.name.should("have.attr", "value", "");
        pom.el.name.type(name);
        pom.regionType.type("Foo-Bar");
        pom.el.create.click();
        cy.wait(`@${pom.api.createRegionMocked}`).then((xhr) => {
          expect(xhr.request.body.metadata[0].key).to.eq("foo-bar");
          expect(xhr.request.body.metadata[0].value).to.eq("new-region");
        });
        cy.wait(`@${pom.api.postMetadata}`).then(({ request }) => {
          expect(request.body).to.deep.eq({
            metadata: [{ key: "foo-bar", value: "new-region" }],
          });
        });
      });
    });
  });

  describe("when creating a new region in parent region", () => {
    const name = "New-Region";
    beforeEach(() => {
      cy.stub(x, "checkAuthAndRole").callsFake(() => {
        return false;
      });

      pom.interceptApis([pom.api.getRegions]);
      cy.mount(<RegionForm />, {
        routerProps: {
          initialEntries: [`/regions/parent/${x.regionUsWestId}/new`],
        },
        routerRule: createChildRoutes(),
      });
      pom.waitForApis();
    });
    xit("should successfully create a new region (picking an existing type)", () => {
      pom.interceptApis([pom.api.createRegionMocked, pom.api.postMetadata]);

      pom.el.name.should("have.attr", "value", "");
      pom.el.name.type(name);
      pom.regionType.select("State");
      pom.el.create.click();
      pom.waitForApis();

      cy.get(`@${pom.api.createRegionMocked}`)
        .its("request.body")
        .then((req) => {
          expect(req.metadata[0].key).to.eq("state");
          expect(req.metadata[0].value).to.eq("new-region");
        });
      cy.get(`@${pom.api.postMetadata}`)
        .its("request.body")
        .then((req) => {
          expect(req).to.deep.eq({
            metadata: [{ key: "state", value: "new-region" }],
          });
        });

      pom.getPath().should("be.eq", "/locations");
    });
  });

  describe("when the API are responding with 404", () => {
    it("should render an API error", () => {
      pom.interceptApis([pom.api.getRegionError, pom.api.getRegionsError]);
      cy.mount(<RegionForm />, {
        routerProps: {
          initialEntries: ["/regions/error-region"],
        },
        routerRule: createChildRoutes(),
      });
      pom.waitForApis();
      cy.contains("Unfortunately an error occurred");
    });
  });
});
