/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { rest } from "msw";
import { AdminProject } from "../../global";
import { RuntimeConfig } from "../../runtime-config/runtime-config";
import OrganizationStore from "./data/organizations";
import ProjectStore from "./data/projects";

const baseUrl: string =
  window.Cypress?.testingType === "component"
    ? window.location.origin
    : RuntimeConfig.tmApiUrl;
export const projectUrlPrefix = "v1";
export const projectStore = new ProjectStore();
export const organizationStore = new OrganizationStore();
interface ProjectParam {
  project: string;
}
export const handlers = [
  rest.get(`${baseUrl}/${projectUrlPrefix}/projects`, (_, res, ctx) =>
    res(ctx.status(200), ctx.json(projectStore.list()), ctx.delay(2000)),
  ),
  rest.get(`${baseUrl}/${projectUrlPrefix}/orgs`, (_, res, ctx) =>
    res(ctx.status(200), ctx.json(organizationStore.list()), ctx.delay(2000)),
  ),
  rest.put(
    `${baseUrl}/${projectUrlPrefix}/projects/:project`,
    async (req, res, ctx) => {
      const { project: projectId } = req.params as unknown as ProjectParam;
      const body = await req.json<AdminProject>();

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
        return res(
          ctx.status(200),
          ctx.json(
            addedProject ?? {
              status: 400,
              data: { message: "error in updating project" },
            },
          ),
          ctx.delay(2000),
        );
      }
    },
  ),
  rest.patch(
    `${baseUrl}/${projectUrlPrefix}/projects/:project`,
    async (req, res, ctx) => {
      const { project: projectId } = req.params as unknown as ProjectParam;
      const body = await req.json<AdminProject>();
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

      return res(
        ctx.status(200),
        ctx.json({
          status: 400,
          data: { message: "error in patch on project" },
        }),
        ctx.delay(2000),
      );
    },
  ),
  rest.delete(
    `${baseUrl}/${projectUrlPrefix}/projects/:project`,
    async (req, res, ctx) => {
      const { project: projectId } = req.params as unknown as ProjectParam;
      const deleteProject = projectStore.delete(projectId);
      if (deleteProject) {
        return res(ctx.status(200), ctx.json("success"), ctx.delay(2000));
      }

      return res(
        ctx.status(200),
        ctx.json({
          status: 400,
          data: { message: "error in patch on project" },
        }),
        ctx.delay(2000),
      );
    },
  ),
];
