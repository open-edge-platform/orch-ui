/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import React, { useEffect, useRef, useState } from "react";
import "./Popover.scss";
export const dataCy = "popover";
interface PopoverProps {
  children: React.ReactNode;
  content: React.ReactNode;
  placement?: "top" | "right" | "bottom" | "left";
  contentRootClassName?: string; // style to apply for content-root
  popoverArrowClassName?: string; // style to apply for arrow
}
const Popover = ({
  children,
  content,
  placement = "right",
  contentRootClassName = "",
  popoverArrowClassName = "",
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

  useEffect(() => {
    if (show) {
      adjustPlacement();
    }
  }, [show, placement]);

  return (
    <div {...cy} className="popover" ref={popoverRef}>
      <div onClick={() => setShow(!show)}>{children}</div>
      <div
        data-cy="popover-content"
        ref={contentRef}
        className={`popover-content ${show ? "show" : ""} ${adjustedPlacement} ${contentRootClassName}`}
      >
        {content}
        <div
          className={`popover-arrow ${adjustedPlacement} ${popoverArrowClassName}`}
        />
      </div>
    </div>
  );
};

export default Popover;
