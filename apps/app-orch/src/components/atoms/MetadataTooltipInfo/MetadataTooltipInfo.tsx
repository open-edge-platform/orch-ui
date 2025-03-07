/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

// TODO: Check if we need this component. This component is not used anywhere!!

import { Icon, Text } from "@spark-design/react";
import "./MetadataTooltipInfo.scss";

const MetadataTooltipInfo = () => {
  const mti = "metadata-tooltip-info";
  return (
    <div className={mti}>
      <Text size="l">Metadata</Text>
      <Text className={`${mti}__description`}>
        <p>
          Metadata are key values that you create to enable automated
          deployment. They allow you to customize each deployment according to
          your specific business needs, and they must be distinct. To define
          metadata for your deployment, enter the <b>Metadata Name</b>, and then
          the corresponding <b>Metadata Value</b>.
        </p>
        <p>
          For example, if you want a deployment set up for a specific city,
          enter “City” for <b>Metadata Name</b> and “Atlanta” for{" "}
          <b>Metadata Value</b>. If your Host server's metadata matches, the
          package will be automatically deployed at your sites in Atlanta. To
          make the deployment more specific, you can include additional
          Metadata.
        </p>
      </Text>
      <a
        className={`${mti}__link`}
        href="https://edc.intel.com/content/www/us/en/secure/design/confidential/tools/edge-orchestration/automated-deployment/"
        target="_blank"
      >
        Learn more about Metadata <Icon icon="external-link" />
      </a>
    </div>
  );
};

export default MetadataTooltipInfo;
