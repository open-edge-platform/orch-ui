/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { tm } from "@orch-ui/apis";
import {
  ApiError,
  columnApiNameToDisplayName,
  Empty,
  RbacRibbonButton,
  SortDirection,
  SquareSpinner,
  Status,
  StatusIcon,
  Table,
  TableColumn,
} from "@orch-ui/components";
import {
  AdminProject,
  API_INTERVAL,
  hasRole as hasRoleDefault,
  Role,
  SharedStorage,
} from "@orch-ui/utils";
import { Badge, Button, Icon, Text, Tooltip } from "@spark-design/react";
import {
  ButtonSize,
  ButtonVariant,
  MessageBannerAlertState,
  TextSize,
  TooltipPlacement,
} from "@spark-design/tokens";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { showMessageNotification } from "../../../store/notifications";
import { CreateEditProject } from "../../organisms/CreateEditProject/CreateEditProject";
import DeleteProjectDialog from "../DeleteProjectDialog/DeleteProjectDialog";
import ProjectPopup from "../ProjectPopup/ProjectPopup";
import "./ProjectsTable.scss";

export const dataCy = "projectsTable";

export type ProjectModalType = "create" | "delete" | "rename";
interface ProjectModalState {
  type?: ProjectModalType;
  forProject?: AdminProject;
}

interface ProjectsTableProps {
  // these props are used for testing purposes
  hasRole?: (roles: string[]) => boolean;
}

const ProjectsTable = ({ hasRole = hasRoleDefault }: ProjectsTableProps) => {
  const cy = { "data-cy": dataCy };

  const { useListV1ProjectsQuery: listProjects } = tm;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  // TODO: convert this to PROJECT_READ
  // const hasPermissions = true; // Is user able to do project Create/Rename/Delete?

  const [projectModalState, setProjectModalState] = useState<
    ProjectModalState | undefined
  >();

  const onCloseModal = () => {
    const isCreate = projectModalState?.type === "create";
    setProjectModalState(undefined);

    // TODO: Table doesnot render new row addition,
    // if the table update happens from same page! Ex: via Modal.
    if (isCreate) {
      navigate(0);
    }
  };
  const validateMember = (project: AdminProject) => {
    const text = memberProjects?.find((mProj) => mProj?.name === project.name)
      ? "Yes"
      : "No";

    return (
      <Tooltip
        content="To add or remove project members, go to your identity provider"
        size="m"
        placement={TooltipPlacement.LEFT}
      >
        <div className="projects-table__tooltip-content">
          <Text size={TextSize.Small}>{text}</Text>
          <Button iconOnly size="m" variant="ghost">
            <Icon altText="Information" icon="information-circle" />
          </Button>
        </div>
      </Tooltip>
    );
  };
  const columns: TableColumn<AdminProject>[] = [
    {
      Header: "Project Name",
      accessor: (project) => project.spec?.description ?? project.name,
      Cell: (table) => {
        const activeProjectName = SharedStorage.project?.name;
        const name =
          table.row.original.spec?.description ?? table.row.original.name;
        return (
          <>
            <Text className="project-name">{name}</Text>
            {activeProjectName &&
              table.row.original.name === activeProjectName && (
                <Badge variant="success" shape="square" text="Active" />
              )}
          </>
        );
      },
    },
    {
      Header: "Project Id",
      accessor: (project) => project.status?.projectStatus?.uID ?? "",
    },
    {
      Header: "Status",
      Cell: (table: { row: { original: AdminProject } }) => {
        const project = table.row.original;
        let status: Status;

        switch (project.status?.projectStatus?.statusIndicator) {
          case "STATUS_INDICATION_IDLE":
            status = Status.Ready;
            break;
          case "STATUS_INDICATION_IN_PROGRESS":
            status = Status.NotReady;
            break;
          case "STATUS_INDICATION_ERROR":
            status = Status.Error;
            break;
          default:
            status = Status.Unknown;
        }

        return (
          <StatusIcon
            status={status}
            text={project.status?.projectStatus?.message}
          />
        );
      },
    },
    {
      Header: "Member",
      accessor: (project) => validateMember(project),
    },
    {
      Header: "Actions",
      Cell: (table: { row: { original: AdminProject } }) => (
        <ProjectPopup
          jsx={<Icon artworkStyle="light" icon="ellipsis-v" />}
          project={table.row.original}
          hasRole={hasRole}
          onRename={(selectedProject) => {
            setProjectModalState({
              type: "rename",
              forProject: selectedProject,
            });
          }}
          onDelete={(selectedProject) => {
            setProjectModalState({
              type: "delete",
              forProject: selectedProject,
            });
          }}
        />
      ),
    },
  ];

  const sortColumn =
    columnApiNameToDisplayName(columns, searchParams.get("column")) ??
    "Project Name";
  const sortDirection = (searchParams.get("direction") ??
    "asc") as SortDirection;
  const searchTerm = searchParams.get("searchTerm") ?? undefined;

  const { data: memberProjects } = listProjects(
    { "member-role": true },
    {
      // If Modal is open i.e if the modal state is defined then skip polling
      ...(!projectModalState ? { pollingInterval: API_INTERVAL } : {}),
    },
  );
  const {
    data: projects,
    isSuccess,
    isError,
    isLoading,
    error,
  } = listProjects(
    {},
    {
      // If Modal is open i.e if the modal state is defined then skip polling
      ...(!projectModalState ? { pollingInterval: API_INTERVAL } : {}),
    },
  );

  const data = {
    projects,
    totalElements: projects?.length ?? 0,
  };

  const getProjectTableComponent = () => {
    if (
      !hasRole([
        Role.PROJECT_READ,
        Role.PROJECT_WRITE,
        Role.PROJECT_UPDATE,
        Role.PROJECT_DELETE,
      ])
    ) {
      // if the user can't see the page, return and empty screen
      return;
    }

    if (isError) {
      return <ApiError error={error} />;
    } else if (isLoading) {
      return <SquareSpinner />;
    } else if (isSuccess && data.totalElements === 0) {
      return (
        <Empty
          title="No projects are available here."
          icon="information-circle"
          actions={[
            {
              name: "Create Project",
              disable: !hasRole([Role.PROJECT_WRITE]),
              action: () => {
                setProjectModalState({
                  type: "create",
                });
              },
            },
          ]}
        />
      );
    } else {
      return (
        <Table
          key="projectTable"
          dataCy="projectsTableList"
          columns={columns}
          data={data.projects}
          initialSort={{
            column: sortColumn,
            direction: sortDirection,
          }}
          // Sorting
          sortColumns={[0]}
          // Searching
          canSearch
          searchTerm={searchTerm}
          onSearch={() => {
            // searchTerm: string
            /* TODO: search actions */
          }}
          actionsJsx={
            <RbacRibbonButton
              name="createProjectBtn"
              size={ButtonSize.Large}
              variant={ButtonVariant.Action}
              text="Create Project"
              onPress={() =>
                setProjectModalState({
                  type: "create",
                })
              }
              disabled={!hasRole([Role.PROJECT_WRITE])}
              tooltip=""
              tooltipIcon="lock"
            />
          }
        />
      );
    }
  };

  const getProjectName = (project?: AdminProject) => {
    if (project) {
      return project.spec?.description ?? project.name;
    }
    return "";
  };

  return (
    <div {...cy} className="projects-table">
      {getProjectTableComponent()}

      {(projectModalState?.type === "create" ||
        projectModalState?.type === "rename") && (
        <CreateEditProject
          isOpen
          existingProject={projectModalState?.forProject}
          onClose={onCloseModal}
          onCreateEdit={(newProjectname) => {
            dispatch(
              showMessageNotification({
                messageTitle: "Success",
                messageBody: `Successfully ${projectModalState.type}d a project ${getProjectName(projectModalState?.forProject)}${projectModalState.type === "rename" ? ` to ${newProjectname}` : ""}`,
                variant: MessageBannerAlertState.Success,
              }),
            );
            setProjectModalState(undefined);
          }}
          onError={(errorMessage) => {
            dispatch(
              showMessageNotification({
                messageTitle: "Error",
                messageBody: `Error ${projectModalState.type === "create" ? "creating" : "renaming"} project ${getProjectName(projectModalState?.forProject)}. ${errorMessage}`,
                variant: MessageBannerAlertState.Error,
              }),
            );
          }}
          isDimissable
        />
      )}
      {projectModalState?.type === "delete" && projectModalState.forProject && (
        <DeleteProjectDialog
          project={projectModalState.forProject}
          onCancel={onCloseModal}
          onDelete={() => {
            dispatch(
              showMessageNotification({
                messageTitle: "Deletion in process",
                messageBody: `Project ${getProjectName(projectModalState?.forProject)} is being deleted.`,
                variant: MessageBannerAlertState.Success,
              }),
            );
            setProjectModalState(undefined);
          }}
          onError={(errorMessage) => {
            dispatch(
              showMessageNotification({
                messageTitle: "Error",
                messageBody: `Error in deleting project ${getProjectName(projectModalState?.forProject)}. ${errorMessage}`,
                variant: MessageBannerAlertState.Error,
              }),
            );
            setProjectModalState(undefined);
          }}
        />
      )}
    </div>
  );
};

export default ProjectsTable;
