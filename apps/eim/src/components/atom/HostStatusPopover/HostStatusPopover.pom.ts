/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { AggregatedStatusesPom } from "@orch-ui/components";
import { CyPom } from "@orch-ui/tests";
import { dataCy } from "./HostStatusPopover";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

type GenericStatusType =
  | "hostStatus"
  | "onboardingStatus"
  | "instanceStatus"
  | "provisioningStatus"
  | "updateStatus";
class HostStatusPopoverPom extends CyPom<Selectors> {
  public aggregateStatusPom = new AggregatedStatusesPom();
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors]);
    this.aggregateStatusPom = new AggregatedStatusesPom();
  }

  getIconByStatus(status: GenericStatusType) {
    return this.root.find(`[data-cy='icon-${status}']`);
  }
}
export default HostStatusPopoverPom;
