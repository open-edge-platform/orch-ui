/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import "@spark-design/brand-tokens/style/index.css";
import "@spark-design/css/components/ledge-flex/index.css";
import "@spark-design/css/global/spark-colors.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "../../../library/styles/Global.scss";
import "./index.scss";

import {
  Header,
  HeaderItem,
  HeaderSize,
  RBACWrapper,
  SessionTimeout,
} from "@orch-ui/components";
import { getAuthCfg, Role } from "@orch-ui/utils";
import { AuthProvider } from "react-oidc-context";
import { Provider } from "react-redux";
import Routes from "./routes";
import { store } from "./store/store";

/* devblock:start */
import { setupWorker } from "msw";
/* devblock:end */
// start the mocks server if we are in development mode
//Note: had to 'clear site data' from the Storage section in Edge for mock to work.
async function prepare() {
  /* devblock:start */
  if (process.env.REACT_LP_MOCK_API === "true") {
    const { handlers } = await import(
      "../../../library/utils/mocks/infra/mocks"
    );
    const worker = setupWorker(...handlers);
    return worker.start();
  }
  /* devblock:end */
}

const mount = (el: HTMLElement) => {
  const root = createRoot(el);

  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <AuthProvider {...getAuthCfg()}>
            <Header size={HeaderSize.Large}>
              <RBACWrapper showTo={[Role.ALERTS_READ]}>
                <HeaderItem
                  name="menuAlerts"
                  to="/admin/alerts"
                  match="admin/alerts"
                  size={HeaderSize.Large}
                >
                  Alerts
                </HeaderItem>
              </RBACWrapper>
            </Header>
            <Routes />
            <SessionTimeout />
          </AuthProvider>
        </Provider>
      </BrowserRouter>
    </React.StrictMode>,
  );
};

prepare()
  .then(() => {
    const container = document.getElementById("infrastructure");
    if (container) {
      mount(container);

      // @ts-expect-error: Property 'hot' does not exist on type 'NodeModule'.
      if (module.hot) {
        // @ts-expect-error: Property 'hot' does not exist on type 'NodeModule'.
        module.hot.accept();
      }
    } else {
      throw new Error("Cannot find HTML element with ID 'infrastructure'");
    }
  })
  .catch((e) => {
    throw e;
  });
