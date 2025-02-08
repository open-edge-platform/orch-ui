/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

export const adminBreadcrumb = {
  text: "Admin",
  link: "/",
};

export interface BreadcrumbItem {
  text: string;
  link: string;
}

export const getBreadcrumbItem = (
  text: string,
  link: string,
): BreadcrumbItem => ({
  text,
  link,
});
