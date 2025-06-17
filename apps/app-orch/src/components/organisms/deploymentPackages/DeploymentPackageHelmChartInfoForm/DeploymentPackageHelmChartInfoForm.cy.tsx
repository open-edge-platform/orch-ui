import { useForm } from "react-hook-form";
import DeploymentPackageHelmChartInfoForm, { PackageInputs } from "./DeploymentPackageHelmChartInfoForm";
import DeploymentPackageHelmChartInfoFormPom from "./DeploymentPackageHelmChartInfoForm.pom";
import { setupStore } from "../../../../store";

const WrapperComponent = () => {
  const {
    control,
    formState: { errors },
  } = useForm<PackageInputs>({
    mode: "all",
    defaultValues: {
      helmChartURL: "",
      username: "",
      password: "",
      description: "",
    },
  });

  return <DeploymentPackageHelmChartInfoForm control={control} errors={errors} />;
};

const pom = new DeploymentPackageHelmChartInfoFormPom();

describe("<DeploymentPackageHelmChartInfoForm />", () => {
  beforeEach(() => {
    const store = setupStore({
      deploymentPackage: {
          description: "",
          applicationReferences: [],
          artifacts: [],
          extensions: [],
          name: "",
          version: ""
      },
    });
    cy.mount(<WrapperComponent />, {
      reduxStore: store,
    });
  });

  it("should render all fields with empty default values", () => {
    pom.el["helm-chart-url"].should("have.value", "");
    pom.el.username.should("have.value", "");
    pom.el.password.should("have.value", "");
    pom.el.description.should("have.value", "");
  });

  describe("validation", () => {
    it("should show error for invalid Helm Chart URL", () => {
      pom.el["helm-chart-url"].type("$invalid!!");
      pom.helmChartUrlField.contains("Name must start and end with a letter or a number");
    });

    it("should show maxLength error for Helm Chart URL", () => {
      const longValue = "a".repeat(41);
      pom.el["helm-chart-url"].type(longValue);
      pom.helmChartUrlField.contains("Name can't be more than 40 characters.");
    });

    it("should not show error for valid Helm Chart URL", () => {
      pom.el["helm-chart-url"].type("valid-chart");
      pom.helmChartUrlInvalidIndicator.should("not.exist");
    });

    it("should validate username input", () => {
      pom.el.username.type("invalid@name");
      pom.usernameField.contains("Name must start and end with a letter or a number");

      pom.el.username.clear().type("valid-username");
      pom.usernameInvalidIndicator.should("not.exist");
    });

    it("should not validate password (only presence is checked)", () => {
      pom.el.password.type("password123");
      pom.passwordInvalidIndicator.should("not.exist");
    });
  });

  it("should update description on textarea input", () => {
    const newDesc = "Updated values";
    pom.el.description.type(newDesc);
    pom.el.description.should("have.value", newDesc);
  });

  it("should allow entering and clearing username", () => {
    pom.el.username.type("testuser");
    pom.el.username.should("have.value", "testuser");
    pom.el.username.clear();
    pom.el.username.should("have.value", "");
  });

  it("should allow entering and clearing password", () => {
    pom.el.password.type("secret");
    pom.el.password.should("have.value", "secret");
    pom.el.password.clear();
    pom.el.password.should("have.value", "");
  });

  it("should allow entering and clearing helm chart url", () => {
    pom.el["helm-chart-url"].type("my-helm-chart");
    pom.el["helm-chart-url"].should("have.value", "my-helm-chart");
    pom.el["helm-chart-url"].clear();
    pom.el["helm-chart-url"].should("have.value", "");
  });

  it("should allow entering and clearing description", () => {
    pom.el.description.type("Opis testowy");
    pom.el.description.should("have.value", "Opis testowy");
    pom.el.description.clear();
    pom.el.description.should("have.value", "");
  });

  it("should trim whitespace in helm chart url and validate", () => {
    pom.el["helm-chart-url"].type("  validchart  ");
    pom.el["helm-chart-url"].should("have.value", "  validchart  ");
    pom.helmChartUrlInvalidIndicator.should("not.exist");
  });

  it("should show required error for username if field is required and left empty", () => {
    pom.el.username.focus().blur();
  });

  it("should show required error for password if field is required and left empty", () => {
    pom.el.password.focus().blur();
  });

  it("should not show any validation errors on pristine form", () => {
    pom.helmChartUrlInvalidIndicator.should("not.exist");
    pom.usernameInvalidIndicator.should("not.exist");
    pom.passwordInvalidIndicator.should("not.exist");
  });

  it("should allow special characters in username", () => {
    pom.el.username.type("user!@#");
    pom.usernameField.contains("Name must start and end with a letter or a number");
  });
});