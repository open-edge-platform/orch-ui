/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { clearAllStorageAndCookies, getUserToken } from "@orch-ui/utils";
import { Icon } from "@spark-design/react";
import { CSSProperties, ReactElement } from "react";
import { useAuth } from "react-oidc-context";
import { Link, useLocation } from "react-router-dom";
import { Popup } from "../../atoms/Popup/Popup";
import { ProjectSwitch } from "../../organisms/ProjectSwitch/ProjectSwitch";
import HeaderItem from "../HeaderItem/HeaderItem";
import { getDocsForUrl } from "./docMapper";
import "./Header.scss";
import { Logo } from "./Logo";
import { LogoSmall } from "./LogoSmall";

const dataCy = "header";

export enum HeaderSize {
  Large = "l",
  Medium = "m",
  Small = "s",
}

interface HeaderProps {
  size: HeaderSize;
  children?: ReactElement | ReactElement[];
  style?: CSSProperties;
}

export const Header = ({ size, children, style, ...rest }: HeaderProps) => {
  const cy = { "data-cy": dataCy };

  const { isAuthenticated, signoutRedirect, user, error } = useAuth();
  const location = useLocation();

  const calculateStyles = () => {
    switch (size) {
      case HeaderSize.Large:
        return {
          bannerHeight: 80,
          logoMargins: "1rem",
          dividerMargin: "1.875rem",
          projectNameMargins: "1.875rem 1rem",
          profileBtnMargins: "1.85rem 0",
          popupTopMargin: "5rem",
        };

      case HeaderSize.Medium:
        return {
          bannerHeight: 64,
          logoMargins: "0.75rem 1rem",
          dividerMargin: "1.375rem",
          projectNameMargins: "1.375rem 1rem",
          profileBtnMargins: "1.43rem 0",
          popupTopMargin: "4rem",
        };

      case HeaderSize.Small:
        return {
          bannerHeight: 48,
          logoMargins: "0.5rem",
          dividerMargin: "0.875rem",
          projectNameMargins: "0.875rem 1rem",
          profileBtnMargins: "0.9rem 0",
          popupTopMargin: "3rem",
        };
    }
  };

  const sizeStyles = calculateStyles();

  const bannerStyles = {
    ...style,
    height: sizeStyles.bannerHeight,
  };

  let profileButton = <></>;
  if (isAuthenticated && !error) {
    profileButton = (
      <Popup
        dataCy="profile"
        options={[
          {
            displayText: user?.profile?.name
              ? user.profile.name
              : (user?.profile?.preferred_username ?? ""),
            disable: true,
            onSelect: () => {},
          },
          {
            displayText: "Logout",
            onSelect: () => {
              clearAllStorageAndCookies();
              signoutRedirect({
                post_logout_redirect_uri: window.location.origin,
              });
            },
            icon: "sign-out",
          },
        ]}
        jsx={
          <Icon
            icon="user"
            style={{
              padding: sizeStyles.profileBtnMargins,
            }}
          />
        }
      />
    );
  }

  return (
    <header
      {...cy}
      role="banner"
      className="header"
      style={bannerStyles}
      {...rest}
    >
      <div className="ribbon"></div>
      <Link to="/">
        {size === HeaderSize.Small ? (
          <LogoSmall margin={sizeStyles.logoMargins} />
        ) : (
          <Logo margin={sizeStyles.logoMargins} />
        )}
      </Link>
      <div
        className="divider"
        style={{
          margin: `${sizeStyles.dividerMargin} 0`,
        }}
      ></div>
      {children}
      <div style={{ flexGrow: 1 }}></div>
      <ProjectSwitch
        isTokenAvailable={getUserToken() !== null}
        padding={sizeStyles.profileBtnMargins}
        topMargin={sizeStyles.popupTopMargin}
      />
      <HeaderItem
        name="menuDocumentation"
        to={getDocsForUrl(location.pathname)}
        blankLink
        size={size}
      >
        <Icon icon="help-circle" />
      </HeaderItem>
      <HeaderItem
        name="menuSettings"
        to="/admin"
        match={[
          "admin/projects",
          "admin/cluster-templates",
          "admin/alert-definitions",
          "admin/os-profiles",
          "admin/about",
        ]}
        size={size}
      >
        <Icon icon="gear" />
      </HeaderItem>

      {profileButton}
    </header>
  );
};

export default Header;
