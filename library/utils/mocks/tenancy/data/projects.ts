/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { AdminProject } from "../../../../utils/global";
import { BaseStore } from "../../baseStore";

const mockSize = 15;
export const projects: AdminProject[] = [...Array(mockSize).keys()].map(
  (index) => {
    return {
      name: `Project ${index}`,
      spec: {
        description: `Project ${index}`,
      },
      status: {
        projectStatus: {
          statusIndicator: "ACTIVE",
          message: "Project is active",
          timeStamp: new Date().getTime(),
          uID: `project-uid-${index}`,
        },
      },
    };
  },
);

export default class ProjectStore extends BaseStore<"name", AdminProject> {
  private __nextIndex: number;

  constructor() {
    super("name", projects);
    this.__nextIndex = mockSize;
  }

  convert(body: AdminProject, id?: string): AdminProject {
    return {
      ...body,
      name: body.name ?? id ?? `project-${this.__nextIndex++}`,
    };
  }
}
