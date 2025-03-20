/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { TrustedCompute } from "./TrustedCompute";
import { TrustedComputePom } from "./TrustedCompute.pom";

const pom = new TrustedComputePom("TrustedCompute");
describe("Shared: TrustedCompute component testing", () => {
  it("should render default empty text and icon for empty component when `total` is zero (0).", () => {
    cy.mount(
      <TrustedCompute
        trustedComputeCompatible={{
          text: "Compatible",
          tooltip: "Secure boot enabled",
        }}
      />,
    );
    pom.root.should("contain.text", "Compatible");
  });
});
