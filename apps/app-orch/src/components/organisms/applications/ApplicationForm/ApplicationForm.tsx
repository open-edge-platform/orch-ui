/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { Flex, Textarea } from "@orch-ui/components";
import { Text, TextField } from "@spark-design/react";
import { InputSize } from "@spark-design/tokens";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  selectApplication,
  setDescription,
  setDisplayName,
  setVersion,
} from "../../../../store/reducers/application";
import { versionPattern } from "../../../../utils/regexPatterns";
import { ApplicationInputs } from "../../../pages/ApplicationCreateEdit/ApplicationCreateEdit";
import "./ApplicationForm.scss";

interface ApplicationFormProps {
  control: Control<ApplicationInputs, string>;
  errors: FieldErrors<ApplicationInputs>;
}

const ApplicationForm = ({ control, errors }: ApplicationFormProps) => {
  const { displayName, description, version } =
    useAppSelector(selectApplication);
  const location = useLocation();
  const isCreatePage = location.pathname.includes("applications/add");
  const dispatch = useAppDispatch();

  return (
    <form className="application-form" data-cy="appForm">
      <Text size="l">Application Details</Text>
      <div />
      <div className="application-source-text">
        <Flex cols={[6, 6]}>
          <Controller
            name="displayName"
            control={control}
            rules={{
              required: isCreatePage,
              maxLength: 63,
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Application Name"
                value={displayName}
                onInput={(e) => {
                  dispatch(setDisplayName(e.currentTarget.value));
                }}
                errorMessage={
                  errors.displayName?.type === "required"
                    ? "Name is required"
                    : "Name can't be more than 63 characters"
                }
                validationState={
                  errors.displayName &&
                  Object.keys(errors.displayName).length > 0
                    ? "invalid"
                    : "valid"
                }
                isDisabled={!isCreatePage}
                isRequired={true}
                size={InputSize.Large}
                data-cy="nameInput"
              />
            )}
          />
          <div className="application-form-content">
            <Controller
              name="version"
              control={control}
              rules={{
                required: isCreatePage,
                pattern: versionPattern,
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Version"
                  value={version}
                  onInput={(e) => {
                    dispatch(setVersion(e.currentTarget.value));
                  }}
                  errorMessage={
                    errors.version?.type === "required"
                      ? "Version is required"
                      : "Invalid version (ex. 1.0.0 or v0.1.2)"
                  }
                  validationState={
                    errors.version && Object.keys(errors.version).length > 0
                      ? "invalid"
                      : "valid"
                  }
                  isDisabled={!isCreatePage}
                  isRequired={true}
                  size={InputSize.Large}
                  data-cy="versionInput"
                />
              )}
            />
          </div>
        </Flex>
      </div>

      <div className="application-source-text">
        <Flex cols={[12]}>
          <Textarea
            label="Description"
            placeholder="Write description here"
            value={description}
            onChange={(e) => dispatch(setDescription(e.currentTarget.value))}
            dataCy="descriptionInput"
          />
        </Flex>
      </div>
    </form>
  );
};

export default ApplicationForm;
