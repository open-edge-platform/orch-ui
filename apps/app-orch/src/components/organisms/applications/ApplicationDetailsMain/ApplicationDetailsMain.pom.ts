/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import { TablePom } from "@orch-ui/components";
import { SiTablePom } from "@orch-ui/poms";
import { CyPom } from "@orch-ui/tests";
import ApplicationDetailsProfilesInfoSubRowPom from "../../../atoms/ApplicationDetailsProfilesInfoSubRow/ApplicationDetailsProfilesInfoSubRow.pom";
import DeploymentsPom from "../../../pages/Deployments/Deployments.pom";

interface Info {
  title: string;
  value: string;
}

const dataCySelectors = [
  "title",
  "applicationBasicInfo",
  "version",
  "description",
  "registryName",
  "registryLocation",
  "chartName",
  "chartVersion",
  "dockerImageName",
  "dockerRegistryLocation",
] as const;
type Selectors = (typeof dataCySelectors)[number];

class ApplicationDetailsMainPom extends CyPom<Selectors> {
  public profileParameterTemplatePom: ApplicationDetailsProfilesInfoSubRowPom;
  public appProfilesTablePom: TablePom;
  public appProfilesTableUtils: SiTablePom;
  public depoloymentsPom: DeploymentsPom;
  constructor(public rootCy: string) {
    super(rootCy, [...dataCySelectors]);
    this.appProfilesTablePom = new TablePom("applicationProfilesTable");
    this.appProfilesTableUtils = new SiTablePom("applicationProfilesTable");
    this.depoloymentsPom = new DeploymentsPom();
    this.profileParameterTemplatePom =
      new ApplicationDetailsProfilesInfoSubRowPom();
  }

  public generateInfo = (app: catalog.Application): Info[] => [
    {
      title: "Version",
      value: app.version || "No version found",
    },
    {
      title: "Description",
      value: app.description || "No description found",
    },
    {
      title: "Chart name",
      value: app.chartName || "No chart name found",
    },
    {
      title: "Chart version",
      value: app.chartVersion || "No chart version found",
    },
    {
      title: "Helm registry",
      value: app.helmRegistryName || "No helm registry name found",
    },
    {
      title: "Created on",
      value: "Nov 2022",
    },
    {
      title: "Last updated",
      value: "Nov 2022",
    },
  ];
}

export default ApplicationDetailsMainPom;
