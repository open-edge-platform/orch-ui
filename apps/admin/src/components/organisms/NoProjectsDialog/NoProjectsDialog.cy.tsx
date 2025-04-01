/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cyGet } from "@orch-ui/tests";
import { useState } from "react";
import { NoProjectsDialog } from "./NoProjectsDialog";
import { NoProjectsDialogPom } from "./NoProjectsDialog.pom";

const pom = new NoProjectsDialogPom();

const TestComponent = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <button data-cy="testOpen" onClick={() => setIsOpen(!isOpen)}>
        Open
      </button>
      {isOpen && <NoProjectsDialog />}
    </>
  );
};

describe("<NoProjectsDialog />", () => {
  beforeEach(() => {
    cy.mount(<TestComponent />);
    cyGet("testOpen").click();
  });

  it("should render component", () => {
    pom.root.should("exist");
  });
});
