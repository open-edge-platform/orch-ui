/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { generateSite } from "../data.helpers";
import { siteOregonPortlandId } from "./ids/sites";
import { regionUsWest } from "./regions";

export const siteOregonPortland = generateSite(
  siteOregonPortlandId,
  "Portland",
  regionUsWest,
);
