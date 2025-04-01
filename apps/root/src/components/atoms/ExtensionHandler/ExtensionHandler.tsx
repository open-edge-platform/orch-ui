/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { adm } from "@orch-ui/apis";
import { SquareSpinner } from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import React, {
  ComponentType,
  LazyExoticComponent,
  useEffect,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import "./ExtensionHandler.scss";

const dataCy = "extensionHandler";

const getExtensionBaseUrl = (serviceName: string): string => {
  let baseUrl: string;

  if (window.location.origin.indexOf("web-ui") != -1) {
    // this is based on the assumption that the UI is always accessed at web-ui,
    // not ideal, but I don't have a better solution for now.
    // a possible alternative is to redirect to a baseUrl like "/extension" and use nginx to redirect to api-proxy
    // convert https://web-ui.kind.internal to https://api-proxy.kind.internal
    baseUrl = `${window.location.origin.replace(
      "web-ui",
      "api-proxy",
    )}/${serviceName}.orchui-extension.apis`;
  } else {
    // if it's development, use the default, unless we get the full URL in the extension.
    // the exception is needed for the mockServer to work
    if (serviceName.startsWith("http")) {
      baseUrl = serviceName;
    } else {
      baseUrl = `https://api-proxy.kind.internal/${serviceName}.orchui-extension.apis`;
    }
  }

  return baseUrl;
};

const loadDynamicScript = (baseUrl: string, filename: string) => {
  return new Promise((resolve, reject) => {
    // FIXME check this is has not been loaded already

    // dynamically load a new script by adding a new <script> tag to the page
    const element = document.createElement("script");

    element.src = `${baseUrl}/${filename}`;
    element.type = "text/javascript";
    element.async = true;

    element.onload = () => {
      resolve(true);
    };

    element.onerror = (e) => {
      reject(e);
    };

    document.head.appendChild(element);
  });
};

function loadComponent(scope: string, module: string) {
  return async () => {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    // @ts-ignore
    await __webpack_init_sharing__("default");
    // @ts-ignore
    const container = window[scope];
    // Initialize the container, it may provide shared modules
    await container.init(__webpack_share_scopes__?.default);

    const factory = await container.get(module);
    const Module = factory();
    return Module;
  };
}

const ExtensionHandler = () => {
  const cy = { "data-cy": dataCy };

  const [extension, setExtension] = useState<adm.UiExtension>();
  const [extensionUrl, setExtensionUrl] = useState<string>();

  const { id: extenstionId } = useParams<{ id: string }>();

  // create state to contain the dynamically loaded component
  const [Component, setComponent] = useState<LazyExoticComponent<
    ComponentType<any>
  > | null>(null);
  const [error, setError] = useState(null);

  const { data: extensions } = adm.useDeploymentServiceListUiExtensionsQuery(
    { projectName: SharedStorage.project?.name ?? "" },
    { skip: !extenstionId },
  );

  // we only get a list of extensions from the API,
  // select the one we care about based on the :id parameter in the route
  // NOTE this might become a performance concern if we have many extensions loaded
  useEffect(() => {
    if (!extensions) {
      return;
    }
    const extension = extensions.uiExtensions.filter(
      (e) => e.label === extenstionId,
    )[0];

    if (extension) {
      if (!extension.serviceName) {
        throw new Error("Extension serviceName is required");
      }
      const url = getExtensionBaseUrl(extension.serviceName);
      setExtensionUrl(url);
    }

    setExtension(extension);
  }, [extensions]);

  // once we have the details of a specific UI extension, load it
  useEffect(() => {
    if (extension && extensionUrl) {
      loadDynamicScript(extensionUrl, extension.fileName ?? "remoteEntry.js")
        .then(() => {
          if (!extension.appName) {
            throw new Error("Extension appName is required");
          }
          if (!extension.moduleName) {
            throw new Error("Extension moduleName is required");
          }
          const Comp = React.lazy(
            loadComponent(extension.appName, extension.moduleName),
          );

          return Comp;
        })
        .then((Comp) => {
          setComponent(Comp);
        })
        .catch((e) => {
          setError(e);
        });
    }
  }, [extension]);

  return (
    <div {...cy} className="extension-handler">
      <React.Suspense
        fallback={<SquareSpinner message="Loading Extension..." />}
      >
        {error
          ? `Error loading module "${extension?.label} ${JSON.stringify(
              error,
            )}"`
          : Component && <Component baseUrl={extensionUrl} />}
      </React.Suspense>
    </div>
  );
};

export default ExtensionHandler;
