/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  catalog,
  CatalogKinds,
  CatalogUploadDeploymentPackageResponse,
} from "@orch-ui/apis";
import { http , delay} from "msw"
import { ApplicationsStore } from "./applications";
import { ChartStore } from "./charts";
import { DeploymentPackagesStore } from "./packages";
import { RegistryStore } from "./registries";

const baseURL = "";
const catalogPrefix = "catalog.orchestrator.apis";
const versionPrefix = "v3";

const as = new ApplicationsStore();
const dps = new DeploymentPackagesStore();
const rs = new RegistryStore();
const cs = new ChartStore();

export const handlers = [
  // applications
  http.get(
    `${baseURL}/${versionPrefix}/projects/:projectName/catalog/applications`,
    ({request}) => {
 let req = request;
      const url = new URL(new URL(req.url));
      const offset = parseInt(url.searchParams.get("offset")!) || 0;
      const pageSize = parseInt(url.searchParams.get("pageSize")!) || 10;
      const orderBy = url.searchParams.get("orderBy") || undefined;
      const filter = url.searchParams.get("filter") || "";
      const kind = url.searchParams.get("kinds");
      const appsAll = as.list();
      const apps = as.getByApplicationKind(appsAll, kind as CatalogKinds);
      const list =
        as.filter(filter, apps).length === 0 ? apps : as.filter(filter, apps);
      const sort = as.sort(orderBy, list);
      const page = sort.slice(offset, offset + pageSize);
      return HttpResponse.text(
{status: 200,
});
    },
  ),

  http.get(
    `${baseURL}/${versionPrefix}/projects/:projectName/catalog/applications/:applicationName`,
    () => {
      const { applicationName } =
        params as catalog.CatalogServiceGetApplicationVersionsApiArg;
      const result = as.getVersions(applicationName);
      if (!result) {
        return HttpResponse.json(
null,
{status: 404,
});
      }
      return HttpResponse.text(
{status: 200,
});
    },
  ),

  http.get(
    `${baseURL}/${versionPrefix}/projects/:projectName/catalog/applications/:applicationName/versions/:version`,
    () => {
      const { version, applicationName } =
        params as catalog.CatalogServiceGetApplicationApiArg;

      const result = as.get(applicationName, version);
      if (!result) {
        return HttpResponse.json(
null,
{status: 404,
});
      }
      return HttpResponse.text(
{status: 200,
});
    },
  ),

  http.post(
    `${baseURL}/${versionPrefix}/projects/:projectName/catalog/applications`,
    async ({request}) => {
 let req = request;
      const application = await req.json<any, catalog.Application>();
      application.kind = "KIND_NORMAL";
      const created = as.post(application);
      if (created)
        return HttpResponse.text(
{status: 201,
});

      return HttpResponse.text(
{status: 500,
});
    },
  ),

  http.put(
    `${baseURL}/${versionPrefix}/projects/:projectName/catalog/applications/:applicationName/versions/:version`,
    async ({request}) => {
 let req = request;
      const { applicationName, version } =
        params as unknown as catalog.CatalogServiceUpdateApplicationApiArg;
      const application = await req.json<any, catalog.Application>();
      application.kind = "KIND_NORMAL";
      const edited = as.put(applicationName, version, application);
      if (edited) return HttpResponse.json(
{},
{status: 200,
});

      return HttpResponse.json(
{},
{status: 404,
});
    },
  ),

  http.delete(
    `${baseURL}/${versionPrefix}/projects/:projectName/catalog/applications/:applicationName/versions/:version`,
    () => {
      const { applicationName, version } =
        params as catalog.CatalogServiceDeleteApplicationApiArg;

      if (as.delete(applicationName, version)) {
        return HttpResponse.json(
{},
{status: 200,
});
      } else {
        return HttpResponse.json(
{ code: 5, message: "status 404 Not Found", details: [] },
{status: 404,
});
      }
    },
  ),

  // composite applications (packages)
  http.get(
    `${baseURL}/${versionPrefix}/projects/:projectName/catalog/deployment_packages`,
    ({request}) => {
 let req = request;
      const url = new URL(new URL(req.url));
      const offset = parseInt(url.searchParams.get("offset")!) || 0;
      const pageSize = parseInt(url.searchParams.get("pageSize")!) || 10;
      const orderBy = url.searchParams.get("orderBy") || undefined;
      const filter = url.searchParams.get("filter") || "";
      const kind = url.searchParams.get("kinds");
      const pkgsAll = dps.list();

      const pkgs = dps.getByPackagesKind(pkgsAll, kind as CatalogKinds);
      const list = dps.filter(filter, pkgs);
      const sort = dps.sort(orderBy, list);
      const page = sort.slice(offset, offset + pageSize);
      return HttpResponse.text(
{status: 200,
});
    },
  ),

  http.get(
    `${baseURL}/${versionPrefix}/projects/:projectName/catalog/deployment_packages/:deploymentPackageName/versions`,
    () => {
      const { deploymentPackageName } =
        params as catalog.CatalogServiceGetDeploymentPackageVersionsApiArg;
      const caList = dps.getVersions(deploymentPackageName);

      // App catalog returns (200, []) (an empty list) if composite app name is not found
      return HttpResponse.text(
{status: 200,
});
    },
  ),
  http.delete(
    `${baseURL}/${versionPrefix}/projects/:projectName/catalog/deployment_packages/:deploymentPackageName/versions/:version`,
    () => {
      const { deploymentPackageName, version } =
        params as catalog.CatalogServiceDeleteDeploymentPackageApiArg;

      if (dps.delete(deploymentPackageName, version)) {
        return HttpResponse.json(
{},
{status: 200,
});
      } else {
        return HttpResponse.json(
{},
{status: 404,
});
      }
    },
  ),

  http.get(
    `${baseURL}/${versionPrefix}/projects/:projectName/catalog/deployment_packages/:deploymentPackageName/versions/:version`,
    () => {
      const { version, deploymentPackageName } =
        params as catalog.CatalogServiceGetDeploymentPackageApiArg;
      const result = dps.get(deploymentPackageName, version);
      if (!result) {
        return HttpResponse.json(
null,
{status: 404,
});
      }
      return HttpResponse.text(
{status: 200,
});
    },
  ),
  http.post(
    `${baseURL}/${versionPrefix}/projects/:projectName/catalog/deployment_packages`,
    async ({request}) => {
 let req = request;
      const ca = await req.json<any, catalog.DeploymentPackage>();
      ca.kind = "KIND_NORMAL";
      const created = dps.post(ca);
      return HttpResponse.text(
{status: 201,
});
    },
  ),
  // Upload deployment package
  http.post(`${baseURL}/${catalogPrefix}/upload`, async (req, res, ctx) {
  await delay(500); 
    return HttpResponse.text(
{status: 500,
});
  }),

  // registries
  http.get(
    `${baseURL}/${versionPrefix}/projects/:projectName/catalog/registries`,
    async (req, res, ctx) {
  await delay(500); 
      const url = new URL(new URL(req.url));
      const offset = parseInt(url.searchParams.get("offset")!) || 0;
      const pageSize = parseInt(url.searchParams.get("pageSize")!) || 10;
      const filter = url.searchParams.get("filter");
      const name = filter?.split("=")[1];

      const list = rs.filter(name);
      const page =
        list.length <= pageSize ? list : list.slice(offset, offset + pageSize);

      return HttpResponse.text(
{status: 200,
});
    },
  ),
  http.post(
    `${baseURL}/${versionPrefix}/projects/:projectName/catalog/registries`,
    async ({request}) => {
 let req = request;
      const body = await req.json<any, catalog.Registry>();
      const registry = rs.post(body);
      if (registry) {
        return HttpResponse.text(
{status: 200,
});
      }
      return HttpResponse.text(
{status: 500,
});
    },
  ),
  http.put(
    `${baseURL}/${versionPrefix}/projects/:projectName/catalog/registries/:registryName`,
    async ({request}) => {
 let req = request;
      const { registryName } =
        params as unknown as catalog.CatalogServiceUpdateRegistryApiArg;
      const registry = await req.json<any, catalog.Registry>();
      const success = rs.put(registryName, registry);
      if (success) {
        return HttpResponse.json(
{},
{status: 200,
});
      }
      return HttpResponse.text(
{status: 500,
});
    },
  ),
  http.delete(
    `${baseURL}/${versionPrefix}/projects/:projectName/catalog/registries/:registryName`,
    async () => {
      const { registryName } =
        params as catalog.CatalogServiceDeleteRegistryApiArg;
      const success = rs.delete(registryName);
      if (success) {
        return HttpResponse.json(
{},
{status: 200,
});
      }
      return HttpResponse.text(
{status: 500,
});
    },
  ),

  // charts
  http.get(`${baseURL}/${catalogPrefix}/charts`, async (req, res, ctx) {
  await delay(500); 
    const registryName = new URL(req.url).searchParams.get("registry") as string;
    const chartName = new URL(req.url).searchParams.get("chart") as string;

    if (registryName && chartName) {
      return res(
        ctx.status(200),
        ctx.delay(500),
        ctx.json<any, string[]>(cs.listVersion(registryName, chartName)),
      );
    } else if (registryName) {
      return HttpResponse.text(
{status: 200,
});
    }
  }),

  http.get(
    `${baseURL}/${versionPrefix}/projects/:projectName/catalog/registries/:registryName`,
    async (req, res, ctx) {
  await delay(500); 
      const { registryName } =
        params as unknown as catalog.CatalogServiceGetRegistryApiArg;
      const url = new URL(new URL(req.url));
      const offset = parseInt(url.searchParams.get("offset")!) || 0;
      const pageSize = parseInt(url.searchParams.get("pageSize")!) || 10;
      const list = rs.filter(registryName);
      const page =
        list.length <= pageSize ? list : list.slice(offset, offset + pageSize);
      return HttpResponse.text(
{status: 200,
});
    },
  ),

  http.get(
    `${baseURL}/${versionPrefix}/projects/:projectName/catalog/registries/:registryName`,
    async (req, res, ctx) {
  await delay(500); 
      const { registryName } =
        params as unknown as catalog.CatalogServiceGetRegistryApiArg;
      const url = new URL(new URL(req.url));
      const offset = parseInt(url.searchParams.get("offset")!) || 0;
      const pageSize = parseInt(url.searchParams.get("pageSize")!) || 10;
      const list = rs.filter(registryName);
      const page =
        list.length <= pageSize ? list : list.slice(offset, offset + pageSize);
      return HttpResponse.text(
{status: 200,
});
    },
  ),
];
