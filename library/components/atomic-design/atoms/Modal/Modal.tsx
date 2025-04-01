/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Button, ButtonGroup } from "@spark-design/react";
import { ButtonVariant, ModalSize } from "@spark-design/tokens";
import { ReactNode } from "react";
import { ModalHeader } from "./ModalHeader";

import "./Modal.scss";

const dataCy = "modal";
const cssSelector = "content-modal-footer";

export interface ModalProps {
  /**
   * Whether the dialog is open or not
   */
  open: boolean;
  /*
   * handler to close the dialog
   */
  onRequestClose?: () => void;
  /*
   * handler called on click of secondary button
   */
  onSecondarySubmit?: () => void;
  /*
   * handler called on click of primary button
   */
  onRequestSubmit?: () => void;
  /*
   *  Main title for the dialog, defaults is no title
   */
  modalHeading?: string;
  /*
   *  label for the dialog, defaults is no label
   */
  modalLabel?: string;
  /*
   * Size of the modal, it could be small, medium or Large
   */
  size?: ModalSize;
  /*
   * Text for primary button
   */
  primaryButtonText?: string;
  /*
   * Text for secondary button
   */
  secondaryButtonText?: string;
  /*
   * className prop for primary button
   */
  primaryButtonClassName?: string;
  /*
   * className prop for secondary button
   */
  secondaryButtonClassName?: string;
  /**
   * Interactive html content for dialog rendered in modal body
   */
  children: ReactNode;
  /*
   * ClassName to be applied to the modal root
   */
  className?: string; // Root className
  /*
   * - Whether the modal should be button-less.
   * - If passiveModal is set to true, default footer buttons will not be rendered
   * Note:
   * - If the footerContent prop is received, it will be rendered as footer
   *   ...even if passiveModal is set to true
   *
   */
  passiveModal?: boolean;
  /*
   * Whether primary button should be disabled
   */
  primaryButtonDisabled?: boolean;
  /*
   * Whether secondary button should be disabled
   */
  secondaryButtonDisabled?: boolean;
  /*
   * Jsx content for the footer, if the design requires
     to differ from default buttons rendered
     Note: If the footerContent prop is received, it will be rendered as footer instead of default footer
   */
  footerContent?: ReactNode;
  /*
   * Whether the close icon should appear
   */
  isDimissable?: boolean;
  /**
   * Variant for the primary button, defaults to "ButtonVariant.Primary"
   */
  primaryBtnVariant?: ButtonVariant;
  /**
   * Variant for the secondary button, defaults to "ButtonVariant.Secondary"
   */
  secondaryBtnVariant?: ButtonVariant;
  /*
   * ClassName for the Header title
   */
  modalHeadingClassName?: string;
  buttonPlacement?:
    | "left"
    | "left-reverse"
    | "center"
    | "center-reverse"
    | "right"
    | "right-reverse"
    | "spread"
    | "spread-reverse";
}

export const Modal = ({
  open,
  onRequestClose,
  onSecondarySubmit,
  onRequestSubmit,
  modalHeading,
  modalHeadingClassName,
  modalLabel,
  size = ModalSize.Medium,
  buttonPlacement,
  primaryButtonText,
  secondaryButtonText,
  primaryButtonClassName = "",
  secondaryButtonClassName = "",
  children,
  className = "",
  passiveModal = false,
  primaryButtonDisabled = false,
  secondaryButtonDisabled = false,
  footerContent,
  isDimissable = true,
  primaryBtnVariant = ButtonVariant.Primary,
  secondaryBtnVariant = ButtonVariant.Secondary,
}: ModalProps) => {
  const cy = { "data-cy": dataCy };
  const sizeClass = `spark-modal-size-${size}`;

  return open ? (
    <div {...cy}>
      <div className="spark-modal-backdrop" />
      <dialog className="spark-modal-wrapper" aria-modal>
        <div className={`spark-modal ${sizeClass} ${className}`}>
          <div className="spark-modal-grid">
            {/* Dialog Header */}
            <ModalHeader
              modalHeadingClassName={modalHeadingClassName}
              modalHeading={modalHeading}
              onClose={() => {
                if (onRequestClose) onRequestClose();
              }}
              size={size}
              modalLabel={modalLabel}
              isDimissable={isDimissable}
            />

            {/* Dialog body */}
            <div className="spark-modal-content">{children}</div>

            {/* Dialog footer */}
            <div className="spark-modal-footer">
              {footerContent
                ? footerContent
                : !passiveModal && (
                    <ButtonGroup
                      data-cy="footerBtnGroup"
                      className={`${cssSelector}__actions${
                        buttonPlacement ? ` ${buttonPlacement}` : ""
                      }`}
                    >
                      <Button
                        className={`modal-button ${primaryButtonClassName}`}
                        variant={primaryBtnVariant}
                        onPress={() => {
                          if (onRequestSubmit) onRequestSubmit();
                        }}
                        data-cy="primaryBtn"
                        isDisabled={primaryButtonDisabled}
                      >
                        {primaryButtonText}
                      </Button>
                      <Button
                        className={`modal-button ${secondaryButtonClassName}`}
                        variant={secondaryBtnVariant}
                        onPress={() => {
                          if (onSecondarySubmit) onSecondarySubmit();
                        }}
                        data-cy="secondaryBtn"
                        isDisabled={secondaryButtonDisabled}
                      >
                        {secondaryButtonText}
                      </Button>
                    </ButtonGroup>
                  )}
            </div>
          </div>
        </div>
      </dialog>
    </div>
  ) : null;
};
