/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { Flex } from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import {
  Button,
  ButtonGroup,
  Drawer,
  Dropdown,
  Item,
  TextField,
} from "@spark-design/react";
import {
  ButtonGroupAlignment,
  ButtonSize,
  ButtonVariant,
  DropdownSize,
  ToastState,
} from "@spark-design/tokens";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

// import "./CreateOsUpdatePolicy.scss";

// import "./OsUpdatePolicy.scss";

interface OsUpdatePolicyDrawerProps {
  showDrawer: boolean;
  setShowDrawer: (show: boolean) => void;
  showToast: (message: string, state: ToastState) => void; // Toast notification function
}

interface CreateOsUpdatePolicyFormData {
  name: string;
  description: string;
  updateKernelCommand: string;
  updatePackages: string;
  updateSources: string;
  updatePolicy: infra.UpdatePolicy;
  osType: infra.OsType;
  targetOsId: string;
}

const dataCy = "createOsUpdatePolicy";

const CreateOsUpdatePolicyDrawer = ({
  showDrawer,
  setShowDrawer,
  showToast,
}: OsUpdatePolicyDrawerProps) => {
  const cy = { "data-cy": dataCy };

  const projectName = SharedStorage.project?.name ?? "";

  // Default form values
  const defaultValues: CreateOsUpdatePolicyFormData = {
    name: "",
    description: "",
    updateKernelCommand: "",
    updatePackages: "",
    updateSources: "",
    updatePolicy: "UPDATE_POLICY_TARGET" as infra.UpdatePolicy, // Default to TARGET for MUTABLE OS
    osType: "OS_TYPE_MUTABLE" as infra.OsType, // Default to MUTABLE
    targetOsId: "",
  };

  /** Form control config */
  const {
    control: formControl,
    formState: { errors: formErrors, isSubmitted },
    handleSubmit,
    watch,
    reset,
    getValues,
    trigger,
  } = useForm<CreateOsUpdatePolicyFormData>({
    mode: "onSubmit",
    defaultValues,
    reValidateMode: "onChange",
  });

  // Watch the osType and updatePolicy values for conditional rendering
  const osTypeValue = watch("osType");
  const updatePolicyValue = watch("updatePolicy");
  const targetOsIdValue = watch("targetOsId");
  const updateKernelCommandValue = watch("updateKernelCommand");

  // Reset fields when OS type changes (preserve name and description)
  useEffect(() => {
    const currentValues = getValues();
    const newUpdatePolicy =
      osTypeValue === "OS_TYPE_MUTABLE"
        ? "UPDATE_POLICY_TARGET"
        : "UPDATE_POLICY_LATEST";

    reset({
      name: currentValues.name, // Preserve name
      description: currentValues.description, // Preserve description
      updateKernelCommand: defaultValues.updateKernelCommand,
      updatePackages: defaultValues.updatePackages,
      updateSources: defaultValues.updateSources,
      updatePolicy: newUpdatePolicy as infra.UpdatePolicy,
      osType: osTypeValue, // Keep the new osType value
      targetOsId: defaultValues.targetOsId,
    });
  }, [osTypeValue, reset, getValues]);

  // Clear kernel command when targetOsId is selected (mutually exclusive)
  useEffect(() => {
    if (
      targetOsIdValue &&
      targetOsIdValue !== "" &&
      targetOsIdValue !== "none"
    ) {
      const currentValues = getValues();
      reset({
        ...currentValues,
        updateKernelCommand: "", // Clear kernel command when target OS is selected
      });
    }
  }, [targetOsIdValue, reset, getValues]);

  // Revalidate both fields when either changes (for mutual exclusivity validation)
  // Only trigger after form has been submitted at least once
  useEffect(() => {
    if (isSubmitted && updatePolicyValue === "UPDATE_POLICY_TARGET") {
      // Trigger validation for both fields when either value changes
      trigger(["updateKernelCommand", "targetOsId"]);
    }
  }, [
    isSubmitted,
    targetOsIdValue,
    updateKernelCommandValue,
    updatePolicyValue,
    trigger,
  ]);

  // Mutation hook for creating OS Update Policy
  const [createOsUpdatePolicy, { isLoading: isCreating }] =
    infra.useOsUpdatePolicyCreateOsUpdatePolicyMutation();

  const { data: { OperatingSystemResources: osResources } = {}, isLoading } =
    infra.useOperatingSystemServiceListOperatingSystemsQuery(
      {
        projectName,
      },
      {
        skip: !projectName,
      },
    );

  const onSubmit = async (data: CreateOsUpdatePolicyFormData) => {
    try {
      // Prepare the payload for the API
      const payload: infra.OsUpdatePolicyCreateOsUpdatePolicyApiArg = {
        projectName,
        osUpdatePolicy: {
          name: data.name,
          description: data.description,
          updatePolicy: data.updatePolicy,
          // Include updateKernelCommand only when UPDATE_POLICY_TARGET and no targetOsId selected
          ...(data.updatePolicy === "UPDATE_POLICY_TARGET" &&
            (!data.targetOsId ||
              data.targetOsId === "" ||
              data.targetOsId === "none") &&
            data.updateKernelCommand && {
              updateKernelCommand: data.updateKernelCommand,
            }),
          // Only include updatePackages and updateSources for MUTABLE OS
          ...(data.osType === "OS_TYPE_MUTABLE" && {
            updatePackages: data.updatePackages
              ? data.updatePackages
                  .split(",") // Split by commas only
                  .map((pkg) => pkg.trim())
                  .filter((pkg) => pkg.length > 0)
                  .join("\n") // Always convert to newline format
              : undefined,
            updateSources: data.updateSources
              ? data.updateSources
                  .split(",") // Split by commas only
                  .map((source) => source.trim())
                  .filter((source) => source.length > 0)
              : undefined,
          }),
          // Include targetOsId only when UPDATE_POLICY_TARGET and targetOsId is selected
          ...(data.updatePolicy === "UPDATE_POLICY_TARGET" &&
            data.targetOsId &&
            data.targetOsId !== "" &&
            data.targetOsId !== "none" && {
              targetOsId: data.targetOsId,
            }),
        },
      };
      // Call the mutation
      await createOsUpdatePolicy(payload).unwrap();

      // Close the drawer on success
      setShowDrawer(false);

      // Show success notification
      showToast("OS Update Policy created successfully!", ToastState.Success);
    } catch (error) {
      // Show error notification
      showToast(
        `Failed to create OS Update Policy: ${error}`,
        ToastState.Danger,
      );
    }
  };

  const createOsUpdatePolicyBodyContent = (
    <form id="createOsUpdatePolicyForm" onSubmit={handleSubmit(onSubmit)}>
      <div {...cy} className="create-os-update-policy">
        <Flex cols={[12]} className="pa-1">
          <Controller
            name="name"
            control={formControl}
            rules={{
              required: "Name is required",
              maxLength: {
                value: 50,
                message: "Name must be less than 50 characters", // TODO: is there a limit ?
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                data-cy="name"
                id="name"
                size="l"
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
                size="l"
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
                  field.onChange(osTypeValue);
                }}
                size={DropdownSize.Large}
                validationState={formErrors.osType ? "invalid" : "valid"}
                errorMessage={formErrors.osType?.message}
              >
                <Item key="OS_TYPE_MUTABLE">Mutable OS</Item>
                <Item key="OS_TYPE_IMMUTABLE">Immutable OS</Item>
              </Dropdown>
            )}
          />
        </div>

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
                  field.onChange(policyType);
                }}
                size={DropdownSize.Large}
                validationState={formErrors.updatePolicy ? "invalid" : "valid"}
                errorMessage={formErrors.updatePolicy?.message}
                isDisabled={osTypeValue === "OS_TYPE_MUTABLE"} // Disable for Mutable OS
              >
                <Item key="UPDATE_POLICY_LATEST">Update To Latest</Item>
                <Item key="UPDATE_POLICY_TARGET">Update To Target</Item>
              </Dropdown>
            )}
          />
        </div>

        {/* Target OS - Only for IMMUTABLE OS and when UPDATE_POLICY_TARGET is selected*/}
        {osTypeValue === "OS_TYPE_IMMUTABLE" &&
          updatePolicyValue === "UPDATE_POLICY_TARGET" && (
            <div className="pa-1">
              <Controller
                name="targetOsId"
                control={formControl}
                rules={{
                  validate: (value) => {
                    const hasTargetOs =
                      value && value !== "" && value !== "none";
                    const hasKernelCommand =
                      getValues("updateKernelCommand")?.trim() !== "";

                    if (!hasTargetOs && !hasKernelCommand) {
                      return "Either Target OS or Kernel Command must be specified";
                    }
                    return true;
                  },
                }}
                render={({ field }) => {
                  const osOptions = osResources?.filter(
                    (os) => os.osType === osTypeValue,
                  );
                  return (
                    <Dropdown
                      data-cy="targetOs"
                      name="targetOs"
                      label="Target OS"
                      placeholder="Select target OS"
                      selectedKey={field.value || undefined}
                      onSelectionChange={(selectedKey) => {
                        const osResourceId = selectedKey as string;
                        // Update the form field
                        field.onChange(osResourceId);
                      }}
                      size={DropdownSize.Large}
                      validationState={
                        formErrors.targetOsId ? "invalid" : "valid"
                      }
                      errorMessage={formErrors.targetOsId?.message}
                      isDisabled={isLoading || !osOptions?.length}
                    >
                      <Item key="none">None</Item>
                      {osOptions?.map((os) => (
                        <Item key={os.resourceId} aria-label={os.name}>
                          {os.name}
                        </Item>
                      ))}
                    </Dropdown>
                  );
                }}
              />
            </div>
          )}

        {/* Kernel Command - Show only when UPDATE_POLICY_TARGET is selected */}
        {updatePolicyValue === "UPDATE_POLICY_TARGET" && (
          <Flex cols={[12]} className="pa-1">
            <Controller
              name="updateKernelCommand"
              control={formControl}
              rules={{
                validate: (value) => {
                  const hasTargetOs =
                    targetOsIdValue &&
                    targetOsIdValue !== "" &&
                    targetOsIdValue !== "none";
                  const hasKernelCommand = value && value.trim() !== "";

                  if (!hasTargetOs && !hasKernelCommand) {
                    return "Either Target OS or Kernel Command must be specified";
                  }
                  return true;
                },
              }}
              render={({ field }) => {
                const isTargetOsSelected = Boolean(
                  targetOsIdValue &&
                    targetOsIdValue !== "" &&
                    targetOsIdValue !== "none",
                );
                return (
                  <TextField
                    {...field}
                    data-cy="updateKernelCommand"
                    size="l"
                    id="updateKernelCommand"
                    label="Kernel Command Update"
                    placeholder="console=ttyS0,115200 console=tty0 net.ifnames=0"
                    description={
                      isTargetOsSelected
                        ? "This field is disabled when a Target OS is selected. Only one can be updated at a time."
                        : "Specify kernel command parameters or select a Target OS."
                    }
                    isDisabled={isTargetOsSelected}
                    errorMessage={formErrors.updateKernelCommand?.message}
                    validationState={
                      formErrors.updateKernelCommand ? "invalid" : "valid"
                    }
                  />
                );
              }}
            />
          </Flex>
        )}

        {/* Update Sources - Only for MUTABLE OS and NOT UPDATE_POLICY_LATEST */}
        {osTypeValue === "OS_TYPE_MUTABLE" &&
          updatePolicyValue !== "UPDATE_POLICY_LATEST" && (
            <Flex cols={[12]} className="pa-1">
              <Controller
                name="updateSources"
                control={formControl}
                rules={{
                  validate: (value) => {
                    if (!value || value.trim() === "") return true; // Optional field
                    const sources = value
                      .split(",")
                      .map((source) => source.trim())
                      .filter((source) => source.length > 0);

                    // Check for valid APT repository format (should start with deb or deb-src)
                    const invalidSources = sources.filter(
                      (source) => !source.match(/^(deb|deb-src)\s+/),
                    );

                    if (invalidSources.length > 0) {
                      return "Repository sources must start with 'deb' or 'deb-src'";
                    }
                    return true;
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="l"
                    data-cy="updateSources"
                    id="updateSources"
                    label="Update Sources (APT Repository Format)"
                    placeholder="deb http://archive.ubuntu.com/ubuntu focal main, deb http://security.ubuntu.com/ubuntu focal-security main"
                    description="Enter APT repository sources separated by commas."
                    errorMessage={formErrors.updateSources?.message}
                    validationState={
                      formErrors.updateSources ? "invalid" : "valid"
                    }
                  />
                )}
              />
            </Flex>
          )}

        {/* Update Packages - Only for MUTABLE OS and NOT UPDATE_POLICY_LATEST */}
        {osTypeValue === "OS_TYPE_MUTABLE" &&
          updatePolicyValue !== "UPDATE_POLICY_LATEST" && (
            <Flex cols={[12]} className="pa-1">
              <Controller
                name="updatePackages"
                control={formControl}
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="l"
                    data-cy="updatePackages"
                    id="updatePackages"
                    label="Update Packages"
                    placeholder="tree, curl, htop"
                    description="Enter package names separated by commas"
                    errorMessage={formErrors.updatePackages?.message}
                    validationState={
                      formErrors.updatePackages ? "invalid" : "valid"
                    }
                  />
                )}
              />
            </Flex>
          )}
      </div>
    </form>
  );

  const osUpdatePolicyFooter = (
    <ButtonGroup align={ButtonGroupAlignment.End}>
      <Button
        data-cy="cancelFooterBtn"
        size={ButtonSize.Medium}
        onPress={() => setShowDrawer(false)}
        variant={ButtonVariant.Secondary}
        isDisabled={isCreating}
      >
        Cancel
      </Button>
      <Button
        data-cy="addBtn"
        size={ButtonSize.Medium}
        variant={ButtonVariant.Action}
        onPress={() => handleSubmit(onSubmit)()}
        isDisabled={isCreating}
      >
        {isCreating ? "Creating..." : "Create"}
      </Button>
    </ButtonGroup>
  );

  return (
    <Drawer
      {...cy}
      show={showDrawer}
      backdropClosable
      onHide={() => {
        setShowDrawer(false);
      }}
      headerProps={{
        title: "Create OS Update Policy",
      }}
      bodyContent={createOsUpdatePolicyBodyContent}
      footerContent={osUpdatePolicyFooter}
    />
  );
};

export default CreateOsUpdatePolicyDrawer;
