/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { Heading, MessageBanner } from "@spark-design/react";
import { MessageBannerAlertState } from "@spark-design/tokens";

const MetadataMessage = () => (
  <>
    <Heading semanticLevel={6}>Deployment Configuration</Heading>
    <MessageBanner
      size="s"
      showIcon
      outlined
      variant={MessageBannerAlertState.Info}
      messageBody="Define criteria for deploying the package. The package will
          automatically deploy to clusters whose configuration matches the
          values specified here."
    />
  </>
);

export default MetadataMessage;
