/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import {
  ConfirmationDialog,
  MessageBanner,
  Popup,
  PopupOption,
} from "@orch-ui/components";
import { checkAuthAndRole, Role } from "@orch-ui/utils";
import { Button, ButtonGroup, Drawer, Icon, Text } from "@spark-design/react";
import { ButtonVariant } from "@spark-design/tokens";
import { useState } from "react";
import { useAppDispatch } from "../../../../store/hooks";
import { deleteHostInstanceFn } from "../../../../store/utils";
import DeauthorizeHostStandalone from "../DeauthorizeHostStandalone/DeauthorizeHostStandalone";

import "./RegisteredHostsPopup.scss";
export const dataCy = "registeredHostsPopup";
export interface RegisteredHostsPopupProps {
  host: eim.HostRead;
  showViewDetailsOption?: boolean;
  basePath?: string;
  jsx?: React.ReactNode;
  onViewDetails?: (resourceId?: string) => void;
  onEdit: (host: eim.HostRead) => void;
  onDelete?: () => void;
  onOnboard: (resourceId?: string) => void;
}
export const RegisteredHostsPopup = ({
  host,
  showViewDetailsOption,
  basePath,
  jsx = <Icon artworkStyle="light" icon="ellipsis-v" />,
  onViewDetails,
  onEdit,
  onDelete,
  onOnboard,
}: RegisteredHostsPopupProps) => {
  const dispatch = useAppDispatch();

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showDeauthorizeModal, setShowDeauthorizeModal] =
    useState<boolean>(false);
  const [showErrorDrawer, setShowErrorDrawer] = useState<boolean>(false);

  const getOptions = (host: eim.HostRead): PopupOption[] => {
    const options: PopupOption[] = [];

    if (showViewDetailsOption) {
      options.push({
        displayText: "View Details",
        onSelect: () => onViewDetails && onViewDetails(host.resourceId),
        disable: false,
      });
    }

    if (host.registrationStatus?.indicator === "STATUS_INDICATION_ERROR") {
      options.push({
        displayText: "View Error",
        onSelect: () => setShowErrorDrawer(true),
        disable: false,
      });
    }

    options.push(
      {
        displayText: "Edit",
        disable: !checkAuthAndRole([Role.INFRA_MANAGER_WRITE]),
        onSelect: () => onEdit(host),
      },
      {
        displayText: "Onboard",
        disable: !checkAuthAndRole([Role.INFRA_MANAGER_WRITE]),

        onSelect: () => onOnboard(host.resourceId),
      },
      {
        displayText: "Deauthorize",
        disable: !checkAuthAndRole([Role.INFRA_MANAGER_WRITE]),
        onSelect: () => {
          setShowDeauthorizeModal(true);
        },
      },
      {
        displayText: "Delete",
        disable: !checkAuthAndRole([Role.INFRA_MANAGER_WRITE]),
        onSelect: () => {
          setShowDeleteModal(true);
        },
      },
    );

    //TODO: update when current API's are used , HostTableColumns.tsx too
    if (host?.instance?.desiredState === "INSTANCE_STATE_UNSPECIFIED") {
      options.splice(2, 1);
    }

    return options;
  };

  const getMessageBannerBody = () => {
    return (
      <div className="error-content">
        <Icon
          artworkStyle="regular"
          icon="alert-triangle"
          className="host-error-status-icon"
        />
        <div className="error-details">
          <Text className="error-label error-mb">
            {host.registrationStatus?.message}
          </Text>
          <div className="error-mb">
            <Text className="error-label">Host Name: {host.name}</Text>
            <Text className="error-label">
              Serial Number: {host.serialNumber}
            </Text>
            <Text className="error-label">UUID: {host.uuid}</Text>
          </div>
          <Text className="error-label">
            Record these details, then delete and re-register the host.
          </Text>
        </div>
      </div>
    );
  };

  return (
    <div className="registered-hosts-popup" data-cy="registeredHostsPopup">
      <Popup
        dataCy="registeredHostsActions"
        jsx={jsx}
        options={getOptions(host)}
      />
      {showDeleteModal && (
        <ConfirmationDialog
          showTriggerButton={false}
          title="Confirm Host Deletion"
          subTitle={`Are you sure you want to delete Host "${
            host.name || host.resourceId
          }"?`}
          content="This will permanently remove the host from the system and cannot be undone."
          isOpen={showDeleteModal}
          buttonPlacement="left-reverse"
          confirmCb={() => {
            deleteHostInstanceFn(dispatch, host);
            setShowDeleteModal(false);
            if (onDelete) onDelete();
          }}
          confirmBtnText="Delete"
          confirmBtnVariant={ButtonVariant.Alert}
          cancelCb={() => setShowDeleteModal(false)}
        />
      )}

      {showDeauthorizeModal && host.resourceId && (
        <DeauthorizeHostStandalone
          basePath={basePath}
          hostId={host.resourceId}
          hostName={host.name}
          setDeauthorizeConfirmationOpen={setShowDeauthorizeModal}
          isDeauthConfirmationOpen={showDeauthorizeModal}
        />
      )}

      {showErrorDrawer && host.resourceId && (
        <Drawer
          show={showErrorDrawer}
          data-cy="hostRegisterErrorDrawer"
          onHide={() => setShowErrorDrawer(false)}
          headerProps={{
            onHide: () => setShowErrorDrawer(false),
            title: "Connection Error",
            closable: true,
            className: "host-error-drawer-header",
          }}
          className="host-error-drawer"
          bodyContent={
            <MessageBanner
              className="registered-host-error"
              content={getMessageBannerBody()}
              isDismmisible={false}
            />
          }
          footerContent={
            <ButtonGroup align="end">
              <Button
                data-cy="footerOkButton"
                onPress={() => setShowErrorDrawer(false)}
              >
                Ok
              </Button>
            </ButtonGroup>
          }
          backdropClosable
        />
      )}
    </div>
  );
};
