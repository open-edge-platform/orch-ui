/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
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
