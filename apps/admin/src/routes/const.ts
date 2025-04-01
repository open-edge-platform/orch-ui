/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
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
