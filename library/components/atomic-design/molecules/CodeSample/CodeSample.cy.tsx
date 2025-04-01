/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CodeSample } from "./CodeSample";
import { CodeSamplePom } from "./CodeSample.pom";

const pom = new CodeSamplePom();

const code = `// sample code //
class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`;

// move to component repo LPUUH-1714
describe("<CodeSample/>", () => {
  it("should render code sample", () => {
    cy.mount(<CodeSample code={code} language="javascript" />);
    pom.el.code.should("include.text", "Hello, World!");
  });
});
