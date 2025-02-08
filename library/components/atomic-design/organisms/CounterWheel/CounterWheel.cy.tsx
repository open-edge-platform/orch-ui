/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CounterWheel } from "./CounterWheel";
import { CounterWheelPom } from "./CounterWheel.pom";

const pom = new CounterWheelPom("counterWheel");
describe("Container: Counter Wheel component testing", () => {
  it("should render empty component when total value is positive and the counter equals zero (0).", () => {
    cy.mount(
      <div style={{ minHeight: "19rem" }}>
        <CounterWheel counterTitle="Unallocated Hosts" count={0} total={85} />
      </div>,
    );

    pom.root.should("contain.text", "Empty");
  });

  it("should render empty component when total is zero.", () => {
    cy.mount(
      <div style={{ minHeight: "19rem" }}>
        <CounterWheel counterTitle="Unallocated Hosts" count={41} total={0} />
      </div>,
    );

    pom.root.should("contain.text", "Empty");
  });

  it("should render counter for 41 out of 85.", () => {
    cy.mount(
      <div style={{ minHeight: "19rem" }}>
        <CounterWheel counterTitle="Unallocated Hosts" count={41} total={85} />
      </div>,
    );

    pom.el.counterWheelHeading.should("contain.text", "Unallocated Hosts");
    pom.el.counterWheelTextFocus.should("contain.text", "41");
    pom.el.counterWheelText.should("contain.text", "41 out of 85");
  });

  it("should render counter for same non-zero total & count values.", () => {
    cy.mount(
      <div style={{ minHeight: "19rem" }}>
        <CounterWheel counterTitle="Unallocated Hosts" count={85} total={85} />
      </div>,
    );

    pom.el.counterWheelHeading.should("contain.text", "Unallocated Hosts");
    pom.el.counterWheelTextFocus.should("contain.text", "85");
    pom.el.counterWheelText.should("contain.text", "85 out of 85");
  });
});
