/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Header, HeaderSize } from "@orch-ui/components";
import "@orch-ui/styles/Global.scss";
import { getAuthCfg } from "@orch-ui/utils";
import "@spark-design/brand-tokens/style/index.css";
import "@spark-design/css/components/index.css";
import "@spark-design/css/global/index.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "react-oidc-context";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import Routes from "./routes";
import { store } from "./store";

/* devblock:start */
// We have to ignore the error below as this is in devblock there will be a build error
/* eslint-disable no-duplicate-imports */
import { observabilityHandlers, tenantManagerHandlers } from "@orch-ui/utils";
import { setupWorker } from "msw";

const runMocks = async () => {
  const worker = setupWorker(
    ...tenantManagerHandlers,
    ...observabilityHandlers,
  );
  return worker.start();
};
/* devblock:end */

const prepare = async () => {
  /* devblock:start */
  if (process.env.REACT_MOCK_API === "true") {
    return runMocks();
  }
  /* devblock:end */
  return Promise.resolve();
};

prepare()
  .then(() => {
    const container = document.getElementById("admin");
    if (container) {
      return mount(container);
    }
    throw new Error("Cannot find HTML element with ID 'admin'");
  })
  .catch((e: any) => {
    throw e;
  });

const mount = (el: HTMLElement) => {
  const root = createRoot(el);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <AuthProvider {...getAuthCfg()}>
            <Header size={HeaderSize.Large} />
            <Routes />
          </AuthProvider>
        </Provider>
      </BrowserRouter>
    </React.StrictMode>,
  );
};

export { mount };
