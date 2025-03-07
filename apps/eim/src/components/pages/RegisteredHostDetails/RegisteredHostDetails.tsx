/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import { AggregatedStatuses, Flex, SquareSpinner } from "@orch-ui/components";
import {
  CONSTANTS,
  HostGenericStatuses,
  hostToStatuses,
  SharedStorage,
} from "@orch-ui/utils";
import { Button, Heading, Icon } from "@spark-design/react";
import { ButtonSize, ButtonVariant } from "@spark-design/tokens";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import HostDetailsActions from "../../organism/hosts/HostDetailsActions/HostDetailsActions";
import "./RegisteredHostDetails.scss";

export const dataCy = "registeredHostDetails";
export const RegisteredHostDetails = () => {
  const cy = { "data-cy": dataCy };
  const className = "registered-host-details";
  const navigate = useNavigate();
  const { resourceId } = useParams();

  const { data: host } =
    eim.useGetV1ProjectsByProjectNameComputeHostsAndHostIdQuery(
      {
        projectName: SharedStorage.project?.name ?? "",
        hostId: resourceId!,
      },
      {
        skip: !resourceId, // Skip call if url does not include host-id
        refetchOnMountOrArgChange: true,
      },
    );

  if (host) {
    const {
      resourceId,
      name,
      serialNumber = "N/A",
      uuid = "N/A",
      desiredState,
      hostStatusTimestamp,
    } = host;

    const humanReadableTimestamp = hostStatusTimestamp
      ? moment.unix(hostStatusTimestamp).format("YYYY-DD-MM HH:mm:ss")
      : "Unavailable";

    return (
      <div {...cy} className={className}>
        <div className={`${className}__header-content`}>
          <div className={`${className}__header-content-left`}>
            <Heading semanticLevel={4} className={`${className}__heading`}>
              {name === "" ? resourceId : name}
            </Heading>
            <AggregatedStatuses<HostGenericStatuses>
              defaultStatusName="hostStatus"
              statuses={hostToStatuses(host)}
              defaultMessages={{ idle: CONSTANTS.HOST_STATUS.NOT_CONNECTED }}
            />
          </div>
          <div className={`${className}__header-content-right`}>
            <HostDetailsActions
              host={host}
              jsx={
                <button
                  className="spark-button spark-button-action spark-button-size-l spark-focus-visible spark-focus-visible-self spark-focus-visible-snap"
                  type="button"
                >
                  <span className="spark-button-content">
                    Host Actions
                    <Icon className="pa-1 mb-1" icon="chevron-down" />
                  </span>
                </button>
              }
            />
          </div>
        </div>
        <Flex cols={[4, 8]} className={`${className}__key-value`}>
          <b>Serial Number</b>
          <p data-cy="serialNumber">
            {serialNumber.length === 0 ? "N/A" : serialNumber}
          </p>
          <b>UUID</b>
          <p data-cy="uuid">{uuid}</p>
          <b>Auto Onboard</b>
          <p data-cy="autoOnboard">
            {desiredState === "HOST_STATE_ONBOARDED" ? "Yes" : "No"}
          </p>
          <b>Registered date/time</b>
          <p data-cy="timestamp">{humanReadableTimestamp}</p>
        </Flex>
        <div className={`${className}__footer`}>
          <Button
            variant={ButtonVariant.Secondary}
            size={ButtonSize.Large}
            onPress={() => navigate("../registered-hosts")}
          >
            Back
          </Button>
        </div>
      </div>
    );
  }
  return <SquareSpinner />;
};
