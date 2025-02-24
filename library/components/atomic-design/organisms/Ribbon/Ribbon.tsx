/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import type { Icon as IconType } from "@spark-design/iconfont";
import { Button, Heading, Icon, TextField, Tooltip } from "@spark-design/react";
import {
  ButtonSize,
  ButtonVariant,
  HeaderSize,
  InputSize,
} from "@spark-design/tokens";
import { debounce } from "lodash";
import "./Ribbon.scss";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Popup, PopupOption } from "../../atoms/Popup/Popup";

export interface RibbonButtonProps {
  text: string;
  onPress?: () => void;
  disable?: boolean;
  tooltip?: string;
  tooltipIcon?: IconType;
  variant?: ButtonVariant;
  /**
   * Boolean to control if we want to hide this button into tripple dot dropdown
   */
  hide?: boolean;
  dataCy?: string;
  iconOnly?: boolean;
  icon?: IconType;
  tooltipPlacement?: "left" | "top";
}

export interface RibbonProps {
  searchTooltip?: string;
  defaultValue?: string;
  onSearchChange?: (value: string) => void;
  buttons?: RibbonButtonProps[];
  customButtons?: JSX.Element;
  subtitle?: string;
  showSearch?: boolean;
}
export const Ribbon = ({
  searchTooltip,
  onSearchChange,
  defaultValue,
  buttons = [],
  customButtons,
  subtitle,
  showSearch = true,
}: RibbonProps) => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState<string>(
    searchParams.get("searchTerm") ?? "",
  );
  const hasButton = buttons.length > 0;
  const hasMoreIcon = buttons.some((button) => button.hide === true);
  const options = () => {
    const result: PopupOption[] = [];
    buttons.map((button) => {
      if (button.hide === true && button.onPress) {
        result.push({
          displayText: button.text,
          onSelect: button.onPress,
          disable: button.disable,
        });
      }
    });
    return result;
  };

  // Memoize the debounced function
  const debouncedSearch = useCallback(
    debounce((query) => {
      if (onSearchChange) {
        onSearchChange(query);
      }
    }, 1500),
    [onSearchChange], // Dependencies for useCallback
  );

  // Effect to send search request when user stop typing for 1.5 seconds
  useEffect(() => {
    debouncedSearch(search);

    // Cleanup function to cancel the debounced call if the component unmounts
    // or if the dependencies change
    return () => {
      debouncedSearch.cancel();
    };
  }, [search]);

  const getButton = (
    button: RibbonButtonProps,
    index: number,
    icon: boolean,
  ) => {
    const buttonProps = {
      isDisabled: button.disable,
      "aria- label": "action button",
      onPress: () => {
        if (button.onPress) {
          button.onPress();
        }
      },
      iconOnly: icon,
      variant: button.variant,
      size: ButtonSize.Large,
      key: `btn${index}`,
    };
    return (
      <Button {...buttonProps} data-cy={button.dataCy ?? "button"}>
        {icon ? <Icon icon={button.icon} /> : button.text}
      </Button>
    );
  };

  const getTextField = () => (
    <TextField
      aria-label="search table"
      type="search"
      startIcon="magnifier"
      placeholder="Search"
      defaultValue={defaultValue}
      onChange={(searchValue: string) => setSearch(searchValue)}
      size={InputSize.Large}
      data-cy="search"
    />
  );

  return (
    <div data-cy="ribbon" className="ribbon">
      {subtitle && showSearch && (
        <div className="subtitle-full">
          <Heading
            semanticLevel={4}
            size={HeaderSize.Medium}
            data-cy="subtitle"
          >
            {subtitle}
          </Heading>
        </div>
      )}
      <div className="ribbon-all">
        <div className="ribbon-item-left" data-cy="leftItem">
          {!showSearch && (
            <Heading
              semanticLevel={4}
              size={HeaderSize.Medium}
              data-cy="subtitle"
            >
              {subtitle}
            </Heading>
          )}

          {showSearch ? (
            searchTooltip ? (
              <Tooltip
                className="tooltip"
                content={searchTooltip}
                placement="top"
                data-cy="searchTooltip"
              >
                {getTextField()}
              </Tooltip>
            ) : (
              getTextField()
            )
          ) : (
            <></>
          )}
        </div>
        <div className="ribbon-item-right" data-cy="rightItem">
          {hasButton ? (
            <>
              {hasMoreIcon && (
                <Popup
                  dataCy="popupButtons"
                  options={options()}
                  jsx={
                    <Icon
                      className="spark-button spark-button-primary spark-button-size-l"
                      icon="ellipsis-v"
                      data-cy="ellipsisButton"
                    />
                  }
                />
              )}

              {buttons.map((button, index) => {
                return (
                  !button.hide &&
                  (button.tooltip ? (
                    <Tooltip
                      placement={
                        button.tooltipPlacement || button.disable
                          ? "left"
                          : "top"
                      }
                      content={button.tooltip}
                      data-cy="buttonTooltip"
                      icon={
                        button.tooltipIcon && (
                          <Icon
                            artworkStyle="solid"
                            icon={button.tooltipIcon}
                          />
                        )
                      }
                      key={`tooltip${index}`}
                    >
                      {getButton(button, index, button.iconOnly ?? false)}
                    </Tooltip>
                  ) : (
                    getButton(button, index, button.iconOnly ?? false)
                  ))
                );
              })}
            </>
          ) : customButtons ? (
            <>{customButtons}</>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
