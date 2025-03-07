/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import {
  chartData,
  ChartStore,
  registryResponse,
  RegistryStore,
} from "@orch-ui/utils";

export interface RegistryChart {
  chartName?: string;
  chartVersion?: string;
}

const dataCySelectors = [
  "helmRegistryNameCombobox",
  "helmLocationInput",
  "chartNameCombobox",
  "chartVersionCombobox",
  "imageRegistryNameCombobox",
  "imageLocationInput",
] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases =
  | "registry"
  | "chartsMocked"
  | "listChartNames"
  | "listChartVersions";

const registryStore = new RegistryStore();
const chartStore = new ChartStore();
const selectedRegistry = "orch-harbor";
const selectedChart = "chart1";

const project = defaultActiveProject.name;
const apis: CyApiDetails<ApiAliases> = {
  registry: {
    route: `/v3/projects/${project}/catalog/registries?`,
    response: registryResponse,
  },
  chartsMocked: {
    route: "**/charts**",
    statusCode: 200,
  },
  listChartNames: {
    route: `/v3/projects/${project}/catalog/charts?registry=${selectedRegistry}`,
    response: chartData
      .filter((chart) => chart.registry === selectedRegistry)
      .map((chart) => chart.chartName),
  },
  listChartVersions: {
    route: `/v3/projects/${project}/catalog/charts?registry=${selectedRegistry}&chart=${selectedChart}`,
    response: chartData
      .filter(
        (chart) =>
          chart.registry === selectedRegistry &&
          chart.chartName === selectedChart,
      )
      .map((chart) => chart.versions)[0],
  },
};

class ApplicationSourcePom extends CyPom<Selectors, ApiAliases> {
  registry = registryStore;
  chartName = chartStore;
  chartVersion = chartStore;

  constructor(public rootCy: string) {
    super(rootCy, [...dataCySelectors], apis);
  }

  public clickHelmRegistryNameDropDown() {
    this.el.helmRegistryNameCombobox.find("button").click();
  }
  public selectHelmRegistryName(helmRegistryName: string) {
    this.clickHelmRegistryNameDropDown();

    this.interceptApis([this.api.listChartNames]);
    cy.get(".spark-popover").contains(`${helmRegistryName}`).click();
    this.waitForApis();

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500); // This is needed for the Api to substitute the value onto the Helm Registry SIDropdown
  }

  public clickChartNameDropDown() {
    this.el.chartNameCombobox.find("button").click();
  }
  public selectChartName(chartName: string) {
    this.clickChartNameDropDown();

    this.interceptApis([this.api.listChartVersions]);
    cy.contains(`${chartName}`).click();
    this.waitForApis();

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500); // This is needed for the Api to substitute the value onto the Helm Registry SIDropdown
  }

  public clickChartVersionDropDown() {
    this.el.chartVersionCombobox.find("button").click();
  }
  public selectChartVersion(chartVersion: string) {
    this.clickChartVersionDropDown();
    cy.contains(`${chartVersion}`).click();
  }

  public clickImageRegistryNameDropDown() {
    this.el.imageRegistryNameCombobox.find("button").click();
  }
  public selectImageRegistryName(imageRegistryName: string) {
    this.clickImageRegistryNameDropDown();
    cy.contains(`${imageRegistryName}`).click();
  }

  /**
   * For ApplicationCreateEdit. Fill in Stepper Step 1: Select the ApplicationSource
   * Note: Make sure you are in the Application Create/Edit page before performing below operation.
   **/
  fillApplicationCreateEditSourceInfo(
    registry: Partial<catalog.Registry>,
    chart: RegistryChart,
  ) {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500); // This is needed for the Api to substitute the value onto the Helm Registry SIDropdown

    this.el.helmRegistryNameCombobox.find("button").click();
    cy.get(".spark-popover").contains(registry.name!).click();

    // TODO: A way to create a chart before running the E2E tests (within Github Workflow CLI)
    this.el.chartNameCombobox.first().type(chart.chartName!);
    this.el.chartVersionCombobox.first().type(chart.chartVersion!);
  }
}

export default ApplicationSourcePom;
