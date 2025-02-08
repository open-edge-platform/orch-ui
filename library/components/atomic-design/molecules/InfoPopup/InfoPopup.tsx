/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { Button, Heading } from "@spark-design/react";
import React, { useEffect, useRef } from "react";

import { ButtonVariant } from "@spark-design/tokens";
import "./InfoPopup.scss";

export interface InfoPopupProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  buttonText?: string;
  isVisible: boolean;
  sourceSelector: string;
  buttonVariant?: ButtonVariant;
  onHide: () => void;
  onButtonClick?: () => void;
}

// FIXME export as default
export const InfoPopup: React.FC<InfoPopupProps> = ({
  title,
  children,
  className,
  buttonText = "OK",
  isVisible,
  sourceSelector,
  buttonVariant = ButtonVariant.Primary,
  onHide,
  onButtonClick = onHide,
}: InfoPopupProps) => {
  const el = useRef(null);
  const ip = "info-popup";

  const handleBodyClick = (e: any) => {
    const isClickOutside = e.target.closest(sourceSelector) === null;
    if (isClickOutside) {
      document.body.removeEventListener("click", handleBodyClick);
      onHide();
    }
  };

  useEffect(() => {
    if (isVisible) document.body.addEventListener("click", handleBodyClick);
    else document.body.removeEventListener("click", handleBodyClick);
  }, [isVisible]);

  if (!isVisible) {
    return <></>;
  }
  return (
    <div className={`${ip} ${className}`} ref={el} data-cy="infoPopup">
      {title && <Heading semanticLevel={3}>{title}</Heading>}
      {children}
      <Button
        data-cy="okButton"
        variant={buttonVariant}
        onPress={() => onButtonClick()}
      >
        {buttonText}
      </Button>
    </div>
  );
};
