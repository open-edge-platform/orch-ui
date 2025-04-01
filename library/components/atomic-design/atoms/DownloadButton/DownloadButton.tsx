/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { downloadFile } from "@orch-ui/utils";
import { Button } from "@spark-design/react";
import { ButtonVariant } from "@spark-design/tokens";
interface DownloadButtonProps {
  data: string;
  text?: string;
  variant?: ButtonVariant;
}

export const DownloadButton = ({
  data,
  text = "Download",
  variant = ButtonVariant.Action,
}: DownloadButtonProps) => {
  const cy = { "data-cy": "downloadButton" };
  return (
    <Button
      {...cy}
      className="download-button"
      onPress={() => downloadFile(data)}
      variant={variant}
    >
      {text}
    </Button>
  );
};
