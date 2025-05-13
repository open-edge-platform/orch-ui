/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CollapsableList,
  CollapsableListItem,
  SidebarMain,
} from "@orch-ui/components";
import "@orch-ui/styles/Global.scss";
import "@orch-ui/styles/spark-global.scss";
import "@orch-ui/styles/transitions.scss";
import { allClusterRoutes, innerTransitionTimeout } from "@orch-ui/utils";
import { Toast } from "@spark-design/react";
import { ToastVisibility } from "@spark-design/tokens";
import { useMemo } from "react";
import { matchPath, Outlet, useLocation, useNavigate } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getToastProps, setProps } from "../../store/reducers/toast";
import "./Layout.scss";

export const datacyComponentSelector = "clusterOrchLayout";

const clustersMenuItem: CollapsableListItem<string> = {
  route: "clusters",
  icon: "globe",
  value: "Clusters",
};

const clusterTemplatesMenuItem: CollapsableListItem<string> = {
  route: "cluster-templates",
  icon: "globe",
  value: "Cluster Templates",
};

const menuItems: CollapsableListItem<string>[] = [
  clustersMenuItem,
  clusterTemplatesMenuItem,
];

const selectActiveMenu = (activePath: string): CollapsableListItem<string> => {
  const cleanPath = activePath.replace(/\/cluster-orch/g, "");

  const routeMatches = [
    { routes: allClusterRoutes, menuItem: clustersMenuItem },
  ];

  const matchedItem = routeMatches.find(({ routes }) =>
    routes.some((route) => matchPath(route, cleanPath)),
  );

  return matchedItem?.menuItem ?? clusterTemplatesMenuItem;
};

const Layout = () => {
  // Router transitions https://tinyurl.com/2u8kwvk8
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const activePath = location.pathname;
  const activeItem = useMemo(() => selectActiveMenu(activePath), [activePath]);

  const onSelectMenuItem = (item: CollapsableListItem<string>) =>
    item.route && navigate(item.route);
  const toastProps = useAppSelector(getToastProps);

  return (
    <div data-cy={datacyComponentSelector}>
      <SidebarMain
        //TODO: Refactor the layout to support ma/mc/mi to be able to redirect to settings page
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
          <>
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
            <Toast
              data-cy="toast"
              {...toastProps}
              onHide={() => {
                dispatch(
                  setProps({
                    ...toastProps,
                    visibility: ToastVisibility.Hide,
                  }),
                );
              }}
              className={
                toastProps.visibility !== ToastVisibility.Show ? "d-none" : ""
              }
            />
          </>
        }
      />
    </div>
  );
};

export default Layout;
