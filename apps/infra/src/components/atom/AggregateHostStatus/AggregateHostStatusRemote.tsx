/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { AggregatedStatuses } from "@orch-ui/components";
import { HostGenericStatuses, hostToStatuses } from "@orch-ui/utils";
import { Provider } from "react-redux";
import { store } from "../../../store/store";

interface AggregateHostStatusProps {
  host: infra.HostResourceRead;
  instance: infra.InstanceResourceRead;
}

const AggregateHostStatusRemote = (props: AggregateHostStatusProps) => (
  <Provider store={store}>
    <AggregatedStatuses<HostGenericStatuses>
      defaultStatusName="hostStatus"
      statuses={hostToStatuses(props.host, props.instance)}
    />
  </Provider>
);

export default AggregateHostStatusRemote;
