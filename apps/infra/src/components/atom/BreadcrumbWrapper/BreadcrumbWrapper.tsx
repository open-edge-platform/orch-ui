/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { BreadcrumbPiece, setBreadcrumb } from "@orch-ui/components";
import { ComponentType, LazyExoticComponent } from "react";
import { infrastructureBreadcrumb } from "../../../routes/const";
import { useAppDispatch } from "../../../store/hooks";
const dataCy = "breadcrumbWrapper";

type RemoteComponent = LazyExoticComponent<ComponentType> | null;
export interface BreadcrumbWrapperProps {
  subComponent: RemoteComponent;
}

// TODO: ELEMENT JSX can accept any prop (even that does not exist)
/** This is a wrapper that will set the pass EIM/infrastructure breadcrumb to Cluster Orch component for breadcrumb display */
export const BreadcrumbWrapper = ({ subComponent }: BreadcrumbWrapperProps) => {
  const cy = { "data-cy": dataCy };

  const dispatch = useAppDispatch();

  const JsxElement = subComponent;

  return (
    <div {...cy} className="breadcrumb-wrapper">
      {JsxElement && (
        <JsxElement
          // @ts-ignore
          setBreadcrumb={(breadcrumbs: BreadcrumbPiece[]) =>
            dispatch(
              setBreadcrumb(
                breadcrumbs.map((breadcrumb) => ({
                  ...breadcrumb,
                  link:
                    breadcrumb.link !== "/dashboard"
                      ? `${
                          infrastructureBreadcrumb.link
                        }/${breadcrumb.link.replace("../../", "")}`
                      : breadcrumb.link,
                })),
              ),
            )
          }
        />
      )}
    </div>
  );
};
