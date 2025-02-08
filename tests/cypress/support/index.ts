import { IUser } from "./utilities";

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to login via Keycloak
       * @example cy.login({"sample-project-edge-mgr", password})
       */
      login(user: IUser): void;

      /**
       * Custom command to execute a command and save the output to a file
       * @example cy.execAndSaveOutput("kubectl get pods -A", "pods.txt")
       */
      execAndSaveOutput(command: string, file: string): void;

      /**
       * Custom command to get an element by data-cy attribute
       * @example cy.dataCy('greeting')
       */
      dataCy(
        value: string,
        options?: Partial<Loggable & Timeoutable & Withinable & Shadow>
      ): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to make an authenticated request
       * @example cy.authenticatedRequest<eim.RegionsListRead>({
       *         url: "/v1/projects/sample-project/regions",
       *       }).then((response) => { ... });
       */
      authenticatedRequest<T = any>(opts: Partial<RequestOptions>): Chainable<Response<T>>;

      /**
       * Custom command to read the current active project from the local storage
       */
      currentProject(): Chainable<string>;
    }
  }
}

// to override `export CYPRESS_LOG_FOLDER=<path>` in the terminal
export const LogFolder = Cypress.env("LOG_FOLDER") || "cypress/logs";

// file from which to load data from. The default file and the format is defined in each test suite.
export const DataFile = Cypress.env("DATA_FILE") || null;
