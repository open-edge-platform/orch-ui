/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { Heading, Icon } from "@spark-design/react";
import { useState } from "react";
import { ResourceDetailsDisplayProps } from "../ResourceDetails";
import InterfaceDetails from "./InterfaceDetails";
import "./Interfaces.scss";

interface InterfaceProps {
  intf: infra.HostnicResourceRead;
}

const Interface = ({ intf }: InterfaceProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <>
      <Heading semanticLevel={6} onClick={() => setExpanded((e) => !e)}>
        <Icon
          data-cy="arm-app-detail-vm-list-toggle"
          className="expand-toggle"
          icon={expanded ? "chevron-down" : "chevron-right"}
        />
        {intf.deviceName}
      </Heading>
      {expanded && <InterfaceDetails intf={intf} />}
      <hr />
    </>
  );
};

const Interfaces = ({
  data,
}: ResourceDetailsDisplayProps<infra.HostnicResourceRead[]>) => (
  <div data-cy="interface">
    {data && data.map((i) => <Interface intf={i} />)}
  </div>
);

export default Interfaces;
