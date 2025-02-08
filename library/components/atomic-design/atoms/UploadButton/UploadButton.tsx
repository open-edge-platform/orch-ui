/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ButtonVariant } from "@spark-design/tokens";
import { ChangeEvent, useRef } from "react";

export interface UploadButtonProps {
  text?: string;
  accept?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  multiple?: boolean;
  type?: "file" | "folder";
  dataCy?: string;
  variant?: ButtonVariant;
  disabled?: boolean;
}

export const UploadButton = ({
  text = "Browse Files",
  accept,
  type = "folder",
  onChange,
  multiple = true,
  dataCy = "uploadButton",
  variant = ButtonVariant.Primary,
  disabled = false,
}: UploadButtonProps) => {
  const inputFolder = useRef<HTMLInputElement | null>(null);
  return (
    <div className="upload-button" data-cy={dataCy}>
      <form encType="multipart/form-data">
        <input
          type="file"
          id="upload"
          hidden
          onChange={onChange}
          multiple={multiple}
          disabled={disabled}
          accept={accept ? accept : "*"}
          data-cy="uploadInput"
          ref={
            type === "folder"
              ? (node) => {
                  inputFolder.current = node;
                  if (node) {
                    [
                      "webkitdirectory",
                      "directory",
                      "mozdirectory",
                      "msdirectory",
                      "odirectory",
                    ].forEach((attr) => {
                      node.setAttribute(attr, "");
                    });
                  }
                }
              : null
          }
        />
        <label
          className={`spark-button spark-button-${variant} spark-button-size-l ${disabled ? "spark-button-disabled" : ""}`}
          htmlFor="upload"
          data-cy="uploadBtn"
        >
          {text}
        </label>
      </form>
    </div>
  );
};
