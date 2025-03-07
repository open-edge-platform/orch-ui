/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
import { IRuntimeConfig, ProjectItem } from "@orch-ui/utils";

export interface MountOptions {
  runtimeConfig?: IRuntimeConfig;
  mockAuth?: boolean;
  mountOptions?: object;
  routerProps?: { initialEntries: string[] };
  reduxStore?: any;
  routerRule?: { path: string; element: React.ReactNode }[];
  activeProject?: ProjectItem;
}
