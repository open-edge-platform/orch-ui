/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { Popup, PopupOption } from "@orch-ui/components";
import { checkAuthAndRole, Role } from "@orch-ui/utils";
import { Icon } from "@spark-design/react";
import { useNavigate } from "react-router-dom";

const dataCy = "genericHostPopup";

export interface GenericHostPopupProps {
  /** host for which this popup affects upon. */
  host: infra.HostRead;
  /** Additional Popup Options based on the host lifecycle contect */
  additionalPopupOptions?: PopupOption[];
  /**
   * This refers to where the path for links should start from,
   *
   * eg:
   * - In case of a ListView all paths are relative the current ("").
   * - In case of a detail view we need to go back up one level ("../").
   **/
  basePath?: string;
  /**
   * render button subcomponent/custom click component for which onClick will show the popup.
   * By default show ellipsis.
   **/
  jsx?: React.ReactNode;
  /**
   * By default View Details is hidden.
   * If true then show `View Details` else hide.
   * hide is useful in `host details page`.
   **/
  showViewDetailsOption?: boolean;
  /**
   * By default delete option is shown.
   * If true then show `Delete` else hide.
   * hide is useful when showing `Provisioned host with assigned workload/cluster`.
   **/
  showDeleteOption?: boolean;
  /**
   * custom onClickHandler for `View Details` popup option.
   * This will override the redirection to `/host/{host.resourceId}`
   **/
  onViewDetails?: (hostId: string) => void;
  /** custom onClickHandler for `Deauthorize` popup option. Default: no action. **/
  onDeauthorize?: (hostId: string) => void;
  /** custom onClickHandler for `Delete`. Default: no action. **/
  onDelete?: (hostId: string) => void;
}

const GenericHostPopup = ({
  host,
  additionalPopupOptions = [],
  jsx = (
    <Icon artworkStyle="light" icon="ellipsis-v" data-cy="defaultPopupButton" />
  ),
  basePath = "",
  showViewDetailsOption,
  showDeleteOption = true,
  onViewDetails,
  onDeauthorize,
  onDelete,
}: GenericHostPopupProps) => {
  /**
   * Component Note:
   * View Details (default: navigate to `/host/{resourceId}`; else execute onViewDetails)
   * --
   * (Provisioned|Registered|Onboarded) Host specific actions here...
   * --
   * Deauthorize
   * Delete
   */

  const cy = { "data-cy": dataCy };
  const hostId = host.resourceId!;
  const navigate = useNavigate();
  const hasPermission = !checkAuthAndRole([Role.INFRA_MANAGER_WRITE]);

  const popupOptions: PopupOption[] = [];
  if (showViewDetailsOption) {
    popupOptions.push({
      displayText: "View Details",
      onSelect: () => {
        if (onViewDetails) onViewDetails(hostId);
        else {
          navigate(`${basePath}../host/${hostId}`, {
            relative: "path",
          });
        }
      },
    });
  }

  if (additionalPopupOptions.length > 0) {
    popupOptions.push(...additionalPopupOptions);
  }

  // Add additional options
  popupOptions.push({
    displayText: "Deauthorize",
    disable: hasPermission || host.currentState === "HOST_STATE_UNTRUSTED",
    onSelect: () => onDeauthorize && onDeauthorize(hostId),
  });

  if (showDeleteOption) {
    popupOptions.push({
      displayText: "Delete",
      disable: hasPermission,
      onSelect: () => onDelete && onDelete(hostId),
    });
  }

  return (
    <div {...cy} className="generic-host-popup">
      <Popup jsx={jsx} options={popupOptions} />
    </div>
  );
};

export default GenericHostPopup;
