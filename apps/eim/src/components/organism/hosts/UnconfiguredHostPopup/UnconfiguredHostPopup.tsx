/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ConfirmationDialog, Popup, PopupOption } from "@orch-ui/components";
import { checkAuthAndRole, Role } from "@orch-ui/utils";
import { Icon } from "@spark-design/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { eim } from "@orch-ui/apis";
import { ButtonVariant } from "@spark-design/tokens";
import { reset, setHosts } from "../../../../store/configureHost";
import { useAppDispatch } from "../../../../store/hooks";
import { deleteHostInstanceFn } from "../../../../store/utils";
import DeauthorizeHostStandalone from "../DeauthorizeHostStandalone/DeauthorizeHostStandalone";

export interface UnconfiguredHostPopupProps {
  host: eim.HostRead;
  showViewDetailsOption?: boolean;
  basePath?: string;
  /** To render a custom click component for which onClick will show the popup. By default show ellipsis.*/
  jsx?: React.ReactNode;
}

/** This will show all available host actions within popup menu */
const UnconfiguredHostPopup = ({
  host,
  basePath = "",
  showViewDetailsOption = true,
  jsx = <Icon artworkStyle="light" icon="ellipsis-v" />,
}: UnconfiguredHostPopupProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] =
    useState<boolean>(false);

  const [deauthorizeConfirmationOpen, setDeauthorizeConfirmationOpen] =
    useState<boolean>(false);

  /** Unconfigured Host action decision in popup */
  const getPopupOptions = (host: eim.HostRead): PopupOption[] => {
    const opts: PopupOption[] = [];

    if (showViewDetailsOption) {
      opts.push({
        displayText: "View Details",
        onSelect: () => {
          navigate(`${basePath}../unconfigured-host/${host.resourceId}`, {
            relative: "path",
          });
        },
        disable: false,
      });
    }

    opts.push(
      {
        displayText: "Configure",
        disable: !checkAuthAndRole([Role.INFRA_MANAGER_WRITE]),
        onSelect: () => {
          // reset the HostConfig form
          dispatch(reset());
          // store the current Host in Redux, so we don't have to fetch it again
          dispatch(setHosts({ hosts: [host] }));

          const path = `${basePath}../unconfigured-host/configure`;
          navigate(path, {
            relative: "path",
          });
        },
      },
      {
        displayText: "Deauthorize",
        disable: !checkAuthAndRole([Role.INFRA_MANAGER_WRITE]),
        onSelect: () => {
          setDeauthorizeConfirmationOpen(true);
        },
      },
      {
        displayText: "Delete",
        disable: !checkAuthAndRole([Role.INFRA_MANAGER_WRITE]),
        onSelect: () => {
          setDeleteConfirmationOpen(true);
        },
      },
    );

    return opts;
  };

  return (
    <>
      <Popup
        dataCy="unconfiguredHostPopup"
        jsx={jsx}
        options={getPopupOptions(host)}
      />
      {deleteConfirmationOpen && (
        <ConfirmationDialog
          showTriggerButton={false}
          title="Confirm Host Deletion"
          subTitle={`Are you sure you want to delete Host "${
            host.name || host.resourceId
          }"?`}
          content="This will permanently remove the host from the system and cannot be undone."
          isOpen={deleteConfirmationOpen}
          buttonPlacement="left-reverse"
          confirmCb={() => {
            deleteHostInstanceFn(dispatch, host).then(() => {
              const hostTablePageLink = "unconfigured-hosts";
              navigate(`${basePath}../${hostTablePageLink}`, {
                relative: "path",
              });
            });
            setDeleteConfirmationOpen(false);
          }}
          confirmBtnText="Delete"
          confirmBtnVariant={ButtonVariant.Alert}
          cancelCb={() => setDeleteConfirmationOpen(false)}
        />
      )}

      {deauthorizeConfirmationOpen && host.resourceId && (
        <DeauthorizeHostStandalone
          basePath={basePath}
          hostId={host.resourceId}
          hostName={host.name}
          setDeauthorizeConfirmationOpen={setDeauthorizeConfirmationOpen}
          isDeauthConfirmationOpen={deauthorizeConfirmationOpen}
        />
      )}
    </>
  );
};

export default UnconfiguredHostPopup;
