/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CyHttpMessages,
  Interception,
  Method,
  RouteHandler,
} from "cypress/types/net-stubbing";
import { CyLog, CyRequest } from "./cyLog";
export type Cy<T = HTMLElement> = Cypress.Chainable<JQuery<T>>;

// FIXME refactor to return the appropriate element and move into the base POM,
// see CyPom.cyGetByAttr for an example
/*
 @deprecated use cy.dataCy() instead
 */
export const cyGet = (selector: string): Cy => {
  const dataCy = `[data-cy='${selector}']`;
  return cy.get(dataCy);
};

export const cyGetChild = (parent: string, child: string): Cy => {
  const dataCy = `[data-cy='${parent}'] [data-cy='${child}']`;
  return cy.get(dataCy);
};
// FIXME end

/*
 * encodeURLQuery encodes a string to be used in a URL query, including parentheses
 * @param str the string to encode
 */
export const encodeURLQuery = (str: string) =>
  encodeURIComponent(str).replace(/\(/g, "%28").replace(/\)/g, "%29");

export const cyApiIntercept = (
  selected: string[],
  apis: Record<string, CyApiDetail>,
): void => {
  selected.forEach((alias: string) => {
    const api = apis[alias];
    if (!api) return;

    const method = api.method ? api.method : "GET";

    cy.log(`Intercepting API: ${method} ${api.route} as ${alias}`);
    if (api.response && api.statusCode && method) {
      cy.intercept(method, api.route, {
        statusCode: api.statusCode,
        body: api.response,
        delay: api.delay ? api.delay : 0,
      }).as(alias);
    } else if (api.delay)
      cy.intercept(method, api.route, {
        statusCode: api.statusCode ? api.statusCode : 200,
        delay: api.delay,
      }).as(alias);
    else if (api.response)
      cy.intercept(method, api.route, api.response).as(alias);
    else if (api.statusCode)
      cy.intercept(method, api.route, { statusCode: api.statusCode }).as(alias);
    else if (api.networkError)
      cy.intercept(method, api.route, { forceNetworkError: true }).as(alias);
    else if (api.fixture && !api.body)
      cy.intercept(method, api.route, { fixture: api.fixture }).as(alias);
    else if (api.fixture && api.body)
      cy.intercept(method, api.route, {
        body: api.body,
      }).as(alias);
    else
      cy.intercept(method, api.route, (request: CyRequest) => {
        if (!CyPom.isResponseMocked) CyLog.request(alias, request);
      }).as(alias);
  });
};

export const CyApiInterceptWithHandler = (
  apis: Record<string, string>,
  handlerFn?: (alias: string, route: string) => RouteHandler | null,
): void => {
  Object.entries(apis).forEach(([alias, route]) => {
    const handler = handlerFn ? handlerFn(alias, route) : null;

    cy.intercept(route, handler === null ? undefined : handler).as(alias);
  });
};

export const cyApiWait = (
  aliases: string[],
  handleIntercept?: (alias: string, intercept: Interception) => void,
): void => {
  aliases.forEach((alias: string) => {
    cy.log(`Waiting for API call: ${alias}`);
    cy.wait(alias, { requestTimeout: 3000, responseTimeout: 3000 }).then(
      (intercept) => {
        CyLog.response(alias, intercept);
        if (handleIntercept) handleIntercept(alias, intercept);
      },
    );
  });
};

const errorPropEnvMissing =
  "Forgot to pass in appropriate PROP environment variable";
const errorPropDNE = (arg: string) =>
  `Passed in property ${arg} does not exist in JSON`;

export const cyApiWaitWithHandler = (
  aliases: string[],
  handleIntercept?: (alias: string, intercept: Interception) => void,
): void => {
  aliases.forEach((alias: string) => {
    cy.log(alias);
    cy.wait(alias, { requestTimeout: 3000, responseTimeout: 3000 }).then(
      (intercept) => handleIntercept && handleIntercept(alias, intercept),
    );
  });
};

/**
 * CyApiDetail is a generic that can be used to intercept an API call in Cypress
 * @param R represent the expected response format (any by default)
 * @param B represent the expected request body format (null by default)
 */
export interface CyApiDetail<R = any, B = null> {
  route: string | RegExp;
  method?: Method;
  body?: B;
  response?: R | ((req: CyHttpMessages.IncomingHttpRequest) => R);
  fixture?: string;
  statusCode?: number;
  networkError?: boolean;
  delay?: number;
}

export type CyApiDetails<K extends string, R = any, B = null> = Record<
  K,
  CyApiDetail<R, B>
>;

//https://stackoverflow.com/questions/67083645/typescript-dynamic-getter-setter
//Basically saying we have an El object type of strings for property names
//and that their return type is a Cy ... a.k.a cy object for chaining cypress commands
export type El<T extends string> = Record<T, Cy>;
export type Api<U extends string> = Record<U, U>;
//need to extend string here to make compiler happy lets it know CyPom is definitely string
export class CyPom<T extends string, U extends string = ""> {
  public el: El<T>;
  public api: Api<U>;
  public waitFor: string[] = [];

  get root(): Cy {
    return cyGet(this.rootCy);
  }

  static get isResponseMocked(): boolean {
    return this.dataFile ? false : true;
  }

  private static _dataFile: string;
  static get dataFile(): string {
    if (!this._dataFile) {
      this._dataFile = Cypress.env("CYPRESS_DATA_FILE");
    }
    return this._dataFile;
  }

  constructor(
    public rootCy: string,
    private properties: string[],
    private apis: Record<string, CyApiDetail<any, any>> = {},
  ) {
    this.el = {} as El<T>;
    this.api = {} as Api<U>;

    //Create a getter property for each item specified as element
    this.properties.forEach((property: string) => {
      Object.defineProperty(this.el, property, {
        get() {
          return cyGetChild(rootCy, property);
        },
      });
    });

    const aliases = Object.keys(this.apis);
    aliases.forEach((alias: string) => {
      Object.defineProperty(this.api, alias, {
        get() {
          return alias;
        },
      });
    });
  }

  public interceptApis(aliases: U[]): void {
    cyApiIntercept(aliases, this.apis);
    this.waitFor = aliases.map((alias: string) => `@${alias}`);
  }
  /**
   * Wait for all intercepted APIs to be called
   * Note that evey time you call this method the list to wait for is
   * cleared afterwards
   */
  public waitForApis(
    handleIntercept?: (alias: string, intercept: Interception) => void,
  ): void {
    cyApiWait(this.waitFor, handleIntercept);
    this.waitFor = [];
  }

  /**
   * Wait for a list of APIs to be called
   */
  public waitForApi(aliases: U[]): void {
    cyApiWait(aliases.map((alias: string) => `@${alias}`));
    this.waitFor = [];
  }

  public getDetailOfApi(alias: string, key: keyof CyApiDetail): any | null {
    const api = this.apis[alias];
    return api[key] ? api[key] : null;
  }

  /**
   * Select a specific element by a selector and attributes:
   * <br/><br/>
   * Usage: <br/>
   * cyGetByAttr("input", {name: "title"}) matches <input name="title"/> <br/>
   */
  public cyGetByAttr = <K extends keyof HTMLElementTagNameMap>(
    selector: K,
    attrs: { [attribute: string]: string },
  ): Cypress.Chainable<JQuery<HTMLElementTagNameMap[K]>> => {
    let s = "";
    if (selector !== undefined) {
      s += `${selector}`;
    }
    for (const attr in attrs) {
      if (attrs[attr]) {
        s += `[${attr}=${attrs[attr]}]`;
      } else {
        s += `[${attr}]`;
      }
    }
    return cy.get(s);
  };

  /**
   * Returns an input field based on the Label
   * <br/><br/>
   * Usage: <br/>
   * getInputByLabel("First Name").type("Matteo")
   * getInputByLabel("First name").should('have.value', 'Matteo')
   */
  public getInputByLabel = (label: string) => {
    return cy
      .contains("label", label)
      .invoke("attr", "for")
      .then((id) => {
        cy.get("#" + id);
      });
  };

  /**
   * Returns the current path in react-router.
   * Note that the location is rendered on the page by cy.mount (as per [RenderLocation](./component.tsx))
   */
  public getPath() {
    return cy.get("#pathname").get("#value").invoke("text");
  }
}
