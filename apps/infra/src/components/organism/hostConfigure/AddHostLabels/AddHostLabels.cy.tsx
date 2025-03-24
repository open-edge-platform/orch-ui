/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { MetadataFormPom } from "@orch-ui/components";
import { AddHostLabels } from "./AddHostLabels";
import { AddHostLabelsPom } from "./AddHostLabels.pom";

const pom = new AddHostLabelsPom();
const metadataPom = new MetadataFormPom();
xdescribe("<AddHostLabels/>", () => {
  it("should render metadata input", () => {
    cy.mount(<AddHostLabels />);
    pom.root.should("exist");
    metadataPom.el.pair.should("have.length", 2);
  });

  it("should trigger update after medatadata change", () => {
    cy.mount(<AddHostLabels />);
    pom.root.should("exist");
    // this test cannot work without little delay
    // MetadataPom cannot get input because is disabled
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(50);
    metadataPom.rhfComboboxKeyPom.getInput().type("new-key");
    metadataPom.rhfComboboxValuePom.getInput().type("new-value");
    metadataPom.el.add.click();
  });
});
