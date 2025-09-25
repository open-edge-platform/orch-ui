/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  catalog,
  CatalogKinds,
  CatalogUploadDeploymentPackageResponse,
} from "@orch-ui/apis";
import { delay, http, HttpResponse } from "msw";
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
    ({ request }) => {
      const url = new URL(request.url);
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
      return HttpResponse.json<catalog.ListApplicationsResponse>(
        {
          applications: page,
          totalElements: apps.length,
        },
        { status: 200 },
      );
    },
  ),

  http.get(
    `${baseURL}/${versionPrefix}/projects/:projectName/catalog/applications/:applicationName`,
    ({ params }) => {
      const { applicationName } =
        params as catalog.CatalogServiceGetApplicationVersionsApiArg;
      const result = as.getVersions(applicationName);
      if (!result) {
        return HttpResponse.json(null, { status: 404 });
      }
      return HttpResponse.json<catalog.GetApplicationVersionsResponse>(
        {
          application: result,
        },
        { status: 200 },
      );
    },
  ),

  http.get(
    `${baseURL}/${versionPrefix}/projects/:projectName/catalog/applications/:applicationName/versions/:version`,
    ({ params }) => {
      const { version, applicationName } =
        params as catalog.CatalogServiceGetApplicationApiArg;

      const result = as.get(applicationName, version);
      if (!result) {
        return HttpResponse.json(null, { status: 404 });
      }
      return HttpResponse.json<catalog.GetApplicationResponse>(
        {
          application: result,
        },
        { status: 200 },
      );
    },
  ),

  http.post(
    `${baseURL}/${versionPrefix}/projects/:projectName/catalog/applications`,
    async ({ request }) => {
      const application = (await request.json()) as catalog.Application;
      application.kind = "KIND_NORMAL";
      const created = as.post(application);
      if (created)
        return HttpResponse.json<catalog.CatalogServiceCreateApplicationApiResponse>(
          {
            application: created,
          },
          { status: 201 },
        );

      return HttpResponse.json(null, { status: 500 });
    },
  ),

  http.put(
    `${baseURL}/${versionPrefix}/projects/:projectName/catalog/applications/:applicationName/versions/:version`,
    async ({ request, params }) => {
      const { applicationName, version } =
        params as unknown as catalog.CatalogServiceUpdateApplicationApiArg;
      const application = (await request.json()) as catalog.Application;
      application.kind = "KIND_NORMAL";
      const edited = as.put(applicationName, version, application);
      if (edited) return HttpResponse.json({}, { status: 200 });

      return HttpResponse.json({}, { status: 404 });
    },
  ),

  http.delete(
    `${baseURL}/${versionPrefix}/projects/:projectName/catalog/applications/:applicationName/versions/:version`,
    ({ params }) => {
      const { applicationName, version } =
        params as catalog.CatalogServiceDeleteApplicationApiArg;

      if (as.delete(applicationName, version)) {
        return HttpResponse.json({}, { status: 200 });
      } else {
        return HttpResponse.json(
          { code: 5, message: "status 404 Not Found", details: [] },
          { status: 404 },
        );
      }
    },
  ),

  // composite applications (packages)
  http.get(
    `${baseURL}/${versionPrefix}/projects/:projectName/catalog/deployment_packages`,
    ({ request }) => {
      const url = new URL(request.url);
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
      return HttpResponse.json<catalog.ListDeploymentPackagesResponse>(
        {
          deploymentPackages: page,
          totalElements: 19,
        },
        { status: 200 },
      );
    },
  ),

  http.get(
    `${baseURL}/${versionPrefix}/projects/:projectName/catalog/deployment_packages/:deploymentPackageName/versions`,
    ({ params }) => {
      const { deploymentPackageName } =
        params as catalog.CatalogServiceGetDeploymentPackageVersionsApiArg;
      const caList = dps.getVersions(deploymentPackageName);

      // App catalog returns (200, []) (an empty list) if composite app name is not found
      return HttpResponse.json<catalog.GetDeploymentPackageVersionsResponse>(
        {
          deploymentPackages: caList,
        },
        { status: 200 },
      );
    },
  ),
  http.delete(
    `${baseURL}/${versionPrefix}/projects/:projectName/catalog/deployment_packages/:deploymentPackageName/versions/:version`,
    ({ params }) => {
      const { deploymentPackageName, version } =
        params as catalog.CatalogServiceDeleteDeploymentPackageApiArg;

      if (dps.delete(deploymentPackageName, version)) {
        return HttpResponse.json({}, { status: 200 });
      } else {
        return HttpResponse.json({}, { status: 404 });
      }
    },
  ),

  http.get(
    `${baseURL}/${versionPrefix}/projects/:projectName/catalog/deployment_packages/:deploymentPackageName/versions/:version`,
    ({ params }) => {
      const { version, deploymentPackageName } =
        params as catalog.CatalogServiceGetDeploymentPackageApiArg;
      const result = dps.get(deploymentPackageName, version);
      if (!result) {
        return HttpResponse.json(null, { status: 404 });
      }
      return HttpResponse.json<catalog.CatalogServiceGetDeploymentPackageApiResponse>(
        {
          deploymentPackage: result,
        },
        { status: 200 },
      );
    },
  ),
  http.post(
    `${baseURL}/${versionPrefix}/projects/:projectName/catalog/deployment_packages`,
    async ({ request }) => {
      const ca = (await request.json()) as catalog.DeploymentPackage;
      ca.kind = "KIND_NORMAL";
      const created = dps.post(ca);
      return HttpResponse.json<catalog.CreateDeploymentPackageResponse>(
        {
          deploymentPackage: created,
        },
        { status: 201 },
      );
    },
  ),
  // Upload deployment package
  http.post(`${baseURL}/${catalogPrefix}/upload`, async () => {
    await delay(3000);
    return HttpResponse.json<CatalogUploadDeploymentPackageResponse>(
      {
        responses: [
          {
            sessionId: "896a6684-fa4d-49bc-95b2-26372117dc2a",
            uploadNumber: 1,
          },
          {
            sessionId: "896a6684-fa4d-49bc-95b2-26372117dc2a",
            uploadNumber: 2,
            errorMessages: [
              "rpc error: code = InvalidArgument desc = application invalid: helm registry harbor-helm not found",
            ],
          },
        ],
      },
      { status: 500 },
    );
  }),

  // registries
  http.get(
    `${baseURL}/${versionPrefix}/projects/:projectName/catalog/registries`,
    async ({ request }) => {
      const url = new URL(request.url);
      const offset = parseInt(url.searchParams.get("offset")!) || 0;
      const pageSize = parseInt(url.searchParams.get("pageSize")!) || 10;
      const filter = url.searchParams.get("filter");
      const name = filter?.split("=")[1];

      const list = rs.filter(name);
      const page =
        list.length <= pageSize ? list : list.slice(offset, offset + pageSize);

      await delay(500);
      return HttpResponse.json<catalog.ListRegistriesResponse>(
        {
          registries: page,
          totalElements: list.length,
        },
        { status: 200 },
      );
    },
  ),
  http.post(
    `${baseURL}/${versionPrefix}/projects/:projectName/catalog/registries`,
    async ({ request }) => {
      const body = (await request.json()) as catalog.Registry;
      const registry = rs.post(body);
      if (registry) {
        return HttpResponse.json<catalog.CatalogServiceCreateRegistryApiResponse>(
          {
            registry,
          },
          { status: 200 },
        );
      }
      return HttpResponse.json(null, { status: 500 });
    },
  ),
  http.put(
    `${baseURL}/${versionPrefix}/projects/:projectName/catalog/registries/:registryName`,
    async ({ request, params }) => {
      const { registryName } =
        params as unknown as catalog.CatalogServiceUpdateRegistryApiArg;
      const registry = (await request.json()) as catalog.Registry;
      const success = rs.put(registryName, registry);
      if (success) {
        return HttpResponse.json({}, { status: 200 });
      }
      return HttpResponse.json(null, { status: 500 });
    },
  ),
  http.delete(
    `${baseURL}/${versionPrefix}/projects/:projectName/catalog/registries/:registryName`,
    async ({ params }) => {
      const { registryName } =
        params as catalog.CatalogServiceDeleteRegistryApiArg;
      const success = rs.delete(registryName);
      if (success) {
        return HttpResponse.json({}, { status: 200 });
      }
      return HttpResponse.json(null, { status: 500 });
    },
  ),

  // charts
  http.get(`${baseURL}/${catalogPrefix}/charts`, async ({ request }) => {
    const registryName = new URL(request.url).searchParams.get(
      "registry",
    ) as string;
    const chartName = new URL(request.url).searchParams.get("chart") as string;

    if (registryName && chartName) {
      await delay(500);
      return HttpResponse.json<string[]>(
        cs.listVersion(registryName, chartName),
        { status: 200 },
      );
    } else if (registryName) {
      await delay(500);
      return HttpResponse.json<string[]>(cs.listChart(registryName), {
        status: 200,
      });
    }
  }),

  http.get(
    `${baseURL}/${versionPrefix}/projects/:projectName/catalog/registries/:registryName`,
    async ({ request, params }) => {
      const { registryName } =
        params as unknown as catalog.CatalogServiceGetRegistryApiArg;
      const url = new URL(request.url);
      const offset = parseInt(url.searchParams.get("offset")!) || 0;
      const pageSize = parseInt(url.searchParams.get("pageSize")!) || 10;
      const list = rs.filter(registryName);
      const page =
        list.length <= pageSize ? list : list.slice(offset, offset + pageSize);

      await delay(500);
      return HttpResponse.json<catalog.GetRegistryResponse>(
        {
          registry: page[0],
        },
        { status: 200 },
      );
    },
  ),
];
