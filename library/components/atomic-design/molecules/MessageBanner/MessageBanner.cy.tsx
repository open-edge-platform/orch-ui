/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import {
  MessageBanner,
  MessageBannerProps,
  MessageBannerVariant,
} from "./MessageBanner";
import { MessageBannerPom } from "./MessageBanner.pom";

const pom = new MessageBannerPom();
const props: MessageBannerProps = {
  icon: "check-circle",
  text: "Sample Text",
  title: "Sample Title",
};
describe("<MessageBanner/>", () => {
  beforeEach(() => {
    cy.viewport(800, 800);
  });
  it("should render component", () => {
    cy.mount(
      <MessageBanner {...props} text="Sample Text" title="Sample Title" />,
    );
    pom.root.should("exist");
  });

  it("fire the onClose callback", () => {
    cy.mount(
      <MessageBanner {...props} onClose={cy.stub().as("onCloseCallback")} />,
    );
    pom.el.close.should("exist");
    pom.el.close.click();
    cy.get("@onCloseCallback").should("have.been.called");
  });

  it("can use success variant", () => {
    cy.mount(
      <MessageBanner {...props} variant={MessageBannerVariant.Success} />,
    );
    pom.el.titleIcon.should(
      "have.class",
      "message-banner__title-icon--success",
    );
  });
  it("can use error variant", () => {
    cy.mount(<MessageBanner {...props} variant={MessageBannerVariant.Error} />);
    pom.el.titleIcon.should("have.class", "message-banner__title-icon--error");
  });

  it("should not display icon when no icon is passed in prop", () => {
    cy.mount(<MessageBanner text="Sample Text" />);
    pom.el.titleIcon.should("not.exist");
  });

  it("should not display the header items when props are not passed", () => {
    cy.mount(
      <MessageBanner
        isDismmisible={false}
        variant={MessageBannerVariant.Error}
        content="test"
      />,
    );
    pom.el.titleIcon.should("not.exist");
    pom.el.close.should("not.exist");
    pom.el.title.should("not.exist");
  });

  it("should render content received as prop", () => {
    cy.mount(
      <MessageBanner isDismmisible={false} content={<div>TEST CONTENT</div>} />,
    );
    pom.el.messageBannerContent.contains("TEST CONTENT");
  });

  it("content prop body should not be rendered when the prop is not passed", () => {
    cy.mount(<MessageBanner isDismmisible={false} {...props} />);
    pom.el.messageBannerContent.should("not.exist");
  });

  it("text content should be rendered when the text prop is passed", () => {
    cy.mount(<MessageBanner text="Message banner" />);
    pom.el.messageBannerText.should("exist");
  });

  it("text content should not be rendered when the text prop is not passed", () => {
    cy.mount(<MessageBanner />);
    pom.el.messageBannerText.should("not.exist");
  });
});
