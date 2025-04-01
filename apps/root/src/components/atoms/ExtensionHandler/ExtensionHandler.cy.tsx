/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import ExtensionHandler from "./ExtensionHandler";
import ExtensionHandlerPom from "./ExtensionHandler.pom";

const pom = new ExtensionHandlerPom();
describe("<ExtensionHandler/>", () => {
  const el = document.createElement("script");
  const extension = pom.extensions[0];

  beforeEach(() => {
    cy.document().then((doc) => {
      // manually stub the document.createElement function
      // Cypress calls this function a lot of times, and using cy.stub blocks the test run itself
      // Cypress only adds links (<a>) and divs, the call that creates a <script> element
      // is the one we want to intercept
      const fn = doc.createElement;
      doc.createElement = (tagname: string) => {
        if (tagname === "script") {
          return el;
        }
        return fn.call(doc, tagname);
      };

      cy.spy(doc.head, "appendChild").as("append");
    });

    pom.interceptApis([pom.api.listExtensions]);
    cy.mount(<ExtensionHandler />, {
      routerProps: {
        initialEntries: [`/extensions/${extension.label}`],
      },
      routerRule: [{ path: "/extensions/:id", element: <ExtensionHandler /> }],
    });
    pom.waitForApis();
  });

  it("should append a script tag", () => {
    pom.root.should("exist");

    cy.log("foobar");
    cy.get("@append")
      .should("have.been.calledWith", el)
      .then(() => {
        expect(el.type).to.equal("text/javascript");
        expect(el.src).to.equal(
          `https://api-proxy.kind.internal/${extension.serviceName}.orchui-extension.apis/${extension.fileName}`,
        );
      });
  });
});
