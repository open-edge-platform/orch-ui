import { useAppDispatch } from "../../../store/hooks";
import { useEffect, useMemo } from "react";

const dataCy = "deploymentPackageImportFromHelmChart";

const deploymentPackageImportFromHelmChart = () => {
  const cy = { "data-cy": dataCy };

  const dispatch = useAppDispatch();
  const breadcrumb = useMemo(
    () => [homeBreadcrumb, deploymentPackageBreadcrumb, importDeploymentPackageFromHelmChartBreadcrumb],
    [],
  );

  const [tabIndex, setTabIndex] = useState<number>(0);

  useEffect(() => {
    dispatch(setBreadcrumb(breadcrumb));
    //dispatch(setActiveNavItem(packagesNavItem));
  }, []);
