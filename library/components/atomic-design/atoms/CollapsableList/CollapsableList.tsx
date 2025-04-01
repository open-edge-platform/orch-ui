/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Button, Icon } from "@spark-design/react";
import { ButtonSize } from "@spark-design/tokens";
import React, { useEffect, useState } from "react";

import { Icon as IconType } from "@spark-design/iconfont";
import "./CollapsableList.scss";
import CollapsableListButton from "./CollapsableListButton";

export interface CollapsableListItem<T> {
  route: T | null;
  icon: IconType;
  value: string | null;
  children?: CollapsableListItem<T>[];
  parent?: string;
  divider?: boolean;
  isClickable?: boolean;
  isBold?: boolean;
  isIndented?: boolean;
}

export interface CollapsableListProps {
  minWidth?: string | number;
  maxWidth?: string | number;
  expand?: boolean;
  onExpand?: (isShowing: boolean) => void;
  onSelect?: (item: CollapsableListItem<string>) => void;
  titleIcon?: string;
  items: CollapsableListItem<string>[];
  activeItem?: CollapsableListItem<string> | null;
  dataCy?: string;
}

export const CollapsableList = ({
  minWidth = "6rem",
  maxWidth = "16rem",
  onExpand,
  onSelect,
  expand = false,
  items = [],
  activeItem = null,
  dataCy = "collapsableList",
}: CollapsableListProps): JSX.Element => {
  const [selectedItem, setSelectedItem] =
    useState<CollapsableListItem<string> | null>(activeItem);
  const [isExpanded, setIsExpanded] = useState(expand);

  const toggle = (): void => {
    if (onExpand) onExpand(!isExpanded);
    setIsExpanded(!isExpanded);
  };
  const select = (item: CollapsableListItem<string>): void => {
    if (onSelect) onSelect(item);
    setSelectedItem(item);
  };

  // re-set selectedItem if `activeItem` is set by <Layout /> in individual orch project
  useEffect(() => {
    setSelectedItem(activeItem);
  }, [activeItem]);

  return (
    <div style={{ width: "inherit", height: "100%" }} data-cy={dataCy}>
      <aside
        className="collapsable-list"
        data-cy="aside"
        style={{ width: isExpanded ? maxWidth : minWidth }}
      >
        {items.map((item: CollapsableListItem<string>, index: number) => (
          <React.Fragment key={index}>
            <CollapsableListButton
              dataCy="collapsibleItem"
              menuItem={item}
              selectedItem={selectedItem}
              selectCb={select}
              expanded={isExpanded}
            />
            {item.divider ? (
              <div className="collapsable-list__divider"></div>
            ) : null}
          </React.Fragment>
        ))}

        <div className="collapsable-list__toggle">
          <Button
            onPress={() => toggle()}
            startSlot={
              <Icon
                style={{ color: "black" }}
                artworkStyle="solid"
                icon={`chevron-double-${isExpanded ? "left" : "right"}`}
              />
            }
            size={ButtonSize.Large}
          />
        </div>
      </aside>
    </div>
  );
};
