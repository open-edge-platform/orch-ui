/*
 * SPDX-FileCopyrightText: (C) 2026 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { rps } from "@orch-ui/apis";
import { Modal, UploadButton } from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
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
import "./CreateEditDomainProfile.scss";
const dataCy = "createEditDomain";

interface DomainProfileFormInputs {
  profileName: string;
  domainSuffix: string;
  certificatePassword: string;
}

export interface CreateEditDomainProfileProps {
  isOpen: boolean;
  onCreateEdit?: (domainName: string) => void;
  onClose: () => void;
  onError?: (err: string) => void;
  isDimissable: boolean;
  editDomain?: rps.DomainResponse;
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

  const closeAndReset = () => {
    onClose();
    reset();
    setCertificateFile(null);
  };

  const {
    control,
    handleSubmit,
    unregister,
    reset,
    getValues,
    formState: { errors, isValid },
  } = useForm<DomainProfileFormInputs>({
    mode: "all",
    defaultValues: {
      profileName: editDomain?.profileName ?? "",
      domainSuffix: editDomain?.domainSuffix ?? "",
      certificatePassword: "",
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

  const [createDomain, { isLoading: isCreating }] =
    rps.useCreateDomainMutation();

  const [updateDomainSuffix, { isLoading: isUpdating }] =
    rps.useUpdateDomainSuffixMutation();

  const isEditMode = !!editDomain;

  const handleCreateEditSubmit = async () => {
    if (!SharedStorage.project?.name) return;
    const { profileName, domainSuffix, certificatePassword } = getValues();
    console.log("GET VALUES:", getValues());
    try {
      let provisioningCert = "";
      if (certificateFile) {
        const buffer = await certificateFile.arrayBuffer();
        provisioningCert = btoa(String.fromCharCode(...new Uint8Array(buffer)));
      }

      if (isEditMode) {
        updateDomainSuffix({
          projectName: SharedStorage.project.name,
          domainPatch: {
            profileName,
            domainSuffix,
            provisioningCert,
            provisioningCertPassword: certificatePassword,
            provisioningCertStorageFormat: "string",
            version: editDomain!.version,
          },
        }).unwrap();
      } else {
        await createDomain({
          projectName: SharedStorage.project.name,
          domainPost: {
            profileName,
            domainSuffix,
            provisioningCert,
            provisioningCertPassword: certificatePassword,
            provisioningCertStorageFormat: "string",
          },
        }).unwrap();
      }
      closeAndReset();
      if (onCreateEdit) onCreateEdit(profileName);
    } catch (err: any) {
      if (onError) onError(err?.data?.message ?? err?.error ?? "Unknown error");
    }
  };

  return (
    <div {...cy} className="create-edit-domain">
      <Modal
        open={isOpen}
        onRequestClose={closeAndReset}
        modalHeading={`${isEditMode ? "Edit" : "Create"} Domain Profile Configuration`}
        passiveModal
        isDimissable={isDimissable}
      >
        <form onSubmit={handleSubmit(handleCreateEditSubmit)}>
          <div className="domain-field-container">
            <FieldLabel size={FieldLabelSize.Large}>Domain Name *</FieldLabel>
            <Controller
              name="profileName"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  data-cy="domainName"
                  placeholder="Enter domain name"
                  validationState={errors.profileName ? "invalid" : "valid"}
                  errorMessage={
                    errors.profileName ? "Domain name is required" : ""
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
              Certificate File *
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
            </div>
          </div>

          <div className="domain-field-container">
            <FieldLabel size={FieldLabelSize.Large}>
              Certificate Password *
            </FieldLabel>
            <Controller
              name="certificatePassword"
              control={control}
              rules={{
                required: true,
                minLength: 8,
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  data-cy="certificatePassword"
                  placeholder="Enter certificate password"
                  validationState={
                    errors.certificatePassword ? "invalid" : "valid"
                  }
                  errorMessage={
                    errors.certificatePassword
                      ? "Password is required (minimum 8 characters)"
                      : ""
                  }
                  size={InputSize.Large}
                  isRequired
                />
              )}
            />
          </div>

          <ButtonGroup align={ButtonGroupAlignment.Start}>
            <Button
              data-cy="submitDomain"
              type="submit"
              isDisabled={!isValid || !certificateFile || isCreating}
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
