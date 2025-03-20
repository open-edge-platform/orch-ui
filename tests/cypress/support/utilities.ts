/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProjectItem } from "@orch-ui/utils";
export interface IUser {
  username: string;
  password: string;
}

const password = process.env.ORCH_DEFAULT_PASSWORD || "ChangeMeOn1stLogin!";
// Cypress.env("ORCH_DEFAULT_PASSWORD")

export const ADMIN_USER: IUser = {
  username: "sample-org-admin",
  password,
};
export const EIM_USER: IUser = {
  username: "sample-project-api-user",
  password,
};

export const APP_ORCH_READWRITE_USER: IUser = {
  username: "sample-project-edge-mgr",
  password,
};

export const APP_ORCH_READ_USER: IUser = {
  username: "sample-project-edge-op",
  password,
};

export const KUBECTL_POD = "kubectl get pods -A";

export const defaultActiveProject: ProjectItem = {
  name: "itep-ui",
  uID: "21f98e07-d551-4d64-92fc-fa2909bed3a2",
};

export const CLUSTER_ORCH_USER: IUser = {
  username: "sample-project-edge-mgr",
  password,
};
