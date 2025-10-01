/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { Flex } from "@orch-ui/components";
import { Dropdown, Item, TextField } from "@spark-design/react";
import { DropdownSize } from "@spark-design/tokens";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import "./CreateOsUpdatePolicy.scss";
const dataCy = "createOsUpdatePolicy";

interface CreateOsUpdatePolicyFormData {
  name: string;
  description: string;
  kernelCommand: string;
  installPackages: string;
  updateSources: string;
  updatePolicy: infra.UpdatePolicy;
  osType: infra.OsType;
  targetOsId: string;
}

const CreateOsUpdatePolicy = () => {
  const cy = { "data-cy": dataCy };
  const projectName = SharedStorage.project?.name ?? "";
  const [updatePolicy, setUpdatePolicy] = useState("");
  const [osType, setOsType] = useState("");

  // Default form values
  const defaultValues: CreateOsUpdatePolicyFormData = {
    name: "",
    description: "",
    kernelCommand: "",
    installPackages: "",
    updateSources: "",
    updatePolicy: "UPDATE_POLICY_LATEST" as infra.UpdatePolicy,
    osType: "OS_TYPE_MUTABLE" as infra.OsType,
    targetOsId: "",
  };

  /** Form control config */
  const {
    control: formControl,
    formState: { errors: formErrors },
    handleSubmit,
  } = useForm<CreateOsUpdatePolicyFormData>({
    mode: "all",
    defaultValues,
    reValidateMode: "onSubmit",
  });

  const {
    data: { OperatingSystemResources: osResources } = {},
    isLoading,
    isError,
    isSuccess,
    error,
  } = infra.useOperatingSystemServiceListOperatingSystemsQuery(
    {
      projectName,
    },
    {
      skip: !projectName,
    },
  );
  console.log("osResources:", osResources);
  const onSubmit = (data: CreateOsUpdatePolicyFormData) => {
    console.log("Form submitted:", data);
    // Find the selected OS resource
    const selectedOs = osResources?.find(
      (os) => os.resourceId === data.targetOsId,
    );
    console.log("Selected OS:", selectedOs);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div {...cy} className="create-os-update-policy">
        <div className="pa-1">
          <Controller
            name="osType"
            control={formControl}
            rules={{
              required: "OS Type is required",
            }}
            render={({ field }) => (
              <Dropdown
                data-cy="osType"
                name="osType"
                label="OS Type*"
                placeholder="Select OS type"
                selectedKey={field.value}
                onSelectionChange={(selectedKey) => {
                  const osTypeValue = selectedKey as infra.OsType;
                  console.log("Selected OS Type:", osTypeValue);
                  field.onChange(osTypeValue);
                  setOsType(osTypeValue);
                }}
                size={DropdownSize.Large}
                validationState={formErrors.osType ? "invalid" : "valid"}
                errorMessage={formErrors.osType?.message}
              >
                <Item key="OS_TYPE_MUTABLE">OS_TYPE_MUTABLE</Item>
                <Item key="OS_TYPE_IMMUTABLE">OS_TYPE_IMMUTABLE</Item>
              </Dropdown>
            )}
          />
        </div>
        {/* <div className="pa-1">
          <Dropdown
            data-cy="osType"
            name="osType"
            label="OS Type*"
            placeholder="Select OS type"
            selectedKey={osType}
            onSelectionChange={(selectedKey) => {
              const osType = selectedKey as string;
              console.log("Selected OS Type:", osType);
              setOsType(osType);
            }}
            size={DropdownSize.Large}
          >
            <Item key="OS_TYPE_MUTABLE">OS_TYPE_MUTABLE</Item>
            <Item key="OS_TYPE_IMMUTABLE">OS_TYPE_IMMUTABLE</Item>
          </Dropdown>
        </div> */}

        <div className="pa-1">
          <Controller
            name="targetOsId"
            control={formControl}
            rules={{
              required: "Target OS is required",
            }}
            render={({ field }) => (
              <Dropdown
                data-cy="targetOs"
                name="targetOs"
                label="Target OS*"
                placeholder="Select target OS"
                selectedKey={field.value}
                onSelectionChange={(selectedKey) => {
                  const osResourceId = selectedKey as string;
                  console.log("Selected osResourceId:", osResourceId);

                  // Find the selected OS for additional info
                  const selectedOs = osResources?.find(
                    (os) => os.resourceId === osResourceId,
                  );
                  console.log("Selected OS details:", selectedOs);

                  // Update the form field
                  field.onChange(osResourceId);
                }}
                size={DropdownSize.Large}
                validationState={formErrors.targetOsId ? "invalid" : "valid"}
                errorMessage={formErrors.targetOsId?.message}
                isDisabled={isLoading || !osResources?.length}
              >
                {osResources?.map((os) => (
                  <Item key={os.resourceId} aria-label={os.name}>
                    {os.name}
                  </Item>
                ))}
              </Dropdown>
            )}
          />
        </div>

        {/* <div className="pa-1">
          <Dropdown
            data-cy="targetOs"
            name="targetOs"
            label="Target OS*"
            placeholder="Select target OS"
            selectedKey={osType}
            onSelectionChange={(selectedKey) => {
              const osResourceId = selectedKey as string;
              console.log("Selected osResourceId:", osResourceId);
            }}
            size={DropdownSize.Large}
          >
            {osResources?.map((os) => (
              <Item key={os.resourceId} aria-label={os.name}>
                {os.name}
              </Item>
            ))}
          </Dropdown>
        </div> */}

        <Flex cols={[12]} className="pa-1">
          <Controller
            name="name"
            control={formControl}
            rules={{
              required: "Name is required",
              maxLength: {
                value: 50,
                message: "Name must be less than 50 characters",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                data-cy="name"
                id="name"
                label="Name *"
                placeholder="Enter policy name"
                errorMessage={formErrors.name?.message}
                validationState={formErrors.name ? "invalid" : "valid"}
              />
            )}
          />
        </Flex>

        <Flex cols={[12]} className="pa-1">
          <Controller
            name="description"
            control={formControl}
            render={({ field }) => (
              <TextField
                {...field}
                data-cy="description"
                id="description"
                label="Description"
                placeholder="Enter policy description"
                errorMessage={formErrors.description?.message}
                validationState={formErrors.description ? "invalid" : "valid"}
              />
            )}
          />
        </Flex>

        <Flex cols={[12]} className="pa-1">
          <Controller
            name="kernelCommand"
            control={formControl}
            render={({ field }) => (
              <TextField
                {...field}
                data-cy="kernelCommand"
                id="kernelCommand"
                label="Kernel Command"
                placeholder="console=ttyS0,115200 console=tty0 net.ifnames=0"
                errorMessage={formErrors.kernelCommand?.message}
                validationState={formErrors.kernelCommand ? "invalid" : "valid"}
              />
            )}
          />
        </Flex>

        <Flex cols={[12]} className="pa-1">
          <Controller
            name="updateSources"
            control={formControl}
            render={({ field }) => (
              <TextField
                {...field}
                data-cy="updateSources"
                id="updateSources"
                label="Update Sources"
                placeholder="Enter repository sources in DEB822 format..."
                errorMessage={formErrors.updateSources?.message}
                validationState={formErrors.updateSources ? "invalid" : "valid"}
              />
            )}
          />
        </Flex>

        <div className="pa-1">
          <Controller
            name="updatePolicy"
            control={formControl}
            rules={{
              required: "Update policy is required",
            }}
            render={({ field }) => (
              <Dropdown
                data-cy="updatePolicy"
                name="updatePolicy"
                label="OS Update Policy Type*"
                placeholder="Select type"
                selectedKey={field.value}
                onSelectionChange={(selectedKey) => {
                  const policyType = selectedKey as infra.UpdatePolicy;
                  console.log("Selected OS Update Policy Type:", policyType);
                  field.onChange(policyType);
                }}
                size={DropdownSize.Large}
                validationState={formErrors.updatePolicy ? "invalid" : "valid"}
                errorMessage={formErrors.updatePolicy?.message}
              >
                <Item key="UPDATE_POLICY_LATEST">UPDATE_POLICY_LATEST</Item>
                <Item key="UPDATE_POLICY_TARGET">UPDATE_POLICY_TARGET</Item>
                <Item key="UPDATE_POLICY_IMMEDIATE">
                  UPDATE_POLICY_IMMEDIATE
                </Item>
              </Dropdown>
            )}
          />
        </div>
        {/* <div className="pa-1">
          <Dropdown
            data-cy="createOsUpdatePolicy"
            name="policyType"
            label="OS Update policy Type*"
            placeholder="Select type"
            selectedKey={updatePolicy}
            onSelectionChange={(selectedKey) => {
              const policyType = selectedKey as string;
              console.log("Selected OS Update Policy Type:", policyType);
              setUpdatePolicy(policyType);
            }}
            size={DropdownSize.Large}
          >
            <Item key="UPDATE_POLICY_LATEST">UPDATE_POLICY_LATEST</Item>
            <Item key="UPDATE_POLICY_TARGET">UPDATE_POLICY_TARGET</Item>
          </Dropdown>
        </div> */}
      </div>
    </form>
  );
};

export default CreateOsUpdatePolicy;
