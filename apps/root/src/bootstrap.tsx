/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { SessionTimeout } from "@orch-ui/components";
import "@orch-ui/styles/Global.scss";
import { getAuthCfg } from "@orch-ui/utils";
import "@spark-design/brand-tokens/style/index.css";
import "@spark-design/css/global/index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { AuthProvider } from "react-oidc-context";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundaryFallback from "./components/molecules/ErrorBoundaryFallback/ErrorBoundaryFallback";
import "./index.css";
import Routes from "./routes";
import { store } from "./store/store";
// FIXME this is a temporary solution until https://github.com/intel-innersource/libraries.ui.intel-design-system.spark-design/pull/1844 is merged and released
import "@spark-design/css/components/ledge-flex/index.css";

/* devblock:start */
import { setupWorker } from "msw";
/* devblock:end */
// start the mocks server if we are in development mode
// NOTE that this is needed as the bootstrap.tsx is not called when loading the MFEs inside the container app
// it is not ideal but is a commodity workaroung to make it easier for non-technical
// people to run the UI with mock data
async function prepare() {
  /* devblock:start */
  if (process.env.REACT_LP_MOCK_API === "true") {
    const { handlers: eim_handlers } = await import(
      "../../../library/utils/mocks/eim/mocks"
    );
    const { handlers: applicationCatalogHandlers } = await import(
      "../../../library/utils/mocks/app-orch/catalog/applicationCatalog"
    );
    const { metadataBrokerHandler: mb_handlers } = await import(
      "../../../library/utils/mocks/metadata-broker"
    );
    const { handlers: deploymentManagerHandlers } = await import(
      "../../../library/utils/mocks/app-orch/adm/deploymentManager"
    );
    const { handlers: appResourceManagerHandlers } = await import(
      "../../../library/utils/mocks/app-orch/adm/appResourceManager"
    );
    const { clusterHandlers, clusterTemplateHandlers } = await import(
      "../../../library/utils/mocks/cluster-orch/mocks"
    );

    const worker = setupWorker(
      ...eim_handlers,
      ...applicationCatalogHandlers,
      ...deploymentManagerHandlers,
      ...appResourceManagerHandlers,
      ...clusterHandlers,
      ...clusterTemplateHandlers,
      ...mb_handlers.handlers,
    );
    return worker.start();
  }
  /* devblock:end */
  return Promise.resolve();
}

prepare()
  .then(() => {
    const container = document.getElementById("root");
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
      throw new Error("Cannot find HTML element with ID 'root'");
    }
  })
  .catch((e: any) => {
    throw e;
  });

const mount = (el: HTMLElement) => {
  ReactDOM.createRoot(el).render(
    <React.StrictMode>
      <BrowserRouter>
        <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
          <Provider store={store}>
            <AuthProvider {...getAuthCfg()}>
              <Routes />
              <SessionTimeout />
            </AuthProvider>
          </Provider>
        </ErrorBoundary>
      </BrowserRouter>
    </React.StrictMode>,
  );
};
