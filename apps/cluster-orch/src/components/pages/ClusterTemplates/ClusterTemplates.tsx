/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cm } from "@orch-ui/apis";
import { ConfirmationDialog, PopupOption } from "@orch-ui/components";
import {
  checkAuthAndRole,
  downloadFile,
  getAuthCfg,
  parseError,
  Role,
  SharedStorage,
} from "@orch-ui/utils";
import { Heading, Toast, ToastProps } from "@spark-design/react";
import {
  ButtonVariant,
  ToastPosition,
  ToastState,
  ToastVisibility,
} from "@spark-design/tokens";
import { ChangeEvent, useCallback, useState } from "react";
import { AuthProvider } from "react-oidc-context";
import { Provider } from "react-redux";
import { useNavigate } from "react-router-dom";
import { store } from "../../../store";
import ClusterTemplatesList from "../../organism/ClusterTemplatesList/ClusterTemplatesList";

export const dataCy = "clusterTemplates";

export const ClusterTemplates = () => {
  const cy = { "data-cy": dataCy };
  const projectName = SharedStorage.project?.name ?? "";
  const navigate = useNavigate();

  const [templateToDelete, setTemplateToDelete] = useState<
    cm.TemplateInfo | undefined
  >();

  const [addTemplate] = cm.usePostV2ProjectsByProjectNameTemplatesMutation();
  const [setTemplateDefault] =
    cm.usePutV2ProjectsByProjectNameTemplatesAndNameDefaultMutation();
  const [deleteTemplate] =
    cm.useDeleteV2ProjectsByProjectNameTemplatesAndNameVersionsVersionMutation();

  const toastProps: ToastProps = {
    state: ToastState.Success,
    visibility: ToastVisibility.Hide,
    position: ToastPosition.TopRight,
    duration: 4000,
  };

  const [toastPros, setToastProps] = useState<ToastProps>();

  const isDefaultTemplate = (
    tpl: cm.TemplateInfo,
    defaultTemplateInfo: cm.DefaultTemplateInfo | undefined,
  ) =>
    defaultTemplateInfo &&
    defaultTemplateInfo.name === tpl.name &&
    defaultTemplateInfo.version === tpl.version;

  const getPopupOptions = useCallback(
    (
      tpl: cm.TemplateInfo,
      defaultTemplateInfo: cm.DefaultTemplateInfo | undefined,
    ): PopupOption[] => [
      {
        displayText: "View Details",
        disable: !checkAuthAndRole([
          Role.CLUSTER_TEMPLATES_READ,
          Role.CLUSTER_TEMPLATES_WRITE,
        ]),
        onSelect: () => onViewDetails(tpl),
      },
      {
        displayText: "Set as Default",
        disable:
          !checkAuthAndRole([Role.CLUSTER_TEMPLATES_WRITE]) ||
          isDefaultTemplate(tpl, defaultTemplateInfo),
        onSelect: () => onSetDefault(tpl),
      },
      {
        displayText: "Export Template",
        disable: !checkAuthAndRole([
          Role.CLUSTER_TEMPLATES_READ,
          Role.CLUSTER_TEMPLATES_WRITE,
        ]),
        onSelect: () => onExportTemplate(tpl),
      },
      {
        displayText: "Delete",
        disable:
          !checkAuthAndRole([Role.CLUSTER_TEMPLATES_WRITE]) ||
          isDefaultTemplate(tpl, defaultTemplateInfo),
        onSelect: () => setTemplateToDelete(tpl),
      },
    ],
    [],
  );

  const onViewDetails = (tpl: cm.TemplateInfo) => {
    navigate(`./${tpl.name}/${tpl.version}/view`);
  };

  const onSetDefault = (tpl: cm.TemplateInfo) => {
    setTemplateDefault({
      projectName,
      name: tpl.name,
      defaultTemplateInfo: {
        version: tpl.version!,
      },
    });
  };

  const onExportTemplate = (tpl: cm.TemplateInfo) =>
    downloadFile(
      JSON.stringify(tpl, null, 2),
      `${tpl.name}-${tpl.version}-template.json`,
    );

  const onDelete = async (tpl: cm.TemplateInfo) => {
    await deleteTemplate({
      projectName,
      name: tpl.name,
      version: tpl.version!,
    })
      .unwrap()
      .then(() => {
        setToastProps({
          ...toastProps,
          state: ToastState.Success,
          message: `Template "${tpl.name}" (${tpl.version}) was successfully removed.`,
          visibility: ToastVisibility.Show,
        });
      })
      .catch((error) => {
        setToastProps({
          ...toastProps,
          state: ToastState.Danger,
          message: parseError(error).data,
          visibility: ToastVisibility.Show,
        });
      });
  };

  const onAddTemplate = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUploadedFile(file);
  };

  const handleUploadedFile = (file: File) => {
    if (file.size > 5 * 1048576) {
      setToastProps({
        ...toastProps,
        state: ToastState.Danger,
        message: "File exceed maximum size of 5MB.",
        visibility: ToastVisibility.Show,
      });
      return;
    }
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const template = JSON.parse(e.target?.result as string);
        await addTemplate({
          projectName,
          templateInfo: template,
        })
          .unwrap()
          .then(() => {
            setToastProps({
              ...toastProps,
              state: ToastState.Success,
              message: `Template "${template.name}" (${template.version}) was successfully added.`,
              visibility: ToastVisibility.Show,
            });
          });
      } catch (error) {
        let errorMessage: string;
        if (error.status && error.status >= 400) {
          //If error message is not received in response,
          //parseError() will return appropriate generic message ex:"Unknown error. Please contact the administrator."
          errorMessage = parseError(error).data;
        } else if (error.stack && error.stack.search("SyntaxError") > -1) {
          errorMessage = "Invalid JSON file was uploaded.";
        } else {
          errorMessage = "An unknown error occurred.";
        }
        setToastProps({
          ...toastProps,
          state: ToastState.Danger,
          message: errorMessage,
          visibility: ToastVisibility.Show,
        });
      }
    };
    reader.readAsText(file);
  };

  return (
    <div {...cy} className="cluster-templates">
      <Heading semanticLevel={1} size="l">
        Cluster Templates
      </Heading>
      <ClusterTemplatesList
        getPopupOptions={getPopupOptions}
        onDelete={onDelete}
        onAddTemplate={onAddTemplate}
      />
      {templateToDelete && (
        <ConfirmationDialog
          content={`Are you sure you want to delete Template "${templateToDelete.name}" in version ${templateToDelete.version}?`}
          isOpen={true}
          confirmCb={async () => {
            await onDelete(templateToDelete);
            setTemplateToDelete(undefined);
          }}
          confirmBtnText="Delete"
          confirmBtnVariant={ButtonVariant.Alert}
          cancelCb={() => setTemplateToDelete(undefined)}
        />
      )}
      <Toast {...toastPros} />
    </div>
  );
};

export default () => (
  <Provider store={store}>
    <AuthProvider {...getAuthCfg()}>
      <ClusterTemplates />
    </AuthProvider>
  </Provider>
);
