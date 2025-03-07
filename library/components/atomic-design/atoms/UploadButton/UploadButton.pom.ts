/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = ["uploadBtn", "uploadInput"] as const;
type Selectors = (typeof dataCySelectors)[number];

export class UploadButtonPom extends CyPom<Selectors> {
  constructor(public rootCy: string) {
    super(rootCy, [...dataCySelectors]);
  }

  public uploadSingleFile(path: string) {
    this.el.uploadInput.selectFile(path, { force: true });
  }

  public uploadFile(path: string) {
    this.el.uploadInput.selectFile(
      [`${path}test.yaml`, `${path}example.yaml`],
      { force: true },
    );
  }

  public dragDropFile(path: string) {
    this.el.uploadInput.selectFile(
      [`${path}test.yaml`, `${path}example.yaml`],
      { force: true, action: "drag-drop" },
    );
  }
}
