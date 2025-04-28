/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Header, HeaderSize, SessionTimeout } from "@orch-ui/components";
import "@orch-ui/styles/Global.scss";
import { getAuthCfg } from "@orch-ui/utils";
import "@spark-design/css/global/spark-colors.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "react-oidc-context";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import Routes from "./routes";
import { store } from "./store";

/* devblock:start */
import { setupWorker } from "msw";
// eslint-disable-next-line no-duplicate-imports
import { clusterOrchHandlers, metadataBrokerHandler } from "@orch-ui/utils";

/* devblock:end */

async function prepare() {
  /* devblock:start */
  if (process.env.REACT_MOCK_API === "true") {
    const worker = setupWorker(
      ...clusterOrchHandlers.clusterTemplateHandlers,
      ...clusterOrchHandlers.clusterHandlers,
      ...metadataBrokerHandler.handlers,
    );
    return worker.start();
  }
  /* devblock:end */
  return Promise.resolve();
}

const mount = (el: HTMLElement) => {
  const root = createRoot(el);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <AuthProvider {...getAuthCfg()}>
            <Header size={HeaderSize.Large} />
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
    const container = document.getElementById("cluster-orch");
    if (container) {
      return mount(container);
    }
    throw new Error("Cannot find HTML element with ID 'cluster-orch'");
  })
  .catch((e) => {
    throw e;
  });
