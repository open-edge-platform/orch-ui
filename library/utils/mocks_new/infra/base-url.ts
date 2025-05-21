/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { SharedStorage } from "@orch-ui/utils";

export const baseURL = `/v1/projects/${SharedStorage.project?.name ?? ""}`;
