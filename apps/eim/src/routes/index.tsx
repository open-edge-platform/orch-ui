/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { AuthWrapper } from "@orch-ui/components";
import { RouteObject, useRoutes } from "react-router-dom";
import Layout from "../components/templates/Layout";
import { childRoutes } from "./routes";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: childRoutes,
  },
];

export default () => {
  const Routes = useRoutes(routes);
  return <AuthWrapper>{Routes}</AuthWrapper>;
};
