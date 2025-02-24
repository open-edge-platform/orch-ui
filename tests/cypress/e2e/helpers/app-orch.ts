import { adm, catalog } from "@orch-ui/apis";
import { cyGet } from "../../support/cyBase";

// --- Interfaces ---
export interface RegistryChart {
  chartName?: string;
  chartVersion?: string;
}
export interface TestData {
  registry?: Partial<catalog.Registry>;
  registryChart?: RegistryChart;
  application?: catalog.Application;
  applicationProfile?: catalog.Profile;
  deploymentPackage?: catalog.DeploymentPackage;
  deployments?: adm.Deployment;
}

// --- Interface Type Checking (for `data/*.json` use) ---
export function isRegistry(arg: any): arg is Partial<catalog.Registry> {
  return "displayName" in arg && "rootUrl" in arg && "type" in arg;
}
export function isApplication(arg: any): arg is Partial<catalog.Application> {
  return "name" in arg && "version" in arg;
}
export function isDeploymentPackage(
  arg: any,
): arg is Partial<catalog.DeploymentPackage> {
  return "displayName" in arg && "version" in arg && "description" in arg;
}

// --- Test Data Checking (let your test know if your `data/*.json` is completely provided) ---
export function isRegistryTestDataPresent(arg: any) {
  return "registry" in arg && isRegistry(arg.registry);
}
export function isRegistryChartTestDataPresent(arg: any) {
  return (
    "registryChart" in arg &&
    "chartName" in arg.registryChart &&
    "chartVersion" in arg.registryChart
  );
}
export function isApplicationTestDataPresent(arg: any) {
  return "application" in arg && isApplication(arg.application);
}

export function isApplicationProfileTestDataPresent(arg: any) {
  return (
    "applicationProfile" in arg &&
    "name" in arg.applicationProfile &&
    "description" in arg.applicationProfile &&
    "chartValues" in arg.applicationProfile
  );
}

export function isDeploymentPackageTestDataPresent(arg: any) {
  return (
    "deploymentPackage" in arg && isDeploymentPackage(arg.deploymentPackage)
  );
}
export function isDeploymentTestDataPresent(arg: any) {
  return "deployments" in arg; // && isDeployment(arg.deployment);
}

// --- Helper Functions ---
/** get Deployments navigation button */
export function getDeploymentsMFETab() {
  return cyGet("headerItemLink").contains("Deployments");
}

/** get sidebar option by name */
export function getSidebarTabByName(tabName: string) {
  return cyGet("sidebar").contains(tabName);
}
