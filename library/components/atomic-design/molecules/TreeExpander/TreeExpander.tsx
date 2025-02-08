/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { Icon } from "@spark-design/react";
import { useEffect } from "react";
import "./TreeExpander.scss";
export const dataCy = "treeExpander";
export const expandedLeafMessage =
  "Can't have an item that is both expandable and a leaf";

export interface TreeExpander {
  height: number;
  isExpanded?: boolean;
  isRoot?: boolean;
  isLeaf: boolean;
  onExpand: (isExpanded: boolean) => void;
}
export const TreeExpander = ({
  isExpanded = false,
  isRoot = false,
  ...rest
}: TreeExpander) => {
  const cy = { "data-cy": dataCy };
  const treeExpanderClass = "tree-expander";
  const iconHeight = 24;

  useEffect(() => {
    if (isExpanded && rest.isLeaf) throw new Error(expandedLeafMessage);
  }, []);

  const modifierExpansionCSS = () => {
    return isExpanded ? "--expanded" : "--collapsed";
  };

  return (
    <div {...cy} className={treeExpanderClass}>
      {!rest.isLeaf && (
        <div
          className={`${treeExpanderClass}__icon ${treeExpanderClass}__icon${modifierExpansionCSS()}`}
          style={{ height: `${rest.height / 2 + iconHeight / 2}px` }}
          data-cy="expander"
          onClick={() => rest.onExpand(!isExpanded)}
        >
          <Icon icon={"chevron-right"} />
        </div>
      )}

      {isExpanded && (
        <div
          className={`${treeExpanderClass}__vertical-connector`}
          data-cy="verticalConnector"
        />
      )}
      {!isRoot && !rest.isLeaf && (
        <div
          className={`${treeExpanderClass}__horizontal-connector`}
          style={{ top: `${rest.height / 2}px` }}
          data-cy="horizontalConnector"
        />
      )}
    </div>
  );
};
