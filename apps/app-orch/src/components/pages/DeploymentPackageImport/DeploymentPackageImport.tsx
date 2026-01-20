/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  catalog,
  CatalogUploadDeploymentPackageResponse,
  useUploadDeploymentPackageMutation,
} from "@orch-ui/apis";
import {
  ConfirmationDialog,
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
import * as yaml from "js-yaml";
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
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);
  const [duplicatePackages, setDuplicatePackages] = useState<string[]>([]);

  // Fetch existing deployment packages to check for duplicates
  const { data: existingPackages } =
    catalog.useCatalogServiceListDeploymentPackagesQuery(
      {
        projectName: SharedStorage.project?.name ?? "",
        pageSize: 500,
      },
      {
        skip: !SharedStorage.project?.name,
      },
    );

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

  // Extract package name and version from tar.gz filename
  const extractPackageInfoFromFilename = (
    filename: string,
  ): { name: string; version: string } => {
    // Remove .tar.gz extension
    const nameWithVersion = filename.replace(/\.tar\.gz$/, "");

    // Try to extract version pattern (e.g., -1.0.0, -v1.0.0, -1.0.0-alpha)
    const versionMatch = nameWithVersion.match(/-v?(\d+\.\d+\.\d+[^\s]*)$/);

    if (versionMatch) {
      const version = versionMatch[1];
      const name = nameWithVersion.substring(
        0,
        nameWithVersion.length - versionMatch[0].length,
      );
      return { name, version };
    }

    // If no version found, return the whole name as package name with empty version
    return { name: nameWithVersion, version: "" };
  };

  // Parse YAML file content to extract name and version
  const parseYamlFile = async (
    file: File,
  ): Promise<{ name: string; version: string } | null> => {
    try {
      const text = await file.text();
      const parsed = yaml.load(text) as any;

      // Extract name and version from the YAML content
      const name = parsed?.metadata?.name || parsed?.name || "";
      const version = parsed?.spec?.version || parsed?.version || "";

      return { name, version };
    } catch (error) {
      console.error("Error parsing YAML file:", error);
      return null;
    }
  };

  // Check if any uploaded files match existing packages by name AND version
  const checkForDuplicates = async (): Promise<string[]> => {
    if (!existingPackages?.deploymentPackages) {
      return [];
    }

    const duplicates = new Set<string>();
    const existingPackageMap = new Map(
      existingPackages.deploymentPackages.map((pkg) => [
        `${pkg.name}:${pkg.version}`,
        pkg,
      ]),
    );

    for (const file of files) {
      let name = "";
      let version = "";

      // For YAML files, parse the content
      if (file.name.endsWith(".yaml")) {
        const packageInfo = await parseYamlFile(file);
        if (packageInfo) {
          name = packageInfo.name;
          version = packageInfo.version;
        }
      } else if (file.name.endsWith(".tar.gz")) {
        // For tar.gz files, extract from filename
        const packageInfo = extractPackageInfoFromFilename(file.name);
        name = packageInfo.name;
        version = packageInfo.version;
      }

      if (name && version) {
        const key = `${name}:${version}`;
        if (existingPackageMap.has(key)) {
          duplicates.add(`${name} (v${version})`);
        }
      }
    }

    return Array.from(duplicates);
  };

  const handleUploadClick = async () => {
    const duplicates = await checkForDuplicates();
    if (duplicates.length > 0) {
      setDuplicatePackages(duplicates);
      setShowConfirmDialog(true);
    } else {
      handleUpload();
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
      {showConfirmDialog && (
        <ConfirmationDialog
          key={`confirm-${Date.now()}`}
          isOpen={true}
          title="Duplicate Deployment Package Detected"
          subTitle={`The following package(s) with the same name and version already exist: ${duplicatePackages.join(", ")}. This may overwrite existing packages. Do you still want to continue?`}
          confirmBtnText="Continue"
          cancelBtnText="Cancel"
          confirmCb={() => {
            setShowConfirmDialog(false);
            handleUpload();
          }}
          cancelCb={() => {
            setShowConfirmDialog(false);
          }}
        />
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
                        type="file"
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
                <List
                  size={ListSize.L}
                  data-cy="fileList"
                  aria-label="Uploaded files list"
                >
                  {files.map((file: File, i) => (
                    <Item key={i} textValue={file.name}>
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
                  onPress={handleUploadClick}
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
