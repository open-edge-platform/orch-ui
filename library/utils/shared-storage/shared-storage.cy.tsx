/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { SharedStorage, StorageItems } from "./shared-storage";

describe("Shared storage across MFE ", () => {
  it("Should return undefined if no storage found", () => {
    expect(SharedStorage.getStorageItem(StorageItems.PROJECT)).to.equal(
      undefined,
    );
  });
  it("Should get and set values to storage", () => {
    SharedStorage.setStorageItem(StorageItems.PROJECT, {
      name: "testing",
      uID: "da1d29df-ebd8-4ca1-8e1b-1ecbead6d3dd",
    });
    expect(SharedStorage.getStorageItem(StorageItems.PROJECT)?.name).to.equal(
      "testing",
    );
    expect(SharedStorage.getStorageItem(StorageItems.PROJECT)?.uID).to.equal(
      "da1d29df-ebd8-4ca1-8e1b-1ecbead6d3dd",
    );
  });
  it("Should remove storage", () => {
    SharedStorage.setStorageItem(StorageItems.PROJECT, {
      name: "testing",
      uID: "da1d29df-ebd8-4ca1-8e1b-1ecbead6d3dd",
    });
    expect(SharedStorage.getStorageItem(StorageItems.PROJECT)?.name).to.equal(
      "testing",
    );
    SharedStorage.removeStorageItem(StorageItems.PROJECT);
    expect(SharedStorage.getStorageItem(StorageItems.PROJECT)).to.equal(
      undefined,
    );
  });

  it("Should listen to storage change dispatched event", () => {
    window.addEventListener(
      SharedStorage.getStorageEvents(StorageItems.PROJECT),
      cy.stub().as("projectEventSpy"),
    );
    SharedStorage.setStorageItem(StorageItems.PROJECT, {
      name: "testing",
      uID: "da1d29df-ebd8-4ca1-8e1b-1ecbead6d3dd",
    });
    cy.get("@projectEventSpy").should("have.been.called");
    expect(SharedStorage.getStorageItem(StorageItems.PROJECT)?.name).to.equal(
      "testing",
    );
  });

  it("get project property should fetch the project details", () => {
    SharedStorage.setStorageItem(StorageItems.PROJECT, {
      name: "testing",
      uID: "da1d29df-ebd8-4ca1-8e1b-1ecbead6d3dd",
    });
    expect(SharedStorage.project?.name).to.equal("testing");
    expect(SharedStorage.project?.uID).to.equal(
      "da1d29df-ebd8-4ca1-8e1b-1ecbead6d3dd",
    );
  });

  it("should update the project details on set project property", () => {
    SharedStorage.project = {
      name: "testing",
      uID: "da1d29df-ebd8-4ca1-8e1b-1ecbead6d3dd",
    };
    expect(SharedStorage.project?.name).to.equal("testing");
    expect(SharedStorage.project?.uID).to.equal(
      "da1d29df-ebd8-4ca1-8e1b-1ecbead6d3dd",
    );
  });
});
