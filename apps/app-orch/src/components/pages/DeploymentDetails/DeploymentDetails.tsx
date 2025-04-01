/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { adm } from "@orch-ui/apis";
import {
  ConfirmationDialog,
  Empty,
  MetadataPair,
  setActiveNavItem,
  setBreadcrumb,
} from "@orch-ui/components";
import {
  API_INTERVAL,
  checkAuthAndRole,
  parseError,
  Role,
  SharedStorage,
} from "@orch-ui/utils";
import {
  Button,
  Drawer,
  Heading,
  ProgressLoader,
  ToastProps,
} from "@spark-design/react";
import {
  ButtonSize,
  ButtonVariant,
  DrawerSize,
  ToastPosition,
  ToastState,
  ToastVisibility,
} from "@spark-design/tokens";
import React, { Suspense, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deploymentBreadcrumb,
  deploymentDetailsSitesBreadcrumb,
  deploymentsNavItem,
  homeBreadcrumb,
} from "../../../routes/const";
import { useAppDispatch } from "../../../store/hooks";
import { setProps } from "../../../store/reducers/toast";
import DeploymentDetailsDrawerContent from "../../organisms/deployments/DeploymentDetailsDrawerContent/DeploymentDetailsDrawerContent";
import DeploymentDetailsHeader from "../../organisms/deployments/DeploymentDetailsHeader/DeploymentDetailsHeader";
import DeploymentDetailsStatus from "../../organisms/deployments/DeploymentDetailsStatus/DeploymentDetailsStatus";
import DeploymentDetailsTable from "../../organisms/deployments/DeploymentDetailsTable/DeploymentDetailsTable";
import DeploymentUpgradeModal from "../../organisms/deployments/DeploymentUpgradeModal/DeploymentUpgradeModal";
import "./DeploymentDetails.scss";

const ClusterDetailRemote = React.lazy(() => {
  //TODO: how to stub React.lazy method so we don't
  //need Cypress logic in the component
  const isComponentTesting = window?.Cypress?.testingType === "component";
  return isComponentTesting
    ? import("../../atoms/MockComponent")
    : import("ClusterOrchUI/ClusterDetail");
});

type params = {
  id: string;
};

const DeploymentDetails = ({
  dataCy = "deploymentDetails",
}: {
  dataCy?: string;
}) => {
  const { id } = useParams<keyof params>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toastProps: ToastProps = {
    state: ToastState.Success,
    visibility: ToastVisibility.Hide,
    duration: 3000,
    position: ToastPosition.TopRight,
  };

  /* States */
  const [upgradeState, setUpgradeState] = useState<{
    isModalOpen: boolean;
  }>({
    isModalOpen: false,
  });
  const [drawerState, setDrawerState] = useState<{
    isHidden: boolean;
  }>({
    isHidden: true,
  });
  const [clusterToShow, setClusterToShow] = useState("");
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] =
    useState<boolean>(false);

  const {
    data: apiDeployment,
    isSuccess: isDeploymentSuccess,
    isLoading: isDeploymentLoading,
    isError: isDeploymentError,
  } = adm.useDeploymentServiceGetDeploymentQuery(
    {
      projectName: SharedStorage.project?.name ?? "",
      deplId: id!,
    },
    {
      skip: !SharedStorage.project?.name || !id || upgradeState.isModalOpen,
      pollingInterval: deleteConfirmationOpen ? undefined : API_INTERVAL,
    },
  );

  const validateDeploymentName =
    isDeploymentSuccess &&
    apiDeployment &&
    apiDeployment.deployment &&
    apiDeployment.deployment.name;

  /* Setting Menu Item to Highlight and Breadcrumb to show hierarchy */
  const initialBreadcrumbStack = [homeBreadcrumb, deploymentBreadcrumb];
  const breadcrumb =
    validateDeploymentName && apiDeployment.deployment.displayName && id
      ? initialBreadcrumbStack.concat(
          deploymentDetailsSitesBreadcrumb(
            apiDeployment.deployment.displayName,
            id,
          ),
        )
      : initialBreadcrumbStack;

  const [deleteDeployment] = adm.useDeploymentServiceDeleteDeploymentMutation();

  useEffect(() => {
    dispatch(setBreadcrumb(breadcrumb));
    dispatch(setActiveNavItem(deploymentsNavItem));
  }, [apiDeployment, isDeploymentSuccess]);

  // Rendering Logic
  if (isDeploymentLoading) {
    return <ProgressLoader variant="circular" />;
  }

  if (isDeploymentError || !apiDeployment) {
    return (
      <>
        <Empty
          dataCy="error"
          icon="cross"
          title="Facing error in getting the details!"
        />
      </>
    );
  }

  // if isSuccess
  const deployment = apiDeployment.deployment;

  const headingPopupOptions = [
    {
      displayText: "Upgrade",
      onSelect: () => {
        setUpgradeState({
          isModalOpen: true,
        });
      },
    },
    {
      displayText: "Edit",
      disable: !checkAuthAndRole([Role.AO_WRITE]),
      onSelect: () =>
        navigate(`/applications/deployment/${deployment.deployId}/edit`),
    },
    {
      displayText: "Delete",
      disable: !checkAuthAndRole([Role.AO_WRITE]),
      onSelect: () => {
        setDeleteConfirmationOpen(true);
      },
    },
  ];

  // Getting metadata for a deployment: These fields may vary and are taken upon package deploy
  // Note: In this version, each key-value pairs in metadata is same across all apps/vm in a deployment.
  // Hence, we are assuming the deployment metadata is same as the first app/vm metadata within that deployment.
  const metadataKeyValuePairs: MetadataPair[] = Object.keys(
    apiDeployment &&
      apiDeployment.deployment.targetClusters &&
      apiDeployment.deployment.targetClusters.length > 0 &&
      apiDeployment.deployment.targetClusters[0].labels
      ? apiDeployment.deployment.targetClusters[0].labels
      : {},
  ).map((k) => ({
    key: k,
    value:
      apiDeployment &&
      apiDeployment.deployment.targetClusters &&
      apiDeployment.deployment.targetClusters.length > 0 &&
      apiDeployment.deployment.targetClusters[0].labels
        ? apiDeployment.deployment.targetClusters[0].labels[k]
        : "",
  }));

  const deleteHostFn = async () => {
    try {
      await deleteDeployment({
        projectName: SharedStorage.project?.name ?? "",
        deplId: deployment?.deployId ?? "",
      }).unwrap();
      dispatch(
        setProps({
          ...toastProps,
          state: ToastState.Success,
          message: "Deployment Successfully removed",
          visibility: ToastVisibility.Show,
        }),
      );
      navigate("/applications/deployments");
    } catch (e) {
      const errorObj = parseError(e);

      dispatch(
        setProps({
          ...toastProps,
          state: ToastState.Danger,
          message: errorObj.data,
          visibility: ToastVisibility.Show,
        }),
      );
    }
    setDeleteConfirmationOpen(false);
  };

  return (
    <Suspense fallback={<ProgressLoader variant="circular" />}>
      <div className="deployment-details" data-cy={dataCy}>
        {/* First Row (Main Heading and Button) */}
        <DeploymentDetailsHeader
          dataCy={`${dataCy}Header`}
          headingTitle={
            isDeploymentSuccess && deployment.displayName
              ? deployment.displayName
              : "Deployment name"
          }
          popupOptions={headingPopupOptions}
        />
        {apiDeployment.deployment && (
          <DeploymentUpgradeModal
            isOpen={upgradeState.isModalOpen}
            data-cy="upgradeDeploymentModal"
            deployment={apiDeployment.deployment}
            setIsOpen={(isModalOpen: boolean) => {
              setUpgradeState({ ...upgradeState, isModalOpen });
            }}
          />
        )}

        {/* Second Row (Status) */}
        <DeploymentDetailsStatus
          dataCy={`${dataCy}Status`}
          deploymentDetails={{
            compositeAppDetailsProps: {
              name: deployment.appName,
              version: deployment.appVersion,
              type: deployment.deploymentType ?? "",
              valueOverrides:
                deployment.overrideValues &&
                deployment.overrideValues.length > 0
                  ? true
                  : false,
              onClickViewDetails: () => {
                setDrawerState({
                  ...drawerState,
                  isHidden: !drawerState.isHidden,
                });
              },
            },
            metadataKeyValuePairs,
            status: deployment.status,
            dateTime: deployment.createTime ?? "",
          }}
        />

        <Drawer
          show={!drawerState.isHidden}
          onHide={() => {
            setDrawerState({
              ...drawerState,
              isHidden: !drawerState.isHidden,
            });
          }}
          headerProps={{
            closable: true,
            onHide: () => {
              setDrawerState({
                ...drawerState,
                isHidden: !drawerState.isHidden,
              });
            },
            title: deployment.appName,
          }}
          bodyContent={
            // This will block API calls that are coming
            // without drawer being in open state
            !drawerState.isHidden ? (
              <DeploymentDetailsDrawerContent
                deployment={apiDeployment.deployment}
              />
            ) : (
              <></>
            )
          }
          footerContent={
            <Button
              style={{ marginLeft: "auto" }}
              onPress={() => {
                setDrawerState({
                  ...drawerState,
                  isHidden: !drawerState.isHidden,
                });
              }}
              variant={ButtonVariant.Secondary}
            >
              Close
            </Button>
          }
          backdropClosable
          backdropIsVisible
        />

        <div className="hr-line"></div>

        <div
          className="deployment-details__instances"
          data-cy={`${dataCy}Table`}
        >
          <Heading
            className="deployment-details__instances-heading"
            semanticLevel={6}
          >
            Deployment Instances
          </Heading>
          <div className="deployment-details__instances-table">
            <DeploymentDetailsTable
              deployment={deployment}
              columnAction={(name) => setClusterToShow(name)}
              poll={!deleteConfirmationOpen}
            />
          </div>
        </div>

        <div className="hr-line"></div>

        <div className="deployment-details__footer" data-cy="backButton">
          <Button
            className="back-button"
            onPress={() => {
              navigate("/applications/deployments");
            }}
            variant={ButtonVariant.Secondary}
          >
            Back
          </Button>
        </div>

        <Drawer
          data-cy="drawer"
          show={clusterToShow !== ""}
          onHide={() => {
            setClusterToShow("");
          }}
          backdropClosable={true}
          size={DrawerSize.Large}
          headerProps={{
            title: `Cluster ${clusterToShow}`,
            closable: true,
            onHide: () => setClusterToShow(""),
          }}
          bodyContent={
            <div className="drawer-wrapper">
              <ClusterDetailRemote name={clusterToShow} hasHeader={false} />
            </div>
          }
          footerContent={
            <Button
              size={ButtonSize.Large}
              variant={ButtonVariant.Secondary}
              onPress={() => {
                setClusterToShow("");
              }}
            >
              Close
            </Button>
          }
        />
        {deleteConfirmationOpen && (
          <ConfirmationDialog
            content={`Are you sure you want to delete Deployment "${
              deployment?.displayName ?? deployment?.name ?? ""
            }"?`}
            isOpen={deleteConfirmationOpen}
            confirmCb={() => deleteHostFn()}
            confirmBtnText="Delete"
            confirmBtnVariant={ButtonVariant.Alert}
            cancelCb={() => setDeleteConfirmationOpen(false)}
          />
        )}
      </div>
    </Suspense>
  );
};

export default DeploymentDetails;
