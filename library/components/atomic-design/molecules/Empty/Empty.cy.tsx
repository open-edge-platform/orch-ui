/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Empty } from "./Empty";
import { EmptyPom } from "./Empty.pom";

let pom: EmptyPom;
describe("Emppty component", () => {
  it("should render basic empty component", () => {
    const title = "Some text for title";
    const subTitle = "Some text for subtitle";
    const action = "action";
    const icon = "cube-detached";
    cy.mount(
      <Empty
        title={title}
        subTitle={subTitle}
        actions={[
          {
            name: action,
          },
        ]}
        icon={icon}
      />,
    );
    pom = new EmptyPom();
    pom.el.emptyIcon.should("be.visible");
    pom.el.emptyTitle.contains(title);
    pom.el.emptySubTitle.contains(subTitle);
  });

  it("call its actions", () => {
    const title = "Some text for title";
    const subTitle = "Some text for subtitle";
    const icon = "cube-detached";
    cy.mount(
      <Empty
        title={title}
        subTitle={subTitle}
        actions={[{ action: cy.stub().as("actionStub"), dataCy: "action1" }]}
        icon={icon}
      />,
    );
    pom = new EmptyPom();
    pom.root.find("[data-cy='action1']").click();
    cy.get("@actionStub").should("have.been.called");
  });
});
