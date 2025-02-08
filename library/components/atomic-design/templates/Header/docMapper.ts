/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { RuntimeConfig, stripTrailingSlash } from "@orch-ui/utils";

/**
 * Method to transform from url to doc link
 * @param url - pathname without search params (location.pathname)
 */
export const getDocsForUrl = (url: string) => {
  const urlParts = url.substring(1).split("/");

  const docsUrl = stripTrailingSlash(RuntimeConfig.documentationUrl);
  let docsMapper = RuntimeConfig.documentation;

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

  // when mapper contains only one entry, we are ready to read the docs address
  if (docsMapper.length === 1) {
    return `${docsUrl}${docsMapper[0].dest}`;
  }

  // default option
  const defaultDocsAddress =
    RuntimeConfig.documentation[0]?.dest ?? `${window.location.origin}/docs`;
  return `${docsUrl}${defaultDocsAddress}`;
};
