/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { handlers as alertDefinitions } from "./admin/handlers/alert-definitions";
import { handlers as alerts } from "./admin/handlers/alerts";

const handlersAdmin = [...alerts, ...alertDefinitions];

// mocks expose one collection of all handlers
export const handlers = [...handlersAdmin];
