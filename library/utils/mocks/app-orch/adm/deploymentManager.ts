/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { adm, tm } from "@orch-ui/apis";
import { http , delay} from "msw"
import {
  DeploymentClustersStore,
  DeploymentsStore,
  UiExtensionsStore,
} from "../adm";
import { deploymentsPerCluster } from "./data/deploymentClusters";

const baseURLPrefix = "/v1/projects/:projectName";
const dcs = new DeploymentClustersStore();
const ds = new DeploymentsStore();
const uiStore = new UiExtensionsStore();

export const handlers = [
  // this get definition could belong to Tenant mock; api definition does not have type for network object
  http.get(`${baseURLPrefix}/networks`, () => {
    return HttpResponse.text(
{status: 200,
});
  }),
  http.get(`${baseURLPrefix}/appdeployment/deployments`, ({request}) => {
 let req = request;
    const metadataString = new URL(req.url).searchParams.get("labels");
    let deployments = ds.list();
    if (metadataString) {
      deployments = deployments.filter((deployment) => {
        let matchSimilarity = 0;
        const metadataParams = metadataString.split(",");
        // For each metadata in first targetClusters
        // Note metadata within all targetClusters are assumed to be same
        metadataParams.forEach((keyValuePairs) => {
          const [key, value] = keyValuePairs.split("=");
          if (
            deployment.targetClusters &&
            deployment.targetClusters.length > 0 &&
            deployment.targetClusters[0] &&
            deployment.targetClusters[0].labels &&
            deployment.targetClusters[0].labels[key] === value
          )
            matchSimilarity++;
        });

        // If the all metadata within first targetCluster matches
        return matchSimilarity === metadataParams.length;
      });
    }

    const url = new URL(new URL(req.url));
    const offset = parseInt(url.searchParams.get("offset")!) || 0;
    const pageSize = parseInt(url.searchParams.get("pageSize")!) || 10;
    const orderBy = url.searchParams.get("orderBy") || undefined;
    const filter = url.searchParams.get("filter") || "";

    const list =
      ds.filter(filter, deployments).length === 0
        ? deployments
        : ds.filter(filter, deployments);
    const sort = ds.sort(orderBy, list);
    const page = sort.slice(offset, offset + pageSize);
    return HttpResponse.text(
{status: 200,
});
  }),
  http.post(
    `${baseURLPrefix}/appdeployment/deployments`,
    async ({request}) => {
 let req = request;
      const deployment = await req.json<any, adm.Deployment>();
      const created = ds.post(deployment);
      return HttpResponse.text(
{status: 200,
});
    },
  ),
  http.get(
    `${baseURLPrefix}/appdeployment/deployments/:deplId`,
    () => {
      const { deplId } = params as adm.DeploymentServiceGetDeploymentApiArg;
      const deployment = ds.get(deplId);
      if (deployment) {
        return HttpResponse.text(
{status: 200,
});
      }

      // TODO what is the correct format for a 404 in ADM?
      return HttpResponse.text(
{status: 404,
});
    },
  ),
  http.put(
    `${baseURLPrefix}/appdeployment/deployments/:deplId`,
    async ({request}) => {
 let req = request;
      const { deplId } = params as adm.DeploymentServiceGetDeploymentApiArg;
      const currentDeployment = ds.get(deplId);

      if (!currentDeployment) {
        return HttpResponse.text(
{status: 404,
});
      }

      const deploymentReq = await req.json<any, adm.Deployment>();
      const deployment = ds.put(deplId, {
        ...currentDeployment,
        ...deploymentReq,
      });

      if (deployment) {
        return HttpResponse.text(
{status: 200,
});
      }
      return HttpResponse.text(
{status: 404,
});
    },
  ),
  http.delete(
    `${baseURLPrefix}/appdeployment/deployments/:deplId`,
    () => {
      const { deplId } =
        params as adm.DeploymentServiceDeleteDeploymentApiArg;
      const deleted = ds.delete(deplId);
      if (deleted) {
        return HttpResponse.text(
{status: 201,
});
      }
      return HttpResponse.text(
{status: 404,
});
    },
  ),
  http.get(`${baseURLPrefix}/summary/deployments_status`, ({request}) => {
 let req = request;
    const metadataString = new URL(req.url).searchParams.get("labels");
    let deployments = ds.list();
    if (metadataString) {
      deployments = deployments.filter((deployment) => {
        let matchSimilarity = 0;
        const metadataParams = metadataString.split(",");
        // For each metadata in first targetClusters
        // Note metadata within all targetClusters are assumed to be same
        metadataParams.forEach((keyValuePairs) => {
          const [key, value] = keyValuePairs.split("=");
          if (
            deployment.targetClusters &&
            deployment.targetClusters.length > 0 &&
            deployment.targetClusters[0].labels &&
            deployment.targetClusters[0].labels[key] === value
          )
            matchSimilarity++;
        });

        // If the all metadata within first targetCluster matches
        return matchSimilarity === metadataParams.length;
      });
    }

    const deploymentStat = {
      total: 0,
      running: 0,
      down: 0,
      error: 0,
      deploying: 0,
      updating: 0,
    };

    if (deployments) {
      deploymentStat.total += deployments.length;

      deployments.map((depl) => {
        if (depl.status?.state === "RUNNING") {
          /* Check if Deploying, Upgrading, Terminating & Unknown in running */
          deploymentStat.running++;
        } else if (depl.status?.state === "INTERNAL_ERROR") {
          deploymentStat.error++;
        } else if (depl.status?.state === "DEPLOYING") {
          deploymentStat.deploying++;
        } else if (depl.status?.state === "UPDATING") {
          deploymentStat.updating++;
        } else if (depl.status?.state === "DOWN") {
          deploymentStat.down++;
        }
      });
    }

    return HttpResponse.text(
{status: 200,
});
  }),
  http.get(
    `${baseURLPrefix}/appdeployment/deployments/:deplId/clusters`,
    ({request}) => {
 let req = request;
      const clusters = dcs.list();
      const url = new URL(new URL(req.url));
      const offset = parseInt(url.searchParams.get("offset")!) || 0;
      const pageSize = parseInt(url.searchParams.get("pageSize")!) || 10;
      const orderBy = url.searchParams.get("orderBy") || undefined;
      const filter = url.searchParams.get("filter") || "";

      const list =
        dcs.filter(filter, clusters).length === 0
          ? clusters
          : dcs.filter(filter, clusters);
      const sort = dcs.sort(orderBy, list);
      const page = sort.slice(offset, offset + pageSize);

      return HttpResponse.text(
{status: 200,
});
    },
  ),

  // TODO: UI Extensions after below api is added to open api schema
  http.get("/deployment.orchestrator.apis/v1/ui_extensions", () => {
    return HttpResponse.text(
{status: 200,
});
  }),

  http.get(
    `${baseURLPrefix}/deployments/clusters/:clusterId`,
    async (_, res, ctx) {
  await delay(500); 
      const simulateError = Math.floor(Math.random() * 100) % 2 === 1;
      return HttpResponse.text(
{status: simulateError ? 500 : 200,
});
    },
  ),
];
