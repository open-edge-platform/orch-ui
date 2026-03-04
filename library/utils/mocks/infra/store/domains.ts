/*
 * SPDX-FileCopyrightText: (C) 2026 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { rps } from "@orch-ui/apis";
import { BaseStore } from "./baseStore";

export const domain1: rps.DomainResponse = {
  profileName: "example-profile",
  domainSuffix: "example.com",
  expirationDate: "2025-12-31T23:59:59Z",
  provisioningCertStorageFormat: "string",
  tenantId: "tenant-1",
  version: "1.0",
};

export const domain2: rps.DomainResponse = {
  profileName: "example-profile-1",
  domainSuffix: "example1.com",
  expirationDate: "2026-06-30T23:59:59Z",
  provisioningCertStorageFormat: "string",
  tenantId: "tenant-1",
  version: "1.0",
};

export const domain3: rps.DomainResponse = {
  profileName: "example-profile-2",
  domainSuffix: "example2.com",
  expirationDate: "2024-09-15T23:59:59Z",
  provisioningCertStorageFormat: "string",
  tenantId: "tenant-1",
  version: "1.0",
};

export const domains: rps.CountDomainResponse = {
  data: [domain1, domain2, domain3],
  totalCount: 3,
};

export class DomainStore extends BaseStore<
  "profileName",
  rps.DomainResponse,
  rps.DomainPost
> {
  constructor() {
    super("profileName", [domain1, domain2, domain3]);
  }

  convert(body: rps.DomainPost): rps.DomainResponse {
    return {
      profileName: body.profileName,
      domainSuffix: body.domainSuffix,
      expirationDate: new Date().toISOString(),
      provisioningCertStorageFormat: body.provisioningCertStorageFormat,
      tenantId: "tenant-1",
      version: "1.0",
    };
  }

  list(): rps.DomainResponse[] {
    return this.resources;
  }
}

export const domainStore = new DomainStore();
