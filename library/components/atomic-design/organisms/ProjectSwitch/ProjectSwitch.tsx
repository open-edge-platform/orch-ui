/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
import { tm } from "@orch-ui/apis";
import {
  API_INTERVAL,
  hasRole,
  InternalError,
  Role,
  RuntimeConfig,
  SharedStorage,
  StorageItems,
} from "@orch-ui/utils";
import { Icon, MessageBanner } from "@spark-design/react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ApiError } from "../../atoms/ApiError/ApiError";
import { Modal } from "../../atoms/Modal/Modal";
import { SquareSpinner } from "../../atoms/SquareSpinner/SquareSpinner";
import { RBACWrapper } from "../../molecules/RBACWrapper/RBACWrapper";
import "./ProjectSwitch.scss";

export type Project = tm.ProjectProjectGet & { name?: string };

const dataCy = "projectSwitch";
export interface ProjectSwitchProps {
  isTokenAvailable?: boolean;
  padding: string;
  topMargin: string;
}

export const ProjectSwitch = ({
  isTokenAvailable,
  padding,
  topMargin,
}: ProjectSwitchProps) => {
  const cy = { "data-cy": dataCy };
  const className = "project-switch";

  let projectHomeLink = "/admin/projects";
  if (
    // If other mfes are disabled other than ADMIN, this is a standalone ADMIN
    !RuntimeConfig.isEnabled("APP_ORCH") &&
    !RuntimeConfig.isEnabled("CLUSTER_ORCH") &&
    !RuntimeConfig.isEnabled("FM")
  ) {
    projectHomeLink = "/projects";
  }

  const projectAdminRoles = [
    Role.PROJECT_READ,
    Role.PROJECT_WRITE,
    Role.PROJECT_UPDATE,
    Role.PROJECT_DELETE,
  ];

  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const [showProjects, setShowProjects] = useState<boolean>(false);
  const [newProjectToSwitch, setNewProjectToSwitch] = useState<
    Project | undefined
  >();
  const [selectedProject, setSelectedProject] = useState<Project | undefined>();

  /** update selectedProject state and update sharedStorage for activeProject. */
  const updateSelectedProjectState = (project: Project) => {
    setSelectedProject(project);
    if (project.name && project.status?.projectStatus?.uID) {
      SharedStorage.project = {
        name: project.name,
        uID: project.status?.projectStatus?.uID,
      };
    }
  };

  const onProjectSwitch = () => {
    if (newProjectToSwitch) updateSelectedProjectState(newProjectToSwitch);
    setNewProjectToSwitch(undefined);
    setShowProjects(false);
    navigate("/");
  };
  // Get List of all projects from the user
  const {
    data: projectSwitchOptions,
    isSuccess,
    isLoading,
    isError,
    error,
  } = tm.useListV1ProjectsQuery(
    { "member-role": true },
    {
      // Poll if we are showing projects or if no project is selected
      ...(!showProjects || !selectedProject
        ? { pollingInterval: API_INTERVAL }
        : {}),
      skip: !isTokenAvailable,
    },
  );

  useEffect(() => {
    // Decide active project
    if (isSuccess) {
      const activeProject = projectSwitchOptions.find(
        (option) =>
          option.status?.projectStatus?.uID === SharedStorage.project?.uID,
      );

      if (activeProject) {
        setSelectedProject(activeProject);
      } else if (!activeProject && projectSwitchOptions.length > 0) {
        updateSelectedProjectState(projectSwitchOptions[0]);
      } else {
        SharedStorage.removeStorageItem(StorageItems.PROJECT);
        // If there are no projects navigate to project page
        navigate(projectHomeLink);
      }
    }

    if (isError) {
      const err = error as InternalError;
      // NOTE the /v1/projects?member-role=true returns 401 if the user is not associated with any project
      if (err?.status === 401) {
        SharedStorage.removeStorageItem(StorageItems.PROJECT);
        navigate(projectHomeLink);
      }
    }

    // If the polling detects project data, then update the selected project
  }, [isLoading]);

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShowProjects(false);
      }
    });
  }, []);

  const openProjectSwitchModal = (project: Project) => {
    if (project?.name !== selectedProject?.name) {
      setNewProjectToSwitch(project);
    }
  };

  const closeProjectSwitchModal = () => {
    setNewProjectToSwitch(undefined);
  };

  const getProjectList = () => {
    if (isError) {
      return <ApiError error={error} />;
    } else if (isLoading) {
      return <SquareSpinner />;
    } else {
      return (
        <>
          {projectSwitchOptions && projectSwitchOptions.length > 0 && (
            <span className={`${className}__header`}>Projects</span>
          )}
          <ul className={`${className}__list`} data-cy="projectList">
            {projectSwitchOptions &&
              projectSwitchOptions.map((option: Project) => {
                const liClassname = `${className}__list-item ${
                  option.name === selectedProject?.name
                    ? `${className}__list-item-selected`
                    : null
                }`;

                const iconClassname = `${className}__icon ${
                  option.name === selectedProject?.name
                    ? `${className}__icon-selected`
                    : null
                }`;

                return (
                  <li
                    className={`${liClassname} ${className}__project-options`}
                    onClick={() => openProjectSwitchModal(option)}
                    key={option.name}
                  >
                    <Icon icon="grid" className={iconClassname} />
                    {option.spec?.description ?? option.name}
                  </li>
                );
              })}
            {projectSwitchOptions && projectSwitchOptions.length > 0 && (
              <RBACWrapper showTo={projectAdminRoles}>
                <li className={`${className}__divider-li`}>
                  <hr className={`${className}__divider`} />
                </li>
              </RBACWrapper>
            )}
            <RBACWrapper showTo={projectAdminRoles}>
              <li
                className={`${className}__list-item ${className}__see-all-projects`}
                data-cy="seeAllProjects"
              >
                <Icon
                  icon="grid"
                  artworkStyle="solid"
                  className={`${className}__icon`}
                />
                <Link to={projectHomeLink}>Manage Projects</Link>
              </li>
            </RBACWrapper>
          </ul>
        </>
      );
    }
  };

  const name = selectedProject?.spec?.description ?? selectedProject?.name;
  const prefix = hasRole(projectAdminRoles) ? "Manage" : "Select";
  return (
    <div {...cy}>
      <div
        className={className}
        onClick={() => isTokenAvailable && setShowProjects(true)}
      >
        {isTokenAvailable && (
          <div
            className={`${className}__trigger`}
            style={{ padding }}
            data-cy="projectSwitchText"
          >
            {name ?? `${prefix} Projects`}{" "}
            <Icon icon="chevron-down" className={`${className}__expand-icon`} />
          </div>
        )}

        {showProjects && (
          <div
            className={`${className}__container`}
            ref={ref}
            style={{ top: topMargin }}
          >
            {getProjectList()}
          </div>
        )}
      </div>
      {newProjectToSwitch && (
        <div data-cy="projectSwitchModal">
          <Modal
            open
            modalHeading={"Project switching"}
            primaryButtonText="Continue"
            onRequestSubmit={() => onProjectSwitch()}
            secondaryButtonText="Cancel"
            onSecondarySubmit={() => closeProjectSwitchModal()}
            onRequestClose={() => closeProjectSwitchModal()}
            buttonPlacement="left"
          >
            <div data-cy="projectSwitchModalText">
              <MessageBanner
                showIcon
                messageBody="Switching projects will log you out of the current project. Any unsaved information will be lost."
                variant="warning"
              />
              <p>
                Continue to switch projects. Cancel to save your work before
                switching projects.
              </p>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};
