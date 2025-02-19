/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { packageOne } from "@orch-ui/utils";
import SetupMetadata, { SetupMetadataProps } from "./SetupMetadata";
import SetupMetadataPom from "./SetupMetadata.pom";

let props: SetupMetadataProps;

const pom = new SetupMetadataPom();
describe("<SetupMetadata />", () => {
  beforeEach(() => {
    props = {
      applicationPackage: packageOne,
      metadataPairs: [],
      onMetadataUpdate: cy.stub().as("metadataCb"),
    };
    cy.mount(<SetupMetadata {...props} />);
  });

  it("should correctly set metadata", () => {
    pom.root.should("be.visible");
    pom.metadataFormPom.getNewEntryInput("Key").click();
    pom.metadataFormPom.getNewEntryInput("Key").type("mdk");
    pom.metadataFormPom.getNewEntryInput("Value").type("mdv");
    pom.metadataFormPom.el.add.click({ force: true });
    cy.get("@metadataCb").should("have.been.calledWith", [
      { key: "mdk", value: "mdv" },
    ]);
  });
});
