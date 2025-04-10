/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Heading, TextField } from "@spark-design/react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import {
  getCluster,
  updateClusterName,
  updateClusterTemplate,
} from "../../../../../store/reducers/cluster";
import {
  getTemplateName,
  updateTemplateName,
} from "../../../../../store/reducers/templateName";
import {
  getTemplateVersion,
  updateTemplateVersion,
} from "../../../../../store/reducers/templateVersion";
import ClusterTemplatesDropdown from "../../../../atom/ClusterTemplatesDropdown/ClusterTemplatesDropdown";
import ClusterTemplateVersionsDropdown from "../../../../atom/ClusterTemplateVersionsDropdown/ClusterTemplateVersionsDropdown";

const NameAndTemplate = () => {
  const currentCluster = useAppSelector(getCluster);

  const dispatch = useAppDispatch();

  const [selectTemplateName, setSelectTemplateName] = useState<string>("");
  const [selectTemplateVersion, setSelectTemplateVersion] =
    useState<string>("");
  const [valid, setValid] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleNameChange = (name: string) => {
    const regex = "^$|^[a-z0-9][a-z0-9.-]*[a-z0-9]$";
    const regexHandle = new RegExp(regex);
    dispatch(updateClusterName(name));
    if (regexHandle.test(name)) {
      setValid(true);
      setErrorMessage("");
    } else {
      setValid(false);
      setErrorMessage(
        "A valid DNS name is required. can contain only lowercase letters (a-z), numbers (0-9), and hyphens (-), and must start and end with a letter or number, not a hyphen",
      );
    }
  };

  return (
    <div data-cy="NameAndTemplate">
      <Heading semanticLevel={6} className="review-category">
        Enter Cluster Details
      </Heading>

      <TextField
        data-cy="clusterName"
        size="l"
        label="Cluster Name"
        isRequired
        value={currentCluster.name}
        onChange={(name: string) => {
          handleNameChange(name);
        }}
        errorMessage={errorMessage}
        validationState={valid ? "valid" : "invalid"}
      />

      <br />

      <div className="cluster-template-form">
        <ClusterTemplatesDropdown
          clusterTemplateName={useAppSelector(getTemplateName)}
          onSelectionChange={(value: string) => {
            setSelectTemplateName(value);
            dispatch(
              updateClusterTemplate(`${value}-${selectTemplateVersion}`),
            );
            dispatch(updateTemplateName(value));
            dispatch(updateTemplateVersion("Select a Cluster Template"));
          }}
        />

        <ClusterTemplateVersionsDropdown
          clusterTemplateVersion={useAppSelector(getTemplateVersion)}
          templateName={selectTemplateName}
          isDisabled={
            !(currentCluster.template && currentCluster.template.length > 0)
          }
          onSelectionChange={(value: string) => {
            setSelectTemplateVersion(value);
            dispatch(updateClusterTemplate(`${selectTemplateName}-${value}`));
            dispatch(updateTemplateVersion(value));
          }}
        />
      </div>
    </div>
  );
};

export default NameAndTemplate;
