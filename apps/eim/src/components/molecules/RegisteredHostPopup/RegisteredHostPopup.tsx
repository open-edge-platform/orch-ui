/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { MessageBanner, PopupOption } from "@orch-ui/components";
import { checkAuthAndRole, Role } from "@orch-ui/utils";
import { Button, ButtonGroup, Drawer, Icon, Text } from "@spark-design/react";
import { useState } from "react";
import GenericHostPopup, {
  GenericHostPopupProps,
} from "../../atom/GenericHostPopup/GenericHostPopup";
import "./RegisteredHostPopup.scss";

const dataCy = "registeredHostPopup";

export type RegisteredHostPopupProps = Omit<
  GenericHostPopupProps,
  "additionalPopupOptions"
> & {
  onEdit?: (hostId: string) => void;
  onOnboard?: (hostId: string) => void;
};

const RegisteredHostPopup = (props: RegisteredHostPopupProps) => {
  const cy = { "data-cy": dataCy };
  const { host, onEdit, onOnboard } = props;
  const [showErrorDrawer, setShowErrorDrawer] = useState<boolean>(false);

  const registeredHostPopup: PopupOption[] = [];

  if (host.registrationStatusIndicator === "STATUS_INDICATION_ERROR") {
    registeredHostPopup.push({
      displayText: "View Error",
      onSelect: () => setShowErrorDrawer(true),
      disable: false,
    });
  }

  registeredHostPopup.push(
    {
      displayText: "Edit",
      disable: !checkAuthAndRole([Role.INFRA_MANAGER_WRITE]),
      onSelect: () => onEdit && onEdit(host.resourceId!),
    },
    {
      displayText: "Onboard",
      disable: !checkAuthAndRole([Role.INFRA_MANAGER_WRITE]),
      onSelect: () => onOnboard && onOnboard(host.resourceId!),
    },
  );

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
            {host.registrationStatus}
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
    <div {...cy} className="registered-host-popup">
      <GenericHostPopup
        {...props}
        additionalPopupOptions={registeredHostPopup}
      />

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

export default RegisteredHostPopup;
