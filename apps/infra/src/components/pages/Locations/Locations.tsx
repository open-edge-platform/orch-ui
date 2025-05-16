/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import {
  ConfirmationDialog,
  Empty,
  Flex,
  MessageBannerAlertState,
  setBreadcrumb,
} from "@orch-ui/components";
import {
  parseError,
  regionRoute,
  SharedStorage,
  useInfraNavigate,
} from "@orch-ui/utils";
import { Button, Drawer, Heading, Text } from "@spark-design/react";
import { ButtonSize, ButtonVariant } from "@spark-design/tokens";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { DrawerHeader } from "../../../components/molecules/DrawerHeader/DrawerHeader";
import {
  Search,
  SearchTypeItem,
} from "../../../components/molecules/locations/Search/Search";
import { RegionSiteTree } from "../../../components/organism/locations/RegionSiteTree/RegionSiteTree";
import { RegionView } from "../../../components/organism/locations/RegionView/RegionView";
import { SiteView } from "../../../components/organism/locations/SiteView/SiteView";
import { ScheduleMaintenanceDrawer } from "../../../components/organism/ScheduleMaintenanceDrawer/ScheduleMaintenanceDrawer";
import { useAppSelector } from "../../../store/hooks";
import {
  deleteTreeNode,
  ROOT_REGIONS,
  SearchTypes,
  selectIsEmpty,
  selectMaintenanceEntity,
  selectRegion,
  selectRegionToDelete,
  selectSite,
  selectSiteToDelete,
  setIsEmpty,
  setLoadingBranch,
  setMaintenanceEntity,
  setRegion,
  setRegionToDelete,
  setSite,
  setSiteToDelete,
} from "../../../store/locations";
import { setMessageBanner } from "../../../store/notifications";
import "./Locations.scss";
const dataCy = "locations";

export const DELETE_SITE_DIALOG_TITLE = "Delete Site ?";

export const Locations = () => {
  const cy = { "data-cy": dataCy };
  const navigate = useInfraNavigate();
  const dispatch = useDispatch();
  const [deleteRegion] = infra.useRegionServiceDeleteRegionMutation();
  const [deleteSite] = infra.useSiteServiceDeleteSiteMutation();
  const region = useAppSelector(selectRegion);
  const regionToDelete = useAppSelector(selectRegionToDelete);
  const siteToDelete = useAppSelector(selectSiteToDelete);
  const site = useAppSelector(selectSite);
  const maintenanceEntity = useAppSelector(selectMaintenanceEntity);
  const isEmpty = useAppSelector(selectIsEmpty);
  const regionToDeleteHtmlId = "regionToDelete";
  const siteToDeleteHtmlId = "siteToDelete";
  const className: string = "locations";
  const searchTypes: SearchTypeItem[] = Object.keys(SearchTypes).map((key) => ({
    id: key,
    name: `Search ${key}`,
  }));

  useEffect(() => {
    dispatch(setBreadcrumb([{ text: "Locations", link: "/locations" }]));
  }, []);

  // If project name is changed, we donot show empty
  // until the below Region tree sub-component notifies that its empty
  useEffect(() => {
    dispatch(setIsEmpty(false)); // Assume that tree is not empty when project changes
  }, [SharedStorage.project?.name]);

  useEffect(() => {
    if (!regionToDelete) return;
    const el = document.getElementById(regionToDeleteHtmlId);
    el?.click();
  }, [regionToDelete]);

  useEffect(() => {
    if (!siteToDelete) return;
    const el = document.getElementById(siteToDeleteHtmlId);
    el?.click();
  }, [siteToDelete]);

  const deleteRegionHandler = (regionId: string) => {
    deleteRegion({
      projectName: SharedStorage.project?.name ?? "",
      resourceId: regionId,
    })
      .unwrap()
      .then(() => {
        dispatch(
          setMessageBanner({
            icon: "check-circle",
            text: "Region has been deleted.",
            title: "Deletion Succeeded",
            variant: MessageBannerAlertState.Success,
          }),
        );
        if (regionToDelete) dispatch(deleteTreeNode());
      })
      .catch((error) => {
        dispatch(
          setMessageBanner({
            icon: "alert-triangle",
            text: parseError(error).data,
            title: "Deletion Failed",
            variant: MessageBannerAlertState.Error,
          }),
        );
      })
      .finally(() => {
        dispatch(setRegionToDelete(undefined));
      });
  };

  const deleteSiteHandler = (siteId: string) => {
    deleteSite({
      resourceId: siteToDelete?.region?.resourceId ?? "",
      projectName: SharedStorage.project?.name ?? "",
      siteId, // TODO: API update is required
    })
      .unwrap()
      .then(() => {
        dispatch(
          setMessageBanner({
            icon: "check-circle",
            text: "Site has been deleted.",
            title: "Deletion Succeeded",
            variant: MessageBannerAlertState.Success,
          }),
        );
      })
      .catch((error) => {
        dispatch(
          setMessageBanner({
            icon: "alert-triangle",
            text: parseError(error).data,
            title: "Deletion Failed",
            variant: MessageBannerAlertState.Error,
          }),
        );
      })
      .finally(async () => {
        // Close the confirmation dialog
        await dispatch(setSiteToDelete(undefined));
        //Helps close the drawer
        await dispatch(setSite(undefined));
      });
  };

  const getJSX = () => {
    if (isEmpty)
      return (
        <Empty
          icon="location"
          subTitle="No locations have been set up yet. Start by adding a region."
          actions={[
            {
              name: "Add Region",
              action: () => {
                dispatch(setLoadingBranch(ROOT_REGIONS));
                navigate(regionRoute, { regionId: "new" });
              },
            },
          ]}
        />
      );

    return (
      <>
        <Flex cols={[5, 7]}>
          <Search
            searchTypes={searchTypes}
            defaultSearchType={searchTypes[0]}
          />
          <Button
            onPress={() => {
              dispatch(setLoadingBranch(ROOT_REGIONS));
              navigate(regionRoute, { regionId: "new" });
            }}
            size={ButtonSize.Large}
          >
            Add Region
          </Button>
        </Flex>
        <RegionSiteTree
          regionProps={{ showActionsMenu: true }}
          siteDynamicProps={{ isSelectable: false }}
        />
        <Drawer
          show={region !== undefined}
          hasHeader={true}
          headerProps={{
            headerContent: region && (
              <DrawerHeader
                targetEntity={region}
                targetEntityType="region"
                onClose={() => dispatch(setRegion(undefined))}
              />
            ),
          }}
          bodyContent={<RegionView />}
          footerContent={
            <div className={`${className}__footer-close`}>
              <Button
                variant={ButtonVariant.Primary}
                size={ButtonSize.Large}
                onPress={() => dispatch(setRegion(undefined))}
              >
                Close
              </Button>
            </div>
          }
          backdropClosable
          onHide={() => dispatch(setRegion(undefined))}
        />
        <Drawer
          show={site !== undefined}
          headerProps={{
            headerContent: site && (
              <DrawerHeader
                targetEntity={site}
                targetEntityType="site"
                onClose={() => dispatch(setSite(undefined))}
              />
            ),
          }}
          bodyContent={<SiteView />}
          backdropClosable
          onHide={() => dispatch(setSite(undefined))}
        />

        {regionToDelete && (
          <ConfirmationDialog
            showTriggerButton={false}
            triggerButtonId={regionToDeleteHtmlId}
            title="Delete Region ?"
            content={`Are you sure you want to delete "${regionToDelete.name ?? "NA"}"?`}
            confirmCb={() => {
              if (!regionToDelete.resourceId)
                throw new Error(
                  "Unexpected error. Region is missing resourceId",
                );
              deleteRegionHandler(regionToDelete.resourceId);
            }}
            confirmBtnText="Delete"
            confirmBtnVariant={ButtonVariant.Alert}
            cancelCb={() => {
              dispatch(setRegionToDelete(undefined));
            }}
          />
        )}

        {maintenanceEntity && (
          <ScheduleMaintenanceDrawer
            isDrawerShown={true}
            setHideDrawer={() => {
              if (
                maintenanceEntity.showBack &&
                maintenanceEntity.targetEntityType === "site"
              ) {
                dispatch(
                  setSite(maintenanceEntity.targetEntity as infra.SiteRead),
                );
              } else if (
                maintenanceEntity.showBack &&
                maintenanceEntity.targetEntityType === "region"
              ) {
                dispatch(
                  setRegion(maintenanceEntity.targetEntity as infra.RegionRead),
                );
              }
              dispatch(setMaintenanceEntity(undefined));
            }}
            isHeaderPrefixButtonShown={maintenanceEntity.showBack}
            targetEntity={maintenanceEntity.targetEntity}
            targetEntityType={maintenanceEntity.targetEntityType}
          />
        )}
        {siteToDelete && (
          <ConfirmationDialog
            showTriggerButton={false}
            triggerButtonId={siteToDeleteHtmlId}
            title={DELETE_SITE_DIALOG_TITLE}
            content={`Are you sure you want to delete "${siteToDelete.name ?? "NA"}"?`}
            confirmCb={() => {
              if (!siteToDelete.resourceId)
                throw new Error("Unexpected error. Site is missing resourceId");
              deleteSiteHandler(siteToDelete.resourceId);
            }}
            confirmBtnText="Delete"
            confirmBtnVariant={ButtonVariant.Alert}
            cancelCb={() => {
              dispatch(setSiteToDelete(undefined));
            }}
          />
        )}
      </>
    );
  };

  return (
    <div {...cy} className={className}>
      <Heading className={`${className}__page-title`} semanticLevel={4}>
        Locations
      </Heading>
      <Text className={`${className}__page-subtitle`}>
        Create hierarchies of regions and sites to organize deployments and
        infrastructure
      </Text>
      {getJSX()}
    </div>
  );
};
