import { setActiveNavItem, setBreadcrumb } from "@orch-ui/components";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Control } from "react-hook-form";
import {
  selectDeploymentPackage,
} from "../../../store/reducers/deploymentPackage";
import {
  deploymentPackageBreadcrumb,
  homeBreadcrumb,
  importDeploymentPackageFromHelmChartBreadcrumb,
  packagesNavItem,
} from "../../../routes/const";
import DeploymentPackageHelmChartInfoForm, { PackageInputs } from "src/components/organisms/deploymentPackages/DeploymentPackageHelmChartInfoForm/DeploymentPackageHelmChartInfoForm";
import {
  Heading,
} from "@spark-design/react";

const dataCy = "deploymentPackageImportFromHelmChart";

export type DeploymentPackageCreateMode = "add" | "update" | "clone";


interface ApplicationFormProps {
  control: Control<PackageInputs, string>;
}

const DeploymentPackageImportFromHelmChart = () => {
  const cy = { "data-cy": dataCy };

  const dispatch = useAppDispatch();
  const deploymentPackage = useAppSelector(selectDeploymentPackage);

  const {
    control,
    formState: { errors, isValid },
  } = useForm<PackageInputs>({
    mode: "all",
    defaultValues: {
      helmChartURL: deploymentPackage.helmChartURL,
      username: deploymentPackage.username,
      password: deploymentPackage.password,
    },
  });

  const breadcrumb = useMemo(
    () => [
      homeBreadcrumb,
      deploymentPackageBreadcrumb,
      importDeploymentPackageFromHelmChartBreadcrumb,
    ],
    []
  );

  useEffect(() => {
    dispatch(setBreadcrumb(breadcrumb));
    dispatch(setActiveNavItem(packagesNavItem));
  }, [dispatch, breadcrumb]);

  return (
    <div {...cy} className="deployment-package-import-from-helm-chart">
      <Heading semanticLevel={1} size="l" data-cy="title">
              Import from Helm Chart
      </Heading>
      <Heading semanticLevel={2} size="xs" data-cy="subTitle" style={{ marginBottom: "3rem" }}>
              Provide Helm Chart details to import a deployment
      </Heading>
      
      <DeploymentPackageHelmChartInfoForm
        control={control}
        errors={errors}
      />
    </div>
  );
};

export default DeploymentPackageImportFromHelmChart;
