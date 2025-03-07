/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import "@orch-ui/styles/transitions.scss";
import { getAuthCfg } from "@orch-ui/utils";
import { AuthProvider } from "react-oidc-context";
import { Provider } from "react-redux";
import "./index.scss";
import Routes from "./routes";
import { store } from "./store";

export const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider {...getAuthCfg()}>
        <Routes />
      </AuthProvider>
    </Provider>
  );
};

export default App;
