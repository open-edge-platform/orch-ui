/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CyPom } from "@orch-ui/tests";
import { confirmationDialogdataCy } from "./ConfirmationDialog";

const dataCySelectors = [
  "confirmationModal",
  "title",
  "subtitle",
  "mainText",
  "cancelBtn",
  "confirmBtn",
  "open",
  "dialog",
] as const;
type Selectors = (typeof dataCySelectors)[number];

export class ConfirmationDialogPom extends CyPom<Selectors> {
  constructor(public rootCy: string = confirmationDialogdataCy) {
    super(rootCy, [...dataCySelectors]);
  }

  /**
   * Returns the backdrop element for a spark-island modal
   */
  get backdrop() {
    const dataCy = '[data-testid="modal-backdrop"]';
    return cy.get(dataCy);
  }
}
