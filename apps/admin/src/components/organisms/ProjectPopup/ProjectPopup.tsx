/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { Popup, PopupOption } from "@orch-ui/components";
import { AdminProject, hasRole as hasRoleDefault, Role } from "@orch-ui/utils";
import { Icon } from "@spark-design/react";
import React from "react";
import "./ProjectPopup.scss";
interface ProjectPopupProps {
  /** project for which this popup affects upon. */
  project: AdminProject;
  /** render button subcomponent/custom click component for which onClick will show the popup. By default show ellipsis.*/
  jsx?: React.ReactNode;
  onRename?: (project: AdminProject) => void;
  onDelete?: (project: AdminProject) => void;
  // these props are used for testing purposes
  hasRole?: (roles: string[]) => boolean;
}

/** This will show all available project actions within popup menu */
const ProjectPopup = ({
  project,
  jsx = <Icon artworkStyle="light" icon="ellipsis-v" />,
  onRename,
  onDelete,
  hasRole = hasRoleDefault,
}: ProjectPopupProps) => {
  const getPopupActions = (): PopupOption[] => [
    {
      displayText: "Rename",
      onSelect: () => onRename && onRename(project),
      disable:
        !hasRole([Role.PROJECT_WRITE, Role.PROJECT_UPDATE]) ||
        project.status?.projectStatus?.statusIndicator ===
          "STATUS_INDICATION_IN_PROGRESS",
    },
    {
      displayText: "Delete",
      onSelect: () => onDelete && onDelete(project),
      disable: !hasRole([Role.PROJECT_DELETE]),
    },
  ];

  return (
    <div className="project-popup">
      <Popup dataCy="projectPopup" jsx={jsx} options={getPopupActions()} />
    </div>
  );
};

export default ProjectPopup;
