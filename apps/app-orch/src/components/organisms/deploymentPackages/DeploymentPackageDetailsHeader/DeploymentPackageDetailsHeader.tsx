/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import { ConfirmationDialog, Popup, PopupOption } from "@orch-ui/components";
import { parseError, SharedStorage } from "@orch-ui/utils";
import { Heading, ToastProps } from "@spark-design/react";
import {
  ButtonVariant,
  ToastPosition,
  ToastState,
  ToastVisibility,
} from "@spark-design/tokens";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../store/hooks";
import { setDeploymentPackage } from "../../../../store/reducers/deploymentPackage";
import { setProps } from "../../../../store/reducers/toast";
import "./DeploymentPackageDetailsHeader.scss";

const dataCy = "deploymentPackageDetailsHeader";

interface DeploymentPackageDetailsHeaderProps {
  deploymentPackage: catalog.DeploymentPackage;
}

const DeploymentPackageDetailsHeader = ({
  deploymentPackage,
}: DeploymentPackageDetailsHeaderProps) => {
  const cy = { "data-cy": dataCy };
  const toastProps: ToastProps = {
    state: ToastState.Success,
    visibility: ToastVisibility.Hide,
    duration: 3000,
    position: ToastPosition.TopRight,
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [deleteDeploymentPackage] =
    catalog.useCatalogServiceDeleteDeploymentPackageMutation();
  /** Deployment package delete via api */
  const deleteFn = () => {
    deleteDeploymentPackage({
      projectName: SharedStorage.project?.name ?? "",
      deploymentPackageName: deploymentPackage.name,
      version: deploymentPackage.version,
    })
      .unwrap()
      .then(() => {
        dispatch(
          setProps({
            ...toastProps,
            state: ToastState.Success,
            message: "Deployment Package Successfully removed",
            visibility: ToastVisibility.Show,
          }),
        );
        navigate("/applications/packages");
      })
      .catch((err) => {
        const errorObj = parseError(err);
        dispatch(
          setProps({
            ...toastProps,
            state: ToastState.Danger,
            message: errorObj.data,
            visibility: ToastVisibility.Show,
          }),
        );
      });
    setIsDeleteModalOpen(false);
  };

  /** get all popup actions for deployment package */
  const getPopupOptions = useCallback(
    (name: string, version: string): PopupOption[] => [
      {
        displayText: "Deploy",
        onSelect: () =>
          navigate(`/applications/package/deploy/${name}/version/${version}`),
      },
      {
        displayText: "Edit",
        onSelect: () => {
          dispatch(setDeploymentPackage(deploymentPackage));
          navigate(`../packages/edit/${name}/version/${version}`);
        },
      },
      {
        displayText: "Delete",
        onSelect: () => {
          dispatch(setDeploymentPackage(deploymentPackage));
          setIsDeleteModalOpen(true);
        },
      },
    ],
    [],
  );

  return (
    <div {...cy} className="dp-details-header">
      <div className="dp-details-header__heading-row">
        <div className="dp-details-header__heading-row__container">
          <Heading
            data-cy="dpTitle"
            className="dp-details-header__dp-title"
            semanticLevel={1}
            size="l"
          >
            {deploymentPackage.name || "Deployment Package name not found"}
          </Heading>
          <p className="dp-details-header__dp-description">
            {deploymentPackage.description ||
              "Deployment Package description not found"}
          </p>
        </div>
        <div className="dp-details-header__action-button">
          <Popup
            jsx={
              /** CHECK: Bug with the <Button> component! Click not working and propogated to Popup!! */
              <button
                className="spark-button spark-button-action spark-button-size-l spark-focus-visible spark-focus-visible-self spark-focus-visible-snap"
                type="button"
              >
                <span className="spark-button-content">Action</span>
              </button>
            }
            options={getPopupOptions(
              deploymentPackage.name,
              deploymentPackage.version,
            )}
          />
        </div>
      </div>
      {isDeleteModalOpen && (
        <ConfirmationDialog
          content={`Are you sure to delete ${deploymentPackage.name}@${deploymentPackage.version}?`}
          isOpen={isDeleteModalOpen}
          confirmCb={deleteFn}
          confirmBtnText="Delete"
          confirmBtnVariant={ButtonVariant.Alert}
          cancelCb={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  );
};

export default DeploymentPackageDetailsHeader;
