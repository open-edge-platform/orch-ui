/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Popup, PopupOption } from "@orch-ui/components";
import { Heading, Icon } from "@spark-design/react";
import "./DeploymentDetailsHeader.scss";

const DeploymentDetailsHeader = ({
  dataCy = "deploymentDetailsHeader",
  headingTitle,
  popupOptions,
}: {
  dataCy?: string;
  headingTitle: string;
  popupOptions?: PopupOption[];
}) => {
  return (
    <header className="deployment-drill-row" data-cy={dataCy}>
      <Heading
        className="deployment-drill-heading"
        semanticLevel={1}
        size="l"
        data-cy={`${dataCy}Title`}
      >
        {headingTitle}
      </Heading>
      <div
        className="deployment-drill-action-button"
        data-cy={`${dataCy}Popup`}
      >
        {popupOptions && (
          <Popup
            options={popupOptions}
            jsx={
              <button
                className="spark-button spark-button-action spark-button-size-l spark-focus-visible spark-focus-visible-self spark-focus-visible-snap"
                type="button"
              >
                <span className="spark-button-content">
                  Deployment Action{" "}
                  <Icon className="margin-1" icon="chevron-down" />
                </span>
              </button>
            }
          />
        )}
      </div>
    </header>
  );
};

export default DeploymentDetailsHeader;
