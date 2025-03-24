/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
import {
  regionUsWest,
  regionUsWestId,
  simpleTree,
  siteOregonPortland,
  updateSite,
} from "@orch-ui/utils";
import { setupStore } from "../../../store/store";
import SiteForm from "./SiteForm";
import SiteFormPom from "./SiteForm.pom";

describe("<SiteForm />", () => {
  let pom: SiteFormPom;
  beforeEach(() => {
    pom = new SiteFormPom();
  });

  describe("when the APIs are responding correctly", () => {
    let store;
    beforeEach(() => {
      store = setupStore({
        locations: {
          regionId: undefined,
          branches: simpleTree,
          expandedRegionIds: [],
          site: updateSite,
        },
      });

      pom.interceptApis([
        pom.api.getSiteSuccess,
        pom.api.getRegionsMocked,
        pom.api.getTelemetryGroupsLogsMocked,
        pom.api.getTelemetryGroupsMetricsMocked,
        pom.api.getTelemetryProfilesLogsMocked,
        pom.api.getTelemetryProfilesMetricsMocked,
      ]);
      cy.mount(<SiteForm />, {
        routerProps: {
          initialEntries: [`/regions/${regionUsWestId}/sites/test-site`],
        },
        routerRule: [
          { path: "/regions/:regionId/sites/:siteId", element: <SiteForm /> },
        ],
        reduxStore: store,
      });
      // @ts-ignore
      window.store = store;
      pom.waitForApis();
    });
    it("should render site detail", () => {
      cy.contains("Portland");
      cy.contains("button", "Save");
    });

    it("should convert lat/lng from int to deg", () => {
      pom.el.latitude.should("have.value", "90");
      pom.el.longitude.should("have.value", "90");
    });

    it("should render inherited metadata", () => {
      pom.table.root.should("exist");
      if (
        !siteOregonPortland.metadata ||
        !siteOregonPortland.inheritedMetadata?.location
      )
        throw new Error("Test data missing required metadata information");
      pom.table
        .getRows()
        .should(
          "have.length",
          siteOregonPortland.inheritedMetadata?.location.length,
        );
    });

    it("should successfully modify site name", () => {
      pom.interceptApis([pom.api.putSiteSuccess, pom.api.postMetadata]);
      pom.el.name.should("not.have.attr", "disabled");
      pom.el.name.type("-modified");
      cy.contains("button", "Save").should(
        "have.attr",
        "aria-disabled",
        "false",
      );
      cy.contains("button", "Save").click();
      // we are asserting that the API have been called
      pom.waitForApis();
    });

    it("updated site details must be set in redux state once PUT API returns response", () => {
      pom.interceptApis([pom.api.putSiteSuccess, pom.api.postMetadata]);
      pom.el.name.type("-modified"); // updating the name of the site
      cy.contains("button", "Save").click();
      pom.waitForApis();
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(50);
      cy.window()
        .its("store")
        .invoke("getState")
        .then((state) => {
          expect(state.locations.site.name).to.equal(
            `${updateSite.name}-modified`,
          );
        });
    });
  });

  it("should cancel create a site from site page", () => {
    cy.mount(<SiteForm />, {
      routerProps: {
        initialEntries: ["/sites/new?source=site"],
      },
      routerRule: [
        {
          path: "/sites/:siteId",
          element: <SiteForm />,
        },
      ],
    });
    cy.contains("button", "Cancel").click();
    pom.waitForApis();

    pom.getPath().should("eq", "/locations");
  });

  it("should cancel create a site from region's site page", () => {
    cy.mount(<SiteForm />, {
      routerProps: {
        initialEntries: [`/region/${regionUsWestId}/sites/new?source=region`],
      },
      routerRule: [
        {
          path: "/region/:regionId/sites/:siteId",
          element: <SiteForm />,
        },
      ],
      reduxStore: setupStore({
        locations: {
          branches: [
            {
              data: regionUsWest,
              id: regionUsWest.resourceId ?? "",
              type: "region",
              name: regionUsWest.name ?? "",
            },
          ],
          expandedRegionIds: [],
        },
      }),
    });
    cy.contains("button", "Cancel").click();
    pom.waitForApis();

    pom.getPath().should("eq", "/locations");
  });

  describe("when creating new site", () => {
    const expectedRequest = {
      metadata: [],
      name: "new-site",
      regionId: regionUsWest.resourceId!,
    };
    beforeEach(() => {
      pom.interceptApis([pom.api.postSiteSuccess, pom.api.getRegionsMocked]);
    });

    describe("from sites page", () => {
      describe("and the metadata broker is responding correctly", () => {
        beforeEach(() => {
          pom.interceptApis([pom.api.postMetadata]);
          cy.mount(<SiteForm />, {
            routerProps: {
              initialEntries: ["/sites/new"],
            },
            routerRule: [
              {
                path: "/sites/:siteId",
                element: <SiteForm />,
              },
            ],
          });

          pom.el.name.should("have.value", "");
          pom.el.name.type("new-site");

          pom.el.regionDropdown.should("contain.text", "-");
          pom.selectRegion(regionUsWest.name!, regionUsWest.resourceId!);
        });

        it("should successfully create new site with defined region", () => {
          cy.contains("button", "Add").click();

          cy.wait(`@${pom.api.postSiteSuccess}`)
            .its("request.body")
            .should("deep.equal", expectedRequest);

          pom.getPath().should("eq", "/locations");
        });

        it("should show metadata form when select yes in advanced settings", () => {
          pom.el.advSettings.click({
            force: true,
          });
          pom.metadataForm.root.should("be.visible");
        });

        it("should convert latitude and longitude from deg to int", () => {
          pom.el.name.clear().type("latlng");
          pom.el.latitude.type("{backspace}10").should("have.value", 10);
          pom.el.longitude.type("{backspace}20").should("have.value", 20);
          cy.contains("button", "Add").click();
          cy.wait(`@${pom.api.postSiteSuccess}`).then(({ request }) => {
            expect(request.body.siteLat).eq(10 * Math.pow(10, 7));
            expect(request.body.siteLng).eq(20 * Math.pow(10, 7));
          });
          pom.getPath().should("eq", "/locations");
        });
      });
      describe("and the metadata broker is throwing an error", () => {
        beforeEach(() => {
          pom.interceptApis([pom.api.postMetadataError]);
          cy.mount(<SiteForm />, {
            routerProps: {
              initialEntries: ["/sites/new"],
            },
            routerRule: [
              {
                path: "/sites/:siteId",
                element: <SiteForm />,
              },
            ],
          });

          pom.el.name.type("new-site");
          pom.selectRegion(regionUsWest.name!, regionUsWest.resourceId!);
        });

        it("should create a site", () => {
          cy.contains("button", "Add").click();
          pom.waitForApis();

          cy.wait(`@${pom.api.postSiteSuccess}`)
            .its("request.body")
            .should("deep.equal", expectedRequest);

          pom.getPath().should("eq", "/locations");
        });
      });
    });

    describe("from regions page", () => {
      describe("and the metadata broker is responding correctly", () => {
        beforeEach(() => {
          pom.interceptApis([pom.api.postMetadata]);
          cy.mount(<SiteForm />, {
            routerProps: {
              initialEntries: [`/regions/${regionUsWestId}/sites/new`],
            },
            routerRule: [
              {
                path: `/regions/${regionUsWestId}`,
                element: <text>test-region</text>,
              },
              {
                path: "/regions/:regionId/sites/:siteId",
                element: <SiteForm />,
              },
            ],
          });

          pom.el.name.should("have.value", "");
          pom.el.name.type("new-site");

          pom.el.regionDropdown.should("contain.text", "-");
          //It should find region dropdown to be disabled before tests
          pom.el.regionDropdown.should(
            "have.class",
            "spark-dropdown-is-disabled",
          );
        });

        it("should successfully create new site with defined region", () => {
          cy.contains("button", "Add").click();

          cy.wait(`@${pom.api.postSiteSuccess}`)
            .its("request.body")
            .should("deep.equal", expectedRequest);
          pom.getPath().should("eq", "/locations");
        });

        it("should show metadata form when select yes in advanced settings", () => {
          pom.el.advSettings.click({
            force: true,
          });
          pom.metadataForm.root.should("be.visible");
        });

        it("should convert latitude and longitude from deg to int", () => {
          pom.el.name.clear().type("latlng");
          pom.el.latitude.type("{backspace}10").should("have.value", 10);
          pom.el.longitude.type("{backspace}20").should("have.value", 20);
          cy.contains("button", "Add").click();
          cy.wait(`@${pom.api.postSiteSuccess}`).then(({ request }) => {
            expect(request.body.siteLat).eq(10 * Math.pow(10, 7));
            expect(request.body.siteLng).eq(20 * Math.pow(10, 7));
          });
          pom.getPath().should("eq", "/locations");
        });
      });
      describe("and the metadata broker is throwing an error", () => {
        beforeEach(() => {
          pom.interceptApis([pom.api.postMetadataError]);
          cy.mount(<SiteForm />, {
            routerProps: {
              initialEntries: [`/regions/${regionUsWestId}/sites/new`],
            },
            routerRule: [
              {
                path: "/regions/:regionId/sites/:siteId",
                element: <SiteForm />,
              },
            ],
          });

          pom.el.regionDropdown.should("contain.text", regionUsWest.name);
          pom.el.name.type("new-site");
        });

        it("should create a site", () => {
          cy.contains("button", "Add").click();
          pom.waitForApis();

          cy.wait(`@${pom.api.postSiteSuccess}`)
            .its("request.body")
            .should("deep.equal", expectedRequest);

          pom.getPath().should("eq", "/locations");
        });
      });
    });
  });
  describe("when the API are responding with 404", () => {
    it("should render error info", () => {
      pom.interceptApis([pom.api.getSiteError]);
      cy.mount(<SiteForm />, {
        routerProps: {
          initialEntries: [`/regions/${regionUsWestId}/sites/test-site`],
        },
        routerRule: [
          { path: "/regions/:regionId/sites/:siteId", element: <SiteForm /> },
        ],
      });
      pom.waitForApis();
      cy.contains("Unfortunately an error occurred");
    });
  });

  it("Should not render inherited Metadata if empty", () => {
    pom.interceptApis([
      pom.api.getSiteSuccessNoMetadata,
      pom.api.getRegionsMocked,
      pom.api.getTelemetryGroupsLogsMocked,
      pom.api.getTelemetryGroupsMetricsMocked,
      pom.api.getTelemetryProfilesLogsMocked,
      pom.api.getTelemetryProfilesMetricsMocked,
    ]);
    cy.mount(<SiteForm />, {
      routerProps: {
        initialEntries: [`/regions/${regionUsWestId}/sites/test-site`],
      },
      routerRule: [
        { path: "/regions/:regionId/sites/:siteId", element: <SiteForm /> },
      ],
    });
    pom.waitForApis();

    pom.el.inheritedMetadataTable.should("not.exist");
  });
});
