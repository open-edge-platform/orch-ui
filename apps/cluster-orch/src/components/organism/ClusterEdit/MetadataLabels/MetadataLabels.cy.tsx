/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { Provider } from "react-redux";
import { store } from "../../../../store";
import { updateClusterLabels } from "../../../../store/reducers/cluster";
import MetadataLabels from "./MetadataLabels";
import MetadataLabelsPom from "./MetadataLabels.pom";

const pom = new MetadataLabelsPom();
describe("<MetadataLabels/> should", () => {
  beforeEach(() => {
    store.dispatch(
      updateClusterLabels({
        "customer-one": "value-one",
        "customer-two": "value-two",
        "customer-three": "value-three",
      }),
    );

    cy.mount(
      <Provider store={store}>
        <MetadataLabels
          regionMeta={[{ key: "region", value: "region1" }]}
          siteMeta={[{ key: "site", value: "site1", type: "site" }]}
          clusterLabels={{ "customer-one": "value-one" }}
          getUserDefinedMeta={(value) => cy.stub(value)}
          getInheritedMeta={(value) => cy.stub(value)}
        />
      </Provider>,
    );
  });

  it("render component", () => {
    pom.root.should("exist");

    pom.metadataDisplay.getByIndex(0).should("contain", "region = region1");
    pom.metadataDisplay.getTagByIndex(0).should("have.text", "R");

    pom.metadataDisplay.getByIndex(1).should("contain", "site = site1");
    pom.metadataDisplay.getTagByIndex(1).should("have.text", "S");
    // TODO: ITEP-22694 labels design to be updated
    // pom.metadataForm.el.pair
    //   .eq(0)
    //   .children()
    //   .eq(0)
    //   .find("input")
    //   .invoke("attr", "value")
    //   .should("equal", "customer-one");
    // pom.metadataForm.el.pair
    //   .eq(0)
    //   .children()
    //   .eq(1)
    //   .find("input")
    //   .invoke("attr", "value")
    //   .should("equal", "value-one");
  });

  it("edit labels", () => {
    pom.root.should("exist");

    pom.metadataDisplay.getByIndex(0).should("contain", "region = region1");
    pom.metadataDisplay.getTagByIndex(0).should("have.text", "R");

    pom.metadataDisplay.getByIndex(1).should("contain", "site = site1");
    pom.metadataDisplay.getTagByIndex(1).should("have.text", "S");

    pom.metadataForm.el.delete.eq(0).click();

    pom.metadataForm.el.pair.should("not.exist");
  });
});
