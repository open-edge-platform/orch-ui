/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import "./ExpansionPanel.scss";

const dataCy = "expansionPanel";

export interface ExpansionPanelProps
  extends React.HTMLAttributes<HTMLDetailsElement> {
  title: string;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  children?: React.ReactNode;
}

export const ExpansionPanel = ({
  title,
  isOpen = false,
  onToggle,
  children,
  ...rest
}: ExpansionPanelProps) => {
  const cy = { "data-cy": dataCy };
  const className = "expansion-panel";

  const [open, setOpen] = React.useState<boolean>(isOpen);

  const handleToggle = (e: React.SyntheticEvent<HTMLDetailsElement>) => {
    const isOpen = e.currentTarget.open;
    setOpen(isOpen);
    onToggle?.(isOpen);
  };

  return (
    <details
      {...cy}
      className={className}
      open={open}
      onToggle={handleToggle}
      {...rest}
    >
      <summary className={`${className}__title`}>{title}</summary>
      <article className={`${className}__content`}>{children}</article>
    </details>
  );
};
