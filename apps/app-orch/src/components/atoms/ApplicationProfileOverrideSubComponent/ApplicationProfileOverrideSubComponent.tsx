/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import { MessageBanner } from "@spark-design/react";
import { memo } from "react";
import ApplicationProfileParameterOverrideForm from "../ApplicationProfileParameterOverrideForm/ApplicationProfileParameterOverrideForm";

interface ApplicationProfileOverrideSubComponentProps {
  app: catalog.Application;
  selectedProfile: catalog.DeploymentProfile;
}

/** This will render application profiles with override form upon row expand */
const ApplicationProfileOverrideSubComponent = memo(
  ({ app, selectedProfile }: ApplicationProfileOverrideSubComponentProps) => {
    /** Application Profile configuration on the selected deployment package profile */
    const appProfile = app.profiles?.find(
      (profile) =>
        // Check if the application profile name is what is seen selected in the selected deployment package profile
        profile.name === selectedProfile?.applicationProfiles[app.name],
    );

    if (!appProfile) {
      return (
        <MessageBanner
          messageTitle="Error while reading Parameter Template"
          messageBody={`No profile found for app "${app.name}@${app.version} in Deployment Profile ${selectedProfile?.name}"`}
          variant="error"
        />
      );
    }

    return (
      <ApplicationProfileParameterOverrideForm
        application={app}
        applicationProfile={appProfile}
      />
    );
  },
);

export default ApplicationProfileOverrideSubComponent;
