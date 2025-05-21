/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

// import { hosts } from "../mocks/infra";
import { handlers as alerts } from "./admin/handlers/alerts";
// import { handlers as hosts } from "./infra/handlers/hosts";

// const handlersInfra = [...regions, ...hosts];
const handlersAdmin = [...alerts];

// mocks expose one collection of all handlers
export const handlers = [...handlersAdmin];
