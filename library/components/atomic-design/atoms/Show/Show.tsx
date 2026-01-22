/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
import { MFE, RuntimeConfig } from "@orch-ui/utils";
import React from "react";

interface ShowProps {
  /** The MFE that must be enabled for children to render */
  mfe?: MFE;
  /** Boolean condition - renders children when true */
  when?: boolean;
  /** Content to render when conditions are met */
  children: React.ReactNode;
}

/**
 * Conditionally renders children based on MFE availability or a boolean condition.
 * If both `mfe` and `when` are provided, both must be satisfied (AND logic).
 * If neither is provided, children are always rendered.
 */
export const Show = ({ mfe, when, children }: ShowProps) => {
  let shouldRender = when ?? true;

  if (mfe) {
    shouldRender = shouldRender && RuntimeConfig.isEnabled(mfe);
  }

  return shouldRender ? <>{children}</> : null;
};

type MfeShowProps = Omit<ShowProps, "mfe">;

export const AppOrchShow = (props: MfeShowProps) => (
  <Show {...props} mfe="APP_ORCH" />
);

export const InfraShow = (props: MfeShowProps) => (
  <Show {...props} mfe="INFRA" />
);

export const ClusterOrchShow = (props: MfeShowProps) => (
  <Show {...props} mfe="CLUSTER_ORCH" />
);

export const AdminShow = (props: MfeShowProps) => (
  <Show {...props} mfe="ADMIN" />
);
