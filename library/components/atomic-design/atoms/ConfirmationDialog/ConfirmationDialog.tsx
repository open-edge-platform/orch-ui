/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Button,
  ButtonGroup,
  Dialog,
  DialogTrigger,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@spark-design/react";
import { ButtonVariant, ModalSize } from "@spark-design/tokens";
import "./ConfirmationDialog.scss";
export const confirmationDialogdataCy = "confirmationDialog";

/**
 * ConfirmationDialogProps
 */
export interface ConfirmationDialogProps {
  /**
   * Whether the dialog is open or not
   */
  isOpen?: boolean;
  /**
   * Show the built in trigger button
   */
  showTriggerButton?: boolean;
  /**
   *
   */
  triggerButtonId?: string;
  /**
   * Callback invoked when the confirmation button is clicked
   */
  confirmCb?: () => void;
  /**
   * Text for the confirmation button, defaults to "Confirm"
   */
  confirmBtnText?: string;
  /**
   * Variant for the confirmation button, defaults to "ButtonVariant.Action"
   */
  confirmBtnVariant?: ButtonVariant;
  /**
   * Callback invoked when the cancel button is clicked
   */
  cancelCb?: () => void;
  /**
   * Text for the confirmation button, defaults to "Cancel"
   */
  cancelBtnText?: string;
  /**
   * Variant for the confirmation button, defaults to "ButtonVariant.Secondary"
   */
  cancelBtnVariant?: ButtonVariant;
  /**
   * Text for the confirmation button, defaults to "Cancel"
   */
  openBtnTxt?: string;
  /**
   * Variant for the confirmation button, defaults to "ButtonVariant.Secondary"
   */
  openBtnVariant?: ButtonVariant;
  /**
   * Main title for the dialog, defaults is no title
   */
  title?: string;
  /**
   * subTitle for the dialog, defaults is no subTitle
   */
  subTitle?: string;
  /**
   * Add interactive html content for confirmation dialog
   */
  content?: React.ReactNode;
  buttonPlacement?:
    | "left"
    | "left-reverse"
    | "center"
    | "center-reverse"
    | "right"
    | "right-reverse"
    | "spread"
    | "spread-reverse";

  size?: ModalSize;
}

/**
 * ConfirmationDialog
 * @param props
 */
export const ConfirmationDialog = ({
  isOpen = false,
  showTriggerButton = false,
  triggerButtonId = "open-confirmation-dialog",
  confirmCb,
  confirmBtnText = "Confirm",
  confirmBtnVariant = ButtonVariant.Action,
  cancelCb,
  cancelBtnText = "Cancel",
  cancelBtnVariant = ButtonVariant.Secondary,
  openBtnTxt = "Open",
  openBtnVariant = ButtonVariant.Action,
  content,
  title,
  subTitle,
  buttonPlacement,
  size = ModalSize.Small,
}: ConfirmationDialogProps) => {
  const cy = { "data-cy": confirmationDialogdataCy };
  const cssSelector = "confirmation-dialog";

  return (
    <div {...cy} className={cssSelector}>
      <DialogTrigger isDismissible defaultOpen={isOpen} size={size}>
        <Button
          id={triggerButtonId}
          data-cy="open"
          variant={openBtnVariant}
          style={{ display: showTriggerButton ? "block" : "none" }}
        >
          {openBtnTxt}
        </Button>
        {(close) => (
          <Dialog data-cy="dialog">
            {title && (
              <ModalHeader data-cy="title" title={title} subTitle={subTitle} />
            )}
            {content && <ModalBody content={content} data-cy="content" />}
            <ModalFooter>
              <ButtonGroup
                className={`${cssSelector}__actions${
                  buttonPlacement ? ` ${buttonPlacement}` : ""
                }`}
              >
                <Button
                  className="cd-button"
                  variant={cancelBtnVariant}
                  onPress={() => {
                    if (cancelCb) cancelCb();
                    close();
                  }}
                  data-cy="cancelBtn"
                >
                  {cancelBtnText}
                </Button>
                <Button
                  className="cd-button"
                  variant={confirmBtnVariant}
                  onPress={() => {
                    if (confirmCb) confirmCb();
                    close();
                  }}
                  data-cy="confirmBtn"
                >
                  {confirmBtnText}
                </Button>
              </ButtonGroup>
            </ModalFooter>
          </Dialog>
        )}
      </DialogTrigger>
    </div>
  );
};
