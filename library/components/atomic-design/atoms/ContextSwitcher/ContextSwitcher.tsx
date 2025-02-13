/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { Button, ButtonGroup } from "@spark-design/react";
import { ButtonVariant } from "@spark-design/tokens";
import { useState } from "react";
import "./ContextSwitcher.scss";

export const dataCy = "contextSwitcher";

interface ContextSwitcherProps {
  tabButtons: string[];
  defaultName?: string;
  onSelectChange?: (selectedName: string) => void;
}

export const ContextSwitcher = ({
  tabButtons,
  defaultName = "",
  onSelectChange,
}: ContextSwitcherProps) => {
  const cy = { "data-cy": dataCy };

  const [isActive, setIsActive] = useState<string>(defaultName);

  return (
    <div {...cy} className="context-switcher">
      <ButtonGroup>
        {tabButtons.map((buttonItem) => (
          <Button
            className={"context-switcher__button-container".concat(
              isActive === buttonItem ? " active" : "",
            )}
            data-cy={`${buttonItem}`}
            variant={
              isActive === buttonItem
                ? ButtonVariant.Action
                : ButtonVariant.Ghost
            }
            onPress={() => {
              setIsActive(buttonItem);
              if (onSelectChange) onSelectChange(buttonItem);
            }}
          >
            {buttonItem}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};
