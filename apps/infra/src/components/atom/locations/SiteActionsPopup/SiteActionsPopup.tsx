/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { Popup, SquareSpinner } from "@orch-ui/components";
import { Icon } from "@spark-design/react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../store/hooks";
import {
  setMaintenanceEntity,
  setSiteToDelete,
} from "../../../../store/locations";

const dataCy = "siteActionsPopup";
export interface SiteActionsPopupProps {
  site: infra.SiteRead;
}

export const SiteActionsPopup = ({ site }: SiteActionsPopupProps) => {
  const cy = { "data-cy": dataCy };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  if (!site) {
    return <SquareSpinner />;
  }

  const redirectUrl = `../regions/${site.region?.regionID}/sites/${site.siteID}?source=locations`;

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
            onSelect: () => navigate(redirectUrl, { relative: "path" }),
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
