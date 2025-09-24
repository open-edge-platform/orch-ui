/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cm } from "@orch-ui/apis";
import { http, HttpResponse } from "msw";
import { setupWorker } from "msw/browser";
import { SharedStorage } from "../../shared-storage/shared-storage";
import { ClusterStore } from "./clusters";
import ClusterTemplatesStore from "./clusterTemplates";
import { clusterTemplateThreeName } from "./data/clusterOrchIds";

const projectName = SharedStorage.project?.name;

const cts = new ClusterTemplatesStore();
export const clusterTemplateHandlers = [
  http.get(`/v2/projects/${projectName}/templates`, ({ request }) => {
    const req = request;
    const filter = new URL(req.url).searchParams.get("filter");
    let templates = cts.list();

    if (filter) {
      const kubeVersion = filter.split("=").pop();
      templates = templates.filter((template) => {
        return template.kubernetesVersion === kubeVersion;
      });
    }

    return HttpResponse.json(
      {
        defaultTemplateInfo: cts.getDefault(),
        templateInfoList: templates,
      },
      { status: 200 },
    );
  }),
  http.get(
    `/v2/projects/${projectName}/templates/:name/versions/:version`,
    ({ params }) => {
      const { name, version } =
        params as cm.GetV2ProjectsByProjectNameTemplatesAndNameVersionsVersionApiArg;

      const templates = cts
        .list()
        .filter((tpl) => tpl.name === name && tpl.version === version);

      if (templates.length !== 1) {
        return HttpResponse.json(null, { status: 404 });
      }

      const template = templates[0];

      return HttpResponse.json(template, { status: 200 });
    },
  ),
  http.post(`/v2/projects/${projectName}/templates`, async ({ request }) => {
    const req = request;
    const templateInfo =
      (await req.json()) as cm.PostV2ProjectsByProjectNameTemplatesApiArg["templateInfo"];
    if (!templateInfo || !templateInfo.version) {
      return HttpResponse.json(
        {
          message:
            'request body has an error: doesn\'t match schema #/components/schemas/TemplateInfo: Error at "/TemplateInfo/version": string doesn\'t match the regular expression "^v(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)$"',
        },
        { status: 400 },
      );
    }

    cts.post(templateInfo);
    return HttpResponse.json(null, { status: 200 });
  }),
  http.put(
    `/v2/projects/${projectName}/templates/:name/default`,
    async ({ request, params }) => {
      const req = request;
      const { name } =
        params as unknown as cm.PutV2ProjectsByProjectNameTemplatesAndNameDefaultApiArg;

      const body =
        (await req.json()) as cm.PutV2ProjectsByProjectNameTemplatesAndNameDefaultApiArg["defaultTemplateInfo"];

      cts.setDefault(name, body.version);

      return HttpResponse.json(null, { status: 200 });
    },
  ),
  http.delete(
    `/v2/projects/${projectName}/templates/:name/versions/:version`,
    ({ params }) => {
      const { name, version } =
        params as cm.DeleteV2ProjectsByProjectNameTemplatesAndNameVersionsVersionApiArg;

      const template = cts.getTemplate(name, version);

      if (!template) {
        return HttpResponse.json(null, { status: 404 });
      } else if (template.name === clusterTemplateThreeName) {
        return HttpResponse.text(
          `there are still clusters using template ${template.name}-${template.version} , cluster number: 1, can not delete this template`,
          { status: 500 },
        );
      } else {
        const result = cts.deleteTemplate(template);
        return HttpResponse.json(null, { status: result ? 200 : 404 });
      }
    },
  ),
];

const cs = new ClusterStore();

export const clusterHandlers = [
  http.get(`/v2/projects/${projectName}/clusters`, ({ request }) => {
    const req = request;
    const clusters = cs.list();
    const url = new URL(req.url);
    const offset = parseInt(url.searchParams.get("offset") || "0") || 0;
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10") || 10;
    const orderBy = url.searchParams.get("orderBy") || undefined;
    const filter = url.searchParams.get("filter") || "";

    const list =
      cs.filter(filter, clusters).length === 0
        ? clusters
        : cs.filter(filter, clusters);
    const sort = cs.sort(orderBy, list);
    const page = sort.slice(offset, offset + pageSize);
    return HttpResponse.json(
      {
        clusters: page,
        totalElements: 20,
      },
      { status: 200 },
    );
  }),

  http.get(`/v2/projects/${projectName}/clusters/:name`, ({ params }) => {
    const { name } =
      params as cm.GetV2ProjectsByProjectNameClustersAndNameApiArg;
    const c = cs.get(name);
    if (c) {
      return HttpResponse.json(c, { status: 200 });
    }

    return HttpResponse.json(null, { status: 404 });
  }),

  //post cluster
  http.post(`/v2/projects/${projectName}/clusters`, async ({ request }) => {
    const req = request;
    const body = (await req.json()) as cm.ClusterSpec;
    const r = cs.post(body);
    if (!r) return HttpResponse.json(null, { status: 500 });
    return HttpResponse.json(r.name ?? "", { status: 200 });
  }),

  //put cluster nodes
  http.put(
    `/v2/projects/${projectName}/clusters/:name/nodes`,
    async ({ request, params }) => {
      const req = request;
      const { name } =
        params as cm.GetV2ProjectsByProjectNameClustersAndNameApiArg;
      const body = (await req.json()) as cm.ClusterSpec;

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
      if (!r) return HttpResponse.json(null, { status: 500 });

      return HttpResponse.json(r, { status: 200 });
    },
  ),

  //put cluster templates
  http.put(
    `/v2/projects/${projectName}/clusters/:name/template`,
    async ({ request, params }) => {
      const req = request;
      const { name } =
        params as cm.GetV2ProjectsByProjectNameClustersAndNameApiArg;
      const body = (await req.json()) as cm.ClusterTemplateInfo;
      const r = cs.put(name, body);
      if (!r) return HttpResponse.json(null, { status: 500 });
      return HttpResponse.json(r, { status: 200 });
    },
  ),

  //put cluster labels
  http.put(
    `/v2/projects/${projectName}/clusters/:name/labels`,
    async ({ request, params }) => {
      const req = request;
      const { name } =
        params as cm.GetV2ProjectsByProjectNameClustersAndNameApiArg;
      const body = (await req.json()) as cm.ClusterLabels;
      const r = cs.put(name, body);
      if (!r) return HttpResponse.json(null, { status: 500 });
      return HttpResponse.json(r, { status: 200 });
    },
  ),

  http.get(
    `/v2/projects/${projectName}/clusters/:nodeId/clusterdetail`,
    ({ params }) => {
      const { nodeId } =
        params as cm.GetV2ProjectsByProjectNameClustersAndNodeIdClusterdetailApiArg;
      const c = cs.getByNodeUuid(nodeId);

      if (c) {
        return HttpResponse.json(c, { status: 200 });
      }

      return HttpResponse.json(null, { status: 404 });
    },
  ),
  //delete cluster
  http.delete(`/v2/projects/${projectName}/clusters/:name`, ({ params }) => {
    const { name } =
      params as cm.DeleteV2ProjectsByProjectNameClustersAndNameApiArg;
    const result = cs.delete(name);
    return HttpResponse.json(null, { status: result ? 200 : 404 });
  }),

  http.get(`/v2/projects/${projectName}/clusters/:name/kubeconfigs`, () => {
    const r = {
      id: "c-m-rkrwlcws",
      kubeconfig:
        'apiVersion: v1\nkind: Config\nclusters:\n- name: "cluster-8d067491"\n  cluster:\n    server: "https://rancher.kind.internal/k8s/clusters/c-m-rkrwlcws"\n    certificate-authority-data: "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUZKVENDQ\\\n      XcyZ0F3SUJBZ0lVTm0yYW1pSVdHajV2eEhyZEs3bkg2NDRTRk1Jd0RRWUpLb1pJaHZjTkFRRU4KQ\\\n      \\\n      \\\n      nppVlJEMHppMHdWWWc9PQotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0t"\n\nusers:\n- name: "cluster-8d067491"\n  user:\n    token: "kubeconfig-user-qv8r4xhtqg:knzdh7l7t2rpb92cndj9pcdrpq9n5pvm5nbq4phqzdh9q6z2c6rjpr"\n\n\ncontexts:\n- name: "cluster-8d067491"\n  context:\n    user: "cluster-8d067491"\n    cluster: "cluster-8d067491"\n\ncurrent-context: "cluster-8d067491"\n',
    };
    return HttpResponse.json(r, { status: 200 });
  }),

  http.put(`/v2/projects/${projectName}/clusters/:clusterName`, () => {
    return HttpResponse.json(null, { status: 501 });
  }),

  http.put(
    `/v2/projects/${projectName}/clusters/:name/nodes`,
    async ({ request, params }) => {
      const req = request;
      const { name } =
        params as unknown as cm.PutV2ProjectsByProjectNameClustersAndNameNodesApiArg;
      const nodeSpecs = (await req.json()) as cm.NodeSpec[];
      const cluster = cs.get(name);
      if (cluster && cluster.name) {
        cs.put(cluster.name, {
          nodes: nodeSpecs,
        });
        return HttpResponse.json(undefined, { status: 200 });
      }
      return HttpResponse.json(null, { status: 400 });
    },
  ),
];

// This configures a Service Worker with the given request handlers.
export const startWorker = () => {
  const worker = setupWorker(...clusterHandlers, ...clusterTemplateHandlers);
  worker.start();
};
