/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

// import { hosts } from "../mocks/infra";
import { handlers as alerts } from "./admin/handlers/alerts";
import { handlers as hosts } from "./infra/handlers/hosts";
import { handlers as regions } from "./infra/handlers/regions";

// infra
export * from "./infra/data/ids/regions";
export * from "./infra/data/ids/sites";
export * from "./infra/data/regions";
export * from "./infra/data/sites";
export * from "./infra/store/regions";
export * from "./infra/store/sites";
const handlersInfra = [...regions, ...hosts];
const handlersAdmin = [...alerts];

// mocks expose one collection of all handlers
export const handlers = [...handlersInfra, ...handlersAdmin];
