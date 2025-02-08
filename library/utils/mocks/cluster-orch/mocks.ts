/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ctm, ecm } from "@orch-ui/apis";
import { rest, setupWorker } from "msw";
import { SharedStorage } from "../../shared-storage/shared-storage";
import { ClusterStore } from "./clusters";
import ClusterTemplatesStore from "./clusterTemplates";
import { clusterTemplateThreeName } from "./data/clusterOrchIds";

const projectName = SharedStorage.project?.name;

const cts = new ClusterTemplatesStore();
export const clusterTemplateHandlers = [
  rest.get(`/v1/projects/${projectName}/templates`, (_, res, ctx) => {
    const templates = cts.list();
    return res(
      ctx.status(200),
      ctx.json<ctm.GetV1ProjectsByProjectNameTemplatesApiResponse>({
        defaultTemplateInfo: cts.getDefault(),
        templateInfoList: templates,
      }),
    );
  }),
  rest.get(
    `/v1/projects/${projectName}/templates/:name/:version`,
    (req, res, ctx) => {
      const { name, version } =
        req.params as ctm.GetV1ProjectsByProjectNameTemplatesAndNameVersionsVersionApiArg;

      const templates = cts
        .list()
        .filter((tpl) => tpl.name === name && tpl.version === version);

      if (templates.length !== 1) {
        return res(ctx.status(404));
      }

      const template = templates[0];

      return res(
        ctx.status(200),
        ctx.json<ctm.GetV1ProjectsByProjectNameTemplatesAndNameVersionsVersionApiResponse>(
          template,
        ),
      );
    },
  ),
  rest.post(`/v1/projects/${projectName}/templates`, async (req, res, ctx) => {
    const { templateConfigurations } =
      (await req.json()) as ctm.PostV1ProjectsByProjectNameTemplatesApiArg["importTemplateBody"];
    const template = templateConfigurations?.[0] ?? null;

    if (!template || !template.version) {
      return res(
        ctx.status(400),
        ctx.json({
          message:
            'request body has an error: doesn\'t match schema #/components/schemas/ImportTemplateBody: Error at "/templateConfigurations/0/version": string doesn\'t match the regular expression "^v([0-9]+)\\.([0-9]+)\\.([0-9]+)$"',
        }),
      );
    }

    cts.post(template);
    return res(ctx.status(200));
  }),
  rest.put(
    `/v1/projects/${projectName}/templates/:templateName/default`,
    async (req, res, ctx) => {
      const { templateName } =
        req.params as unknown as ctm.PutV1ProjectsByProjectNameTemplatesAndTemplateNameDefaultApiArg;

      const body =
        (await req.json()) as ctm.PutV1ProjectsByProjectNameTemplatesAndTemplateNameDefaultApiArg["defaultTemplateInfo"];

      cts.setDefault(templateName, body.version);

      return res(ctx.status(200));
    },
  ),
  rest.delete(
    `/v1/projects/${projectName}/templates/:name/:version`,
    (req, res, ctx) => {
      const { name, version } =
        req.params as ctm.DeleteV1ProjectsByProjectNameTemplatesAndNameVersionsVersionApiArg;

      const template = cts.getTemplate(name, version);

      if (!template) {
        return res(ctx.status(404));
      } else if (template.name === clusterTemplateThreeName) {
        return res(
          ctx.status(500),
          ctx.body(
            `there are still clusters using template ${template.name}-${template.version} , cluster number: 1, can not delete this template`,
          ),
        );
      } else {
        const result = cts.deleteTemplate(template);
        return res(ctx.status(result ? 200 : 404));
      }
    },
  ),
];

const cs = new ClusterStore();

export const clusterHandlers = [
  rest.get(`/v1/projects/${projectName}/clusters`, (req, res, ctx) => {
    const clusters = cs.list();
    const url = new URL(req.url);
    const offset = parseInt(url.searchParams.get("offset")!) || 0;
    const pageSize = parseInt(url.searchParams.get("pageSize")!) || 10;
    const orderBy = url.searchParams.get("orderBy") || undefined;
    const filter = url.searchParams.get("filter") || "";

    const list =
      cs.filter(filter, clusters).length === 0
        ? clusters
        : cs.filter(filter, clusters);
    const sort = cs.sort(orderBy, list);
    const page = sort.slice(offset, offset + pageSize);
    return res(
      ctx.status(200),
      //This is turning an expected ClusterInfo[] response into a ClusterInfoList[]
      ctx.json<ecm.GetV1ProjectsByProjectNameClustersApiResponse>({
        clusterInfoList: page,
        totalElements: 20,
      }),
    );
  }),

  rest.get(
    `/v1/projects/${projectName}/clusters/:clusterName`,
    (req, res, ctx) => {
      const { clusterName } =
        req.params as ecm.GetV1ProjectsByProjectNameClustersAndClusterNameApiArg;
      const c = cs.get(clusterName);
      if (c) {
        return res(
          ctx.status(200),
          ctx.json<ecm.GetV1ProjectsByProjectNameClustersAndClusterNameApiResponse>(
            c,
          ),
        );
      }

      return res(ctx.status(404));
    },
  ),

  //post cluster
  rest.post(`/v1/projects/${projectName}/clusters`, async (req, res, ctx) => {
    const body = await req.json<ecm.ClusterSpec>();
    const r = cs.post(body);
    if (!r) return res(ctx.status(500));
    return res(
      ctx.status(200),
      ctx.json<ecm.PostV1ProjectsByProjectNameClustersApiResponse>(
        r.clusterID ?? "",
      ),
    );
  }),

  //put cluster nodes
  rest.put(
    `/v1/projecs/${projectName}/clusters/:clusterName/nodes`,
    async (req, res, ctx) => {
      const { clusterName } =
        req.params as ecm.GetV1ProjectsByProjectNameClustersAndClusterNameApiArg;
      const body = await req.json<ecm.ClusterSpec>();

      const matchedCluster = cs.get(clusterName);

      const clusterLabels: {
        [key: string]: string;
      } = { ...matchedCluster?.clusterLabels };

      const defaultClusterSpecBody: ecm.ClusterSpec = {
        clusterName: matchedCluster?.name,
        clusterTemplateName: matchedCluster?.clusterTemplateName,
        clusterLabels: clusterLabels ?? {},
        locationList: matchedCluster?.locationList ?? [],
        nodeList: [],
      };

      const r = cs.put(clusterName, { ...defaultClusterSpecBody, ...body });
      if (!r) return res(ctx.status(500));

      return res(ctx.status(200), ctx.json(r));
    },
  ),

  //put cluster name
  rest.put(
    `/v1/projects/${projectName}/clusters/:clusterName`,
    async (req, res, ctx) => {
      const { clusterName } =
        req.params as ecm.GetV1ProjectsByProjectNameClustersAndClusterNameApiArg;
      const body = await req.json<ecm.ClusterConfig>();
      const r = cs.put(clusterName, body);
      if (!r) return res(ctx.status(500));
      return res(ctx.status(200), ctx.json(r));
    },
  ),

  //put cluster templates
  rest.put(
    `/v1/projects/${projectName}/clusters/:clusterName/template`,
    async (req, res, ctx) => {
      const { clusterName } =
        req.params as ecm.GetV1ProjectsByProjectNameClustersAndClusterNameApiArg;
      const body = await req.json<ecm.ClusterTemplateInfo>();
      const r = cs.put(clusterName, body);
      if (!r) return res(ctx.status(500));
      return res(ctx.status(200), ctx.json(r));
    },
  ),

  //put cluster labels
  rest.put(
    `/v1/projects/${projectName}/clusters/:clusterName/labels`,
    async (req, res, ctx) => {
      const { clusterName } =
        req.params as ecm.GetV1ProjectsByProjectNameClustersAndClusterNameApiArg;
      const body = await req.json<ecm.ClusterLabels>();
      const r = cs.put(clusterName, body);
      if (!r) return res(ctx.status(500));
      return res(ctx.status(200), ctx.json(r));
    },
  ),

  rest.get(
    `/v1/projects/${projectName}/clusters/:nodeUuid/clusterdetail`,
    (req, res, ctx) => {
      const { nodeUuid } =
        req.params as ecm.GetV1ProjectsByProjectNameClustersAndNodeUuidClusterdetailApiArg;
      const c = cs.getByNodeUuid(nodeUuid);

      if (c) {
        return res(
          ctx.status(200),
          ctx.json<ecm.GetV1ProjectsByProjectNameClustersAndNodeUuidClusterdetailApiResponse>(
            c,
          ),
        );
      }

      return res(ctx.status(404));
    },
  ),
  //delete cluster
  rest.delete(
    `/v1/projects/${projectName}/clusters/:clusterName`,
    (req, res, ctx) => {
      const { clusterName } =
        req.params as ecm.DeleteV1ProjectsByProjectNameClustersAndClusterNameApiArg;
      const result = cs.delete(clusterName);
      return res(ctx.status(result ? 200 : 404));
    },
  ),

  rest.get(
    `/v1/projects/${projectName}/clusters/:clusterName/kubeconfigs`,
    (_, res, ctx) => {
      const r = {
        id: "c-m-rkrwlcws",
        kubeconfig:
          'apiVersion: v1\nkind: Config\nclusters:\n- name: "cluster-8d067491"\n  cluster:\n    server: "https://rancher.kind.internal/k8s/clusters/c-m-rkrwlcws"\n    certificate-authority-data: "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUZKVENDQ\\\n      XcyZ0F3SUJBZ0lVTm0yYW1pSVdHajV2eEhyZEs3bkg2NDRTRk1Jd0RRWUpLb1pJaHZjTkFRRU4KQ\\\n      \\\n      \\\n      nppVlJEMHppMHdWWWc9PQotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0t"\n\nusers:\n- name: "cluster-8d067491"\n  user:\n    token: "kubeconfig-user-qv8r4xhtqg:knzdh7l7t2rpb92cndj9pcdrpq9n5pvm5nbq4phqzdh9q6z2c6rjpr"\n\n\ncontexts:\n- name: "cluster-8d067491"\n  context:\n    user: "cluster-8d067491"\n    cluster: "cluster-8d067491"\n\ncurrent-context: "cluster-8d067491"\n',
      };
      return res(
        ctx.status(200),
        ctx.json<ecm.GetV1ProjectsByProjectNameClustersAndClusterIdKubeconfigsApiResponse>(
          r,
        ),
      );
    },
  ),

  rest.put(
    `/v1/projects/${projectName}/clusters/:clusterName`,
    (_, res, ctx) => {
      return res(ctx.status(501));
    },
  ),

  rest.put(
    `/v1/projects/${projectName}/clusters/:clusterName/nodes/:nodeUuid`,
    async (req, res, ctx) => {
      const { clusterName, nodeUuid } =
        req.params as unknown as ecm.PutV1ProjectsByProjectNameClustersAndClusterNameNodesNodeUuidApiArg;
      const body = await req.json<ecm.NodeOperation>();
      const cluster = cs.get(clusterName);
      if (cluster && nodeUuid && cluster.name) {
        switch (body.action) {
          case "remove":
            if (cluster.nodes && cluster.nodes.nodeInfoList) {
              const updatedNodeList = cluster.nodes.nodeInfoList
                .filter((node) => node.guid !== nodeUuid)
                .map(
                  (node) =>
                    ({
                      nodeGuid: node.guid ?? "mock-node",
                      nodeRole: node.role ?? "all",
                    }) as ecm.NodeSpec,
                );

              const clusterLabels: {
                [key: string]: string;
              } = { ...cluster.clusterLabels };

              // cluster data is edited
              cs.put(cluster.name, {
                clusterName: cluster.name,
                clusterLabels: clusterLabels,
                clusterTemplateName: cluster.clusterTemplateName,
                locationList: cluster.locationList ?? [],
                nodeList: updatedNodeList,
              });
            }
        }
        return res(ctx.status(200), ctx.json(undefined));
      }
      return res(ctx.status(400));
    },
  ),
];

// This configures a Service Worker with the given request handlers.
export const startWorker = () => {
  const worker = setupWorker(...clusterHandlers, ...clusterTemplateHandlers);
  worker.start();
};
