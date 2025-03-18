/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim, enhancedEimSlice } from "@orch-ui/apis";
import { Drawer, IconVariant, Item, Tabs } from "@spark-design/react";
import { useState } from "react";
import { DrawerHeader } from "../../../components/molecules/DrawerHeader/DrawerHeader";
import { ScheduleMaintenanceForm } from "../ScheduleMaintenanceForm/ScheduleMaintenanceForm";
import { ScheduleMaintenanceList } from "../ScheduleMaintenanceList/ScheduleMaintenanceList";
import "./ScheduleMaintenanceDrawer.scss";

const dataCy = "scheduleMaintenanceDrawer";

interface TabItem {
  /** tab key */
  id: string;
  /** title for tab */
  title: string;
}

export interface ScheduleMaintenanceDrawerProps {
  /** target entity on which the schedule maintenance is applied on. Host/Site */
  targetEntity: enhancedEimSlice.ScheduleMaintenanceTargetEntity;
  /** target entity type: host, site or region */
  targetEntityType?: enhancedEimSlice.ScheduleMaintenanceTargetEntityType;
  /** show drawer control */
  isDrawerShown: boolean;
  isHeaderPrefixButtonShown?: boolean;
  headerPrefixButtonConfig?: {
    prefixButtonIcon: IconVariant;
  };
  /** hide drawer handler */
  setHideDrawer: () => void;
}

export const ScheduleMaintenanceDrawer = ({
  targetEntity,
  targetEntityType = "host",
  isDrawerShown,
  isHeaderPrefixButtonShown,
  headerPrefixButtonConfig = {
    prefixButtonIcon: "chevron-left",
  },
  setHideDrawer,
}: ScheduleMaintenanceDrawerProps) => {
  const cy = { "data-cy": dataCy };

  /** Maintenance when reset */
  const resetMaintenance: enhancedEimSlice.ScheduleMaintenanceRead = {
    type: "no-repeat",
    name: "",
    scheduleStatus: "SCHEDULE_STATUS_UNSPECIFIED",
  };

  // Note: target can be host or site. If targetSite is set then targetHost is undefined (not-set).
  if (targetEntityType === "region") {
    resetMaintenance.targetRegion = targetEntity as eim.RegionRead;
  } else if (targetEntityType === "site") {
    resetMaintenance.targetSite = targetEntity as eim.SiteRead;
  } else {
    resetMaintenance.targetHost = targetEntity as eim.HostRead;
  }

  const [maintenance, setMaintenance] =
    useState<enhancedEimSlice.ScheduleMaintenanceRead>(resetMaintenance);

  const tabItems: TabItem[] = [
    {
      id: "0",
      title: maintenance.resourceId ? "Edit Event" : "New Event",
    },
    {
      id: "1",
      title: "Schedule Events",
    },
  ];

  const [activeTabIndex, setActiveTabIndex] = useState<number>(
    parseInt(tabItems[0].id),
  );

  const setCloseDrawer = ({
    isClosed,
    resetToListTab,
  }: {
    isClosed?: boolean;
    resetToListTab?: boolean;
  }) => {
    // Reset
    setMaintenance(resetMaintenance);
    if (resetToListTab) setActiveTabIndex(1);
    // Close drawer
    if (isClosed) setHideDrawer();
  };

  const itemList = [
    <Item key={tabItems[0].id} title={tabItems[0].title}>
      <ScheduleMaintenanceForm
        maintenance={maintenance}
        targetEntityType={targetEntityType}
        onUpdate={setMaintenance}
        onSave={() => setCloseDrawer({ resetToListTab: true })}
        onClose={() =>
          setCloseDrawer({
            isClosed: true,
            resetToListTab: true,
          })
        }
      />
    </Item>,
    <Item key={tabItems[1].id} title={tabItems[1].title}>
      <ScheduleMaintenanceList
        targetEntity={targetEntity}
        targetEntityType={targetEntityType}
        onEditSelection={(
          maintenanceEdit: enhancedEimSlice.ScheduleMaintenanceRead,
        ) => {
          if (
            maintenanceEdit.targetHost &&
            !maintenanceEdit.targetHost.resourceId
          ) {
            maintenanceEdit.targetHost = targetEntity as eim.HostRead;
          } else if (
            maintenanceEdit.targetSite &&
            !maintenanceEdit.targetSite.resourceId
          ) {
            maintenanceEdit.targetSite = targetEntity as eim.SiteRead;
          } else if (
            maintenanceEdit.targetRegion &&
            !maintenanceEdit.targetRegion.resourceId
          ) {
            maintenanceEdit.targetRegion = targetEntity as eim.RegionRead;
          }

          setMaintenance(maintenanceEdit);
          setActiveTabIndex(0);
        }}
        onClose={() => setCloseDrawer({ isClosed: true })}
      />
    </Item>,
  ];

  return (
    <div {...cy} className="schedule-maintenance-drawer">
      <Drawer
        show={isDrawerShown}
        backdropClosable={true}
        onHide={() =>
          setCloseDrawer({
            isClosed: true,
            resetToListTab: true,
          })
        }
        hasHeader={true}
        headerProps={{
          headerContent: (
            <DrawerHeader
              targetEntity={targetEntity}
              targetEntityType={targetEntityType}
              prefixButtonShown={isHeaderPrefixButtonShown}
              prefixButtonIcon={headerPrefixButtonConfig.prefixButtonIcon}
              onClose={setHideDrawer}
            />
          ),
        }}
        bodyContent={
          <div
            className="maintenance-drawer-content"
            data-cy="maintenanceDrawerContent"
          >
            <Tabs
              className="tab-scroll"
              selectedKey={activeTabIndex.toString()}
              onSelectionChange={(selection) => {
                setActiveTabIndex(parseInt(selection.toString()));
              }}
            >
              {itemList}
            </Tabs>
          </div>
        }
      />
    </div>
  );
};
