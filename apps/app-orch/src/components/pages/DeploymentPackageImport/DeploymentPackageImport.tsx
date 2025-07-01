/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CatalogUploadDeploymentPackageResponse,
  useUploadDeploymentPackageMutation,
} from "@orch-ui/apis";
import {
  DragDrop,
  Empty,
  setBreadcrumb,
  SquareSpinner,
  UploadButton,
} from "@orch-ui/components";
import {
  checkSize,
  filterFilesByExtension,
  SharedStorage,
} from "@orch-ui/utils";
import {
  Button,
  Heading,
  Icon,
  Item,
  List,
  MessageBanner,
} from "@spark-design/react";
import { ButtonVariant, ListSize } from "@spark-design/tokens";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deploymentPackageBreadcrumb,
  homeBreadcrumb,
  importDeploymentPackageBreadcrumb,
} from "../../../routes/const";
import { useAppDispatch } from "../../../store/hooks";
import "./DeploymentPackageImport.scss";

const dataCy = "deploymentPackageImport";

export type Result = {
  filename: string;
  status: "success" | "failed";
  errors: string[];
};

const DeploymentPackageImport = () => {
  const cy = { "data-cy": dataCy };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const breadcrumb = useMemo(
    () => [
      homeBreadcrumb,
      deploymentPackageBreadcrumb,
      importDeploymentPackageBreadcrumb,
    ],
    [],
  );

  const [uploadPackage, { isSuccess, isLoading, isError }] =
    useUploadDeploymentPackageMutation();

  const [files, setFiles] = useState<File[]>([]);
  const [sizeError, setSizeError] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string>("");

  useEffect(() => {
    dispatch(setBreadcrumb(breadcrumb));
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSizeError(!checkSize([...e.target.files], 4));
      setFiles([
        ...files,
        ...filterFilesByExtension([...e.target.files], ["yaml", "tar.gz"]),
      ]);
    }
  };

  const handleUpload = () => {
    if (files.length === 0) {
      return;
    }
    const data = new FormData();
    files.forEach((file) => {
      data.append("files", file, file.name);
    });

    uploadPackage({
      projectName: SharedStorage.project?.name ?? "",
      data,
    })
      .unwrap()
      .then(() => {
        setTimeout(() => {
          navigate("/applications/packages");
        }, 3000);
      })
      .catch((res: { data: CatalogUploadDeploymentPackageResponse }) => {
        const resLength: number =
          res.data.responses && Array.isArray(res.data.responses)
            ? res.data.responses.length
            : 0;
        const errMsg =
          resLength === 0
            ? "unknown issue"
            : (res.data.responses[resLength - 1].errorMessages?.[0] ??
              "unknown issue");
        setApiError(errMsg);
      });
  };

  return (
    <div {...cy} className="deployment-package-import">
      {isLoading && (
        <div className="spinner-container">
          <SquareSpinner message="Importing Deployment Package" />
        </div>
      )}
      <Heading semanticLevel={1} size="l" data-cy="title">
        Import Deployment Package
      </Heading>
      <Heading semanticLevel={2} size="xs" data-cy="subTitle">
        Select files to import a new deployment package
      </Heading>
      {sizeError && (
        <MessageBanner
          messageTitle="File size over 4MB"
          messageBody="The file you chose to import the deployment package is invalid. Select a valid file and then retry."
          variant="error"
          showIcon
          showClose
        />
      )}
      {(isError || isSuccess) && (
        <MessageBanner
          messageTitle={isError ? "Failed to import" : "Imported successfully"}
          messageBody={
            isError
              ? apiError
              : "Imported successfully, redirecting you back to package page"
          }
          variant={isError ? "error" : "success"}
          showIcon
          showClose
        />
      )}
      <DragDrop
        currentFiles={files}
        setFiles={setFiles}
        handleError={(files) => {
          setSizeError(!checkSize(files, 4));
        }}
        acceptedFileTypes={["yaml", "tar.gz"]}
      >
        <>
          {files.length === 0 ? (
            <div className="deployment-package-import-empty">
              <Empty
                title="Drag and Drop to Upload Files or Folder"
                subTitle="or"
                actions={[
                  {
                    component: (
                      <UploadButton
                        text="Browse folder"
                        onChange={handleFileChange}
                        accept=".yaml,.tar.gz"
                        dataCy="uploadButtonEmpty"
                      />
                    ),
                  },
                ]}
                dataCy="deploymentPackageImportEmpty"
                icon="document-plus"
              />
              <Button
                onPress={() => navigate("/applications/packages")}
                variant={ButtonVariant.Primary}
                data-cy="cancelButton"
              >
                Cancel
              </Button>
            </div>
          ) : (
            <div className="deployment-package-import-files">
              <UploadButton
                onChange={handleFileChange}
                accept=".yaml,.tar.gz"
                dataCy="uploadButtonList"
              />
              <div className="upload-files">
                <List size={ListSize.L} data-cy="fileList">
                  {files.map((file: File, i) => (
                    <Item key={i}>
                      {file.name}
                      <Icon
                        icon="trash"
                        onClick={() => {
                          const currentFiles = [...files];
                          currentFiles.splice(i, 1);
                          setFiles(currentFiles);
                        }}
                        data-cy={`deleteFile${i}`}
                      />
                    </Item>
                  ))}
                </List>
              </div>
              <div className="footer-buttons">
                <Button
                  onPress={() => navigate("/applications/packages")}
                  variant={ButtonVariant.Primary}
                  data-cy="cancelButton"
                >
                  Cancel
                </Button>
                <Button
                  onPress={handleUpload}
                  data-cy="importButton"
                  isDisabled={isSuccess}
                >
                  Import
                </Button>
              </div>
            </div>
          )}
        </>
      </DragDrop>
    </div>
  );
};

export default DeploymentPackageImport;
