/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Flex } from "@orch-ui/components";
import { Icon, Text } from "@spark-design/react";
import { TextSize } from "@spark-design/tokens";
import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useAppSelector } from "../../../store/hooks";
import {
  HostData,
  selectHostProvisionState,
} from "../../../store/provisionHost";
import "./ReviewAndCustomize.scss";

const dataCy = "reviewAndCustomize";

const countDistinctValuesWithLabels = (
  array: HostData[],
  propertyPaths: string | string[],
  labels = {},
) => {
  const counts: { [key: string]: number } = {};

  const paths = Array.isArray(propertyPaths) ? propertyPaths : [propertyPaths];

  array.forEach((item) => {
    const values = paths.map((path) =>
      path
        .split(".")
        .reduce(
          (obj, key) => (obj && obj[key] !== undefined ? obj[key] : undefined),
          item,
        ),
    );
    const value = values.join(" ");
    const label = labels[value] || value;
    if (counts[label]) {
      counts[label]++;
    } else {
      counts[label] = 1;
    }
  });

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([label, count]) => `${label} (${count})`)
    .join(", ");
};

const ReviewAndCustomize = () => {
  const cy = { "data-cy": dataCy };

  const tableRef = useRef(null);
  const [expanded, setExpanded] = useState<boolean>(true);

  const { hosts } = useAppSelector(selectHostProvisionState);

  const hostValues = Object.values(hosts);

  useEffect(() => {
    // Trigger any logic or state updates when hostValues changes
    console.log("hostValues changed:", hostValues);
  }, [hostValues]);

  return (
    <div {...cy} className="review-and-customize">
      <div className="deployment-application-details-row">
        <Flex cols={[10, 2]}>
          <div className="hosts-overview-container">
            <div className="icon-container">
              <Icon
                className="hosts-overview-icon"
                artworkStyle="light"
                icon="host"
                onClick={() => setExpanded((e) => !e)}
              />
            </div>
            <div className="hosts-overview-details">
              <div>
                <Text>Total Hosts: {hostValues.length}</Text>
              </div>
              <div>
                <Text size={TextSize.Small}>
                  Operating System :{" "}
                  {countDistinctValuesWithLabels(
                    hostValues,
                    "instance.os.name",
                  )}
                </Text>
              </div>
              <div>
                <Text size={TextSize.Small}>
                  Cluster Template :{" "}
                  {countDistinctValuesWithLabels(hostValues, [
                    "templateName",
                    "templateVersion",
                  ])}
                </Text>
              </div>
              <div>
                <Text size={TextSize.Small}>
                  Sites :{" "}
                  {countDistinctValuesWithLabels(hostValues, "site.name")}
                </Text>
              </div>
            </div>
            <div className="hosts-overview-details">
              <div></div>
              <div>
                <Text size={TextSize.Small}>vPRO : </Text>
              </div>
              <div>
                <Text size={TextSize.Small}>
                  Secure Boot and Full Disk Encryption :{" "}
                  {countDistinctValuesWithLabels(
                    hostValues,
                    "instance.securityFeature",
                    {
                      SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION:
                        "Enabled",
                      SECURITY_FEATURE_NONE: "Disabled",
                    },
                  )}
                </Text>
              </div>
              <div></div>
            </div>
          </div>
          <div className="expand-action-icon-container">
            <Icon
              data-cy="expandToggle"
              className="expand-toggle"
              artworkStyle="regular"
              icon={expanded ? "chevron-down" : "chevron-right"}
              onClick={() => setExpanded((e) => !e)}
            />
          </div>
        </Flex>
      </div>
      <CSSTransition
        appear={true}
        in={expanded}
        nodeRef={tableRef}
        classNames="slide-down"
        addEndListener={(done: () => void) => done}
      >
        <div ref={tableRef} className="slide-down">
          <div className="scrollable-table-container"></div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default ReviewAndCustomize;
