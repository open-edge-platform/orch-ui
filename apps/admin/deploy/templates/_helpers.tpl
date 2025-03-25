{{/*
# SPDX-FileCopyrightText: (C) 2023 Intel Corporation
# SPDX-License-Identifier: Apache-2.0
*/}}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}

{{- define "admin.fullname" -}}
{{- $name := "admin" }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "mfe.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{- define "mfe.nginx-admin-config" -}}
server {
  listen 3000;
  add_header Content-Security-Policy "frame-ancestors 'self' ";
  add_header X-Frame-Options "DENY";
  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
  add_header X-XSS-Protection "1; mode=block";
  add_header X-Content-Type-Options nosniff;
  server_tokens off;
  proxy_http_version 1.1;
  keepalive_timeout 60s;
  charset utf-8;
  {{ range .rewrites }}
  location {{ .location }} {
    rewrite {{ .rewrite.source }} {{ .rewrite.dest }}  break;
    proxy_pass      {{ .proxy_pass }};
  }
  {{end }}

  location / {
    limit_except GET { deny  all; }
    root   /usr/share/nginx/html;
    index  index.html index.htm;
    try_files $uri $uri/ /index.html;
  }

  error_page   500 502 503 504  /50x.html;

  location = /50x.html {
    root   /usr/share/nginx/html;
  }

  error_page   400 402 403 404  /40x.html;

  location = /40x.html {
    root   /usr/share/nginx/html;
  }

}
{{- end -}}

{{- define "mfe.admin.runtime-config" -}}
window.__RUNTIME_CONFIG__ = {
  AUTH: {{ .Values.global.auth.enabled | quote }},
  KC_URL: {{ .Values.global.auth.keycloak.url |  quote }},
  KC_REALM: {{ .Values.global.auth.keycloak.realm | quote }},
  KC_CLIENT_ID: {{ .Values.global.auth.keycloak.client_id | quote }},
  SESSION_TIMEOUT: {{ .Values.global.session_timeout | quote }},
  MFE:{
    APP_ORCH: {{ .Values.mfe.app_orch | quote }},
    INFRA: {{ .Values.mfe.infra | quote }},
    CLUSTER_ORCH: {{ .Values.mfe.cluster_orch | quote }},
    ADMIN: {{ .Values.mfe.admin | quote }}
  },
  API: {
    CO: {{ .Values.api.clusterOrch | quote }},
    MB: {{ .Values.api.metadataBroker | quote }},
    ALERT: {{ .Values.api.alertManager | quote }},
    TM: {{ .Values.api.tenantManager | quote }},
  },
}
{{- end -}}
