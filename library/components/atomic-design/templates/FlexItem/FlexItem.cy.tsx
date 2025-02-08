/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { FlexItem } from "./FlexItem";
import { FlexItemPom } from "./FlexItem.pom";

const pom = new FlexItemPom();
describe("<FlexItem/>", () => {
  it("should render component", () => {
    cy.mount(
      <FlexItem config={}>
        <div>FlexItem</div>
      </FlexItem>,
    );
    pom.root.should("exist");
  });
});
