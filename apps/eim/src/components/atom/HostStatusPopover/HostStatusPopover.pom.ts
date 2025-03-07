/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { AggregatedStatusesPom, PopoverPom } from "@orch-ui/components";
import { cyGet, CyPom } from "@orch-ui/tests";
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
  public popoverPom = new PopoverPom();
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors]);
    this.aggregateStatusPom = new AggregatedStatusesPom();
    this.popoverPom = new PopoverPom();
  }

  getIconByStatus(status: GenericStatusType) {
    return this.root.find(`[data-cy='icon-${status}']`);
  }

  validatePopOverTitle(title: string, subTitle?: string) {
    cyGet("popover").click();
    this.popoverPom.el.popoverContent.should("be.visible");
    this.popoverPom.el.popoverTitle.should("contain", title);
    if (subTitle) {
      this.popoverPom.el.popoverContent.should("contain", subTitle);
    }
  }
}
export default HostStatusPopoverPom;
