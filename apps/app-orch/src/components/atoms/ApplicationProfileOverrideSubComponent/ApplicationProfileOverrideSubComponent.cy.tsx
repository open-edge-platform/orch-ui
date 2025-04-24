/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { applicationOne, packageWithParameterTemplates } from "@orch-ui/utils";
import ApplicationProfileOverrideSubComponent from "./ApplicationProfileOverrideSubComponent";
import ApplicationProfileOverrideSubComponentPom from "./ApplicationProfileOverrideSubComponent.pom";

const pom = new ApplicationProfileOverrideSubComponentPom();
describe("<ApplicationProfileOverrideSubComponent/>", () => {
  it("should render component", () => {
    cy.mount(
      <ApplicationProfileOverrideSubComponent
        app={applicationOne}
        selectedProfile={packageWithParameterTemplates.profiles![1]}
      />,
    );
    pom.root.should("exist");
  });
});
