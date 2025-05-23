/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { MessageBanner } from "@spark-design/react";
import { useAppSelector } from "../../../store/hooks";
import { AutoPropertiesMessages } from "./AutoPropertiesMessages";
const dataCy = "autoPropertiesMessageBanner";

const AutoPropertiesMessageBanner = () => {
  const cy = { "data-cy": dataCy };
  const { autoOnboard, autoProvision, createCluster } = useAppSelector(
    (state) => state.configureHost,
  );

  return (
    <div {...cy} className="auto-properties-message-banner">
      <MessageBanner
        variant="info"
        messageBody={(() => {
          if (autoOnboard && autoProvision && createCluster) {
            return AutoPropertiesMessages.CreateCluster;
          } else if (autoOnboard && autoProvision) {
            return AutoPropertiesMessages.BothSelected;
          } else if (autoOnboard && !autoProvision) {
            return AutoPropertiesMessages.OnboardOnly;
          } else if (!autoOnboard && autoProvision) {
            return AutoPropertiesMessages.ProvisionOnly;
          } else {
            return AutoPropertiesMessages.NoneSelected;
          }
        })()}
        messageTitle=""
        size="s"
        showIcon
        outlined
      />
    </div>
  );
};

export default AutoPropertiesMessageBanner;
