/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { AuthWrapper } from "@orch-ui/components";
import { useRoutes } from "react-router-dom";
import routes from "./routes";

const Routes = () => useRoutes(routes);

export default () => {
  return (
    <AuthWrapper>
      <Routes />
    </AuthWrapper>
  );
};
