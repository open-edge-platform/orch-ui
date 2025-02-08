/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CrudData } from "shared";
import {
  regionCalifornia,
  regionEu,
  regionEuSouth,
  regionIta,
  regionUsEast,
  regionUsWest,
} from "../../store";
import {
  GetV1ProjectsByProjectNameRegionsApiResponse,
  Region,
} from "../../store/iaas";

/**
 * @deprecated
 */
export const regions: GetV1ProjectsByProjectNameRegionsApiResponse = {
  has_next: false,
  regions: [
    regionUsWest,
    regionUsEast,
    regionEu,
    regionCalifornia,
    regionEuSouth,
    regionIta,
  ],
};

/**
 * @deprecated
 */
export const data: CrudData<Region> = {
  create: regionUsWest,
  read: regionUsWest,
  update: {
    ...regionUsWest,
    name: `${regionUsWest.name} Updated`,
  },
  delete: regionUsWest,
};
