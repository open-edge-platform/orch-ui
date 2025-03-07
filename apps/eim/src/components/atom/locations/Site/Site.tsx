/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import { Icon } from "@spark-design/react";
import { Link } from "react-router-dom";
import "./Site.scss";
export const dataCy = "site";

export interface SiteDynamicProps {
  viewHandler?: (site: eim.SiteRead) => void;
  handleOnSiteSelected?: (value: eim.SiteRead) => void;
  selectedSite?: eim.SiteRead;
  isSelectable?: boolean;
}
export interface SiteProps extends SiteDynamicProps {
  site: eim.SiteRead;
}

export const Site = ({
  site,
  viewHandler,
  handleOnSiteSelected,
  selectedSite,
  isSelectable = false,
}: SiteProps) => {
  const cy = { "data-cy": dataCy };
  const className = "site";

  if (!site.region) {
    throw new Error(getMissingFieldErrorMessage("region"));
  }

  if (!site.resourceId) {
    throw new Error(getMissingFieldErrorMessage("site.resourceId"));
  }

  return (
    <div {...cy} className={className}>
      {isSelectable && (
        <label className="select-site-label">
          <input
            data-cy={"selectSiteRadio"}
            type="radio"
            name="selectSite"
            checked={
              selectedSite && selectedSite.resourceId === site.resourceId
            }
            onChange={() => handleOnSiteSelected && handleOnSiteSelected(site)}
          />
        </label>
      )}
      <Icon icon="location" className={`${className}__icon`} />
      <Link
        to="#"
        onClick={() => viewHandler && viewHandler(site)}
        data-cy="siteName"
      >
        {site.name ?? "Site name missing"}
      </Link>
    </div>
  );
};

export const getMissingFieldErrorMessage = (field: string) => {
  const MISSING_FIELD_ERROR_SUFFIX = "field must be present in the site prop.";
  return `${field} ${MISSING_FIELD_ERROR_SUFFIX}`;
};
