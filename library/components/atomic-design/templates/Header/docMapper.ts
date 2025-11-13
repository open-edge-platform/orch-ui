/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { RuntimeConfig, stripTrailingSlash } from "@orch-ui/utils";

/**
 * Extracts major.minor version from orchestrator version string
 * @param {string} version - Version string like "v3.0.1-dev-b21fb28"
 * @returns {string} - Major.minor version like "3.0" or "main" if invalid
 */
function extractDocumentationVersion(version: string) {
  let docVersion = "main";

  if (!version) {
    return docVersion;
  }

  // Remove "v" prefix if present
  let cleanVersion = version;
  if (version.startsWith("v")) {
    cleanVersion = version.substring(1); // removes "v" prefix
  } else {
    // if orchestrator version is received other than "v" format return default
    return docVersion;
  }

  // Split by "-" to separate version from metadata
  const versionParts = cleanVersion.split("-"); //returns [3.0.1, dev, b21fb28]

  if (versionParts.length > 0) {
    // Split the version numbers by "."
    const numbers = versionParts[0].split("."); //returns [3, 0, 1]

    // Check if we have at least major and minor version
    if (numbers.length >= 2) {
      docVersion = `${numbers[0]}.${numbers[1]}`; // returns `3.0`
    }
  }

  return docVersion;
}

/**
 * Method to transform from url to doc link
 * @param url - pathname without search params (location.pathname)
 */
export const getDocsForUrl = (url: string) => {
  // this is where documentation is hoisted and same value is received
  // ...in documentationUrl but concatenated with `/main`
  const docHost = "https://docs.openedgeplatform.intel.com/edge-manage-docs";
  const urlParts = url.substring(1).split("/");
  let docVersion = "main";
  console.log("window.__RUNTIME_CONFIG__", window.__RUNTIME_CONFIG__);
  console.log(
    "window.__RUNTIME_CONFIG__?.VERSIONS.orchestrator",
    window.__RUNTIME_CONFIG__?.VERSIONS.orchestrator,
  );
  if (
    window.__RUNTIME_CONFIG__?.VERSIONS.orchestrator &&
    RuntimeConfig.getComponentVersion("orchestrator")
  ) {
    docVersion = extractDocumentationVersion(
      RuntimeConfig.getComponentVersion("orchestrator"),
    );
  }
  let docsUrl = stripTrailingSlash(RuntimeConfig.documentationUrl);
  let docsMapper = RuntimeConfig.documentation(docVersion);
  console.log("docsUrl1", docsUrl);
  console.log("DOCS MAPPER:", docsMapper);
  // looking for matches part (url segment) by part
  // takes browser url, e.g. /test/aa/bb/cc and test against mapper values, segment by segment
  // if values from the same segment index from url and mapper key are different we dont grab this mapping
  // if number of segments are different mapper key will not be taken
  // in the result mapper is filtered to only key that match given url
  docsMapper = docsMapper.filter(({ src }) =>
    src
      .substring(1)
      .split("/")
      .every(
        (part, index, srcParts) =>
          srcParts.length === urlParts.length &&
          urlParts[index] !== undefined &&
          [urlParts[index], "*"].includes(part),
      ),
  );
  // if we get more than one match it means that we get match against static address and segment with path parameter
  // e.g. /test/aa/bb and /test/*/bb or /test/aa/*
  // then we need to pick key with the least number of path parameters (*)
  // this is because they were matched because static url segment will be matched with path params
  if (docsMapper.length > 1) {
    const leastWildcards = docsMapper.reduce((a, b) => {
      const bl = b.src
        .substring(1)
        .split("/")
        .filter((part) => part === "*").length;
      return a < bl ? a : bl;
    }, 10);

    docsMapper = [
      docsMapper.find(
        ({ src }) =>
          src
            .substring(1)
            .split("/")
            .filter((part) => part === "*").length === leastWildcards,
      )!,
    ];
  }
  console.log("docVersion:", docVersion);
  try {
    const docsUrlObj = new URL(docsUrl);
    const docHostObj = new URL(docHost);
    // fail safe check to ensure documentation host
    if (
      docsUrlObj.host === docHostObj.host &&
      docsUrlObj.protocol === docHostObj.protocol &&
      docVersion
    ) {
      // concatenating the release version with docsUrl
      docsUrl = `${docHost}/${docVersion}`;
    }
  } catch (e) {
    // fallback: do nothing, keep docsUrl as is
  }
  console.log("docsUrl2", docsUrl);
  if (docsMapper.length === 1) {
    return `${docsUrl}${docsMapper[0].dest}`;
  }
  console.log(
    "RuntimeConfig.documentation(docVersion)[0]?.dest:",
    RuntimeConfig.documentation(docVersion)[0]?.dest,
  );
  // default option
  const defaultDocsAddress =
    RuntimeConfig.documentation(docVersion)[0]?.dest ??
    `${window.location.origin}/docs`;
  console.log("defaultDocsAddress:", defaultDocsAddress);
  return `${docsUrl}${defaultDocsAddress}`;
};
