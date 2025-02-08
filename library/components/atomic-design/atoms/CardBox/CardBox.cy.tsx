/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { Empty } from "../../molecules/Empty/Empty";
import { CardContainer } from "../CardContainer/CardContainer";
import { CardContainerPom } from "../CardContainer/CardContainer.pom";
import { CardBox } from "./CardBox";
import { CardBoxPom } from "./CardBox.pom";

const cardContainerPom = new CardContainerPom();
const cardBoxPom = new CardBoxPom();

describe("<CardBox/>", () => {
  it("should render component", () => {
    cy.mount(
      <CardBox>
        <div>Content</div>
      </CardBox>,
    );
    cardBoxPom.root.should("exist");
    cardBoxPom.root.should("contain.text", "Content");
  });

  it("should render with empty component", () => {
    cy.mount(
      <CardContainer titleSemanticLevel={6} cardTitle="Deployment Metadata">
        <CardBox>
          <Empty
            title="No Metadata"
            subTitle="There are no metadata found!"
            icon="database"
          />
        </CardBox>
      </CardContainer>,
    );
    cardContainerPom.root
      .find("h6")
      .should("contain.text", "Deployment Metadata");
    cardBoxPom.root.should("exist");
    cardBoxPom.root.should("contain.text", "No Metadata");
  });
});
