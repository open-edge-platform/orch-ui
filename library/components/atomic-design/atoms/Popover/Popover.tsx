/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Button, Icon, Text } from "@spark-design/react";
import { ButtonSize, ButtonVariant } from "@spark-design/tokens";
import React, { useEffect, useRef, useState } from "react";
import "./Popover.scss";
export const dataCy = "popover";
export interface PopoverProps {
  children: React.ReactNode;
  content: React.ReactNode;
  placement?: "top" | "right" | "bottom" | "left";
  contentRootClassName?: string; // style to apply for content-root
  popoverArrowClassName?: string; // style to apply for arrow
  onToggle?: (isToggled: boolean) => void;
  title?: string;
}
export const Popover = ({
  children,
  content,
  placement = "right",
  contentRootClassName = "",
  popoverArrowClassName = "",
  onToggle,
  title = "",
}: PopoverProps) => {
  const cy = { "data-cy": dataCy };

  const [show, setShow] = useState(false);
  const [adjustedPlacement, setAdjustedPlacement] = useState(placement);
  const popoverRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node)
    ) {
      setShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (onToggle) onToggle(show);
  }, [show]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const adjustPlacement = () => {
    if (!contentRef.current) return;

    const contentRect = contentRef.current.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const spaceAbove = contentRect.top;
    const spaceBelow = windowHeight - contentRect.bottom;
    const spaceLeft = contentRect.left;
    const spaceRight = windowWidth - contentRect.right;

    let newPlacement = placement;

    if (placement === "top" && spaceAbove < contentRect.height) {
      newPlacement = "bottom";
    } else if (placement === "bottom" && spaceBelow < contentRect.height) {
      newPlacement = "top";
    } else if (placement === "left" && spaceLeft < contentRect.width) {
      newPlacement = "right";
    } else if (placement === "right" && spaceRight < contentRect.width) {
      newPlacement = "left";
    }

    setAdjustedPlacement(newPlacement);
  };

  /*
   TODO: Needs more debugging to have dynamic placements
   when available space is lesser for popover
   */
  // useEffect(() => {
  //   if (show) {
  //     adjustPlacement();
  //   }
  // }, [show, placement]);

  return (
    <div {...cy} className="popover" ref={popoverRef}>
      <div onClick={() => setShow(!show)} className="popover-trigger">
        {children}
      </div>
      {show && (
        <div
          data-cy="popoverContent"
          ref={contentRef}
          className={`popover-content ${adjustedPlacement} ${contentRootClassName}`}
        >
          <div className="popover-header">
            <Text className="title" data-cy="popoverTitle">
              {title}
            </Text>
            <Button
              size={ButtonSize.Small}
              variant={ButtonVariant.Ghost}
              aria-label="dismiss"
              onPress={() => setShow(!show)}
              iconOnly
              data-cy="closePopover"
            >
              <Icon altText="Close Modal" icon="cross" />
            </Button>
          </div>
          {content}
          <div
            className={`popover-arrow ${adjustedPlacement} ${popoverArrowClassName}`}
          />
        </div>
      )}
    </div>
  );
};

export default Popover;
