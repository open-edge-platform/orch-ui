/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ApiError,
  CollapsableList,
  CollapsableListItem,
  Flex,
  getActiveNavItem,
  getBreadcrumbData,
  LPBreadcrumb,
  MessageBanner as _MessageBanner,
  SidebarMain,
} from "@orch-ui/components";
import {
  hasRole,
  innerTransitionTimeout,
  Role,
  RuntimeConfig,
} from "@orch-ui/utils";
import { MessageBanner, Toast } from "@spark-design/react";
import { ToastVisibility } from "@spark-design/tokens";
import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import {
  clusterNavItem,
  hostsNavItem,
  IaaSRoute,
  locationsNavItem,
} from "../../routes/const";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { hideToast, setMessageBanner } from "../../store/notifications";
import "./Layout.scss";

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

export const menuItems = createMenuItems();

export const datacyComponentSelector = "eimLayout";

const Layout = () => {
  const cssComponentSelector = "infrastructure-layout";

  const dispatch = useAppDispatch();

  // Router transitions https://tinyurl.com/2u8kwvk8
  const navigate = useNavigate();
  const location = useLocation();
  const activeItem = useAppSelector(getActiveNavItem);
  const breadcrumbPieces = useAppSelector(getBreadcrumbData);
  const activePath = location.pathname;

  // EIM Notification system
  const {
    messageBanner,
    messageBannerDuration,
    messageState,
    toastState: toast,
    errorInfo,
  } = useAppSelector((state) => state.notificationStatusList);

  const onSelectMenuItem = (item: CollapsableListItem<IaaSRoute>) => {
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
            <LPBreadcrumb breadcrumbPieces={breadcrumbPieces} />

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
