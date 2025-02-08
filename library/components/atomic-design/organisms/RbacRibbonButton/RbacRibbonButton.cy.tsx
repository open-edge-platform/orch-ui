/*
 * SPDX-FileCopyrightText: (C) 2024 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ButtonSize, ButtonVariant } from "@spark-design/tokens";
import { RbacRibbonButton } from "./RbacRibbonButton";
import { RbacRibbonButtonPom } from "./RbacRibbonButton.pom";

const pom = new RbacRibbonButtonPom("ribbonButtontest");
describe("<RbacRibbonButton/>", () => {
  it("render disabled component", () => {
    const pressStub = cy.stub().as("onPress");
    cy.mount(
      <RbacRibbonButton
        size={ButtonSize.Large}
        variant={ButtonVariant.Action}
        text="Testing Button"
        disabled={true}
        onPress={pressStub}
        name="test"
        tooltip="Tooltip text"
        tooltipIcon="lock"
      />,
    );
    pom.el.button.should("exist");
    pom.el.button.should("to.have.class", "spark-button-disabled");
  });

  it("should render enabled component", () => {
    const pressStub = cy.stub().as("onPress");
    cy.mount(
      <RbacRibbonButton
        size={ButtonSize.Large}
        variant={ButtonVariant.Action}
        text="Testing Button"
        disabled={false}
        onPress={pressStub}
        name="test"
        tooltip=""
        tooltipIcon="lock"
      />,
    );
    pom.el.button.should("exist");
    pom.el.button.should("to.not.have.class", "spark-button-disabled");
    pom.el.button.click();
    cy.get("@onPress").should("have.been.called");
  });
});
