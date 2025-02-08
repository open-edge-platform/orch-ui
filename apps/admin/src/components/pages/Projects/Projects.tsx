/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { PermissionDenied, RBACWrapper } from "@orch-ui/components";
import {
  hasRealmRole as hasRealmRoleDefault,
  hasRole as hasRoleDefault,
  Role,
} from "@orch-ui/utils";
import { Heading, Text } from "@spark-design/react";
import { NoProjectsDialog } from "../../organisms/NoProjectsDialog/NoProjectsDialog";
import ProjectsTable from "../../organisms/ProjectsTable/ProjectsTable";

export const dataCy = "projects";

interface ProjectsProps {
  // these props are used for testing purposes
  hasRole?: (roles: string[]) => boolean;
  hasRealmRole?: (role: string) => boolean;
}

const Projects = ({
  hasRole = hasRoleDefault,
  hasRealmRole = hasRealmRoleDefault,
}: ProjectsProps) => {
  const cy = { "data-cy": dataCy };

  // NOTE it is ok to lock a user without permissions here,
  // as if they landed here it is implied there are no project in the system
  if (!hasRealmRole(Role.PROJECT_WRITE) && !hasRealmRole(Role.PROJECT_READ)) {
    return <NoProjectsDialog />;
  }

  return (
    <div {...cy} className="projects">
      <Heading semanticLevel={1} size="l" data-cy="projectsTitle">
        Manage Projects
      </Heading>
      <Text>
        You can only access projects you are a member of. Assign users to a
        project in your identity provider by adding the user to the group
        associated to the Project ID below.
      </Text>
      <RBACWrapper
        showTo={[
          Role.PROJECT_READ,
          Role.PROJECT_WRITE,
          Role.PROJECT_DELETE,
          Role.PROJECT_UPDATE,
        ]}
        hasRole={hasRole}
        missingRoleContent={<PermissionDenied />}
      >
        <ProjectsTable />
      </RBACWrapper>
    </div>
  );
};

export default Projects;
