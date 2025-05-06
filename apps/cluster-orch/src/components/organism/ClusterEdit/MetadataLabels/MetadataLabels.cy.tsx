/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { clusterA, ObjectKeyValue, objectToMetadataPair } from "@orch-ui/utils";
import { setupStore } from "../../../../store";
import { useAppSelector } from "../../../../store/hooks";
import MetadataLabels from "./MetadataLabels";
import MetadataLabelsPom from "./MetadataLabels.pom";

const TestComponent = () => {
  const clusterLabels = useAppSelector((state) => state.cluster.labels);
  return (
    <MetadataLabels
      inheritedMetadata={[
        { key: "region", value: "region1", type: "region" },
        { key: "site", value: "site1", type: "site" },
      ]}
      clusterLabels={objectToMetadataPair(clusterLabels as ObjectKeyValue)}
    />
  );
};

const pom = new MetadataLabelsPom();
describe("<MetadataLabels/> should", () => {
  beforeEach(() => {
    const labels = {
      "customer-one": "value-one",
      "customer-two": "value-two",
      "customer-three": "value-three",
    };
    cy.mount(<TestComponent />, {
      reduxStore: setupStore({
        cluster: {
          ...clusterA,
          labels,
        },
      }),
    });
  });

  it("render component", () => {
    pom.root.should("exist");

    pom.metadataDisplay.getByIndex(0).should("contain", "region = region1");
    pom.metadataDisplay.getTagByIndex(0).should("have.text", "R");

    pom.metadataDisplay.getByIndex(1).should("contain", "site = site1");
    pom.metadataDisplay.getTagByIndex(1).should("have.text", "S");
  });

  it("should see inherited metadata", () => {
    pom.metadataDisplay.getByIndex(0).should("contain", "region = region1");
    pom.metadataDisplay.getTagByIndex(0).should("have.text", "R");

    pom.metadataDisplay.getByIndex(1).should("contain", "site = site1");
    pom.metadataDisplay.getTagByIndex(1).should("have.text", "S");
  });

  it("should delete labels", () => {
    pom.getMetadataKeyInput(0).should("contain.value", "customer-one");
    pom.metadataForm.el.delete.eq(0).click();
    pom.getMetadataKeyInput(0).should("not.contain.value", "customer-one");
  });
});
