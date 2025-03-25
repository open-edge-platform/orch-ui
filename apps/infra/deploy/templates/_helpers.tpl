{{/*
# SPDX-FileCopyrightText: (C) 2023 Intel Corporation
# SPDX-License-Identifier: Apache-2.0
*/}}

{{- define "infra.fullname" -}}
{{- $name := "infra" }}
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

{{- define "mfe.nginx-config" -}}
{{ $root := . }}
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
  {{ $rewrites := .Values.nginx.rewrites }}
  {{ range $rewrites }}
  location {{ .location }} {
    rewrite {{ .rewrite.source }} {{ .rewrite.dest }}  break;
    proxy_pass      {{ tpl .proxy_pass $root }};
    {{- range .appendix }}
    {{ . }}
    {{- end }}
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

{{- define "mfe.mi.runtime-config" -}}
window.__RUNTIME_CONFIG__ = {
AUTH: {{ .Values.global.auth.enabled | quote }},
  KC_URL: {{ .Values.global.auth.keycloak.url |  quote }},
  KC_REALM: {{ .Values.global.auth.keycloak.realm | quote }},
  KC_CLIENT_ID: {{ .Values.global.auth.keycloak.client_id | quote }},
  SESSION_TIMEOUT: {{ .Values.global.session_timeout | quote }},
  OBSERVABILITY_URL: {{ .Values.global.observability.url | quote }},
  TITLE: {{ .Values.header.title | quote }},
  DOCUMENTATION_URL: {{ .Values.header.documentationUrl | quote }},
  DOCUMENTATION: [
      {{- range .Values.header.documentation }}
        { src: "{{ .src }}", dest: "{{ .dest }}" },
      {{- end }}
    ],
  MFE:{
    APP_ORCH: {{ .Values.mfe.app_orch | quote }},
    INFRA: {{ .Values.mfe.infra | quote }},
    CLUSTER_ORCH: {{ .Values.mfe.cluster_orch | quote }},
    ADMIN: {{ .Values.mfe.admin | quote }}
  },
  API: {
    INFRA: {{ .Values.api.infraManager | quote }},
    CO: {{ .Values.api.clusterOrch | quote }},
    MB: {{ .Values.api.metadataBroker | quote }},
    ALERT: {{ .Values.api.alertManager | quote }},
  },
  VERSIONS: {
    orchestrator: {{ .Values.versions.orchestrator | quote }},
  },
}
{{- end -}}
