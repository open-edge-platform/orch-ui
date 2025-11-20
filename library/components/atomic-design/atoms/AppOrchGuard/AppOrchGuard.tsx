/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
import { RuntimeConfig } from "@orch-ui/utils";
import { MessageBanner } from "@spark-design/react";
import React from "react";

interface AppOrchGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const AppOrchGuard = ({ children, fallback }: AppOrchGuardProps) => {
  if (!RuntimeConfig.isEnabled("APP_ORCH")) {
    const content = fallback || (
      <MessageBanner
        showIcon
        variant="info"
        messageTitle="Feature Disabled"
        messageBody="App Orchestration is disabled"
        outlined
      />
    );

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
          minHeight: "200px",
        }}
      >
        {content}
      </div>
    );
  }
  return <>{children}</>;
};
