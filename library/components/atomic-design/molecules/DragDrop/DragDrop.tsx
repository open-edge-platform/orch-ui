/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { filterFilesByExtension } from "@orch-ui/utils";
import { DragEvent } from "react";

export interface DragDropProps {
  currentFiles?: File[];
  children?: JSX.Element;
  dataCy?: string;
  setFiles?: (files: File[]) => void;
  handleError?: (files: File[]) => void;
  handleSingleFile?: (event: any) => void;
  acceptedFileTypes?: string[];
}

export const DragDrop = ({
  currentFiles = [],
  setFiles,
  handleError,
  children,
  handleSingleFile,
  dataCy = "dragDropArea",
  acceptedFileTypes = ["yaml"],
}: DragDropProps) => {
  const getFilesPromises = (fileEntries: FileSystemFileEntry[]) => {
    const fileEntryPromises: Promise<File>[] = [];
    fileEntries.map((fe) => {
      const fep = new Promise<File>((resolve, reject) =>
        fe.file(resolve, reject),
      );
      fileEntryPromises.push(fep);
    });
    return fileEntryPromises;
  };

  const handleDrop = (
    e: DragEvent<HTMLDivElement>,
    setFiles?: (files: File[]) => void,
    handleError?: (files: File[]) => void,
  ) => {
    e.preventDefault();
    if (handleSingleFile) {
      if ([...e.dataTransfer.items][0].kind === "file") {
        const file = [...e.dataTransfer.items][0].getAsFile();
        if (file) handleSingleFile(file);
      }
    } else {
      const entry = e.dataTransfer.items[0].webkitGetAsEntry();
      if (entry?.isDirectory) {
        //@ts-ignore
        const reader = entry.createReader();
        reader.readEntries(function (entries: FileSystemFileEntry[]) {
          Promise.all(getFilesPromises([...entries]))
            .then((files: File[]) => {
              if (handleError) handleError(files);
              if (setFiles)
                setFiles([
                  ...currentFiles,
                  ...filterFilesByExtension(files, acceptedFileTypes),
                ]);
            })
            .catch(() => {
              throw new Error("File not uploaded correctly");
            });
        });
      } else {
        const { files } = e.dataTransfer;
        if (files.length > 0) {
          if (handleError) handleError([...files]);
          if (setFiles)
            setFiles([
              ...currentFiles,
              ...filterFilesByExtension([...files], acceptedFileTypes),
            ]);
        }
      }
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  return (
    <div
      onDrop={(e) => handleDrop(e, setFiles, handleError)}
      onDragOver={handleDragOver}
      data-cy={dataCy}
    >
      {children}
    </div>
  );
};
