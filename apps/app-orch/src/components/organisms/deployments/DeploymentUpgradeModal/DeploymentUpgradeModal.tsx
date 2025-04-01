/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { adm, catalog } from "@orch-ui/apis";
import { Modal, SquareSpinner } from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import {
  Button,
  Combobox,
  Heading,
  Item,
  MessageBanner,
  Text,
} from "@spark-design/react";
import {
  ButtonSize,
  ButtonVariant,
  ComboboxSize,
  ComboboxVariant,
  ModalSize,
} from "@spark-design/tokens";
import { useState } from "react";
import "./DeploymentUpgradeModal.scss";

const { useDeploymentServiceUpdateDeploymentMutation } = adm;

interface DeploymentUpgradeModalProps {
  isOpen: boolean;
  // this is a callback invoked on both success and cancel
  setIsOpen: (isOpen: boolean, response: adm.DeploymentRead) => void;
  deployment: adm.DeploymentRead;
}

const DeploymentUpgradeModal = ({
  isOpen,
  setIsOpen,
  deployment,
}: DeploymentUpgradeModalProps) => {
  const projectName = SharedStorage.project?.name ?? "";

  const [upgradeModalState, setUpgradeModalState] = useState<{
    selectedVersion: string;
    upgradeError: boolean;
    errorMessage?: string;
  }>({
    selectedVersion: deployment.appVersion,
    upgradeError: false,
  });
  const {
    data: compositeAppVersionList,
    isSuccess,
    isError,
    isLoading,
  } = catalog.useCatalogServiceGetDeploymentPackageVersionsQuery(
    {
      projectName,
      deploymentPackageName: deployment.appName,
    },
    {
      skip: !projectName,
    },
  );

  const availableVersionList =
    compositeAppVersionList && compositeAppVersionList.deploymentPackages
      ? compositeAppVersionList.deploymentPackages.map(
          (compositeApp) => compositeApp.version,
        )
      : [];

  const [upgradeDeployment] = useDeploymentServiceUpdateDeploymentMutation();

  return (
    <div className="deployment-upgrade" data-cy="deploymentUpgradeModal">
      <Modal
        open={isOpen}
        size={ModalSize.Small}
        passiveModal
        isDimissable={false}
      >
        {!upgradeModalState.upgradeError && isSuccess && (
          <>
            <div
              className="deployment-upgrade__content"
              data-cy="deploymentUpgradeModalBody"
            >
              <Heading semanticLevel={5}>Upgrade</Heading>
              <Text>
                This will update all currently deployed VMs and containers to
                match the settings defined in the specified deployment package
              </Text>
              <div style={{ padding: "0.5rem" }}>
                <Combobox
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                  label="Select versions"
                  data-cy="selectDeploymentVersion"
                  name="selectVersion"
                  size={ComboboxSize.Large}
                  variant={ComboboxVariant.Primary}
                  inputValue={upgradeModalState.selectedVersion}
                  onSelectionChange={(version: string) => {
                    setUpgradeModalState({
                      ...upgradeModalState,
                      selectedVersion: version,
                    });
                  }}
                  isRequired={true}
                  errorMessage="Version is required"
                >
                  {availableVersionList.map((version) => (
                    <Item textValue={version} key={version}>
                      {version}
                    </Item>
                  ))}
                </Combobox>
              </div>
            </div>
            <div
              className="deployment-upgrade__footer button-group"
              data-cy="deploymentUpgradeModalBody"
            >
              <Button
                variant={ButtonVariant.Secondary}
                onPress={() => {
                  setIsOpen(false, deployment);
                }}
                size={ButtonSize.Large}
                data-cy="cancelBtn"
              >
                Cancel
              </Button>
              <Button
                variant={ButtonVariant.Primary}
                isDisabled={
                  deployment.appVersion === upgradeModalState.selectedVersion
                }
                onPress={() => {
                  if (
                    deployment.deployId &&
                    deployment.appVersion !== upgradeModalState.selectedVersion
                  ) {
                    const deploymentUpgradeInfo = { ...deployment };
                    deploymentUpgradeInfo.appVersion =
                      upgradeModalState.selectedVersion;
                    upgradeDeployment({
                      deplId: deployment.deployId,
                      deployment: deploymentUpgradeInfo,
                      projectName,
                    })
                      .unwrap()
                      .then(
                        (data: adm.UpdateDeploymentResponse) => {
                          setIsOpen(false, data.deployment);
                        },
                        (rejected) => {
                          const {
                            data: { message },
                          } = rejected;
                          setUpgradeModalState({
                            ...upgradeModalState,
                            upgradeError: true,
                            errorMessage: message,
                          });
                        },
                      )
                      .catch((error) => {
                        setUpgradeModalState({
                          ...upgradeModalState,
                          upgradeError: true,
                          errorMessage: error,
                        });
                      });
                  }
                }}
                size={ButtonSize.Large}
                data-cy="upgradeBtn"
              >
                Upgrade
              </Button>
            </div>
          </>
        )}
        {isLoading && <SquareSpinner />}
        {(upgradeModalState.upgradeError || isError) && (
          <MessageBanner
            variant="error"
            messageTitle="Upgrade Failed!"
            messageBody={`Error on upgrading the deployment! ${upgradeModalState.errorMessage}`}
            buttonPlacement="left"
            primaryText="Close"
            secondaryText=""
            outlined
            showActionButtons
            onClickPrimary={() => {
              setIsOpen(false, deployment);
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default DeploymentUpgradeModal;
