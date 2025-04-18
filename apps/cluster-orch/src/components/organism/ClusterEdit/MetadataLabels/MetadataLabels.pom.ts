/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { MetadataDisplayPom, MetadataFormPom } from "@orch-ui/components";
import { CyPom } from "@orch-ui/tests";
import ClusterEditPom from "../../../pages/ClusterEdit/ClusterEdit.pom";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

class MetadataLabelsPom extends CyPom<Selectors> {
  public clusterEditPom = new ClusterEditPom();
  public metadataDisplay = new MetadataDisplayPom();
  public metadataForm = new MetadataFormPom();

  constructor(public rootCy: string = "metadataLabels") {
    super(rootCy, [...dataCySelectors]);
  }

  getMetadataKeyInput(index: number) {
    return this.metadataForm.el.pair
      .eq(index)
      .find("[data-cy='metadataKey'] input")
      .first();
  }
}
export default MetadataLabelsPom;
