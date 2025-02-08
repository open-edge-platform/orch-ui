/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CardBox } from "../../atoms/CardBox/CardBox";
import { MetadataBadge } from "../MetadataBadge/MetadataBadge";
import { MetadataPair } from "../MetadataForm/MetadataForm";
import "./MetadataDisplay.scss";

const dataCy = "MetadataDisplay";
interface MetadataDisplayProps {
  metadata: TypedMetadata[];
  flat?: boolean;
}

export interface TypedMetadata extends MetadataPair {
  type?: string;
}

/**
 * MetadataDisplay is responsible to render existing metatadata
 * As of now it renders a flat list of metadata, should eventually be extended to
 * support rendering the Metadata Source as well (once available)
 * @component
 * @example
 * const metadata = [{key: "customer", value: "intel"}];
 * return (
 *   <MetadataDisplay metadata={metadata} />
 * )
 */
export const MetadataDisplay = ({
  metadata,
  flat = false,
}: MetadataDisplayProps) => {
  const cy = { "data-cy": dataCy };
  return (
    <CardBox>
      <div {...cy} className="metadata-display">
        <div className={`card ${flat ? "flat" : ""}`}>
          {metadata.map((m) => (
            <MetadataBadge key={`${m.key}=${m.value}`} metadata={m} />
          ))}
        </div>
      </div>
    </CardBox>
  );
};
