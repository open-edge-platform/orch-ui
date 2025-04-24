/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { PathParam, useNavigate } from "react-router-dom";
import { InfraRoute } from "./paths";
import { getInfraPath } from "./routeHelpers";

export const useInfraNavigate = () => {
  const navigate = useNavigate();
  return (
    route: InfraRoute,
    params?: {
      [key in PathParam<InfraRoute>]: string | null;
    },
  ) => navigate(getInfraPath(route, params));
};
