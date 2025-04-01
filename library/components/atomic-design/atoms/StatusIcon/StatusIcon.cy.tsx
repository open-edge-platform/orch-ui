/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Status, StatusIcon } from "./StatusIcon";
import { StatusIconPom } from "./StatusIcon.pom";

const pom = new StatusIconPom();
describe("The StatusIcon component", () => {
  Object.values(Status)
    .filter((status) => status !== Status.NotReady)
    .forEach((status) => {
      it(`should render a ${status} status icon`, () => {
        cy.mount(<StatusIcon status={status} />);
        pom.icon.should("have.class", `icon-${status.toLowerCase()}`);
      });
    });

  it("should render a not-ready status icon", () => {
    cy.mount(<StatusIcon status={Status.NotReady} />);
    pom.icon.should("have.class", "spark-icon-spinner-three-quarters-half");
  });

  it("should render the provided text", () => {
    const text = "Something to match on";
    cy.mount(<StatusIcon status={Status.Ready} text={text} />);
    pom.root.contains(text);
  });

  it("should render the provided count", () => {
    const count = {
      n: 1,
      of: 3,
    };
    cy.mount(<StatusIcon status={Status.Ready} count={count} />);

    pom.root.contains(`(${count.n}/${count.of})`);
  });
});
