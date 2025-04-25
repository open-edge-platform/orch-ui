/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { PathParam, useNavigate } from "react-router-dom";
import { InfraRoute } from "./paths";
import { getInfraPath } from "./routeHelpers";

export const useInfraNavigate = () => {
  const navigate = useNavigate();
  return <Path extends InfraRoute>(
    route: Path,
    params?: {
      [key in PathParam<Path>]: string | null;
    },
    query?: string,
  ) => navigate(getInfraPath(route, params, query));
};
