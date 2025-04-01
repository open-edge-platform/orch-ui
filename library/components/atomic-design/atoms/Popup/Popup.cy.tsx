/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Popup, PopupOption } from "./Popup";
import { PopupPom } from "./Popup.pom";

import { Icon } from "@spark-design/react";

const pom = new PopupPom("popup");
describe("<Popup/> should", () => {
  const options: PopupOption[] = [
    {
      displayText: "Create",
      onSelect: () => {
        console.log("test");
      },
    },
    {
      displayText: "Edit",
      onSelect: () => {
        console.log("test");
      },
    },
    {
      displayText: "Delete",
      onSelect: () => {
        console.log("test");
      },
    },
  ];

  it("render component", () => {
    cy.mount(
      <Popup
        onToggle={() => true}
        jsx={<Icon artworkStyle="light" icon="ellipsis-v" />}
        options={options}
      />,
    );
    cy.get(".spark-icon").click();
    pom.root.should("be.visible");
  });

  it("dissappear when option selected", () => {
    cy.mount(
      <Popup
        onToggle={() => true}
        jsx={<Icon artworkStyle="light" icon="ellipsis-v" />}
        options={options}
      />,
    );
    cy.get(".spark-icon").click();
    pom.el.list.should("exist");
    pom.root.find(`[data-cy='${options[0].displayText}']`).click();
    pom.el.list.should("not.exist");
  });

  it("dissappear when clicking outside", () => {
    cy.mount(
      <Popup
        onToggle={() => true}
        jsx={<Icon artworkStyle="light" icon="ellipsis-v" />}
        options={options}
      />,
    );
    cy.get(".spark-icon").click();
    pom.el.list.should("exist");
    cy.get("html").click(0, 0);
    pom.el.list.should("not.exist");
  });
});
