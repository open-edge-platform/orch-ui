/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ctm } from "@orch-ui/apis";
import {
  ApiError,
  Flex,
  Popup,
  PopupOption,
  setActiveNavItem,
  setBreadcrumb,
} from "@orch-ui/components";
import { downloadFile, getAuthCfg, SharedStorage } from "@orch-ui/utils";
import { Heading, Icon, Text, ToggleSwitch } from "@spark-design/react";
import { useEffect, useState } from "react";
import { AuthProvider } from "react-oidc-context";
import { Provider } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clusterTemplatesBreadcrumb,
  clusterTemplatesMenuItem,
  homeBreadcrumb,
} from "../../../routes/const";
import { store } from "../../../store";
import { useAppDispatch } from "../../../store/hooks";
import CodeSample from "../../atom/CodeSample/CodeSample";
import TableLoader from "../../atom/TableLoader";
import "./ClusterTemplateDetails.scss";

export const dataCy = "clusterTemplateView";

type UrlParams = {
  templateName: string;
  templateVersion: string;
};

export const ClusterTemplateDetails = () => {
  const cy = { "data-cy": dataCy };
  const projectName = SharedStorage.project?.name ?? "";

  const { templateName, templateVersion } = useParams<UrlParams>();

  const [showLineNumbers, setShowLineNumbers] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const {
    data: template,
    isLoading,
    isSuccess,
    isError,
    error,
  } = ctm.useGetV1ProjectsByProjectNameTemplatesAndNameVersionsVersionQuery(
    {
      projectName,
      name: templateName ?? "",
      version: templateVersion ?? "",
    },
    {
      skip: !projectName,
    },
  );

  const breadcrumb = [
    homeBreadcrumb,
    clusterTemplatesBreadcrumb,
    {
      text: templateName ?? "",
      link: "#",
    },
  ];

  useEffect(() => {
    dispatch(setBreadcrumb(breadcrumb));
    dispatch(setActiveNavItem(clusterTemplatesMenuItem));
  }, [template, isSuccess]);

  if (isLoading) {
    return <TableLoader />;
  } else if (isError || !template) {
    return <ApiError error={error} />;
  }

  const code = JSON.stringify(template, null, 2);

  const popupOptions: PopupOption[] = [
    {
      displayText: "Export Template",
      onSelect: () => {
        downloadFile(
          JSON.stringify(template, null, 2),
          `${template.name}-${template.version}-template.json`,
        );
      },
    },
  ];

  return (
    <div {...cy} className="cluster-template-view">
      <header>
        <Heading semanticLevel={1} size="l">
          {template.name}
        </Heading>
        <div className="action-button" data-cy={`${dataCy}Popup`}>
          <Popup
            options={popupOptions}
            jsx={
              <button
                className="spark-button spark-button-action spark-button-size-l spark-focus-visible spark-focus-visible-self spark-focus-visible-snap"
                type="button"
              >
                <span className="spark-button-content">
                  Template Action{" "}
                  <Icon className="margin-1" icon="chevron-down" />
                </span>
              </button>
            }
          />
        </div>
      </header>
      <Flex cols={[2, 3, 2, 5]} className="details">
        <b>Version</b>
        <Text data-cy="templateVersion">{template.version}</Text>
        <b>Description</b>
        <Text data-cy="templateDescription">{template.description}</Text>
        <b>Template Name</b>
        <Text data-cy="templateName">{template.name}</Text>
        <b></b>
        <span></span>
      </Flex>
      <div className="toggle-switch-container" data-cy="lineNumbersToggle">
        <ToggleSwitch onChange={setShowLineNumbers} labelAlignment="end">
          Show Line Numbers
        </ToggleSwitch>
      </div>
      <CodeSample
        code={code}
        language="javascript"
        lineNumbers={showLineNumbers}
      />
    </div>
  );
};

export default () => (
  <Provider store={store}>
    <AuthProvider {...getAuthCfg()}>
      <ClusterTemplateDetails />
    </AuthProvider>
  </Provider>
);
