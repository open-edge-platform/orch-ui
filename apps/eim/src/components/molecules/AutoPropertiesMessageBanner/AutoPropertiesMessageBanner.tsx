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
  const { autoOnboard, autoProvision } = useAppSelector(
    (state) => state.configureHost,
  );

  return (
    <div {...cy} className="auto-properties-message-banner">
      <MessageBanner
        messageBody={(() => {
          if (autoOnboard && autoProvision)
            return AutoPropertiesMessages.BothSelected;
          else if (autoOnboard && !autoProvision)
            return AutoPropertiesMessages.OnboardOnly;
          else if (!autoOnboard && autoProvision)
            return AutoPropertiesMessages.ProvisionOnly;
          else return AutoPropertiesMessages.NoneSelected;
        })()}
        variant="info"
        messageTitle=""
        size="s"
        showIcon
        outlined
      />
    </div>
  );
};

export default AutoPropertiesMessageBanner;
