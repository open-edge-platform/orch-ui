/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import ErrorBoundaryFallback from "./ErrorBoundaryFallback";
import ErrorBoundaryFallbackPom from "./ErrorBoundaryFallback.pom";

const pom = new ErrorBoundaryFallbackPom();
describe("<ErrorBoundaryFallback/>", () => {
  beforeEach(() => {
    const mockResetErrorBoundary = cy.stub();

    cy.mount(
      <ErrorBoundaryFallback
        error={{
          message: pom.SAMPLE_ERROR_MESSAGE,
          stack: pom.SAMPLE_STACKTRACE,
        }}
        resetErrorBoundary={mockResetErrorBoundary}
      />,
    );
  });

  it("should render component", () => {
    pom.root.should("exist");
  });

  it("should reload page", () => {
    pom.el.reloadBtn.should("be.visible");
    pom.el.reloadBtn.click();
    pom.root.should("be.visible");
  });

  it("should copy the error stacktrace", () => {
    pom.el.copyBtn.click();

    cy.window().then((win) => {
      win.navigator.clipboard.readText().then((text) => {
        expect(text).to.eq(pom.SAMPLE_STACKTRACE);
      });
    });
  });
});

describe("<ErrorBoundaryFallback/> edge case", () => {
  it("should copy the error message if stacktrace is not available", () => {
    const mockResetErrorBoundary = cy.stub();

    cy.mount(
      <ErrorBoundaryFallback
        error={{ message: pom.SAMPLE_ERROR_MESSAGE, stack: undefined }}
        resetErrorBoundary={mockResetErrorBoundary}
      />,
    );

    pom.el.copyBtn.click();

    cy.window().then((win) => {
      win.navigator.clipboard.readText().then((text) => {
        expect(text).to.eq(pom.SAMPLE_ERROR_MESSAGE);
      });
    });
  });
});
