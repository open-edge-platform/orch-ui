/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Button, Icon } from "@spark-design/react";
import { ButtonSize, ButtonVariant } from "@spark-design/tokens";
import { useEffect, useState } from "react";
import { CollapsableListItem } from "./CollapsableList";

// import "./CollapsableListButton.scss";

interface CollapsableListButtonProps {
  menuItem: CollapsableListItem<string>;
  selectedItem: CollapsableListItem<string> | null;
  selectCb: (menuItem: CollapsableListItem<string>) => void;
  expanded: boolean; // whether the list is collapsed or not
  dataCy: string;
}

const CollapsableListButton = ({
  menuItem,
  selectedItem = null,
  selectCb,
  expanded = false,
  dataCy = "collapsableList",
}: CollapsableListButtonProps) => {
  // the root button is selected or not
  // only support 2-level menu for now
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (selectedItem?.parent === menuItem.value) {
      setSelected(true);
    }
    // collapse sub buttons if other buttons are selected
    else if (
      selectedItem?.value !== menuItem.value &&
      selectedItem?.parent !== menuItem.value
    ) {
      setSelected(false);
    }
  }, [selectedItem]);

  const buttonCssClass = `spark-button${
    selectedItem && selectedItem.value === menuItem.value ? "-selected" : ""
  }`.trim();
  return (
    <div data-cy={dataCy}>
      <Button
        className={`${buttonCssClass} ${(menuItem.isBold
          ? "bold"
          : ""
        ).trim()} ${(menuItem.isIndented ? "indented" : "").trim()}`}
        variant={ButtonVariant.Ghost}
        onPress={() => {
          if (menuItem.isClickable === false) return;
          selectCb(menuItem);
          setSelected(!selected);
        }}
        endSlot={
          menuItem.children && menuItem.children.length > 0 && expanded ? (
            <Icon
              icon={selected ? "chevron-up" : "chevron-down"}
              style={{ fontSize: "1rem" }}
            />
          ) : null
        }
        data-cy={menuItem.value}
        size={ButtonSize.Large}
      >
        <span className={"list-value"}>
          {expanded ? (
            menuItem.value
          ) : (
            <Icon style={{ fontSize: "1rem" }} icon={menuItem.icon} />
          )}
        </span>
      </Button>
      {menuItem.children ? (
        <div
          className={`collapsable-list__children ${
            !selected && "collapsable-list__children-hide"
          }`}
        >
          {menuItem.children.map((c, i) => (
            <div key={i}>
              {expanded ? (
                <Button
                  variant={ButtonVariant.Ghost}
                  size={ButtonSize.Large}
                  onPress={() => selectCb(c)}
                  className={
                    selectedItem && selectedItem.value === c.value
                      ? "spark-button-selected"
                      : "spark-button"
                  }
                  data-cy={c.value}
                >
                  {c.value}
                </Button>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default CollapsableListButton;
