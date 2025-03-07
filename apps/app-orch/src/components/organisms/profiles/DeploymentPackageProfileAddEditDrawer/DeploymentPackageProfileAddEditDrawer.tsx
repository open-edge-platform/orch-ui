/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import { Flex, Textarea } from "@orch-ui/components";
import {
  Button,
  Drawer,
  Heading,
  MessageBanner,
  TextField,
  ToggleSwitch,
} from "@spark-design/react";
import {
  ButtonSize,
  ButtonVariant,
  HeaderSize,
  InputSize,
  ToggleSwitchSize,
} from "@spark-design/tokens";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Controller, FieldError, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  addEditDeploymentPackageProfile,
  selectDeploymentPackageProfiles,
  selectDeploymentPackageReferences,
} from "../../../../store/reducers/deploymentPackage";
import { generateName } from "../../../../utils/global";
import SelectApplicationProfile from "../SelectApplicationProfile/SelectApplicationProfile";
import "./DeploymentPackageProfileAddEditDrawer.scss";

export const dataCy = "deploymentPackageProfileAddEditDrawer";

type ApplicationProfiles = catalog.DeploymentProfile["applicationProfiles"];
export type ProfileInputs = {
  displayName: string;
  description: string;
};

interface DeploymentPackageProfileAddEditDrawerProps {
  show: boolean;
  profile?: catalog.DeploymentProfile;
  isDefaultProfile?: boolean;
  onClose: () => void;
}

const DeploymentPackageProfileAddEditDrawer = ({
  show,
  profile,
  isDefaultProfile,
  onClose,
}: DeploymentPackageProfileAddEditDrawerProps) => {
  const cy = { "data-cy": dataCy };

  const editMode = !!profile;

  const [showDrawer, setShowDrawer] = useState<boolean>(show);
  const [displayName, setDisplayName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [uniqueCombinationError, setUniqueCombinationError] =
    useState<boolean>(false);
  const [isDefault, setIsDefault] = useState<boolean>(
    isDefaultProfile || false,
  );
  const [applicationProfiles, setApplicationProfiles] =
    useState<ApplicationProfiles>({});

  const dispatch = useAppDispatch();

  const deploymentPackageReferences = useAppSelector(
    selectDeploymentPackageReferences,
  );
  const deploymentPackageProfiles = useAppSelector(
    selectDeploymentPackageProfiles,
  );

  useEffect(() => {
    setShowDrawer(show);
    if (profile) {
      setDisplayName(profile.displayName!);
      setDescription(profile.description!);
      setApplicationProfiles(profile.applicationProfiles);
    }
    if (profile && isDefaultProfile !== undefined) {
      setIsDefault(isDefaultProfile);
    }
  }, [show]);

  const clearForm = () => {
    setDisplayName("");
    setDescription("");
    setApplicationProfiles({});
    setIsDefault(false);
    setUniqueCombinationError(false);
    reset({
      displayName: profile?.displayName ?? "",
      description: profile?.description ?? "",
    });
  };

  const handleProfileChange = (application: string, profile: string) => {
    setApplicationProfiles((currentProfiles) => ({
      ...currentProfiles,
      [application]: profile,
    }));
  };

  const uniqueProfileName = (displayName: string) =>
    !deploymentPackageProfiles
      ?.filter((p) => !profile || p.displayName != profile.displayName)
      .some((p) => p.displayName === displayName);

  const uniqueApplicationProfilePairs = () =>
    !!deploymentPackageProfiles
      ?.filter((p) => !profile || p.name != profile.name)
      .every(
        (p) =>
          !equalApplicationProfilePairs(
            p.applicationProfiles,
            applicationProfiles,
          ),
      );

  const sortArrayValues = (a: [string, string], b: [string, string]) =>
    a.sort().toString().localeCompare(b.sort().toString());

  const equalApplicationProfilePairs = (
    pairsA: catalog.DeploymentProfile["applicationProfiles"],
    pairsB: catalog.DeploymentProfile["applicationProfiles"],
  ) => {
    const entriesA = Object.entries(pairsA);
    entriesA.sort(sortArrayValues);
    const entriesB = Object.entries(pairsB);
    entriesB.sort(sortArrayValues);
    return entriesA.toString() === entriesB.toString();
  };

  const printNameError = (error?: FieldError) => {
    if (!error) return;

    switch (error.type) {
      case "required":
        return "Name is required";

      case "maxLength":
        return "Name can't be more than 63 characters";

      case "validate":
        return "A Deployment package profile with this name already exist";
    }
  };

  const {
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<ProfileInputs>({
    mode: "all",
    defaultValues: {
      displayName: profile?.displayName ?? "",
      description: profile?.description ?? "",
    },
  });

  const content = (
    <div className="deployment-package-profile-add-edit-drawer__content">
      {uniqueCombinationError && (
        <MessageBanner
          variant="warning"
          messageBody="This combination of application profiles has already been saved."
          showIcon
        />
      )}
      <Controller
        name="displayName"
        control={control}
        rules={{
          required: true,
          maxLength: 63,
          validate: (value) => uniqueProfileName(value),
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Name *"
            data-cy="name"
            onInput={(e) => {
              const value = e.currentTarget.value;
              if (value.length) {
                setDisplayName(e.currentTarget.value);
              }
            }}
            errorMessage={printNameError(errors.displayName)}
            validationState={
              errors.displayName && Object.keys(errors.displayName).length > 0
                ? "invalid"
                : "valid"
            }
            size={InputSize.Large}
            className="text-field-align"
          />
        )}
      />
      <Textarea
        label="Description"
        placeholder="Write description"
        data-cy="description"
        value={description}
        onChange={(e) => {
          const value = e.currentTarget.value;
          if (value.length) {
            setDescription(e.currentTarget.value);
          }
        }}
      />
      <ToggleSwitch
        className="default-switch"
        isSelected={isDefault}
        onChange={setIsDefault}
        size={ToggleSwitchSize.Large}
        isDisabled={profile && isDefaultProfile}
      >
        {" "}
        Set as Default
      </ToggleSwitch>
      <Heading semanticLevel={3} size={HeaderSize.Small}>
        Applications
      </Heading>
      {deploymentPackageReferences.map((appRef) => (
        <>
          <Flex cols={[6, 6]}>
            <div>Application</div>
            <div>Profile</div>
          </Flex>
          <SelectApplicationProfile
            applicationReference={appRef}
            selectedApplicationProfile={
              profile?.applicationProfiles[appRef.name] ??
              applicationProfiles[appRef.name]
            }
            onProfileChange={handleProfileChange}
          />
        </>
      ))}
    </div>
  );

  const saveProfile = () => {
    if (!uniqueApplicationProfilePairs()) {
      setUniqueCombinationError(true);
      return false;
    }
    dispatch(
      addEditDeploymentPackageProfile({
        edit: editMode,
        prevName: editMode ? profile.name : null,
        isDefault,
        deploymentProfile: {
          name: generateName(displayName),
          displayName,
          description,
          applicationProfiles,
        },
      }),
    );
    return true;
  };

  const closeDrawer = () => {
    clearForm();
    setShowDrawer(false);
    onClose();
  };

  return (
    <div {...cy} className="deployment-package-profile-add-edit-drawer">
      {createPortal(
        <Drawer
          show={showDrawer}
          backdropIsVisible={false}
          headerProps={{
            title: `${editMode ? "Edit" : "Add"} Profile`,
            subTitle: "",
            onHide: closeDrawer,
          }}
          bodyContent={content}
          footerContent={
            <div className="deployment-package-profile-add-edit-drawer__footer">
              <Button
                size={ButtonSize.Large}
                variant={ButtonVariant.Secondary}
                onPress={closeDrawer}
              >
                Cancel
              </Button>
              <Button
                size={ButtonSize.Large}
                variant={ButtonVariant.Action}
                isDisabled={!isValid}
                onPress={() => {
                  if (saveProfile()) {
                    closeDrawer();
                  }
                }}
              >
                {editMode ? "OK" : "Add Profile"}
              </Button>
            </div>
          }
          data-cy="drawerContent"
        />,
        document.querySelector("#composite-profile") ?? document.body,
      )}
    </div>
  );
};

export default DeploymentPackageProfileAddEditDrawer;
