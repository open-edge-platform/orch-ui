/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { TypedMetadata } from "../MetadataDisplay/MetadataDisplay";
import "./MetadataBadge.scss";

export interface MetadataBadgeProps {
  metadata: TypedMetadata;
}

export const MetadataBadge = ({ metadata }: MetadataBadgeProps) => {
  const label = metadata.type
    ? { region: "R", site: "S" }[metadata.type]
    : null;
  return (
    <span className={"metadata-badge"} data-cy="metadataBadge">
      {metadata.key} = {metadata.value}
      {label && (
        <span data-cy="metadataTag" className={`metadata-tag ${metadata.type}`}>
          {label}
        </span>
      )}
    </span>
  );
};
