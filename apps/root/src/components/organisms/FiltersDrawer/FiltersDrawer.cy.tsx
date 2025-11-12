/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { EmptyPom, MetadataFormPom } from "@orch-ui/components";
import FiltersDrawer from "./FiltersDrawer";
import { FiltersDrawerPom } from "./FiltersDrawer.pom";

const emptyHandler = () => {};

const emptyPom = new EmptyPom("empty");
const metadataFormPom = new MetadataFormPom();
const filtersDrawerPom = new FiltersDrawerPom();

describe("FiltersDrawer (Component test)", () => {
  it("should render empty component", () => {
    cy.mount(
      <FiltersDrawer
        show={true}
        filters={[]}
        onApply={emptyHandler}
        onClose={emptyHandler}
      />,
    );
    emptyPom.el.emptyIcon.should("be.visible");
    emptyPom.el.emptySubTitle.contains(
      "No deployment metadata is selected for filtering",
    );
  });
  it("should add metadata filter", () => {
    const applyHandler = cy.spy().as("onApplyHandler");
    cy.mount(
      <FiltersDrawer
        show={true}
        filters={[]}
        onApply={applyHandler}
        onClose={emptyHandler}
      />,
    );
    metadataFormPom.interceptApis([metadataFormPom.api.getMetadata]);
    emptyPom.el.emptyActionBtn.click();
    metadataFormPom.waitForApis();
    metadataFormPom.getNewEntryInput("Key").type("testkey");
    metadataFormPom.getNewEntryInput("Value").type("testvalue");
    metadataFormPom.el.add.click();
    filtersDrawerPom.el.buttonApply.click();
    cy.get("@onApplyHandler").should("have.been.calledWith", [
      { key: "testkey", value: "testvalue" },
    ]);
  });
  it("should clear existing filters", () => {
    cy.mount(
      <FiltersDrawer
        show={true}
        filters={[]}
        onApply={emptyHandler}
        onClose={emptyHandler}
      />,
    );
    metadataFormPom.interceptApis([metadataFormPom.api.getMetadata]);
    emptyPom.el.emptyActionBtn.click();
    metadataFormPom.waitForApis();
    metadataFormPom.getNewEntryInput("Key").type("testkey");
    metadataFormPom.getNewEntryInput("Value").type("testvalue");
    metadataFormPom.el.add.click();
    filtersDrawerPom.el.buttonClear.click();
    emptyPom.el.emptyIcon.should("be.visible");
    emptyPom.el.emptySubTitle.contains(
      "No deployment metadata is selected for filtering",
    );
  });

  it("should stay fixed when scrolling down", () => {
    cy.mount(
      <div style={{ height: "200vh" }}>
        <FiltersDrawer
          show={true}
          filters={[]}
          onApply={emptyHandler}
          onClose={emptyHandler}
        />
      </div>,
    );
    cy.viewport(1000, 500);
    cy.scrollTo(0, 500);
    filtersDrawerPom.el.buttonApply.contains("Apply").should("be.visible");
  });

  it("not showing filters", () => {
    cy.mount(
      <div style={{ height: "200vh" }}>
        <FiltersDrawer
          filters={[{ key: "abc", value: "abc" }]}
          onApply={emptyHandler}
          onClose={emptyHandler}
          show={false}
        />
      </div>,
    );
    filtersDrawerPom.root.should("not.be.visible");
  });

  it("closing drawer with empty results", () => {
    cy.mount(
      <div style={{ height: "200vh" }}>
        <FiltersDrawer
          show={true}
          filters={[]}
          onApply={emptyHandler}
          onClose={cy.stub().as("onCloseStub")}
        />
      </div>,
    );
    filtersDrawerPom.el.buttonClose.click();
    cy.get("@onCloseStub").should("have.been.called");
  });

  it("should allow duplicate keys when filtering", () => {
    const applyHandler = cy.spy().as("onApplyHandler");
    cy.mount(
      <FiltersDrawer
        show={true}
        filters={[]}
        onApply={applyHandler}
        onClose={emptyHandler}
      />,
    );
    metadataFormPom.interceptApis([metadataFormPom.api.getMetadata]);
    emptyPom.el.emptyActionBtn.click();
    metadataFormPom.waitForApis();

    // Add first metadata with key "env"
    metadataFormPom.getNewEntryInput("Key").type("env");
    metadataFormPom.getNewEntryInput("Value").type("dev");
    metadataFormPom.el.add.click();

    // Add second metadata with same key "env" - should not show error
    metadataFormPom.getNewEntryInput("Key").type("env");
    metadataFormPom.getNewEntryInput("Value").type("prod");

    // Verify no error message is shown for duplicate key
    metadataFormPom.rhfComboboxKeyPom.getErrorMessage().should("not.exist");

    metadataFormPom.el.add.click();
    filtersDrawerPom.el.buttonApply.click();

    cy.get("@onApplyHandler").should("have.been.calledWith", [
      { key: "env", value: "dev" },
      { key: "env", value: "prod" },
    ]);
  });
});
