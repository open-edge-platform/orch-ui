/*
 * SPDX-FileCopyrightText: (C) 2026 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
import { infra } from "@orch-ui/apis";
import VproDetailItem from "./VproDetailItem";
import "./VproDetails.scss";

const dataCy = "vproDetails";
interface VproDetailsProps {
  host: infra.HostResourceRead;
}

const VproDetails = ({ host }: VproDetailsProps) => {
  const cy = { "data-cy": dataCy };

  return (
    <div {...cy} className="vpro-details-container">
      <VproDetailItem label="SKU" value={host.amtSku} />
      <VproDetailItem label="Power state" value={host.powerStatus} />
      <VproDetailItem label="Power state" value={host.powerStatus} />
      <VproDetailItem label="AMT Status" value={host.amtStatus} />
    </div>
  );
};

export default VproDetails;
