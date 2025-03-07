/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import { ApiErrorPom, MetadataFormPom } from "@orch-ui/components";
import { CyApiDetail, CyPom, defaultActiveProject } from "@orch-ui/tests";
import { provisionedHostOne, provisionedInstanceOne } from "@orch-ui/utils";
import { HostsDetailsPom } from "../../organism/hostConfigure/HostsDetails/HostsDetails.pom";
import { RegionAndSitePom } from "../../organism/hostConfigure/RegionSite/RegionSite.pom";
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
  eim.PatchV1ProjectsByProjectNameComputeHostsAndHostIdApiResponse,
  eim.PatchV1ProjectsByProjectNameComputeHostsAndHostIdApiArg
> = {
  route,
  response: provisionedHostOne,
  method: "PATCH",
};

const patchComputeHostsAndHostId400: CyApiDetail<eim.ProblemDetailsRead> = {
  route,
  response: {
    message: "A Host error message",
  },
  method: "PATCH",
  statusCode: 400,
};

const postInstances: CyApiDetail<
  eim.PostV1ProjectsByProjectNameComputeInstancesApiResponse,
  eim.PostV1ProjectsByProjectNameComputeInstancesApiResponse
> = {
  route: instancesRoute,
  response: provisionedInstanceOne,
  method: "POST",
};
const postInstances400: CyApiDetail<eim.ProblemDetailsRead> = {
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
  public regionAndSitePom = new RegionAndSitePom();
  public regionSiteTreePom = new RegionSiteTreePom();
  public hostsDetailsPom = new HostsDetailsPom();

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
  public configureHost(site: string, name: string, metadata: eim.Metadata) {
    // search for site
    this.regionAndSitePom.search(site);
    // select site
    this.regionSiteTreePom.selectSite(site);
    // click next
    this.el.next.click();
    // set name (note we're assuming there's only one host)
    this.hostsDetailsPom.setHostName(0, name);
    // click next
    this.el.next.click();
    // TODO add host label
    // click next
    this.el.next.click();
    // click configure
    this.el.next.contains("Configure").click();
  }
}
