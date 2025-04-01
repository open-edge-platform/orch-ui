/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  catalog,
  CatalogKinds,
  CatalogUploadDeploymentPackageResponse,
} from "@orch-ui/apis";
import { rest } from "msw";
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
  rest.get(
    `${baseURL}/${versionPrefix}/projects/:projectName/catalog/applications`,
    (req, res, ctx) => {
      const url = new URL(req.url);
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
      return res(
        ctx.status(200),
        ctx.json<catalog.ListApplicationsResponse>({
          applications: page,
          totalElements: apps.length,
        }),
      );
    },
  ),

  rest.get(
    `${baseURL}/${versionPrefix}/projects/:projectName/catalog/applications/:applicationName`,
    (req, res, ctx) => {
      const { applicationName } =
        req.params as catalog.CatalogServiceGetApplicationVersionsApiArg;
      const result = as.getVersions(applicationName);
      if (!result) {
        return res(ctx.status(404), ctx.json(null));
      }
      return res(
        ctx.status(200),
        ctx.json<catalog.GetApplicationVersionsResponse>({
          application: result,
        }),
      );
    },
  ),

  rest.get(
    `${baseURL}/${versionPrefix}/projects/:projectName/catalog/applications/:applicationName/versions/:version`,
    (req, res, ctx) => {
      const { version, applicationName } =
        req.params as catalog.CatalogServiceGetApplicationApiArg;

      const result = as.get(applicationName, version);
      if (!result) {
        return res(ctx.status(404), ctx.json(null));
      }
      return res(
        ctx.status(200),
        ctx.json<catalog.GetApplicationResponse>({
          application: result,
        }),
      );
    },
  ),

  rest.post(
    `${baseURL}/${versionPrefix}/projects/:projectName/catalog/applications`,
    async (req, res, ctx) => {
      const application = await req.json<catalog.Application>();
      application.kind = "KIND_NORMAL";
      const created = as.post(application);
      if (created)
        return res(
          ctx.status(201),
          ctx.json<catalog.CatalogServiceCreateApplicationApiResponse>({
            application: created,
          }),
        );

      return res(ctx.status(500));
    },
  ),

  rest.put(
    `${baseURL}/${versionPrefix}/projects/:projectName/catalog/applications/:applicationName/versions/:version`,
    async (req, res, ctx) => {
      const { applicationName, version } =
        req.params as unknown as catalog.CatalogServiceUpdateApplicationApiArg;
      const application = await req.json<catalog.Application>();
      application.kind = "KIND_NORMAL";
      const edited = as.put(applicationName, version, application);
      if (edited) return res(ctx.status(200), ctx.json({}));

      return res(ctx.status(404), ctx.json({}));
    },
  ),

  rest.delete(
    `${baseURL}/${versionPrefix}/projects/:projectName/catalog/applications/:applicationName/versions/:version`,
    (req, res, ctx) => {
      const { applicationName, version } =
        req.params as catalog.CatalogServiceDeleteApplicationApiArg;

      if (as.delete(applicationName, version)) {
        return res(ctx.status(200), ctx.json({}));
      } else {
        return res(
          ctx.status(404),
          ctx.json({ code: 5, message: "status 404 Not Found", details: [] }),
        );
      }
    },
  ),

  // composite applications (packages)
  rest.get(
    `${baseURL}/${versionPrefix}/projects/:projectName/catalog/deployment_packages`,
    (req, res, ctx) => {
      const url = new URL(req.url);
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
      return res(
        ctx.status(200),
        ctx.json<catalog.ListDeploymentPackagesResponse>({
          deploymentPackages: page,
          totalElements: 19,
        }),
      );
    },
  ),

  rest.get(
    `${baseURL}/${versionPrefix}/projects/:projectName/catalog/deployment_packages/:deploymentPackageName/versions`,
    (req, res, ctx) => {
      const { deploymentPackageName } =
        req.params as catalog.CatalogServiceGetDeploymentPackageVersionsApiArg;
      const caList = dps.getVersions(deploymentPackageName);

      // App catalog returns (200, []) (an empty list) if composite app name is not found
      return res(
        ctx.status(200),
        ctx.json<catalog.GetDeploymentPackageVersionsResponse>({
          deploymentPackages: caList,
        }),
      );
    },
  ),
  rest.delete(
    `${baseURL}/${versionPrefix}/projects/:projectName/catalog/deployment_packages/:deploymentPackageName/versions/:version`,
    (req, res, ctx) => {
      const { deploymentPackageName, version } =
        req.params as catalog.CatalogServiceDeleteDeploymentPackageApiArg;

      if (dps.delete(deploymentPackageName, version)) {
        return res(ctx.status(200), ctx.json({}));
      } else {
        return res(ctx.status(404), ctx.json({}));
      }
    },
  ),

  rest.get(
    `${baseURL}/${versionPrefix}/projects/:projectName/catalog/deployment_packages/:deploymentPackageName/versions/:version`,
    (req, res, ctx) => {
      const { version, deploymentPackageName } =
        req.params as catalog.CatalogServiceGetDeploymentPackageApiArg;
      const result = dps.get(deploymentPackageName, version);
      if (!result) {
        return res(ctx.status(404), ctx.json(null));
      }
      return res(
        ctx.status(200),
        ctx.json<catalog.CatalogServiceGetDeploymentPackageApiResponse>({
          deploymentPackage: result,
        }),
      );
    },
  ),
  rest.post(
    `${baseURL}/${versionPrefix}/projects/:projectName/catalog/deployment_packages`,
    async (req, res, ctx) => {
      const ca = await req.json<catalog.DeploymentPackage>();
      ca.kind = "KIND_NORMAL";
      const created = dps.post(ca);
      return res(
        ctx.status(201),
        ctx.json<catalog.CreateDeploymentPackageResponse>({
          deploymentPackage: created,
        }),
      );
    },
  ),
  // Upload deployment package
  rest.post(`${baseURL}/${catalogPrefix}/upload`, async (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.delay(3000),
      ctx.json<CatalogUploadDeploymentPackageResponse>({
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
      }),
    );
  }),

  // registries
  rest.get(
    `${baseURL}/${versionPrefix}/projects/:projectName/catalog/registries`,
    (req, res, ctx) => {
      const url = new URL(req.url);
      const offset = parseInt(url.searchParams.get("offset")!) || 0;
      const pageSize = parseInt(url.searchParams.get("pageSize")!) || 10;
      const filter = url.searchParams.get("filter");
      const name = filter?.split("=")[1];

      const list = rs.filter(name);
      const page =
        list.length <= pageSize ? list : list.slice(offset, offset + pageSize);

      return res(
        ctx.status(200),
        ctx.delay(500),
        ctx.json<catalog.ListRegistriesResponse>({
          registries: page,
          totalElements: list.length,
        }),
      );
    },
  ),
  rest.post(
    `${baseURL}/${versionPrefix}/projects/:projectName/catalog/registries`,
    async (req, res, ctx) => {
      const body = await req.json<catalog.Registry>();
      const registry = rs.post(body);
      if (registry) {
        return res(
          ctx.status(200),
          ctx.json<catalog.CatalogServiceCreateRegistryApiResponse>({
            registry,
          }),
        );
      }
      return res(ctx.status(500));
    },
  ),
  rest.put(
    `${baseURL}/${versionPrefix}/projects/:projectName/catalog/registries/:registryName`,
    async (req, res, ctx) => {
      const { registryName } =
        req.params as unknown as catalog.CatalogServiceUpdateRegistryApiArg;
      const registry = await req.json<catalog.Registry>();
      const success = rs.put(registryName, registry);
      if (success) {
        return res(ctx.status(200), ctx.json({}));
      }
      return res(ctx.status(500));
    },
  ),
  rest.delete(
    `${baseURL}/${versionPrefix}/projects/:projectName/catalog/registries/:registryName`,
    async (req, res, ctx) => {
      const { registryName } =
        req.params as catalog.CatalogServiceDeleteRegistryApiArg;
      const success = rs.delete(registryName);
      if (success) {
        return res(ctx.status(200), ctx.json({}));
      }
      return res(ctx.status(500));
    },
  ),

  // charts
  rest.get(`${baseURL}/${catalogPrefix}/charts`, (req, res, ctx) => {
    const registryName = req.url.searchParams.get("registry") as string;
    const chartName = req.url.searchParams.get("chart") as string;

    if (registryName && chartName) {
      return res(
        ctx.status(200),
        ctx.delay(500),
        ctx.json<string[]>(cs.listVersion(registryName, chartName)),
      );
    } else if (registryName) {
      return res(
        ctx.status(200),
        ctx.delay(500),
        ctx.json<string[]>(cs.listChart(registryName)),
      );
    }
  }),

  rest.get(
    `${baseURL}/${versionPrefix}/projects/:projectName/catalog/registries/:registryName`,
    (req, res, ctx) => {
      const { registryName } =
        req.params as unknown as catalog.CatalogServiceGetRegistryApiArg;
      const url = new URL(req.url);
      const offset = parseInt(url.searchParams.get("offset")!) || 0;
      const pageSize = parseInt(url.searchParams.get("pageSize")!) || 10;
      const list = rs.filter(registryName);
      const page =
        list.length <= pageSize ? list : list.slice(offset, offset + pageSize);
      return res(
        ctx.status(200),
        ctx.delay(500),
        ctx.json<catalog.GetRegistryResponse>({
          registry: page[0],
        }),
      );
    },
  ),

  rest.get(
    `${baseURL}/${versionPrefix}/projects/:projectName/catalog/registries/:registryName`,
    (req, res, ctx) => {
      const { registryName } =
        req.params as unknown as catalog.CatalogServiceGetRegistryApiArg;
      const url = new URL(req.url);
      const offset = parseInt(url.searchParams.get("offset")!) || 0;
      const pageSize = parseInt(url.searchParams.get("pageSize")!) || 10;
      const list = rs.filter(registryName);
      const page =
        list.length <= pageSize ? list : list.slice(offset, offset + pageSize);
      return res(
        ctx.status(200),
        ctx.delay(500),
        ctx.json<catalog.GetRegistryResponse>({
          registry: page[0],
        }),
      );
    },
  ),
];
