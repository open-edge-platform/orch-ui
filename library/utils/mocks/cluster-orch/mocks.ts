/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cm } from "@orch-ui/apis";
import { rest, setupWorker } from "msw";
import { SharedStorage } from "../../shared-storage/shared-storage";
import { ClusterStore } from "./clusters";
import ClusterTemplatesStore from "./clusterTemplates";
import { clusterTemplateThreeName } from "./data/clusterOrchIds";

const projectName = SharedStorage.project?.name;

const cts = new ClusterTemplatesStore();
export const clusterTemplateHandlers = [
  rest.get(`/v2/projects/${projectName}/templates`, (_, res, ctx) => {
    const templates = cts.list();
    return res(
      ctx.status(200),
      ctx.json<cm.GetV2ProjectsByProjectNameTemplatesApiResponse>({
        defaultTemplateInfo: cts.getDefault(),
        templateInfoList: templates,
      }),
    );
  }),
  rest.get(
    `/v2/projects/${projectName}/templates/:name/versions/:version`,
    (req, res, ctx) => {
      const { name, version } =
        req.params as cm.GetV2ProjectsByProjectNameTemplatesAndNameVersionsVersionApiArg;

      const templates = cts
        .list()
        .filter((tpl) => tpl.name === name && tpl.version === version);

      if (templates.length !== 1) {
        return res(ctx.status(404));
      }

      const template = templates[0];

      return res(
        ctx.status(200),
        ctx.json<cm.GetV2ProjectsByProjectNameTemplatesAndNameVersionsVersionApiResponse>(
          template,
        ),
      );
    },
  ),
  rest.post(`/v2/projects/${projectName}/templates`, async (req, res, ctx) => {
    const templateInfo =
      (await req.json()) as cm.PostV2ProjectsByProjectNameTemplatesApiArg["templateInfo"];
    if (!templateInfo || !templateInfo.version) {
      return res(
        ctx.status(400),
        ctx.json({
          message:
            'request body has an error: doesn\'t match schema #/components/schemas/TemplateInfo: Error at "/TemplateInfo/version": string doesn\'t match the regular expression "^v(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)$"',
        }),
      );
    }

    cts.post(templateInfo);
    return res(ctx.status(200));
  }),
  rest.put(
    `/v2/projects/${projectName}/templates/:name/default`,
    async (req, res, ctx) => {
      const { name } =
        req.params as unknown as cm.PutV2ProjectsByProjectNameTemplatesAndNameDefaultApiArg;

      const body =
        (await req.json()) as cm.PutV2ProjectsByProjectNameTemplatesAndNameDefaultApiArg["defaultTemplateInfo"];

      cts.setDefault(name, body.version);

      return res(ctx.status(200));
    },
  ),
  rest.delete(
    `/v2/projects/${projectName}/templates/:name/versions/:version`,
    (req, res, ctx) => {
      const { name, version } =
        req.params as cm.DeleteV2ProjectsByProjectNameTemplatesAndNameVersionsVersionApiArg;

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
  rest.get(`/v2/projects/${projectName}/clusters`, (req, res, ctx) => {
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
      ctx.json<cm.GetV2ProjectsByProjectNameClustersApiResponse>({
        clusters: page,
        totalElements: 20,
      }),
    );
  }),

  rest.get(`/v2/projects/${projectName}/clusters/:name`, (req, res, ctx) => {
    const { name } =
      req.params as cm.GetV2ProjectsByProjectNameClustersAndNameApiArg;
    const c = cs.get(name);
    if (c) {
      return res(
        ctx.status(200),
        ctx.json<cm.GetV2ProjectsByProjectNameClustersAndNameApiResponse>(c),
      );
    }

    return res(ctx.status(404));
  }),

  //post cluster
  rest.post(`/v2/projects/${projectName}/clusters`, async (req, res, ctx) => {
    const body = await req.json<cm.ClusterSpec>();
    const r = cs.post(body);
    if (!r) return res(ctx.status(500));
    return res(
      ctx.status(200),
      ctx.json<cm.PostV2ProjectsByProjectNameClustersApiResponse>(r.name ?? ""),
    );
  }),

  //put cluster nodes
  rest.put(
    `/v2/projects/${projectName}/clusters/:name/nodes`,
    async (req, res, ctx) => {
      const { name } =
        req.params as cm.GetV2ProjectsByProjectNameClustersAndNameApiArg;
      const body = await req.json<cm.ClusterSpec>();

      const matchedCluster = cs.get(name);

      const clusterLabels: {
        [key: string]: string;
      } = { ...matchedCluster?.labels };

      const defaultClusterSpecBody: cm.ClusterSpec = {
        name: matchedCluster?.name,
        template: matchedCluster?.template,
        labels: clusterLabels ?? {},
        nodes: [],
      };

      const r = cs.put(name, { ...defaultClusterSpecBody, ...body });
      if (!r) return res(ctx.status(500));

      return res(ctx.status(200), ctx.json(r));
    },
  ),

  //put cluster templates
  rest.put(
    `/v2/projects/${projectName}/clusters/:name/template`,
    async (req, res, ctx) => {
      const { name } =
        req.params as cm.GetV2ProjectsByProjectNameClustersAndNameApiArg;
      const body = await req.json<cm.ClusterTemplateInfo>();
      const r = cs.put(name, body);
      if (!r) return res(ctx.status(500));
      return res(ctx.status(200), ctx.json(r));
    },
  ),

  //put cluster labels
  rest.put(
    `/v2/projects/${projectName}/clusters/:name/labels`,
    async (req, res, ctx) => {
      const { name } =
        req.params as cm.GetV2ProjectsByProjectNameClustersAndNameApiArg;
      const body = await req.json<cm.ClusterLabels>();
      const r = cs.put(name, body);
      if (!r) return res(ctx.status(500));
      return res(ctx.status(200), ctx.json(r));
    },
  ),

  rest.get(
    `/v2/projects/${projectName}/clusters/:nodeId/clusterdetail`,
    (req, res, ctx) => {
      const { nodeId } =
        req.params as cm.GetV2ProjectsByProjectNameClustersAndNodeIdClusterdetailApiArg;
      const c = cs.getByNodeUuid(nodeId);

      if (c) {
        return res(
          ctx.status(200),
          ctx.json<cm.GetV2ProjectsByProjectNameClustersAndNodeIdClusterdetailApiResponse>(
            c,
          ),
        );
      }

      return res(ctx.status(404));
    },
  ),
  //delete cluster
  rest.delete(`/v2/projects/${projectName}/clusters/:name`, (req, res, ctx) => {
    const { name } =
      req.params as cm.DeleteV2ProjectsByProjectNameClustersAndNameApiArg;
    const result = cs.delete(name);
    return res(ctx.status(result ? 200 : 404));
  }),

  rest.get(
    `/v2/projects/${projectName}/clusters/:name/kubeconfigs`,
    (_, res, ctx) => {
      const r = {
        id: "c-m-rkrwlcws",
        kubeconfig:
          'apiVersion: v1\nkind: Config\nclusters:\n- name: "cluster-8d067491"\n  cluster:\n    server: "https://rancher.kind.internal/k8s/clusters/c-m-rkrwlcws"\n    certificate-authority-data: "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUZKVENDQ\\\n      XcyZ0F3SUJBZ0lVTm0yYW1pSVdHajV2eEhyZEs3bkg2NDRTRk1Jd0RRWUpLb1pJaHZjTkFRRU4KQ\\\n      \\\n      \\\n      nppVlJEMHppMHdWWWc9PQotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0t"\n\nusers:\n- name: "cluster-8d067491"\n  user:\n    token: "kubeconfig-user-qv8r4xhtqg:knzdh7l7t2rpb92cndj9pcdrpq9n5pvm5nbq4phqzdh9q6z2c6rjpr"\n\n\ncontexts:\n- name: "cluster-8d067491"\n  context:\n    user: "cluster-8d067491"\n    cluster: "cluster-8d067491"\n\ncurrent-context: "cluster-8d067491"\n',
      };
      return res(
        ctx.status(200),
        ctx.json<cm.GetV2ProjectsByProjectNameClustersAndNameKubeconfigsApiResponse>(
          r,
        ),
      );
    },
  ),

  rest.put(
    `/v2/projects/${projectName}/clusters/:clusterName`,
    (_, res, ctx) => {
      return res(ctx.status(501));
    },
  ),

  rest.put(
    `/v2/projects/${projectName}/clusters/:name/nodes`,
    async (req, res, ctx) => {
      const { name } =
        req.params as unknown as cm.PutV2ProjectsByProjectNameClustersAndNameNodesApiArg;
      const nodeSpecs = await req.json<cm.NodeSpec[]>();
      const cluster = cs.get(name);
      if (cluster && cluster.name) {
        cs.put(cluster.name, {
          nodes: nodeSpecs,
        });
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
