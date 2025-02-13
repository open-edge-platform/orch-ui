/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import { ContextSwitcher } from "@orch-ui/components";
import { Heading } from "@spark-design/react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  buildFilter,
  LifeCycleState,
  setLifeCycleState,
} from "../../../store/hostFilterBuilder";
import HostsTable from "../../organism/HostsTable/HostsTable";
import "./Hosts.scss";
export const dataCy = "hosts";

const Hosts = () => {
  const cy = { "data-cy": dataCy };

  const dispatch = useAppDispatch();

  const [, setSelectedHosts] = useState<eim.HostRead[]>([]);
  const hostFilterState = useAppSelector((state) => state.hostFilterBuilder);

  //Triggers the initial query of the Hosts table
  useEffect(() => {
    dispatch(buildFilter());
  }, []);

  return (
    <div {...cy} className="hosts">
      <Heading semanticLevel={1} size="l">
        Hosts
      </Heading>
      <ContextSwitcher
        tabButtons={[
          LifeCycleState.Provisioned,
          LifeCycleState.Onboarded,
          LifeCycleState.Registered,
          LifeCycleState.All,
        ]}
        defaultName={hostFilterState.lifeCycleState}
        onSelectChange={(selection) => {
          dispatch(setLifeCycleState(selection as LifeCycleState));
        }}
      />

      <HostsTable
        selectable={true}
        onHostSelect={(row: eim.HostRead, isSelected: boolean) => {
          setSelectedHosts((prev) => {
            if (isSelected) {
              return prev.concat(row);
            }
            return prev.filter((host) => host.resourceId !== row.resourceId);
          });
        }}
        poll
        searchConfig={{
          searchTooltipContent: "Search active hosts from the table below.",
        }}
      />
    </div>
  );
};

export default Hosts;
