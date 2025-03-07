/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CSSProperties, ReactElement } from "react";
import { Link, useLocation } from "react-router-dom";
import { HeaderSize } from "../Header/Header";
import "./HeaderItem.scss";

interface HeaderItemProps {
  to: string;
  size: HeaderSize;
  name?: string;
  match?: string | string[];
  matchRoot?: boolean;
  blankLink?: boolean;
  children: ReactElement | string;
  style?: CSSProperties;
}
export const HeaderItem = ({
  to,
  size,
  name = "headerItem",
  match = [],
  matchRoot = false,
  blankLink = false,
  style,
  children,
  ...rest
}: HeaderItemProps) => {
  const cy = { "data-cy": name };

  const location = useLocation();

  const target = blankLink ? "_blank" : "";

  const matchedRoot = matchRoot && location.pathname === "/";

  const matchedLocation =
    (Array.isArray(match) ? match : [match]).some((m) =>
      location.pathname.includes(m),
    ) || matchedRoot;

  const calculateStyles = () => {
    switch (size) {
      case HeaderSize.Large:
        return {
          height: 80,
          textMargin: `1.938rem 0 ${matchedLocation ? "1.5rem" : "1.938rem"}`,
        };
      case HeaderSize.Medium:
        return {
          height: 64,
          textMargin: `1.438rem 0 ${matchedLocation ? "1rem" : "1.438rem"}`,
        };
      case HeaderSize.Small:
        return {
          height: 48,
          textMargin: `0.938rem 0 ${matchedLocation ? "0.5rem" : "0.938rem"}`,
        };
    }
  };

  const sizeStyles = calculateStyles();

  const itemStyles = {
    ...style,
    height: sizeStyles.height,
  };

  return (
    <div {...cy} className="header-item" style={itemStyles} {...rest}>
      <Link
        data-cy="headerItemLink"
        to={to}
        target={target}
        style={{
          padding: sizeStyles.textMargin,
          borderBottom: "4px solid white",
        }}
      >
        {children}
      </Link>
    </div>
  );
};

export default HeaderItem;
