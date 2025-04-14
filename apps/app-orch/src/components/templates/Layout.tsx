/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CollapsableList,
  CollapsableListItem,
  getActiveNavItem,
  getBreadcrumbData,
  LPBreadcrumb,
  SidebarMain,
} from "@orch-ui/components";
import "@orch-ui/styles/Global.scss";
import "@orch-ui/styles/spark-global.scss";
import "@orch-ui/styles/transitions.scss";
import { innerTransitionTimeout } from "@orch-ui/utils";
import { Toast } from "@spark-design/react";
import { ToastVisibility } from "@spark-design/tokens";
import { Provider } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { menuItems } from "../../routes/const";
import { store } from "../../store";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getToastProps, setProps } from "../../store/reducers/toast";
import "./Layout.scss";

export const datacyComponentSelector = "appOrchLayout";
const Layout = () => {
  // Router transitions https://tinyurl.com/2u8kwvk8
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const activeItem = useAppSelector(getActiveNavItem);
  const breadcrumbPieces = useAppSelector(getBreadcrumbData);

  const onSelectMenuItem = (item: CollapsableListItem<string>) => {
    if (item.route) {
      navigate(item.route);
    }
  };
  const toastProps = useAppSelector(getToastProps);
  const activePath = location.pathname;

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
            <LPBreadcrumb breadcrumbPieces={breadcrumbPieces} />
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

            {toastProps.visibility === ToastVisibility.Show && (
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
            )}
          </>
        }
      />
    </div>
  );
};

export default () => (
  <Provider store={store}>
    <Layout />
  </Provider>
);
