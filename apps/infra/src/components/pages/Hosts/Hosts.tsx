/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import { ContextSwitcher } from "@orch-ui/components";
import { checkAuthAndRole, Role } from "@orch-ui/utils";
import { Button, Heading } from "@spark-design/react";
import { ButtonVariant } from "@spark-design/tokens";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import HostSearchFilters from "../../organism/HostSearchFilters/HostSearchFilters";
import HostsTable from "../../organism/HostsTable/HostsTable";
import { RegisterHostDrawer } from "../../organism/RegisterHostDrawer/RegisterHostDrawer";
import { AggregatedStatus, LifeCycleState, buildFilterNew } from "../../../store/hostFilterBuilder";
import "./Hosts.scss";

const dataCy = "hosts";

const Hosts = () => {
  const cy = { "data-cy": dataCy };

  const navigate = useNavigate();
  const className = "hosts";

  const [lifeCycleState, setLifeCycleState] = useState<LifeCycleState>(LifeCycleState.Provisioned);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [drawerFilters, setDrawerFilters] = useState<{
    statuses?: AggregatedStatus[];
    osProfiles?: string[];
  }>({});
  const [selectedHosts, setSelectedHosts] = useState<eim.HostRead[]>([]);
  const [showRegisterDrawer, setShowRegisterDrawer] = useState<boolean>(false);

  const filter = useMemo(() => {
    return buildFilterNew({
      lifeCycleState: lifeCycleState === LifeCycleState.All ? undefined : lifeCycleState,
      statuses: drawerFilters.statuses,
      osProfiles: drawerFilters.osProfiles,
      searchTerm,
    });
  }, [lifeCycleState,  drawerFilters, searchTerm]);

  const hostTableActionButtons = (
    <>
      <HostSearchFilters
        lifeCycleState={lifeCycleState}
        onFilterChange={(filters) => {
        console.log("Filter z HostSearchFilters:", filters);
        setDrawerFilters(filters);
      }}
      />
      <Button
        data-cy="registerHosts"
        variant={ButtonVariant.Action}
        onPress={() => {
          navigate("../register-hosts");
        }}
        isDisabled={!checkAuthAndRole([Role.INFRA_MANAGER_WRITE])}
      >
        Register Hosts
      </Button>
    </>
  );

  return (
    <div {...cy} className={className}>
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
        defaultName={lifeCycleState}
        onSelectChange={(selection) => {
          setLifeCycleState(selection as LifeCycleState);
          setSelectedHosts([]);
          setSearchTerm("");
        }}
      />

      <HostsTable
        selectable={
          lifeCycleState === LifeCycleState.Onboarded ||
          lifeCycleState === LifeCycleState.Registered
        }
        selectedHosts={selectedHosts}
        unsetSelectedHosts={() => setSelectedHosts([])}
        onHostSelect={(row: eim.HostRead, isSelected: boolean) => {
          setSelectedHosts((prev) => {
            if (isSelected) {
              return prev.concat(row);
            }
            return prev.filter((host) => host.resourceId !== row.resourceId);
          });
        }}
        poll
        filters={{          
          filter:  filter,
        }}
        searchConfig={{
          searchTooltipContent: "Search active hosts from the table below.",
        }}
        searchTerm={searchTerm}
        onSearch={setSearchTerm} 
        actionsJsx={hostTableActionButtons}
      />

      {showRegisterDrawer && (
        <RegisterHostDrawer
          isOpen={showRegisterDrawer}
          onHide={() => {
            setShowRegisterDrawer(false);
          }}
        />
      )}
    </div>
  );
};

export default Hosts;
