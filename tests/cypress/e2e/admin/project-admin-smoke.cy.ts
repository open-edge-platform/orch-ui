import { tm } from "@orch-ui/apis";
import { NetworkLog } from "../../support/network-logs";
import { ADMIN_USER, KUBECTL_POD } from "../../support/utilities";
import {
  createProject,
  deleteProjectViaApi,
  deleteProjectViaUI,
  isProjectTestData,
  reanameProject,
} from "../helpers";

describe("Project Admin Smoke", () => {
  const netLog = new NetworkLog();
  let testData: tm.ProjectProjectPost;

  before(() => {
    const dataFile =
      Cypress.env("DATA_FILE") || "./cypress/e2e/admin/data/admin-smoke.json";
    cy.readFile(dataFile, "utf-8").then((data) => {
      if (!isProjectTestData(data)) {
        throw new Error(
          `Invalid test data in ${dataFile}: ${JSON.stringify(data)}`,
        );
      }
      testData = data;
    });
  });
  beforeEach(() => {
    netLog.intercept();
  });

  describe(`the ${ADMIN_USER.username}`, () => {
    beforeEach(() => {
      cy.login(ADMIN_USER);
      cy.visit("/");
      cy.dataCy("menuSettings").click();
    });
    it("should create a project", () => {
      createProject(testData.description);
    });

    it("should rename the project", () => {
      reanameProject("sample-project", "sample-project1");
    });

    it("should delete the project", () => {
      deleteProjectViaUI(testData.description);
    });
  });

  afterEach(() => {
    netLog.save();
    netLog.clear();
  });
  after(() => {
    // get all the running K8s PODS, just as an example
    cy.execAndSaveOutput(KUBECTL_POD, "pods.txt");
    // Cleanup all the new entries created
    deleteProjectViaApi(testData.description);
  });
});
