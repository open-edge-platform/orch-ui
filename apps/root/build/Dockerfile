# SPDX-FileCopyrightText: (C) 2023 Intel Corporation
# SPDX-License-Identifier: LicenseRef-Intel

FROM nginxinc/nginx-unprivileged:stable-alpine
USER nobody
COPY --chown=nobody:nobody --chmod=444 ./dist /usr/share/nginx/html

# Running a server
CMD ["nginx-debug", "-g", "daemon off;"]
