/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";
import { MetadataBadgePom } from "../MetadataBadge/MetadataBadge.pom";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

export class MetadataDisplayPom extends CyPom<Selectors> {
  public metadataBadge: MetadataBadgePom;

  constructor(public rootCy: string = "MetadataDisplay") {
    super(rootCy, [...dataCySelectors]);
    this.metadataBadge = new MetadataBadgePom();
  }

  getAll() {
    return this.root.find("[data-cy='metadataBadge']");
  }

  getByKey(key: string) {
    return this.root.find("[data-cy='metadataBadge']").contains(`${key} =`);
  }

  getByIndex(index: number) {
    return this.getAll().eq(index);
  }
  getTagByIndex(metadataIndex: number) {
    return this.getByIndex(metadataIndex).find("[data-cy='metadataTag']");
  }
}
