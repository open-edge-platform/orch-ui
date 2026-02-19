/*
 * SPDX-FileCopyrightText: (C) 2026 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Modal, UploadButton } from "@orch-ui/components";
import {
  Button,
  ButtonGroup,
  FieldLabel,
  TextField,
} from "@spark-design/react";
import {
  ButtonGroupAlignment,
  ButtonSize,
  ButtonVariant,
  FieldLabelSize,
  InputSize,
} from "@spark-design/tokens";
import { ChangeEvent, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { DomainProfileConfig } from "../DomainProfileTable/DomainProfileTable";
import "./CreateEditDomainProfile.scss";

const dataCy = "createEditDomain";

interface DomainProfileFormInputs {
  domainName: string;
  domainSuffix: string;
  certificatePassword: string;
}

export interface CreateEditDomainProfileProps {
  isOpen: boolean;
  onCreateEdit?: (domainName: string) => void;
  onClose: () => void;
  onError?: (err: string) => void;
  isDimissable: boolean;
  editDomain?: DomainProfileConfig;
}

export const CreateEditDomainProfile = ({
  isOpen,
  onCreateEdit,
  onClose,
  onError,
  isDimissable,
  editDomain,
}: CreateEditDomainProfileProps) => {
  const cy = { "data-cy": dataCy };

  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const [domainNameInput, setDomainNameInput] = useState<string>(
    editDomain?.domainName ?? "",
  );
  const [domainSuffixInput, setDomainSuffixInput] = useState<string>(
    editDomain?.domainSuffix ?? "",
  );
  const [certificatePasswordInput, setCertificatePasswordInput] =
    useState<string>("");

  const closeAndReset = () => {
    onClose();
    setDomainNameInput("");
    setDomainSuffixInput("");
    setCertificatePasswordInput("");
    setCertificateFile(null);
  };

  const {
    control,
    handleSubmit,
    unregister,
    formState: { errors, isValid },
  } = useForm<DomainProfileFormInputs>({
    mode: "all",
    values: {
      domainName: domainNameInput,
      domainSuffix: domainSuffixInput,
      certificatePassword: certificatePasswordInput,
    },
  });

  useEffect(() => {
    unregister();
  }, [open]);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCertificateFile(file);
    }
  };

  const handleCreateEditSubmit = () => {
    // TODO: Replace with actual API call
    console.log("Submitting domain configuration:", {
      domainName: domainNameInput,
      domainSuffix: domainSuffixInput,
      certificateFile,
      certificatePassword: certificatePasswordInput,
    });

    closeAndReset();
    if (onCreateEdit) onCreateEdit(domainNameInput);
  };

  const isEditMode = !!editDomain;
  const requiresCertificate = !isEditMode;

  return (
    <div {...cy} className="create-edit-domain">
      <Modal
        open={isOpen}
        onRequestClose={closeAndReset}
        modalHeading={`${isEditMode ? "Edit" : "Create"} Domain Configuration`}
        passiveModal
        isDimissable={isDimissable}
      >
        <form onSubmit={handleSubmit(handleCreateEditSubmit)}>
          <div className="domain-field-container">
            <FieldLabel size={FieldLabelSize.Large}>Domain Name *</FieldLabel>
            <Controller
              name="domainName"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  data-cy="domainName"
                  placeholder="Enter domain name"
                  onInput={(e) => setDomainNameInput(e.currentTarget.value)}
                  validationState={errors.domainName ? "invalid" : "valid"}
                  errorMessage={
                    errors.domainName ? "Domain name is required" : ""
                  }
                  size={InputSize.Large}
                  isRequired
                  isDisabled={isEditMode}
                />
              )}
            />
          </div>

          <div className="domain-field-container">
            <FieldLabel size={FieldLabelSize.Large}>Domain Suffix *</FieldLabel>
            <Controller
              name="domainSuffix"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  data-cy="domainSuffix"
                  placeholder="e.g., example.com"
                  onInput={(e) => setDomainSuffixInput(e.currentTarget.value)}
                  validationState={errors.domainSuffix ? "invalid" : "valid"}
                  errorMessage={
                    errors.domainSuffix ? "Domain suffix is required" : ""
                  }
                  size={InputSize.Large}
                  isRequired
                />
              )}
            />
          </div>

          <div className="domain-field-container">
            <FieldLabel size={FieldLabelSize.Large}>
              Certificate File {requiresCertificate && "*"}
            </FieldLabel>
            <div className="domain-upload-section">
              <UploadButton
                text={
                  isEditMode ? "Upload New Certificate" : "Upload Certificate"
                }
                accept=".pem,.crt,.cer,.pfx,.p12"
                onChange={handleFileUpload}
                multiple={false}
                type="file"
                dataCy="certificateUpload"
              />
              {certificateFile && (
                <div className="domain-file-info" data-cy="certificateFileName">
                  <span>Selected: {certificateFile.name}</span>
                </div>
              )}
              {isEditMode &&
                !certificateFile &&
                editDomain?.certificateFileName && (
                  <div
                    className="domain-file-info"
                    data-cy="existingCertificate"
                  >
                    <span>Current: {editDomain.certificateFileName}</span>
                  </div>
                )}
            </div>
          </div>

          <div className="domain-field-container">
            <FieldLabel size={FieldLabelSize.Large}>
              Certificate Password {requiresCertificate && "*"}
            </FieldLabel>
            <Controller
              name="certificatePassword"
              control={control}
              rules={{
                required: requiresCertificate,
                minLength: 8,
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  data-cy="certificatePassword"
                  placeholder={
                    isEditMode
                      ? "Enter new certificate password (leave empty to keep existing)"
                      : "Enter certificate password"
                  }
                  onInput={(e) =>
                    setCertificatePasswordInput(e.currentTarget.value)
                  }
                  validationState={
                    errors.certificatePassword ? "invalid" : "valid"
                  }
                  errorMessage={
                    errors.certificatePassword
                      ? "Password is required (minimum 8 characters)"
                      : ""
                  }
                  size={InputSize.Large}
                  isRequired={requiresCertificate}
                />
              )}
            />
          </div>

          <ButtonGroup align={ButtonGroupAlignment.Start}>
            <Button
              data-cy="submitDomain"
              type="submit"
              isDisabled={!isValid || (requiresCertificate && !certificateFile)}
              size={ButtonSize.Medium}
              variant={ButtonVariant.Action}
            >
              {isEditMode ? "Update" : "Create"}
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
