/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { applicationOne, appOneName, profileOneName } from "@orch-ui/utils";
import ApplicationProfileOverrideSubComponent from "./ApplicationProfileOverrideSubComponent";
import ApplicationProfileOverrideSubComponentPom from "./ApplicationProfileOverrideSubComponent.pom";

const pom = new ApplicationProfileOverrideSubComponentPom();
describe("<ApplicationProfileOverrideSubComponent/>", () => {
  it("should render component", () => {
    cy.mount(
      <ApplicationProfileOverrideSubComponent
        app={applicationOne}
        selectedProfile={{
          name: "",
          applicationProfiles: { [appOneName]: profileOneName },
        }}
      />,
    );
    pom.root.should("exist");
  });
});
