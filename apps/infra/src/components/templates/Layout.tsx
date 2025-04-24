/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ApiError,
  CollapsableList,
  CollapsableListItem,
  Flex,
  MessageBanner as _MessageBanner,
  SidebarMain,
} from "@orch-ui/components";
import {
  allClusterRoutes,
  allLocationRoutes,
  clusterManagementRoute,
  hasRole,
  hostsRoute,
  InfraRoute,
  innerTransitionTimeout,
  locationRoute,
  Role,
  RuntimeConfig,
} from "@orch-ui/utils";
import { MessageBanner, Toast } from "@spark-design/react";
import { ToastVisibility } from "@spark-design/tokens";
import { useEffect, useMemo } from "react";
import { matchPath } from "react-router";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { hideToast, setMessageBanner } from "../../store/notifications";
import "./Layout.scss";

const defaultNavItem: CollapsableListItem<string> = {
  icon: "minus",
  route: "",
  value: "",
};

const clusterNavItem: CollapsableListItem<string> = {
  ...defaultNavItem,
  route: clusterManagementRoute,
  icon: "globe",
  value: "Clusters",
  divider: true,
};

const hostsNavItem: CollapsableListItem<string> = {
  ...defaultNavItem,
  route: hostsRoute,
  value: "Hosts",
  isBold: false,
  divider: true,
};

const locationsNavItem: CollapsableListItem<string> = {
  ...defaultNavItem,
  route: locationRoute,
  icon: "cube-detached",
  value: "Locations",
  divider: true,
};

const createMenuItems = () => {
  const items: CollapsableListItem<string>[] = [];
  if (
    RuntimeConfig.isEnabled("CLUSTER_ORCH") &&
    hasRole([Role.CLUSTERS_READ, Role.CLUSTERS_WRITE])
  ) {
    items.push(clusterNavItem);
  }
  items.push(hostsNavItem, locationsNavItem);
  return items;
};

const selectActiveMenu = (activePath: string): CollapsableListItem<string> => {
  const cleanPath = activePath.replace(/\/infrastructure/g, "");

  const routeMatches = [
    { routes: allLocationRoutes, navItem: locationsNavItem },
    { routes: allClusterRoutes, navItem: clusterNavItem },
  ];

  const matchedItem = routeMatches.find(({ routes }) =>
    routes.some((route) => matchPath(route, cleanPath)),
  );

  return matchedItem?.navItem ?? hostsNavItem;
};
export const menuItems = createMenuItems();

export const datacyComponentSelector = "eimLayout";

const Layout = () => {
  const cssComponentSelector = "infrastructure-layout";

  const dispatch = useAppDispatch();

  // Router transitions https://tinyurl.com/2u8kwvk8
  const navigate = useNavigate();
  const location = useLocation();
  const activePath = location.pathname;
  const activeItem = useMemo(() => selectActiveMenu(activePath), [activePath]);

  // EIM Notification system
  const {
    messageBanner,
    messageBannerDuration,
    messageState,
    toastState: toast,
    errorInfo,
  } = useAppSelector((state) => state.notificationStatusList);

  const onSelectMenuItem = (item: CollapsableListItem<InfraRoute>) => {
    if (item.route) {
      navigate(item.route);
    }
  };

  useEffect(() => {
    if (!messageBanner || !messageBannerDuration) return;
    setTimeout(() => {
      dispatch(setMessageBanner(undefined));
    }, messageBannerDuration);
  }, [messageBanner]);

  return (
    <div data-cy={datacyComponentSelector}>
      <SidebarMain
        sidebar={
          !activePath.includes("/admin") ? (
            <CollapsableList
              items={menuItems}
              onSelect={onSelectMenuItem}
              expand={true}
              activeItem={activeItem}
            />
          ) : (
            <></>
          )
        }
        main={
          <div
            className={cssComponentSelector}
            style={
              !activePath.includes("/admin")
                ? {}
                : { margin: "-2rem", marginRight: "-2rem" }
            }
          >
            {messageBanner && (
              <_MessageBanner
                {...messageBanner}
                className="orch-message-banner"
                onClose={() => dispatch(setMessageBanner(undefined))}
              />
            )}
            <div className={`${cssComponentSelector}__mb-container`}>
              {/* EIM Notification system */}
              {messageState.showMessage && (
                /* Message Banner shown only when a host triggers `showMessageNotification()` */
                <div
                  className={`${cssComponentSelector}__message-banner`}
                  data-cy={`${datacyComponentSelector}MessageBanner`}
                >
                  <Flex cols={[8, 4]}>
                    <div></div>
                    <div
                      className={`${cssComponentSelector}__message-banner-box`}
                    >
                      <MessageBanner
                        variant={messageState.variant}
                        exposeColor="white"
                        showIcon
                        outlined
                        messageTitle={messageState.messageTitle}
                        messageBody={messageState.messageBody}
                        showClose
                      />
                    </div>
                  </Flex>
                </div>
              )}

              {toast.visibility === ToastVisibility.Show && (
                <Toast
                  {...toast}
                  onHide={() => {
                    dispatch(hideToast());
                  }}
                  style={{ position: "absolute", top: "-3rem" }}
                />
              )}
            </div>

            {errorInfo ? <ApiError error={errorInfo} /> : null}

            <SwitchTransition>
              <CSSTransition
                key={location.pathname}
                timeout={innerTransitionTimeout}
                classNames="page"
                unmountOnExit
              >
                <div className="page">
                  <Outlet />
                </div>
              </CSSTransition>
            </SwitchTransition>
          </div>
        }
      />
    </div>
  );
};

export default Layout;
