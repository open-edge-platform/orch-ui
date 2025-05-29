/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Button } from "@spark-design/react";
import { useAppSelector } from "../../../store/hooks";
import { selectHostProvisionState } from "../../../store/provisionHost";
import "./ReviewAndCustomize.scss";
const dataCy = "reviewAndCustomize";

const ReviewAndCustomize = () => {
  const cy = { "data-cy": dataCy };

  const { hosts } = useAppSelector(selectHostProvisionState);

  return (
    <div {...cy} className="review-and-customize">
      {Object.keys(hosts).map((hostId) => {
        const host = hosts[hostId];
        return (
          <div key={hostId} className="host-details">
            <h3>{host.name}</h3>
            <p>Site: {host.site?.name}</p>
            <p>Cluster Template: {host.templateName}</p>
            <p>Cluster Template Version: {host.templateVersion}</p>
            <Button>Edit</Button>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default ReviewAndCustomize;
