/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ApiError,
  CollapsableList,
  CollapsableListItem,
  Flex,
  SidebarMain,
} from "@orch-ui/components";
import {
  checkAuthAndRole,
  getChildRoute,
  innerTransitionTimeout,
  Role,
  RuntimeConfig,
} from "@orch-ui/utils";
import { MessageBanner, Toast } from "@spark-design/react";
import { ToastVisibility } from "@spark-design/tokens";
import { useLocation, useNavigate, useOutlet } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { childRoutesWithRef } from "../../routes/routes";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { hideToast } from "../../store/notifications";
import "../../styles/Global.scss";
import "../../styles/spark-global.scss";
import "../../styles/transitions.scss";
import "./Layout.scss";

export const alertDefNavItem: CollapsableListItem<string> = {
  route: "alert-definitions",
  icon: "gear",
  value: "Alerts",
  divider: true,
};

export const clusterTemplatesNavItem: CollapsableListItem<string> = {
  route: "cluster-templates",
  icon: "globe",
  value: "Cluster Templates",
  divider: true,
};

export const osProfilesNavItem: CollapsableListItem<string> = {
  route: "os-profiles",
  icon: "globe",
  value: "OS Profiles",
  divider: true,
};

export const osUpdatePolicyNavItem: CollapsableListItem<string> = {
  route: "os-update-policy",
  icon: "globe",
  value: "OS Update Policy",
  divider: true,
};

export const projectsNavItem: CollapsableListItem<string> = {
  route: "projects",
  icon: "globe",
  value: "Projects",
  divider: true,
};

export const sshNavItem: CollapsableListItem<string> = {
  route: "ssh-keys",
  icon: "key",
  value: "SSH Keys",
  divider: true,
};

export const aboutNavItem: CollapsableListItem<string> = {
  route: "about",
  icon: "gear",
  value: "About",
  divider: true,
};

const Layout = () => {
  const cssComponentSelector = "orch-admin-layout";
  const datacyComponentSelector = "orchAdminLayout";

  // Router transitions https://tinyurl.com/2u8kwvk8
  const navigate = useNavigate();
  const location = useLocation();
  let { pathname } = location;
  pathname = pathname.slice(1);
  const currentOutlet = useOutlet();
  const { nodeRef } = getChildRoute(location, childRoutesWithRef);
  const dispatch = useAppDispatch();

  const onSelectMenuItem = (item: CollapsableListItem<string>) =>
    item.route && navigate(item.route);

  // ClusterOrch Notification system
  const {
    messageState,
    toastState: toast,
    errorInfo,
  } = useAppSelector((state) => state.notificationStatusList);

  const createMenuItems = () => {
    const items: CollapsableListItem<string>[] = [];
    if (
      checkAuthAndRole([
        Role.PROJECT_READ,
        Role.PROJECT_WRITE,
        Role.PROJECT_UPDATE,
        Role.PROJECT_DELETE,
      ])
    ) {
      items.push(projectsNavItem);
    }
    if (checkAuthAndRole([Role.ALERTS_READ, Role.ALERTS_WRITE])) {
      items.push(alertDefNavItem);
    }
    if (
      RuntimeConfig.isEnabled("CLUSTER_ORCH") &&
      checkAuthAndRole([
        Role.CLUSTER_TEMPLATES_WRITE,
        Role.CLUSTER_TEMPLATES_READ,
      ])
    ) {
      items.push(clusterTemplatesNavItem);
    }
    if (
      RuntimeConfig.isEnabled("INFRA") &&
      checkAuthAndRole([Role.INFRA_MANAGER_READ, Role.INFRA_MANAGER_WRITE])
    ) {
      items.push(osProfilesNavItem);
      items.push(sshNavItem);
      items.push(osUpdatePolicyNavItem);
    }

    items.push(aboutNavItem);
    return items;
  };
  const menuItems = createMenuItems();

  const getActiveItem = (): CollapsableListItem<string> | null => {
    if (pathname.includes("alert-definitions")) {
      return alertDefNavItem;
    }
    if (pathname.includes("about")) {
      return aboutNavItem;
    }
    if (pathname.includes("templates")) {
      return clusterTemplatesNavItem;
    }
    if (pathname.includes("os-profiles")) {
      return osProfilesNavItem;
    }
    if (pathname.includes("projects")) {
      return projectsNavItem;
    }
    if (pathname.includes("ssh-keys")) {
      return sshNavItem;
    }
    return null;
  };

  return (
    <SidebarMain
      sidebar={
        <CollapsableList
          items={menuItems}
          onSelect={onSelectMenuItem}
          expand={true}
          activeItem={getActiveItem()}
        />
      }
      main={
        <>
          <div className={`${cssComponentSelector}__mb-container`}>
            {/* Admin Notification system */}
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
              nodeRef={nodeRef}
              timeout={innerTransitionTimeout}
              classNames="page"
              unmountOnExit
            >
              {() => (
                <div ref={nodeRef} className="page">
                  {currentOutlet}
                </div>
              )}
            </CSSTransition>
          </SwitchTransition>
        </>
      }
    />
  );
};

export default Layout;
