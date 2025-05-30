/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { ApiErrorPom, MetadataFormPom } from "@orch-ui/components";
import { SiDropdown } from "@orch-ui/poms";
import { CyApiDetail, CyPom, defaultActiveProject } from "@orch-ui/tests";
import { provisionedHostOne, provisionedInstanceOne } from "@orch-ui/utils";
import { HostsDetailsPom } from "../../organism/hostConfigure/HostsDetails/HostsDetails.pom";
import { RegionAndSiteConfigurePom } from "../../organism/hostConfigure/RegionSite/RegionSite.pom";
import { RegionSiteTreePom } from "../../organism/locations/RegionSiteTree/RegionSiteTree.pom";

const dataCySelectors = ["next", "prev", "serialNumber"] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases =
  | "patchComputeHostsAndHostId"
  | "patchComputeHostsAndHostId400"
  | "postInstances"
  | "postInstances400";

const route = `**/v1/projects/${defaultActiveProject.name}/compute/hosts/**`;
const instancesRoute = `**/v1/projects/${defaultActiveProject.name}/compute/instances`;

const patchComputeHostsAndHostId: CyApiDetail<
  infra.HostServicePatchHostApiResponse,
  infra.HostServicePatchHostApiArg
> = {
  route,
  response: provisionedHostOne,
  method: "PATCH",
};

const patchComputeHostsAndHostId400: CyApiDetail<infra.ProblemDetailsRead> = {
  route,
  response: {
    message: "A Host error message",
  },
  method: "PATCH",
  statusCode: 400,
};

const postInstances: CyApiDetail<
  infra.InstanceServiceCreateInstanceApiResponse,
  infra.InstanceServiceCreateInstanceApiResponse
> = {
  route: instancesRoute,
  response: provisionedInstanceOne,
  method: "POST",
};
const postInstances400: CyApiDetail<infra.ProblemDetailsRead> = {
  route: instancesRoute,
  response: {
    message: "An Instance error message",
  },
  method: "POST",
  statusCode: 400,
};

export class HostConfigPom extends CyPom<Selectors, ApiAliases> {
  public apiError = new ApiErrorPom();
  public metadataPom = new MetadataFormPom();
  public regionAndSiteConfigurePom = new RegionAndSiteConfigurePom();
  public regionSiteTreePom = new RegionSiteTreePom();
  public hostsDetailsPom = new HostsDetailsPom();
  public globalOsDropdownPom = new SiDropdown("globalOsDropdown");
  public osDropdownPom = new SiDropdown("osProfile");

  constructor(public rootCy: string = "hostConfig") {
    super(rootCy, [...dataCySelectors], {
      patchComputeHostsAndHostId,
      patchComputeHostsAndHostId400,
      postInstances,
      postInstances400,
    });
  }

  get missingHostMessage() {
    // FIXME <MessageBanner> does not propagate the data-cy attribute
    return this.root.find('[data-testid="message-banner"]');
  }

  get missingHostMessageConfirmButton() {
    return this.root.find('[data-testid="message-banner-action-primary"]');
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  public provisionHost(
    site: string,
    metadata: infra.MetadataItem,
    isSingle: boolean = false,
  ) {
    // search for site
    this.regionAndSiteConfigurePom.search(site);
    // select site
    this.regionSiteTreePom.selectSite(site);
    // click next
    this.el.next.click();
    // select an os
    if (isSingle) {
      this.osDropdownPom.openDropdown(this.osDropdownPom.root);
      this.osDropdownPom.selectNthListItemValue(1);
    } else {
      this.globalOsDropdownPom.openDropdown(this.globalOsDropdownPom.root);
      this.globalOsDropdownPom.selectNthListItemValue(1);
    }
    // click next
    this.el.next.click();
    // TODO add host label
    // click next
    this.el.next.click();
    // selecting ssh keys
    this.el.next.click();
    // click configure
    this.el.next.contains("Provision").click();
  }
}
