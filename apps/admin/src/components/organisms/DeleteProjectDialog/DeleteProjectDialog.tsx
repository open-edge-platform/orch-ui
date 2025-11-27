/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { tm } from "@orch-ui/apis";
import { Modal } from "@orch-ui/components";
import {
  AdminProject,
  parseError,
  ProjectModalInput,
  SharedStorage,
  StorageItems,
} from "@orch-ui/utils";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageBanner, TextField } from "@spark-design/react";
import { ButtonVariant, InputSize, ModalSize } from "@spark-design/tokens";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import "./DeleteProjectDialog.scss";

const dataCy = "deleteProjectDialog";

interface DeleteProjectDialogProps {
  project: AdminProject;
  onCancel: () => void;
  onDelete?: () => void;
  onError?: (err: string) => void;
}

/**
 * This component is only shown when we need a removal of project
 **/
const DeleteProjectDialog = ({
  project,
  onCancel,
  onDelete,
  onError,
}: DeleteProjectDialogProps) => {
  const cy = { "data-cy": dataCy };

  const { useDeleteV1ProjectsProjectProjectMutation: useDeleteProject } = tm;

  const [deleteProjectName, setDeleteProjectName] = useState<string>("");
  const [deleteProject] = useDeleteProject();

  const projectReadableName = project.name;

  const onDeleteProject = () => {
    const projectName = project.name;
    if (!projectName) {
      return;
    }
    deleteProject({
      "project.Project": projectName,
    })
      .then((res) => {
        if ((res as { error: FetchBaseQueryError | SerializedError }).error) {
          throw (res as { error: FetchBaseQueryError | SerializedError }).error;
        }

        // If the project we deleted is the active project then we remove it from storage
        if (SharedStorage.project?.name === projectName) {
          SharedStorage.removeStorageItem(StorageItems.PROJECT);
        }
        if (onDelete) onDelete();
      })
      .catch((err) => {
        if (onError) onError(parseError(err).data);
      });
  };

  const { control: controlDeleteInfo } = useForm<ProjectModalInput>({
    mode: "all",
    values: {
      nameInput: deleteProjectName,
    },
  });

  const deleteDialogContent = (
    <div data-cy="deleteForm" className="delete-form">
      <Controller
        name="nameInput"
        control={controlDeleteInfo}
        rules={{
          required: false,
          maxLength: 2048,
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Please Type in the name of the Project to confirm."
            data-cy="projectName"
            onInput={(e) => {
              setDeleteProjectName(e.currentTarget.value);
            }}
            size={InputSize.Large}
            placeholder={
              projectReadableName ?? "Enter the deleting project name"
            }
            className="text-field-align"
          />
        )}
      />
    </div>
  );

  return (
    <Modal
      modalHeading={`Delete ${projectReadableName || "project"}?`}
      open
      primaryBtnVariant={ButtonVariant.Alert}
      onRequestSubmit={onDeleteProject}
      primaryButtonText="Delete"
      primaryButtonDisabled={
        deleteProjectName === "" || projectReadableName !== deleteProjectName
      }
      secondaryButtonText="Cancel"
      onSecondarySubmit={onCancel}
      onRequestClose={onCancel}
      buttonPlacement="left"
      size={ModalSize.Medium}
    >
      <div {...cy} className="delete-confirmation-dialog">
        <MessageBanner
          size="m"
          variant="warning"
          messageBody="Deleting this project will remove all associated data, including deployments, host information, locations, and metadata."
          showIcon
        />
        <p data-cy="confirmationMessage">
          Are you sure you want to delete{" "}
          {projectReadableName || "this project"}?
        </p>
        {deleteDialogContent}
      </div>
    </Modal>
  );
};

export default DeleteProjectDialog;
