/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { applicationOne } from "@orch-ui/utils";
import ApplicationProfileOverrideValueComboBoxCell, {
  createOverrideValue,
  parseOverrideValue,
} from "./ApplicationProfileOverrideValueComboBoxCell";
import ApplicationProfileOverrideValueComboBoxCellPom from "./ApplicationProfileOverrideValueComboBoxCell.pom";

const pom = new ApplicationProfileOverrideValueComboBoxCellPom();
describe("<ApplicationProfileOverrideValueComboBoxCell />", () => {
  describe("createOverrideValue", () => {
    it("will create helm override JSON object", () => {
      expect(
        createOverrideValue(
          {
            name: "metalib.control.key",
            displayName: "Model Size",
            type: "",
          },
          "value1",
        ),
      ).to.deep.include({
        metalib: { control: { key: "value1" } },
      });
    });
  });
  describe("parseOverrideValue", () => {
    it("will parse value from helm override JSON object", () => {
      expect(
        parseOverrideValue(
          {
            metalib: {
              control: { key: "value1", id: "12901" },
              version: "1.0.1",
            },
          },
          {
            name: "metalib.control.key",
            displayName: "Model Size",
            type: "",
          },
        ),
      ).to.deep.include("value1");
    });
    it("will parse value from simple helm override key", () => {
      expect(
        parseOverrideValue(
          {
            metalib: "value2",
          },
          {
            name: "metalib",
            displayName: "Model Size",
            type: "",
          },
        ),
      ).to.deep.include("value2");
    });
  });
  it("render combox with three options", () => {
    cy.mount(
      <ApplicationProfileOverrideValueComboBoxCell
        application={applicationOne}
        parameter={{
          type: "",
          name: "Model Size",
          default: "7B",
          suggestedValues: ["value1", "value2", "value3"],
        }}
        onUpdate={cy.stub().as("onUpdate")}
      />,
    );
    pom.getComboxOptions().should("have.length", 3);
  });

  it("render empty combox", () => {
    cy.mount(
      <ApplicationProfileOverrideValueComboBoxCell
        application={applicationOne}
        parameter={{
          type: "",
          name: "Model Size",
          default: "7B",
        }}
        onUpdate={cy.stub().as("onUpdate")}
      />,
    );
    pom.combobox.isEmpty();
  });

  it("calls onUpdate method", () => {
    cy.mount(
      <ApplicationProfileOverrideValueComboBoxCell
        application={applicationOne}
        parameter={{
          type: "",
          name: "Model Size",
          default: "7B",
          suggestedValues: ["value1", "value2", "value3"],
        }}
        onUpdate={cy.stub().as("onUpdate")}
      />,
    );

    pom.combobox.select("value1");
    pom.root.click(0, 0); //blur or go out of focus
    const expectedValue = {
      "Model Size": "value1",
    };
    cy.get("@onUpdate").should("have.been.calledOnce");
    cy.get("@onUpdate").should("be.calledWith", expectedValue);
  });

  it("show validation error on empty string", () => {
    cy.mount(
      <ApplicationProfileOverrideValueComboBoxCell
        application={applicationOne}
        parameter={{
          type: "",
          name: "Model Size",
          default: "7B",
          suggestedValues: ["value1", "value2", "value3"],
        }}
        onUpdate={cy.stub().as("onUpdate")}
      />,
    );
    pom.combobox.type(" ");
    pom.root.click(0, 0);
    pom.combobox.root.should("have.text", " This field cannot be empty.");
    cy.get("@onUpdate").should("have.been.calledOnce");
  });
});
