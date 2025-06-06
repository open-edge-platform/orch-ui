/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { Popup, SquareSpinner } from "@orch-ui/components";
import { regionSiteRoute, useInfraNavigate } from "@orch-ui/utils";
import { Icon } from "@spark-design/react";
import { useAppDispatch } from "../../../../store/hooks";
import {
  setMaintenanceEntity,
  setSiteToDelete,
} from "../../../../store/locations";

const dataCy = "siteActionsPopup";
export interface SiteActionsPopupProps {
  site: infra.SiteResourceRead;
}

export const SiteActionsPopup = ({ site }: SiteActionsPopupProps) => {
  const cy = { "data-cy": dataCy };
  const navigate = useInfraNavigate();
  const dispatch = useAppDispatch();

  if (!site) {
    return <SquareSpinner />;
  }

  return (
    <div {...cy}>
      <Popup
        jsx={
          <button
            className="spark-button spark-button-action spark-button-size-l spark-focus-visible spark-focus-visible-self spark-focus-visible-snap"
            type="button"
            data-cy="siteActionsBtn"
          >
            <span className="spark-button-content">
              Site Actions <Icon className="pa-1" icon="chevron-down" />
            </span>
          </button>
        }
        options={[
          {
            displayText: "Edit",
            onSelect: () =>
              navigate(regionSiteRoute, {
                regionId: site.region?.regionID ?? "",
                siteId: site.siteID ?? "",
              }),
          },
          {
            displayText: "Schedule Maintenance",
            onSelect: () => {
              dispatch(
                setMaintenanceEntity({
                  targetEntity: site,
                  targetEntityType: "site",
                  showBack: true,
                }),
              );
            },
          },
          {
            displayText: "Delete",
            onSelect: () => dispatch(setSiteToDelete(site)),
          },
        ]}
      />
    </div>
  );
};
