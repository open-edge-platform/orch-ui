/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import { ContextSwitcher, setActiveNavItem } from "@orch-ui/components";
import { checkAuthAndRole, Role } from "@orch-ui/utils";
import { Button, Heading } from "@spark-design/react";
import { ButtonVariant } from "@spark-design/tokens";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { hostsNavItem } from "../../../routes/const";
import { reset } from "../../../store/configureHost";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  buildFilter,
  LifeCycleState,
  setLifeCycleState,
} from "../../../store/hostFilterBuilder";
import HostSearchFilters from "../../organism/HostSearchFilters/HostSearchFilters";
import HostsTable from "../../organism/HostsTable/HostsTable";
import { RegisterHostDrawer } from "../../organism/RegisterHostDrawer/RegisterHostDrawer";
import "./Hosts.scss";

const dataCy = "hosts";

const Hosts = () => {
  const cy = { "data-cy": dataCy };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const className = "hosts";

  const [selectedHosts, setSelectedHosts] = useState<eim.HostRead[]>([]);
  const hostFilterState = useAppSelector((state) => state.hostFilterBuilder);
  const [showRegisterDrawer, setShowRegisterDrawer] = useState<boolean>(false);

  //Triggers the initial query of the Hosts table
  useEffect(() => {
    if (location.search.includes("?reset")) {
      dispatch(reset());
    }
    dispatch(buildFilter());
  }, []);

  useEffect(() => {
    dispatch(setActiveNavItem(hostsNavItem));
  }, []);

  const hostTableActionButtons = (
    <>
      <HostSearchFilters />
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
        defaultName={hostFilterState.lifeCycleState}
        onSelectChange={(selection) => {
          dispatch(setLifeCycleState(selection as LifeCycleState));
        }}
      />

      <HostsTable
        selectable={
          hostFilterState.lifeCycleState === LifeCycleState.Onboarded ||
          hostFilterState.lifeCycleState === LifeCycleState.Registered
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
        searchConfig={{
          searchTooltipContent: "Search active hosts from the table below.",
        }}
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
