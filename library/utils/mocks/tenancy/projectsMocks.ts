/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { http , delay} from "msw"
import { AdminProject } from "../../global/admin/global";
import { RuntimeConfig } from "../../runtime-config/runtime-config";
import OrganizationStore from "./data/organizations";
import ProjectStore from "./data/projects";

const baseUrl: string = window.Cypress
  ? window.location.origin
  : RuntimeConfig.tmApiUrl;
export const projectUrlPrefix = "v1";
export const projectStore = new ProjectStore();
export const organizationStore = new OrganizationStore();
interface ProjectParam {
  project: string;
}
export const handlers = [
  http.get(`${baseUrl}/${projectUrlPrefix}/projects`, async (_, res, ctx) {
  await delay(500); es(ctx.status(200), ctx.json(projectStore.list()), ctx.delay(2000)),
  ),
  http.get(`${baseUrl}/${projectUrlPrefix}/orgs`, async (_, res, ctx) {
  await delay(500); es(ctx.status(200), ctx.json(organizationStore.list()), ctx.delay(2000)),
  ),
  http.put(
    `${baseUrl}/${projectUrlPrefix}/projects/:project`,
    async (req, res, ctx) {
  await delay(500); 
      const { project: projectId } = params as unknown as ProjectParam;
      const body = await req.json<any, AdminProject>();

      if (projectStore.get(projectId)) {
        const updatedProject = projectStore.put(projectId, body);
        return res(
          ctx.status(200),
          ctx.json(
            updatedProject ?? {
              status: 400,
              data: { message: "error in updating project" },
            },
          ),
          ctx.delay(2000),
        );
      } else {
        const addedProject = projectStore.post(body);
        return HttpResponse.json(
addedProject ?? {
              status: 400,
              data: { message: "error in updating project" },
            },
{status: 200,
});
      }
    },
  ),
  http.patch(
    `${baseUrl}/${projectUrlPrefix}/projects/:project`,
    async (req, res, ctx) {
  await delay(500); 
      const { project: projectId } = params as unknown as ProjectParam;
      const body = await req.json<any, AdminProject>();
      const existingProject = projectStore.get(projectId);

      if (existingProject) {
        const patchedProject = projectStore.put(projectId, {
          ...existingProject,
          ...body,
        });
        if (patchedProject) {
          return res(
            ctx.status(200),
            ctx.json(patchedProject),
            ctx.delay(2000),
          );
        }
      }

      return HttpResponse.json(
{
          status: 400,
          data: { message: "error in patch on project" },
        },
{status: 200,
});
    },
  ),
  http.delete(
    `${baseUrl}/${projectUrlPrefix}/projects/:project`,
    async (req, res, ctx) {
  await delay(500); 
      const { project: projectId } = params as unknown as ProjectParam;
      const deleteProject = projectStore.delete(projectId);
      if (deleteProject) {
        return res(ctx.status(200), ctx.json("success"), ctx.delay(2000));
      }

      return HttpResponse.json(
{
          status: 400,
          data: { message: "error in patch on project" },
        },
{status: 200,
});
    },
  ),
];
