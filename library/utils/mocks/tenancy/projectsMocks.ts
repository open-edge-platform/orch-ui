/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { delay, http, HttpResponse } from "msw";
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
  http.get(`${baseUrl}/${projectUrlPrefix}/projects`, async () => {
    await delay(2000);
    return HttpResponse.json(projectStore.list(), { status: 200 });
  }),
  http.get(`${baseUrl}/${projectUrlPrefix}/orgs`, async () => {
    await delay(2000);
    return HttpResponse.json(organizationStore.list(), { status: 200 });
  }),
  http.put(
    `${baseUrl}/${projectUrlPrefix}/projects/:project`,
    async ({ request, params }) => {
      await delay(2000);
      const { project: projectId } = params as unknown as ProjectParam;
      const body = (await request.json()) as AdminProject;

      if (projectStore.get(projectId)) {
        const updatedProject = projectStore.put(projectId, body);
        return HttpResponse.json(
          updatedProject ?? {
            status: 400,
            data: { message: "error in updating project" },
          },
          { status: 200 },
        );
      } else {
        const addedProject = projectStore.post(body);
        return HttpResponse.json(
          addedProject ?? {
            status: 400,
            data: { message: "error in updating project" },
          },
          { status: 200 },
        );
      }
    },
  ),
  http.patch(
    `${baseUrl}/${projectUrlPrefix}/projects/:project`,
    async ({ request, params }) => {
      await delay(2000);
      const { project: projectId } = params as unknown as ProjectParam;
      const body = (await request.json()) as AdminProject;
      const existingProject = projectStore.get(projectId);

      if (existingProject) {
        const patchedProject = projectStore.put(projectId, {
          ...existingProject,
          ...body,
        });
        if (patchedProject) {
          return HttpResponse.json(patchedProject, { status: 200 });
        }
      }

      return HttpResponse.json(
        {
          status: 400,
          data: { message: "error in patch on project" },
        },
        { status: 200 },
      );
    },
  ),
  http.delete(
    `${baseUrl}/${projectUrlPrefix}/projects/:project`,
    async ({ params }) => {
      await delay(2000);
      const { project: projectId } = params as unknown as ProjectParam;
      const deleteProject = projectStore.delete(projectId);
      if (deleteProject) {
        return HttpResponse.json("success", { status: 200 });
      }

      return HttpResponse.json(
        {
          status: 400,
          data: { message: "error in deleting project" },
        },
        { status: 200 },
      );
    },
  ),
];
