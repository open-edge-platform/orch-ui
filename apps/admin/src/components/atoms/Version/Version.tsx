/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { RuntimeConfig } from "@orch-ui/utils";
import { Card, MessageBanner, Text } from "@spark-design/react";
import { MessageBannerAlertState, TextSize } from "@spark-design/tokens";
import { useEffect, useState } from "react";
import "./Version.scss";
const dataCy = "version";

const Version = () => {
  const cy = { "data-cy": dataCy };
  const [version, setVersion] = useState<string>();
  const [error, setError] = useState<string | object>();

  useEffect(() => {
    try {
      const v = RuntimeConfig.getComponentVersion("orchestrator");
      setVersion(v);
      setError(undefined);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(`${error}`);
      }
    }
  }, []);

  let jsx = (
    <Card fullWidth>
      <Text size={TextSize.Large} data-cy={"orchVersion"}>
        Version {version}
      </Text>
      <Text>Copyright 2025 Intel. All rights reserved.</Text>
    </Card>
  );

  if (error) {
    jsx = (
      <MessageBanner
        variant={MessageBannerAlertState.Error}
        messageTitle={error as string}
        messageBody={
          "Something went wrong while reading the orchestrator version from the Runtime Config. You can still find that information in ArgoCD"
        }
      />
    );
  }
  return (
    <div {...cy} className="version">
      {jsx}
    </div>
  );
};

export default Version;
