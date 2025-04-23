/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Header, HeaderSize, SessionTimeout } from "@orch-ui/components";
import "@orch-ui/styles/Global.scss";
import { getAuthCfg } from "@orch-ui/utils";
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
// eslint-disable-next-line no-duplicate-imports
import {
  applicationCatalog,
  appResourceManager,
  deploymentManager,
  metadataBrokerHandler,
} from "@orch-ui/utils";
import { setupWorker } from "msw";

const runMocks = async () => {
  const worker = setupWorker(
    ...deploymentManager.handlers,
    ...applicationCatalog.handlers,
    ...appResourceManager.handlers,
    ...metadataBrokerHandler.handlers,
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
    const container = document.getElementById("applications");
    if (container) {
      mount(container);

      /* devblock:start */
      // @ts-expect-error: Property 'hot' does not exist on type 'NodeModule'.
      if (module.hot) {
        // @ts-expect-error: Property 'hot' does not exist on type 'NodeModule'.
        module.hot.accept();
      }
      /* devblock:end */
    } else {
      throw new Error("Cannot find HTML element with ID 'applications'");
    }
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
            <SessionTimeout />
          </AuthProvider>
        </Provider>
      </BrowserRouter>
    </React.StrictMode>,
  );
};

export { mount };
