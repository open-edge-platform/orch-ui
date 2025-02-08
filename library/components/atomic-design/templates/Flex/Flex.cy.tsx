/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { cyGet } from "@orch-ui/tests";
import { Flex } from "./Flex";
import { FlexPom } from "./Flex.pom";

const pom = new FlexPom();
const getBorder = (color: string) => ({ border: `1px solid ${color}` });
describe("<Flex/>", () => {
  it("should render LG cols", () => {
    cy.viewport(1400, 1400);
    cy.mount(
      <Flex cols={[2, 4]} colsLg={[6]}>
        <div style={getBorder("black")}>Div1</div>
        <div style={getBorder("green")}>Div2</div>
        <div style={getBorder("orange")}>Div3</div>
        <div style={getBorder("red")}>Div4</div>
        <div style={getBorder("blue")}>Div5</div>
      </Flex>,
    );
    pom.el.flexItem.should("have.class", "flex-item--col-lg-6");
  });

  it("should render SM cols", () => {
    cy.viewport(600, 600);
    cy.mount(
      <Flex cols={[2, 4]} colsSm={[12]}>
        <div style={getBorder("black")}>Div1</div>
        <div style={getBorder("green")}>Div2</div>
        <div style={getBorder("orange")}>Div3</div>
        <div style={getBorder("red")}>Div4</div>
        <div style={getBorder("blue")}>Div5</div>
      </Flex>,
    );
    pom.el.flexItem.should("have.class", "flex-item--col-sm-12");
  });

  it("can modify wrap", () => {
    cy.mount(
      <Flex cols={[8, 3]} wrap="no-wrap">
        <div style={getBorder("black")}>Div1</div>
        <div style={getBorder("green")}>Div2</div>
        <div style={getBorder("orange")}>Div3</div>
        <div style={getBorder("red")}>Div4</div>
        <div style={getBorder("blue")}>Div5</div>
      </Flex>,
    );
    pom.root.should("have.class", "flex--no-wrap");
  });

  it("should render nested flex", () => {
    cy.mount(
      <Flex cols={[6]} colsLg={[6]} dataCy="parent">
        <Flex cols={[2, 10]} dataCy="child1">
          <div style={getBorder("black")}>Label1Label1Label1Label1Label1:</div>
          <div style={getBorder("green")}>value</div>
        </Flex>
        <Flex cols={[6]} dataCy="child2">
          <div style={getBorder("orange")}>Label2:</div>
          <div style={getBorder("red")}>value</div>
        </Flex>

        <div style={getBorder("blue")}>Div5</div>
      </Flex>,
    );
    pom.root.should("not.exist");
    cyGet("parent").should("exist");
    cyGet("child1").should("exist");
    cyGet("child2").should("exist");
  });

  it("align items middle", () => {
    cy.mount(
      <Flex cols={[6]} align="middle">
        <div style={getBorder("orange")}>Div 1</div>
        <h1 style={{ ...getBorder("red"), margin: 0 }}>H1</h1>
      </Flex>,
    );
    pom.root.should("have.class", "flex--align-middle");
  });

  it("align items start", () => {
    cy.mount(
      <Flex cols={[6]} align="start">
        <div style={getBorder("orange")}>Div 1</div>
        <h1 style={{ ...getBorder("red"), margin: 0 }}>H1</h1>
      </Flex>,
    );
    pom.root.should("have.class", "flex--align-start");
  });

  it("align items end", () => {
    cy.viewport(400, 400);
    cy.mount(
      <Flex cols={[3, 5]} align="end">
        <div style={getBorder("orange")}>Div 1</div>
        <h1 style={{ ...getBorder("red"), margin: 0 }}>H1</h1>
      </Flex>,
    );
    pom.root.should("have.class", "flex--align-end");
  });

  it("justify items middle", () => {
    cy.mount(
      <Flex cols={[3, 5]} justify="middle">
        <div style={getBorder("orange")}>Div 1</div>
        <h1 style={{ ...getBorder("red"), margin: 0 }}>H1</h1>
      </Flex>,
    );
    pom.root.should("have.class", "flex--justify-middle");
  });

  it("justify items start", () => {
    cy.mount(
      <Flex cols={[3, 5]} justify="start">
        <div style={getBorder("orange")}>Div 1</div>
        <h1 style={{ ...getBorder("red"), margin: 0 }}>H1</h1>
      </Flex>,
    );
    pom.root.should("have.class", "flex--justify-start");
  });

  it("justify items end", () => {
    cy.viewport(400, 400);
    cy.mount(
      <Flex cols={[3, 5]} justify="end">
        <div style={getBorder("orange")}>Div 1</div>
        <h1 style={{ ...getBorder("red"), margin: 0 }}>H1</h1>
      </Flex>,
    );
    pom.root.should("have.class", "flex--justify-end");
  });

  it("can have custom css class", () => {
    cy.viewport(400, 400);
    cy.mount(
      <Flex cols={[3, 5]} justify="end" className="custom-class">
        <div>1</div>
        <div>2</div>
      </Flex>,
    );
    pom.root.should("have.class", "custom-class");
  });
});
