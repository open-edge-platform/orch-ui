/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { tm } from "@orch-ui/apis";
import { MessageBannerAlertState, Modal } from "@orch-ui/components";
import { parseError, ProjectModalInput, toApiName } from "@orch-ui/utils";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import {
  Button,
  ButtonGroup,
  FieldLabel,
  Icon,
  MessageBanner,
  TextField,
} from "@spark-design/react";
import {
  ButtonGroupAlignment,
  ButtonSize,
  ButtonVariant,
  InputSize,
} from "@spark-design/tokens";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import "./CreateEditProject.scss";

const dataCy = "createEditProject";

export interface CreateEditProjectProps {
  isOpen: boolean;
  onCreateEdit?: (newProjectname: string) => void;
  onClose: () => void;
  onError?: (err: string) => void;
  isDimissable: boolean;
}

export const CreateEditProject = ({
  isOpen,
  onCreateEdit,
  onClose,
  onError,
  isDimissable,
}: CreateEditProjectProps) => {
  const cy = { "data-cy": dataCy };

  const { usePutV1ProjectsProjectProjectMutation: usePutProject } = tm;

  const [createProject] = usePutProject();
  const [projectNameInput, setProjectNameInput] = useState<string>("");
  const [projectDescriptionInput, setProjectDescriptionInput] =
    useState<string>("");

  const closeAndReset = () => {
    onClose();
    setProjectNameInput("");
    setProjectDescriptionInput("");
  };

  const {
    control,
    handleSubmit,
    unregister,
    formState: { errors, isValid },
  } = useForm<ProjectModalInput>({
    mode: "all",
    values: { nameInput: projectNameInput },
  });

  useEffect(() => {
    /*
     * Unregisters form fields when dialog's open state changes.
     * this will reset values and errors in the form when dialog closes
     */
    unregister();
  }, [open]);

  /* Method to handle submit: create project */
  const handleCreateSubmit = () => {
    const p = createProject({
      "project.Project": toApiName(projectNameInput),
      projectProjectPost: {
        description: projectDescriptionInput || projectNameInput,
      },
    });

    if (p) {
      p.then((res) => {
        if ((res as { error: FetchBaseQueryError | SerializedError }).error) {
          throw (res as { error: FetchBaseQueryError | SerializedError }).error;
        }
        closeAndReset();
        if (onCreateEdit) onCreateEdit(projectNameInput);
      }).catch((err) => onError && onError(parseError(err).data));
    }
  };

  return (
    <div {...cy} className="create-edit-project">
      <Modal
        open={isOpen}
        onRequestClose={closeAndReset}
        modalHeading="Create New Project"
        passiveModal
        isDimissable={isDimissable}
      >
        <form onSubmit={handleSubmit(handleCreateSubmit)}>
          <div>
            <MessageBanner
              showIcon
              icon={<Icon icon="information-circle" />}
              messageBody="You will not be automatically assigned to the new project. Once the project is created, go to Keycloak to assign users."
              variant={MessageBannerAlertState.Info}
              outlined
            />
          </div>
          <div className="project-field-container">
            <FieldLabel data-cy="projectNameLabel">Project Name *</FieldLabel>
            <Controller
              name="nameInput"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="name"
                  data-cy="projectName"
                  placeholder="Enter new project name"
                  onInput={(e) => setProjectNameInput(e.currentTarget.value)}
                  validationState={
                    errors.nameInput !== undefined ? "invalid" : "valid"
                  }
                  errorMessage={
                    errors.nameInput !== undefined
                      ? "Project name is required"
                      : ""
                  }
                  size={InputSize.Large}
                  isRequired
                />
              )}
            />
          </div>
          <div className="project-field-container">
            <FieldLabel data-cy="projectDescriptionLabel">
              Project Description (optional)
            </FieldLabel>
            <TextField
              className="description"
              data-cy="projectDescription"
              placeholder="Enter project description (defaults to project name)"
              value={projectDescriptionInput}
              onInput={(e) => setProjectDescriptionInput(e.currentTarget.value)}
              size={InputSize.Large}
            />
          </div>
          <ButtonGroup align={ButtonGroupAlignment.Start}>
            <Button
              data-cy="submitProject"
              type="submit"
              isDisabled={!isValid}
              size={ButtonSize.Medium}
              variant={ButtonVariant.Action}
            >
              Create
            </Button>
            {isDimissable && (
              <Button
                data-cy="cancel"
                size={ButtonSize.Medium}
                onPress={closeAndReset}
                variant={ButtonVariant.Secondary}
              >
                Cancel
              </Button>
            )}
          </ButtonGroup>
        </form>
      </Modal>
    </div>
  );
};
