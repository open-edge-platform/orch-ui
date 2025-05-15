/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { generateRegion } from "../data.helpers";

import {
  regionAshlandId,
  regionCaliforniaId,
  regionChicagoId,
  regionColumbusId,
  regionDaytonId,
  regionEuId,
  regionEuItaId,
  regionEuSouthId,
  regionPortlandId,
  regionSalemId,
  regionUsEastId,
  regionUsMidwestId,
  regionUsWestId,
} from "./ids/regions";

export const regionUsWest: infra.RegionRead = generateRegion(
  regionUsWestId,
  "Area",
  "Us-West",
);

export const regionSalem: infra.RegionRead = generateRegion(
  regionSalemId,
  "City",
  "Salem",
  regionUsWest,
);

export const regionPortland: infra.RegionRead = generateRegion(
  regionPortlandId,
  "City",
  "Portland",
  regionUsWest,
);

export const regionAshland: infra.RegionRead = generateRegion(
  regionAshlandId,
  "City",
  "Ashland",
  regionUsWest,
);

export const regionCalifornia: infra.RegionRead = generateRegion(
  regionCaliforniaId,
  "State",
  "California",
  regionUsWest,
);

export const regionUsMidwest: infra.RegionRead = generateRegion(
  regionUsMidwestId,
  "Area",
  "US Midwest",
);

export const regionChicago: infra.RegionRead = generateRegion(
  regionChicagoId,
  "City",
  "Chicago",
  regionUsMidwest,
);

export const regionUsEast: infra.RegionRead = generateRegion(
  regionUsEastId,
  "Area",
  "Us East",
);

export const regionDayton: infra.RegionRead = generateRegion(
  regionDaytonId,
  "City",
  "Dayton",
  regionUsEast,
);

export const regionColumbus: infra.RegionRead = generateRegion(
  regionColumbusId,
  "City",
  "Columbus",
  regionUsEast,
);

export const regionEu: infra.RegionRead = generateRegion(
  regionEuId,
  "Continent",
  "Europe",
);

export const regionEuSouth: infra.RegionRead = generateRegion(
  regionEuSouthId,
  "Area",
  "Southern Europe",
  regionEu,
);

export const regionEuIta: infra.RegionRead = generateRegion(
  regionEuItaId,
  "Country",
  "Italy",
  regionEuSouth,
);
