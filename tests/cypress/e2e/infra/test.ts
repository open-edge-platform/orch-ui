export const sessionKey =
  "oidc.user:https://keycloak.orch-10-114-181-86.espdqa.infra-host.com/realms/master:webui-client";
export const sessionValue = `{
    "id_token": "eyJhbGciOiJQUzUxMiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWV1k2VlRWcnNxQkYwVWZ1bC1NV1JuSTZrUVpWZy16blJ2OG9HNG1TNzBFIn0.eyJleHAiOjE3NTEzNjQyNzUsImlhdCI6MTc1MTM2MDY3NSwiYXV0aF90aW1lIjoxNzUxMzYwNjY5LCJqdGkiOiI3MmMxNjFmMS0wMmU1LTQxYzYtYjg2MC1iOGI0NmMzOGFhMDEiLCJpc3MiOiJodHRwczovL2tleWNsb2FrLm9yY2gtMTAtMTE0LTE4MS04Ni5lc3BkcWEuaW5mcmEtaG9zdC5jb20vcmVhbG1zL21hc3RlciIsImF1ZCI6IndlYnVpLWNsaWVudCIsInN1YiI6IjY1ZWJhMmZlLTA0ZjgtNDM5ZS1hM2UwLWJhYWQ5ODBiOWYxOCIsInR5cCI6IklEIiwiYXpwIjoid2VidWktY2xpZW50Iiwic2lkIjoiYjA5YTMzMjAtNzM1OS00NmY4LTk0ODYtY2I3MzIwY2EwMDExIiwiYXRfaGFzaCI6InhqdGxwSlBHR1FZZFJ6UUhlREY3VTRkOUZRZEhRU3ZMaThIaVJMR3NSb2siLCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwiZW1haWxfdmVyaWZpZWQiOnRydWUsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJhY2NvdW50L3ZpZXctcHJvZmlsZSIsImExOGQ5Y2QyLTBmYjUtNDIyYy04NjQyLWRhZWM1N2E5N2FmM19wcm9qZWN0LWRlbGV0ZS1yb2xlIiwiNTRhMGQ4ZTctM2EwOS00ZTBkLWIyNjgtNmI0NjA2OTIxNjI5X2NsLXRwbC1yIiwiYTE4ZDljZDItMGZiNS00MjJjLTg2NDItZGFlYzU3YTk3YWYzX3Byb2plY3QtcmVhZC1yb2xlIiwiYTE4ZDljZDItMGZiNS00MjJjLTg2NDItZGFlYzU3YTk3YWYzX3Byb2plY3QtdXBkYXRlLXJvbGUiLCI1NGEwZDhlNy0zYTA5LTRlMGQtYjI2OC02YjQ2MDY5MjE2MjlfY2F0LXIiLCI1NGEwZDhlNy0zYTA5LTRlMGQtYjI2OC02YjQ2MDY5MjE2MjlfY2wtdHBsLXJ3IiwiNTRhMGQ4ZTctM2EwOS00ZTBkLWIyNjgtNmI0NjA2OTIxNjI5X3JlZy1hIiwib2ZmbGluZV9hY2Nlc3MiLCJycy1wcm94eS1yIiwidW1hX2F1dGhvcml6YXRpb24iLCI1NGEwZDhlNy0zYTA5LTRlMGQtYjI2OC02YjQ2MDY5MjE2MjlfY2wtciIsIjU0YTBkOGU3LTNhMDktNGUwZC1iMjY4LTZiNDYwNjkyMTYyOV9pbS1yIiwiYTE4ZDljZDItMGZiNS00MjJjLTg2NDItZGFlYzU3YTk3YWYzXzU0YTBkOGU3LTNhMDktNGUwZC1iMjY4LTZiNDYwNjkyMTYyOV9tIiwiNTRhMGQ4ZTctM2EwOS00ZTBkLWIyNjgtNmI0NjA2OTIxNjI5X2FscnQtciIsIjU0YTBkOGU3LTNhMDktNGUwZC1iMjY4LTZiNDYwNjkyMTYyOV9lbi1hZ2VudC1ydyIsImRlZmF1bHQtcm9sZXMtbWFzdGVyIiwiNTRhMGQ4ZTctM2EwOS00ZTBkLWIyNjgtNmI0NjA2OTIxNjI5X3JlZy1yIiwiNTRhMGQ4ZTctM2EwOS00ZTBkLWIyNjgtNmI0NjA2OTIxNjI5X3RjLXIiLCI1NGEwZDhlNy0zYTA5LTRlMGQtYjI2OC02YjQ2MDY5MjE2MjlfZW4tb2IiLCI1NGEwZDhlNy0zYTA5LTRlMGQtYjI2OC02YjQ2MDY5MjE2MjlfYWxydC1ydyIsIjU0YTBkOGU3LTNhMDktNGUwZC1iMjY4LTZiNDYwNjkyMTYyOV9jYXQtcnciLCJycy1hY2Nlc3MtciIsImExOGQ5Y2QyLTBmYjUtNDIyYy04NjQyLWRhZWM1N2E5N2FmM19wcm9qZWN0LXdyaXRlLXJvbGUiLCI1NGEwZDhlNy0zYTA5LTRlMGQtYjI2OC02YjQ2MDY5MjE2MjlfYW8tcnciLCI1NGEwZDhlNy0zYTA5LTRlMGQtYjI2OC02YjQ2MDY5MjE2MjlfY2wtcnciLCI1NGEwZDhlNy0zYTA5LTRlMGQtYjI2OC02YjQ2MDY5MjE2MjlfaW0tcnciLCJhY2NvdW50L21hbmFnZS1hY2NvdW50Il19LCJuYW1lIjoic2FtcGxlLW9yZy1hZG1pbiBzYW1wbGUtb3JnLWFkbWluIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic2FtcGxlLW9yZy1hZG1pbiIsImdpdmVuX25hbWUiOiJzYW1wbGUtb3JnLWFkbWluIiwiZmFtaWx5X25hbWUiOiJzYW1wbGUtb3JnLWFkbWluIiwiZW1haWwiOiJzYW1wbGUtb3JnLWFkbWluQHNhbXBsZS1vcmcuY29tIn0.HOSyjC54IBQvwdcrMB5HPk3_1xwI7IkJQ-gOCabxifgfwi07accpVYBRpyVQnbX6DmAotpBWLUYz0bBd_71eVX_Itxmn8SAf5_oShTwDIsbNeKrl5K20rzqaeK-8UomvxGpUXt6WyyzKhJKY9_PT_QxxuxbdTNhLX0Jv7onYt-8jDANzHDNszSw5KM9MIqvgn-Y9owPe0T7XTaxXnuXr1FECZ2ie3nrvgTji0dzCAQOr2j3DdmZ5KZqB6RLXJHRcmfC16AnvMqJTbQkTF1c4-HU7O8w-OUHlxRnPkEsGCnMyXl_t5V5tYzB33vhMV18FfPyBzDJq1Fcz33diQ3sKAv6yiMaNvhCj5FoqYQxgZFFHQa2dZNNIgTbFvvKEWllKFtW8w3ICqQPsBk_vcZAla5Zj1f81t9cfTOAL0WQBf-JxidT7e9VWDLmS47gC7kyInNTaKHIX0j5GZYf1XMIV1cmt4k7qm2t1TAGYHg0KX_YW5mcK7E68L1oRVbPCmJUCPeykQd9tibtB3UZazVISfA_rWz7Nsi6lugZ0Z6jJgYSYhZNYTjvvKNTbbapsrXAFkQpG6cqNzZmY7Oxgojg_mY4a4FtHi-27bbKZTmMUk5ehInKZvCYRvpcms0StJNu2OqSkINtHpU43A92GjUyAdHbUavjQuQOSwkwKKpZjz2I",
    "session_state": "b09a3320-7359-46f8-9486-cb7320ca0011",
    "access_token": "eyJhbGciOiJQUzUxMiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWV1k2VlRWcnNxQkYwVWZ1bC1NV1JuSTZrUVpWZy16blJ2OG9HNG1TNzBFIn0.eyJleHAiOjE3NTEzNjQyNzUsImlhdCI6MTc1MTM2MDY3NSwiYXV0aF90aW1lIjoxNzUxMzYwNjY5LCJqdGkiOiI4NTMzZjZkYy00YTg5LTRiNTUtOTNmNC1mMDg3MjYzMWQ0OTQiLCJpc3MiOiJodHRwczovL2tleWNsb2FrLm9yY2gtMTAtMTE0LTE4MS04Ni5lc3BkcWEuaW5mcmEtaG9zdC5jb20vcmVhbG1zL21hc3RlciIsInN1YiI6IjY1ZWJhMmZlLTA0ZjgtNDM5ZS1hM2UwLWJhYWQ5ODBiOWYxOCIsInR5cCI6IkJlYXJlciIsImF6cCI6IndlYnVpLWNsaWVudCIsInNpZCI6ImIwOWEzMzIwLTczNTktNDZmOC05NDg2LWNiNzMyMGNhMDAxMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJhY2NvdW50L3ZpZXctcHJvZmlsZSIsImExOGQ5Y2QyLTBmYjUtNDIyYy04NjQyLWRhZWM1N2E5N2FmM19wcm9qZWN0LWRlbGV0ZS1yb2xlIiwiNTRhMGQ4ZTctM2EwOS00ZTBkLWIyNjgtNmI0NjA2OTIxNjI5X2NsLXRwbC1yIiwiYTE4ZDljZDItMGZiNS00MjJjLTg2NDItZGFlYzU3YTk3YWYzX3Byb2plY3QtcmVhZC1yb2xlIiwiYTE4ZDljZDItMGZiNS00MjJjLTg2NDItZGFlYzU3YTk3YWYzX3Byb2plY3QtdXBkYXRlLXJvbGUiLCI1NGEwZDhlNy0zYTA5LTRlMGQtYjI2OC02YjQ2MDY5MjE2MjlfY2F0LXIiLCI1NGEwZDhlNy0zYTA5LTRlMGQtYjI2OC02YjQ2MDY5MjE2MjlfY2wtdHBsLXJ3IiwiNTRhMGQ4ZTctM2EwOS00ZTBkLWIyNjgtNmI0NjA2OTIxNjI5X3JlZy1hIiwib2ZmbGluZV9hY2Nlc3MiLCJycy1wcm94eS1yIiwidW1hX2F1dGhvcml6YXRpb24iLCI1NGEwZDhlNy0zYTA5LTRlMGQtYjI2OC02YjQ2MDY5MjE2MjlfY2wtciIsIjU0YTBkOGU3LTNhMDktNGUwZC1iMjY4LTZiNDYwNjkyMTYyOV9pbS1yIiwiYTE4ZDljZDItMGZiNS00MjJjLTg2NDItZGFlYzU3YTk3YWYzXzU0YTBkOGU3LTNhMDktNGUwZC1iMjY4LTZiNDYwNjkyMTYyOV9tIiwiNTRhMGQ4ZTctM2EwOS00ZTBkLWIyNjgtNmI0NjA2OTIxNjI5X2FscnQtciIsIjU0YTBkOGU3LTNhMDktNGUwZC1iMjY4LTZiNDYwNjkyMTYyOV9lbi1hZ2VudC1ydyIsImRlZmF1bHQtcm9sZXMtbWFzdGVyIiwiNTRhMGQ4ZTctM2EwOS00ZTBkLWIyNjgtNmI0NjA2OTIxNjI5X3JlZy1yIiwiNTRhMGQ4ZTctM2EwOS00ZTBkLWIyNjgtNmI0NjA2OTIxNjI5X3RjLXIiLCI1NGEwZDhlNy0zYTA5LTRlMGQtYjI2OC02YjQ2MDY5MjE2MjlfZW4tb2IiLCI1NGEwZDhlNy0zYTA5LTRlMGQtYjI2OC02YjQ2MDY5MjE2MjlfYWxydC1ydyIsIjU0YTBkOGU3LTNhMDktNGUwZC1iMjY4LTZiNDYwNjkyMTYyOV9jYXQtcnciLCJycy1hY2Nlc3MtciIsImExOGQ5Y2QyLTBmYjUtNDIyYy04NjQyLWRhZWM1N2E5N2FmM19wcm9qZWN0LXdyaXRlLXJvbGUiLCI1NGEwZDhlNy0zYTA5LTRlMGQtYjI2OC02YjQ2MDY5MjE2MjlfYW8tcnciLCI1NGEwZDhlNy0zYTA5LTRlMGQtYjI2OC02YjQ2MDY5MjE2MjlfY2wtcnciLCI1NGEwZDhlNy0zYTA5LTRlMGQtYjI2OC02YjQ2MDY5MjE2MjlfaW0tcnciLCJhY2NvdW50L21hbmFnZS1hY2NvdW50Il19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgZW1haWwgcHJvZmlsZSByb2xlcyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoic2FtcGxlLW9yZy1hZG1pbiBzYW1wbGUtb3JnLWFkbWluIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic2FtcGxlLW9yZy1hZG1pbiIsImdpdmVuX25hbWUiOiJzYW1wbGUtb3JnLWFkbWluIiwiZmFtaWx5X25hbWUiOiJzYW1wbGUtb3JnLWFkbWluIiwiZW1haWwiOiJzYW1wbGUtb3JnLWFkbWluQHNhbXBsZS1vcmcuY29tIn0.IQbz4doxVAiTuSvBI9wjSzAnJxsmjcU0FwQ2PiteM90mhIPKbMiKZNVjVeqL7vtVy5Hi1YvBZr-D-fzPQM11o7wNKUUy03WbQV4u6KfkzuYaGsBQF_oLJZZf5TWAUhCHVQeIxuUj9JM4vOgkdEeB6sk3Hs8omf0pPAaPZ0RACc2kwJXPG0XhHnqoGKWrRgtcMAGaeP7VEEU0dJ66k0Aw_Nr_8OeiGNSMNXRLPk-tzrk52swzBJOc2fmmhkRyrLTEjDK0z8TK_9ykda1E8nQCxYRhXpExeJ40eeHvYHMEfBsUppk13BG46_lotQeGu9EuA-8RLQlKVVFKzU-53EEkiVMgzBtw9LtClGkjuMKrLjPqGI1ZKFOnql39rCyQ2T5s7zbhkm2Pk0a6Pw61e56hwRcDyaKpLom6y_IZ1bPXQryj-2ImUuoH6Uep7J2610g2UsrTVzyPZuU3Bf-CwvnnEciYLitUvWCgvT9-YMcGHgaK_-gtnwzsXcZiTvQgePFuKkK793oeiJR4B3--BjAiuw4ZAtYhqMMPf7BOOdzmdyQPXzNmTl6ij4dtba3dV6p6Pt4-VHgmyW1RPxFQXzFnoUTyYHWDY-ZteVt4q-c-M9XxAng98Tq5JfyCy3c5T2DEKxoCGPhj-vTIEmsRYZEjG-ngs7LdYm4-r-ujvsfs_90",
    "refresh_token": "eyJhbGciOiJIUzUxMiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI0MDBhMjM2My0xZTVmLTRmZTQtYTA0Yy01NWFmMWJjMTA2YmIifQ.eyJleHAiOjE3NTEzNjYwNzUsImlhdCI6MTc1MTM2MDY3NSwianRpIjoiNjE0MWRlZjEtNzYyMy00ZmQyLThkNTYtZjc5NmJiMjQxMDZjIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5vcmNoLTEwLTExNC0xODEtODYuZXNwZHFhLmluZnJhLWhvc3QuY29tL3JlYWxtcy9tYXN0ZXIiLCJhdWQiOiJodHRwczovL2tleWNsb2FrLm9yY2gtMTAtMTE0LTE4MS04Ni5lc3BkcWEuaW5mcmEtaG9zdC5jb20vcmVhbG1zL21hc3RlciIsInN1YiI6IjY1ZWJhMmZlLTA0ZjgtNDM5ZS1hM2UwLWJhYWQ5ODBiOWYxOCIsInR5cCI6IlJlZnJlc2giLCJhenAiOiJ3ZWJ1aS1jbGllbnQiLCJzaWQiOiJiMDlhMzMyMC03MzU5LTQ2ZjgtOTQ4Ni1jYjczMjBjYTAwMTEiLCJzY29wZSI6Im9wZW5pZCBlbWFpbCBwcm9maWxlIHJvbGVzIGJhc2ljIn0.5tzQmsCtdUnI30GMAoqFJhqzlAVGNFUoqI0bmFb3omfQINBuj6Rjy-M5VbXFwEE5CcvCV2VqUCklrv9z5XsShg",
    "token_type": "Bearer",
    "scope": "openid email profile roles",
    "profile": {
        "exp": 1751364275,
        "iat": 1751360675,
        "iss": "https://keycloak.orch-10-114-181-86.espdqa.infra-host.com/realms/master",
        "aud": "webui-client",
        "sub": "65eba2fe-04f8-439e-a3e0-baad980b9f18",
        "typ": "ID",
        "sid": "b09a3320-7359-46f8-9486-cb7320ca0011",
        "resource_access": {
            "account": {
                "roles": [
                    "manage-account",
                    "manage-account-links",
                    "view-profile"
                ]
            }
        },
        "email_verified": true,
        "realm_access": {
            "roles": [
                "account/view-profile",
                "a18d9cd2-0fb5-422c-8642-daec57a97af3_project-delete-role",
                "54a0d8e7-3a09-4e0d-b268-6b4606921629_cl-tpl-r",
                "a18d9cd2-0fb5-422c-8642-daec57a97af3_project-read-role",
                "a18d9cd2-0fb5-422c-8642-daec57a97af3_project-update-role",
                "54a0d8e7-3a09-4e0d-b268-6b4606921629_cat-r",
                "54a0d8e7-3a09-4e0d-b268-6b4606921629_cl-tpl-rw",
                "54a0d8e7-3a09-4e0d-b268-6b4606921629_reg-a",
                "offline_access",
                "rs-proxy-r",
                "uma_authorization",
                "54a0d8e7-3a09-4e0d-b268-6b4606921629_cl-r",
                "54a0d8e7-3a09-4e0d-b268-6b4606921629_im-r",
                "a18d9cd2-0fb5-422c-8642-daec57a97af3_54a0d8e7-3a09-4e0d-b268-6b4606921629_m",
                "54a0d8e7-3a09-4e0d-b268-6b4606921629_alrt-r",
                "54a0d8e7-3a09-4e0d-b268-6b4606921629_en-agent-rw",
                "default-roles-master",
                "54a0d8e7-3a09-4e0d-b268-6b4606921629_reg-r",
                "54a0d8e7-3a09-4e0d-b268-6b4606921629_tc-r",
                "54a0d8e7-3a09-4e0d-b268-6b4606921629_en-ob",
                "54a0d8e7-3a09-4e0d-b268-6b4606921629_alrt-rw",
                "54a0d8e7-3a09-4e0d-b268-6b4606921629_cat-rw",
                "rs-access-r",
                "a18d9cd2-0fb5-422c-8642-daec57a97af3_project-write-role",
                "54a0d8e7-3a09-4e0d-b268-6b4606921629_ao-rw",
                "54a0d8e7-3a09-4e0d-b268-6b4606921629_cl-rw",
                "54a0d8e7-3a09-4e0d-b268-6b4606921629_im-rw",
                "account/manage-account"
            ]
        },
        "name": "sample-org-admin sample-org-admin",
        "preferred_username": "sample-org-admin",
        "given_name": "sample-org-admin",
        "family_name": "sample-org-admin",
        "email": "sample-org-admin@sample-org.com"
    },
    "expires_at": 1751364275
}`;
