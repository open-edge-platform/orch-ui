/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { MetadataDisplayPom, MetadataFormPom } from "@orch-ui/components";
import { CyPom } from "@orch-ui/tests";
import ClusterEditPom from "../../../pages/ClusterEdit/ClusterEdit.pom";
import { dataCy } from "./MetadataLabels";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

class MetadataLabelsPom extends CyPom<Selectors> {
  public clusterEditPom = new ClusterEditPom();
  public metadataDisplay = new MetadataDisplayPom();
  public metadataForm = new MetadataFormPom();

  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors]);
  }
}
export default MetadataLabelsPom;
