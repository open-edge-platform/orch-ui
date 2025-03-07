/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from "react-redux";
import { store } from "../../../../store";
import ApplicationReview from "./ApplicationReview";
import ApplicationReviewPom from "./ApplicationReview.pom";

const labels = [
  "Display Name",
  "Version",
  "Description",
  "Helm Registry",
  "Chart Name",
  "Chart Version",
  "Image Registry",
];

let pom: ApplicationReviewPom;
describe("Application review (Component test)", () => {
  it("should render component with application info", () => {
    cy.mount(
      <Provider store={store}>
        <ApplicationReview />
      </Provider>,
    );
    pom = new ApplicationReviewPom("appReview");
    pom.getRows().each((tr, index) => {
      pom.getLabel(tr).contains(labels[index]);
    });
    pom.getRows().should("have.length", labels.length);
  });
});
