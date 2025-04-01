/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

export class DragDropPom extends CyPom<Selectors> {
  constructor(public rootCy: string = "dragDropArea") {
    super(rootCy, [...dataCySelectors]);
  }

  public dragDropFile(path: string) {
    this.root.selectFile([`${path}test.yaml`, `${path}example.yaml`], {
      force: true,
      action: "drag-drop",
    });
  }
}
