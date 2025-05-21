/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cyGet } from "@orch-ui/tests";
import { useState } from "react";
import * as metadataBrokerMocks from "../../../../utils/mocks/metadata-broker";
import {
  ErrorMessages,
  MetadataForm,
  MetadataPair,
  MetadataPairs,
} from "./MetadataForm";
import { MetadataFormPom } from "./MetadataForm.pom";

const pom = new MetadataFormPom();
const pairs: MetadataPair[] = [
  { key: "first-key", value: "first-value" },
  { key: "second-key", value: "second-value" },
];
const pairs2: MetadataPair[] = [
  { key: "third-key", value: "third-value" },
  { key: "fourth-key", value: "fourth-value" },
  { key: "fifth-key", value: "fifth-value" },
];

describe("<MetadataForm/>", () => {
  describe("when disabled", () => {
    it("should disable all controls", () => {
      cy.mount(
        <MetadataForm
          onUpdate={cy.stub().as("onUpdateStub")}
          isDisabled={true}
        />,
      );
      pom.el.add.should("have.attr", "aria-disabled");
      pom.rhfComboboxKeyPom.getInput(false).should("be.disabled");
      pom.rhfComboboxValuePom.getInput(false).should("be.disabled");
      pom.root.find("[data-cy='delete']").should("have.attr", "aria-disabled");
    });
  });
  describe("In a default state should", () => {
    beforeEach(() => {
      cy.clearAllCookies();
      cy.clearAllLocalStorage();
      cy.clearAllSessionStorage();
      pom.interceptApis([pom.api.getMetadata]);
      cy.mount(
        <MetadataForm
          onUpdate={cy.stub().as("onUpdateStub")}
          isDisabled={false}
          hasError={cy.stub().as("hasError")}
        />,
      );
      pom.waitForApis();
    });

    it("have the correct amount of rows", () => {
      pom.el.pair.should("not.exist");
      pom.el.entry.should("have.length", 1);
    });

    it("delete entry row when pressing trash icon", () => {
      pom.rhfComboboxKeyPom.getInput().type("fake-key");
      pom.rhfComboboxValuePom.getInput().type("fake-value");
      pom.el.delete
        .last()
        .click()
        .then(() => {
          pom.rhfComboboxKeyPom.root.should("not.exist", { timeout: 10000 });
          pom.rhfComboboxValuePom.root.should("not.exist", { timeout: 10000 });
        });
    });

    // xit("send correct data back onUpdate()", () => {
    //   pom.rhfComboboxKeyPom.getInput().type("fake-key");
    //   pom.rhfComboboxValuePom.getInput().type("fake-value");
    //   pom.el.add.click();
    //   cy.get("@onUpdateStub").should("have.been.calledWith", [
    //     { key: "fake-key", value: "fake-value" },
    //   ]);
    // });

    xit("not allow upper case", () => {
      pom.rhfComboboxKeyPom.getInput().type("fake-Key");
      pom.rhfComboboxKeyPom
        .getErrorMessage()
        .should("be.visible")
        .contains(ErrorMessages.NoUpperCase);

      pom.rhfComboboxValuePom.getInput().type("fake-Value");
      pom.rhfComboboxValuePom
        .getErrorMessage()
        .should("be.visible")
        .contains(ErrorMessages.NoUpperCase);
      cy.get("@hasError").should("have.been.calledWith", true);

      pom.rhfComboboxKeyPom.getInput().clear().type("fake-key");
      pom.rhfComboboxValuePom.getInput().clear().type("fake-value");
      cy.get("@hasError").should("have.been.calledWith", false);
    });

    // TODO: Fix this test from breaking in CI/CD.
    // it("not exceed 63 characters", () => {
    //   pom.rhfComboboxKeyPom.getInput().type("x".repeat(64));
    //   pom.rhfComboboxKeyPom
    //     .getErrorMessage()
    //     .should("be.visible")
    //     .contains(ErrorMessages.MaxLengthExceeded);
    //   pom.rhfComboboxValuePom.getInput().type("x".repeat(64));
    //   pom.rhfComboboxValuePom
    //     .getErrorMessage()
    //     .should("be.visible")
    //     .contains(ErrorMessages.MaxLengthExceeded);
    // });

    it("allow valid K8 label characters", () => {
      const labels = ["valid-", "valid.", "valid/name"];

      labels.forEach((label: string) => {
        pom.rhfComboboxKeyPom.getInput().clear();
        pom.rhfComboboxKeyPom.getInput().type(label);
        pom.rhfComboboxKeyPom.getErrorMessage().should("not.exist");
        pom.rhfComboboxValuePom.getInput().clear();
        pom.rhfComboboxValuePom.getInput().type(label);
        pom.rhfComboboxValuePom.getErrorMessage().should("not.exist");
      });
    });

    it("not allow invalid K8 labels", () => {
      const labels = [
        "invalid ",
        "invalid!",
        "invalid|",
        "invalid&",
        "invalid_",
      ];
      labels.forEach((label: string) => {
        pom.rhfComboboxKeyPom.getInput().clear();
        pom.rhfComboboxKeyPom.getInput().type(label);
        pom.rhfComboboxKeyPom
          .getErrorMessage()
          .should("be.visible")
          .contains(ErrorMessages.InvalidK8Label);

        pom.rhfComboboxValuePom.getInput().clear();
        pom.rhfComboboxValuePom.getInput().type(label);
        pom.rhfComboboxValuePom
          .getErrorMessage()
          .should("be.visible")
          .contains(ErrorMessages.InvalidK8Label);
      });
    });

    it("not allow empty values", () => {
      pom.el.add.click();
      pom.rhfComboboxValuePom
        .getErrorMessage()
        .should("be.visible")
        .contains(ErrorMessages.IsRequired);
      pom.rhfComboboxKeyPom
        .getErrorMessage()
        .should("be.visible")
        .contains(ErrorMessages.IsRequired);
    });

    it("show error message under Combobox Value field, if key is entered and value is empty", () => {
      pom.rhfComboboxKeyPom.getInput().type("test-key");

      // Focus the field and skip typing the value
      pom.rhfComboboxValuePom.getInput().focus();
      pom.rhfComboboxValuePom.getInput().blur();

      pom.rhfComboboxValuePom
        .getErrorMessage()
        .should("be.visible", { timeout: 10000 })
        .contains(ErrorMessages.IsRequired);
    });

    it("show error message under Combobox Key field, if value is entered and key is empty", () => {
      pom.rhfComboboxValuePom.getInput().type("test-value"); // typing in value field
      pom.rhfComboboxValuePom.getInput().blur();
      pom.rhfComboboxKeyPom
        .getErrorMessage()
        .should("be.visible", { timeout: 10000 })
        .contains(ErrorMessages.IsRequired);
    });

    it("ignore a key with empty value", () => {
      pom.rhfComboboxKeyPom.getInput().type("test-key");
      pom.rhfComboboxValuePom.getInput().type("test-value");
      pom.el.add.click({ force: true }); // to add second pair of key:value. { force: true } is added to allow clicking the element in case it has CSS `pointer-events: none`

      // entering only key in combobox
      pom.rhfComboboxKeyPom
        .getInput()
        .type("test-key-2")
        .then(() => {
          cy.get("@onUpdateStub", { timeout: 10000 }).should(
            "have.been.calledWith",
            [{ key: "test-key", value: "test-value" }],
          );
        });
    });

    it("update metadata list if value is entered first, followed by the key", () => {
      pom.rhfComboboxValuePom.getInput().type("test-value"); // typing in value field
      pom.rhfComboboxValuePom.getInput().blur();

      pom.rhfComboboxKeyPom.getInput().type("test-key"); // typing in key field
      pom.rhfComboboxKeyPom.getInput().blur();

      cy.get("@onUpdateStub", { timeout: 10000 }).should(
        "have.been.calledWith",
        [{ key: "test-key", value: "test-value" }],
      );
    });
  });

  describe("With pairs passed in should", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getMockedMetadata]);
      cy.mount(
        <MetadataForm pairs={pairs} onUpdate={cy.stub().as("onUpdateStub")} />,
      );
      pom.waitForApis();
      cy.wait(1000);
    });

    it("have the correct amount of rows", () => {
      // TODO, check for one row
      pom.el.pair.should("have.length", 2);
      pom.el.entry.should("have.length", 1);
    });

    it("be able to add new rows", () => {
      //rhf = React Hook Form
      pom.rhfComboboxKeyPom.selectComboboxItem(1);
      pom.rhfComboboxValuePom.getInput().type("sample");
      pom.el.add.click();
      pom.el.pair.should("have.length", 3);
      cy.get("@onUpdateStub").should("have.been.called");
    });

    it("be able to delete rows", () => {
      // There can be multiple pairs in the form, need to select first one
      pom.el.delete.first().click();
      pom.el.pair.should("have.length", 1);
    });
  });

  describe("Adding label text should", () => {
    it("display left label text", () => {
      cy.mount(
        <MetadataForm
          pairs={pairs}
          onUpdate={cy.stub().as("onUpdateStub")}
          leftLabelText="LeftLabel"
        />,
      );

      pom.el.leftLabelText.should("have.text", "LeftLabel");
      pom.rhfComboboxKeyPom
        .getInput()
        .should("have.attr", "placeholder", "Enter a leftlabel");
      pom.el.rightLabelText.should("have.text", "Value");
      pom.rhfComboboxValuePom
        .getInput()
        .should("have.attr", "placeholder", "Enter a value");
    });

    it("display right label text", () => {
      cy.mount(
        <MetadataForm
          pairs={pairs}
          onUpdate={cy.stub().as("onUpdateStub")}
          rightLabelText="RightLabel"
        />,
      );
      pom.el.leftLabelText.should("have.text", "Key");
      pom.rhfComboboxKeyPom
        .getInput()
        .should("have.attr", "placeholder", "Enter a key");
      pom.el.rightLabelText.should("have.text", "RightLabel");
      pom.rhfComboboxValuePom
        .getInput()
        .should("have.attr", "placeholder", "Enter a rightlabel");
    });
  });

  xdescribe("After being sent new metadatapairs should", () => {
    const UpdatingMetdata = () => {
      const [currentPairs, setCurrentPairs] = useState<MetadataPairs>({
        pairs,
      });
      return (
        <>
          <MetadataForm
            pairs={currentPairs.pairs}
            onUpdate={cy.stub().as("onUpdateStub")}
          />
          <button
            data-cy="change"
            onClick={() => setCurrentPairs({ pairs: pairs2 })}
          >
            Change
          </button>
        </>
      );
    };
    it("re-render with the new data set", () => {
      cy.mount(<UpdatingMetdata />);
      cyGet("change").click();
      pom.el.pair.should("have.length", pairs2.length);
      pom.el.entry.should("have.length", 1);
    });
  });

  xdescribe("With empty API metadata should", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getEmptyMetadata]);
      cy.mount(
        <MetadataForm pairs={pairs} onUpdate={cy.stub().as("onUpdateStub")} />,
      );
      pom.waitForApis();
    });

    it("not have options available in inputs", () => {
      pom.getNewEntryOptions("Key").should("have.length", 0);
      pom.getNewEntryOptions("Value").should("have.length", 0);
    });
  });

  xdescribe("With API metadata should", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getMockedMetadata]);
      cy.mount(
        <MetadataForm pairs={pairs} onUpdate={cy.stub().as("onUpdateStub")} />,
      );
      pom.waitForApis();
    });

    it("have the correct options length for key input", () => {
      pom
        .getNewEntryOptions("Key")
        .should("have.length", metadataBrokerMocks.metadata.length);
    });

    it("have the correct options for value input", () => {
      const index = metadataBrokerMocks.metadata.length - 1;
      const possibleValues = metadataBrokerMocks.metadata[index].values;
      if (!possibleValues) throw new Error("possibleValues does not exist.");
      pom.rhfComboboxKeyPom.selectComboboxItem(index); //not zero-based
      pom
        .getNewEntryOptions("Value")
        .should("have.length", possibleValues.length);
    });
  });
});
