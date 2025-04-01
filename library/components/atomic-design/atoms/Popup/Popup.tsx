/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Icon as IconType } from "@spark-design/iconfont";
import { Icon } from "@spark-design/react";
import { useEffect, useRef, useState } from "react";
import "./Popup.scss";

export interface PopupOption {
  displayText: string;
  onSelect: () => void;
  disable?: boolean;
  icon?: IconType;
}

export interface PopupProps {
  jsx: React.ReactNode;
  options: PopupOption[];
  dataCy?: string;
  onToggle?: (isToggled: boolean) => void;
}

export const Popup = ({
  jsx,
  options = [],
  dataCy = "popup",
  onToggle,
}: PopupProps) => {
  const ref = useRef<HTMLUListElement>(null);
  const [isShowing, setIsShowing] = useState<boolean>(false);

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      // Check if the click is outside of this (popup) component
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsShowing(false);
      }
    });
  }, []);

  useEffect(() => {
    if (onToggle) onToggle(isShowing);
  }, [isShowing]);

  const actionHandler = (option: PopupOption): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      try {
        option.onSelect();
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };

  return (
    <div className="popup" onClick={() => setIsShowing(true)} data-cy={dataCy}>
      {jsx}
      {isShowing && (
        <ul data-cy="list" className="popup__options" ref={ref}>
          {options.map((option: PopupOption, index: number) => {
            let icon: React.ReactElement | null = null;
            if (option.icon) {
              icon = <Icon icon={option.icon} />;
            }
            return (
              <li
                data-cy={option.displayText}
                key={index}
                className={
                  option.disable
                    ? "popup__option-item-disable"
                    : "popup__option-item"
                }
                onClick={() => {
                  if (!option.disable) {
                    actionHandler(option).then(() => {
                      setIsShowing(false);
                    });
                  }
                }}
              >
                {/* Temporary remove lock icon from disabled menu item */}
                {icon} {option.displayText}{" "}
                {/*option.disable && <Icon icon="lock" />*/}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
