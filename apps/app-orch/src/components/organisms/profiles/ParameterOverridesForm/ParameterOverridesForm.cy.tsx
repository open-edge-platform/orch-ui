/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactHookFormComboboxPom } from "@orch-ui/components";
import ParameterOverridesForm, {
  ChartParameterData,
} from "./ParameterOverridesForm";
import ParameterOverridesFormPom from "./ParameterOverridesForm.pom";

const pom = new ParameterOverridesFormPom();
const selectPom = new ReactHookFormComboboxPom("paramSelect");
const flagsPom = new ReactHookFormComboboxPom("paramFlagsSelect");

const params: ChartParameterData[] = [
  {
    name: "testName1",
    defaultValue: "testValue1",
    displayName: "",
    type: "string",
    suggestedValue: "",
    flags: "Optional",
  },
  {
    name: "testName2",
    defaultValue: ["one", "two"],
    displayName: "",
    type: "array",
    suggestedValue: "",
    flags: "Optional",
  },
];

describe("<ParameterOverridesForm/>", () => {
  it("should allow add and remove rows", () => {
    cy.mount(
      <ParameterOverridesForm
        params={params}
        onUpdate={cy.stub().as("onUpdateStub")}
      />,
    );
    pom.root.should("exist");
    pom.expectRows(1);
    pom.el.add.click();
    pom.expectRows(2);
    pom.deleteRow(1);
    pom.expectRows(1);
  });

  it("should allow to enter data", () => {
    cy.mount(
      <ParameterOverridesForm
        params={params}
        onUpdate={cy.stub().as("onUpdateStub")}
      />,
    );
    selectPom.selectComboboxItem(0);
    pom.root.should("contain.text", "Unique name required");
    pom.el.displayName.type("name");
    pom.root.should("not.contain.text", "Unique name required");
    pom.el.defaultValue.should("have.value", "testValue1");
    pom.el.suggestedValue.type("three").blur();
    cy.get("@onUpdateStub").should("have.been.calledWith", [
      {
        name: "testName1",
        type: "string",
        suggestedValue: "three",
        defaultValue: "testValue1",
        displayName: "name",
        flags: "Optional",
      },
    ]);
  });

  it("should allow to enter data (secret)", () => {
    cy.mount(
      <ParameterOverridesForm
        params={params}
        onUpdate={cy.stub().as("onUpdateStub")}
      />,
    );
    selectPom.selectComboboxItem(0);
    pom.root.should("contain.text", "Unique name required");
    pom.el.displayName.type("name");
    pom.root.should("not.contain.text", "Unique name required");
    pom.el.defaultValue.should("have.value", "testValue1");
    flagsPom.selectComboboxItem(3);
    pom.el.suggestedValue.click();
    pom.el.defaultValue.should("have.value", "");
    cy.get("@onUpdateStub").should("have.been.calledWith", [
      {
        name: "testName1",
        type: "string",
        suggestedValue: "",
        defaultValue: "",
        displayName: "name",
        flags: "Secret & Required",
      },
    ]);
  });
});
