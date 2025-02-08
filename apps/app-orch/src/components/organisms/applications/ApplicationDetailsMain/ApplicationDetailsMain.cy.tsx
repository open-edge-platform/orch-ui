/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { cyGet } from "@orch-ui/tests";
import {
  applicationDetails as app,
  dockerImageRegistry,
  profileOne,
  registry,
} from "@orch-ui/utils";

import ApplicationDetailsMain from "./ApplicationDetailsMain";
import ApplicationDetailsMainPom from "./ApplicationDetailsMain.pom";

const pom = new ApplicationDetailsMainPom("applicationDetailsMain");
describe("Application details main (Component test)", () => {
  it("should render component", () => {
    cy.mount(
      <ApplicationDetailsMain
        app={app}
        registry={registry}
        dockerRegistry={dockerImageRegistry}
      />,
    );
    pom.root.should("exist");
  });
  it("should display top info", () => {
    cy.mount(
      <ApplicationDetailsMain
        app={app}
        registry={registry}
        dockerRegistry={dockerImageRegistry}
      />,
    );
    pom.el.title.contains(app.name);
    pom.el.title.contains(app.displayName || "");
    pom.el.chartName.contains(app.chartName);
    pom.el.chartVersion.contains(app.chartVersion);
    pom.el.description.contains(app.description || "");
    pom.el.registryLocation.contains(registry.rootUrl);
    pom.el.registryName.contains(registry.name);
    pom.el.version.contains(app.version);
    pom.el.dockerImageName.contains(app.imageRegistryName || "");
    pom.el.dockerRegistryLocation.contains(dockerImageRegistry.rootUrl);
  });
  it("should display profiles table", () => {
    cy.mount(<ApplicationDetailsMain app={app} registry={registry} />);
    pom.appProfilesTablePom.root.should("be.visible");
  });

  it("should render empty profiles", () => {
    cy.mount(
      <ApplicationDetailsMain
        app={{ ...app, profiles: [] }}
        registry={registry}
      />,
    );
    pom.appProfilesTablePom.root.should("not.exist");
    pom.root.should("contain.text", "No Profiles present");
  });

  it("should render error when api returns app with no profiles", () => {
    cy.mount(
      <ApplicationDetailsMain
        app={{ ...app, profiles: undefined }}
        registry={registry}
      />,
    );
    pom.appProfilesTablePom.root.should("not.exist");

    // TODO: check why errors are not shown
    // pom.root.should(
    //   "contain.text",
    //   "Profiles are not specified in application.",
    // );
    cyGet("apiError").should("exist");
  });

  it("should display parameter templates", () => {
    pom.depoloymentsPom.interceptApis([
      pom.depoloymentsPom.api.deploymentsListMock,
    ]);
    cy.mount(
      <ApplicationDetailsMain
        app={{
          ...app,
          profiles: [
            {
              ...profileOne,
              name: "test-param",
            },
          ],
        }}
        registry={registry}
      />,
    );
    pom.appProfilesTablePom.expandRow(0);
    pom.profileParameterTemplatePom.el.valueOverrides.should("exist");
  });
  it("should not display parameter templates", () => {
    cy.mount(
      <ApplicationDetailsMain
        app={{
          ...app,
          profiles: [
            {
              name: "test-param",
              parameterTemplates: undefined,
            },
          ],
        }}
        registry={registry}
      />,
    );
    pom.appProfilesTablePom.expandRow(0);
    pom.profileParameterTemplatePom.el.valueOverrides.should("not.exist");
  });
});
