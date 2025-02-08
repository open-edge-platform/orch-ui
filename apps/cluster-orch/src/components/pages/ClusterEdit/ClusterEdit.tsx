/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ecm, eim, mbApi } from "@orch-ui/apis";
import {
  BreadcrumbPiece,
  MetadataPair,
  setActiveNavItem,
  setBreadcrumb as setClusterBreadcrumb,
} from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import { Button, ButtonGroup, Heading, Toast } from "@spark-design/react";
import {
  ButtonSize,
  ButtonVariant,
  ToastPosition,
  ToastState,
  ToastVisibility,
} from "@spark-design/tokens";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { clustersMenuItem, homeBreadcrumb } from "../../../routes/const";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  clearCluster,
  getCluster,
  setCluster,
  updateClusterNodes,
} from "../../../store/reducers/cluster";
import HostSelection from "../../organism/ClusterEdit/HostSelection/HostSelection";
import MetadataLabels from "../../organism/ClusterEdit/MetadataLabels/MetadataLabels";
import NameInfo from "../../organism/ClusterEdit/NameInfo/NameInfo";
import "./ClusterEdit.scss";

export const dataCy = "clusterEdit";
type urlParams = {
  clusterName: string;
};

export interface ClusterEditProps {
  /** This is required for cluster plugin to to set breadcrumb from fleet-management UI */
  setBreadcrumb?: (breadcrumbs: BreadcrumbPiece[]) => void;

  // This is needed for testing purpose
  HostsTableRemote?: React.LazyExoticComponent<React.ComponentType<any>> | null;
}

const ClusterEdit = ({ setBreadcrumb, HostsTableRemote }: ClusterEditProps) => {
  const cy = { "data-cy": dataCy };
  const { clusterName } = useParams<urlParams>() as urlParams;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  //initial nodes
  const [initialCluster, setInitialCluster] = useState<ecm.ClusterDetailInfo>(
    {},
  );
  const currentCluster = useAppSelector(getCluster);

  const [clusterTemplateName, setClusterTemplateName] = useState<string>("");
  const [clusterTemplateVersion, setClusterTemplateVersion] =
    useState<string>("");

  const [inheritedMeta, setInheritedMeta] = useState<MetadataPair[]>([]); // Set Inherited Data
  const [userDefinedMeta, setUserDefinedMeta] = useState<MetadataPair[]>([]); // Set Custom Input data
  const [firstHostId, setFirstHostId] = useState<string>();
  const [siteId, setSiteId] = useState<string>();

  const [successVisibility, setSuccessVisibility] = useState<ToastVisibility>(
    ToastVisibility.Hide,
  );
  const [errorVisibility, setErrorVisibility] = useState<ToastVisibility>(
    ToastVisibility.Hide,
  );

  //modal delete states
  const [removeLast, setRemoveLast] = useState<boolean>(false);

  // updated values
  const [templateUpdated, setTemplateUpdated] = useState<boolean>(false);
  const [labelsUpdated, setLabelsUpdated] = useState<boolean>(false);
  const [nodesUpdated, setNodesUpdated] = useState<boolean>(false);

  // Initiate api calls
  const { data: clusterDetail, isSuccess } =
    ecm.useGetV1ProjectsByProjectNameClustersAndClusterNameQuery(
      {
        clusterName: clusterName,
        projectName: SharedStorage.project?.name ?? "",
      },
      { skip: false, refetchOnMountOrArgChange: true },
    );

  // Used to get site id for drawer
  const { data: firstClusterHost, isSuccess: isHostSuccess } =
    eim.useGetV1ProjectsByProjectNameComputeHostsAndHostIdQuery(
      {
        projectName: SharedStorage.project?.name ?? "",
        hostId: firstHostId as string,
      },
      { skip: !firstHostId || !SharedStorage.project?.name },
    );
  // Used to get region id for drawer
  const { data: siteData } =
    eim.useGetV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdQuery(
      {
        projectName: SharedStorage.project?.name ?? "",
        regionId: "*", // Cluster or associated host have no region information
        siteId: siteId && siteId.length > 0 ? siteId : "",
      },
      { skip: !siteId || !SharedStorage.project?.name },
    );
  const [
    editClusterByTemplateName,
    { isSuccess: isEditTemplateSuccess, isError: isEditTemplateError },
  ] = ecm.usePutV1ProjectsByProjectNameClustersAndClusterNameMutation();

  const [
    editClusterByLabels,
    { isSuccess: isLabelsSuccess, isError: isLabelsError },
  ] = ecm.usePutV1ProjectsByProjectNameClustersAndClusterNameLabelsMutation();

  const [
    editClusterByNodes,
    { isSuccess: isEditNodesSuccess, isError: isEditNodesError },
  ] = ecm.usePutV1ProjectsByProjectNameClustersAndClusterNameNodesMutation();

  const [updateMetadata] =
    mbApi.useMetadataServiceCreateOrUpdateMetadataMutation();

  // set initial cluster state
  useEffect(() => {
    setInitialCluster(clusterDetail ?? {});
    updateClusterNodes(clusterDetail?.nodes ?? { nodeInfoList: [] });
  }, [isSuccess, clusterDetail]);

  // Component states

  // save button state update
  useEffect(() => {
    setLabelsUpdated(false);
    setTemplateUpdated(false);
    setNodesUpdated(false);

    const initial = initialCluster;
    const current = currentCluster;

    const compareNodes = (nodesA: ecm.NodeInfo[], nodesB: ecm.NodeInfo[]) => {
      return (
        nodesB.length != nodesA.length ||
        nodesB.some((value, index) => value.guid != nodesA[index].guid)
      );
    };

    if (
      current.clusterTemplateName &&
      current.clusterTemplateName != initial.clusterTemplateName
    ) {
      setTemplateUpdated(true);
    }
    if (
      currentCluster.clusterLabels &&
      initialCluster.clusterLabels &&
      currentCluster.clusterLabels != initialCluster.clusterLabels
    ) {
      setLabelsUpdated(true);
    }

    if (
      currentCluster.nodes?.nodeInfoList &&
      initialCluster.nodes?.nodeInfoList &&
      compareNodes(
        currentCluster.nodes.nodeInfoList,
        initialCluster.nodes.nodeInfoList,
      )
    ) {
      setNodesUpdated(true);
    }
  }, [currentCluster]);

  // template name and version state
  useEffect(() => {
    const fullTemplateName = currentCluster.clusterTemplateName;
    let name = "";
    let version = "";
    if (fullTemplateName) {
      // Splits cluster template name to preselect dropdown
      name = fullTemplateName.slice(0, fullTemplateName.lastIndexOf("v"));

      name = name.substring(0, name.length - 1);
      version = fullTemplateName.substring(
        fullTemplateName.lastIndexOf("v"),
        fullTemplateName.length,
      );
      setClusterTemplateName(name);
      setClusterTemplateVersion(version);
    }
  }, [currentCluster.clusterTemplateName]);

  // region and site state
  useEffect(() => {
    if (
      initialCluster.nodes?.nodeInfoList &&
      initialCluster.nodes.nodeInfoList[0].id
    ) {
      setFirstHostId(initialCluster.nodes.nodeInfoList[0].id);
    }
    dispatch(setCluster({ ...initialCluster }));
  }, [initialCluster]);

  useEffect(() => {
    setSiteId(
      firstClusterHost?.site?.resourceId || firstClusterHost?.site?.siteID,
    );
  }, [firstClusterHost, isHostSuccess, currentCluster]);

  // Breadcrumb settings
  const breadcrumb = useMemo(
    () => [
      homeBreadcrumb,
      {
        text: "Clusters",
        link: "../../clusters",
      },
      {
        text: `${clusterDetail?.name}`,
        link: `../../cluster/${clusterName}`,
      },
      {
        text: "Edit Cluster",
        link: "#",
      },
    ],
    [clusterDetail],
  );
  useEffect(() => {
    // use cluster-native breadcrumb unless specified
    if (setBreadcrumb) {
      setBreadcrumb(breadcrumb);
    } else {
      dispatch(setClusterBreadcrumb(breadcrumb));
    }
    dispatch(setActiveNavItem(clustersMenuItem));
  }, [breadcrumb]);

  const onReqSuccess = () => {
    if (
      (isEditTemplateSuccess && templateUpdated) ||
      (isLabelsSuccess && labelsUpdated) ||
      (isEditNodesSuccess && nodesUpdated)
    ) {
      return true;
    } else {
      return false;
    }
  };
  const onReqError = () => {
    if (isEditTemplateError || isLabelsError || isEditNodesError) {
      return true;
    } else {
      return false;
    }
  };

  const onReqWarning = () => removeLast;

  // Converters
  // convert nodes type
  const convertNodes = (nodes: ecm.NodeInfo[]) => {
    const newNodes: ecm.NodeSpec[] = nodes.map((i) => ({
      nodeGuid: i.guid ?? "",
      nodeRole: i.role as "all" | "controlplane" | "worker",
    }));

    return newNodes;
  };
  // labels to object
  const labelsToObject = (pairs: MetadataPair[]) => {
    const labelObject: any = {};
    pairs.forEach((tags) => {
      labelObject[tags.key] = tags.value;
    });
    return labelObject;
  };

  // object to labels
  const objectToLabels = (data: any) => {
    const labelPair: MetadataPair[] = [];
    Object.keys(data).map(function (personNamedIndex) {
      if (data) {
        const label = {
          key: personNamedIndex,
          value: data[personNamedIndex],
        };
        labelPair.push(label);
        return data[personNamedIndex];
      }
    });
    return labelPair;
  };

  /**
   * editHandler checks for all the required updates and creates a list of promises
   * with all the required calls. Then sends all the requests in parallel.
   */
  const editHandler = async () => {
    const promises: Promise<void | mbApi.MetadataResponse>[] = [];

    if (templateUpdated) {
      const p = editClusterByTemplateName({
        projectName: SharedStorage.project?.name ?? "",
        clusterName: currentCluster.name ?? "",
        // clusterTemplateInfo: {
        //   name: clusterTemplateName,
        //   version: clusterTemplateVersion,
        // },
        //TODO: what to update with ?
        clusterConfig: { metadata: {}, spec: {} },
      }).unwrap();
      promises.push(p);
    }
    if (labelsUpdated) {
      const p = editClusterByLabels({
        projectName: SharedStorage.project?.name ?? "",
        clusterName: currentCluster.name ?? "",
        clusterLabels: {
          labels: labelsToObject(objectToLabels(currentCluster.clusterLabels)),
          userDefinedLabelKeys: currentCluster.userDefinedLabelKeys,
        },
      }).unwrap();
      promises.push(p);

      const metadataP = updateMetadata({
        projectName: SharedStorage.project?.name ?? "",
        metadataList: {
          metadata: [...userDefinedMeta, ...inheritedMeta],
        },
      }).unwrap();
      promises.push(metadataP);
    }
    if (nodesUpdated) {
      const p = editClusterByNodes({
        projectName: SharedStorage.project?.name ?? "",
        clusterName: currentCluster.name ?? "",
        clusterNodes: {
          nodeList: convertNodes(currentCluster.nodes?.nodeInfoList ?? []),
        },
      }).unwrap();
      promises.push(p);
    }

    await Promise.all(promises);
  };

  console.log(siteData, siteData?.region);

  return (
    <div {...cy} className="cluster-edit">
      <Heading semanticLevel={4}>Edit Cluster</Heading>
      <NameInfo
        templateName={clusterTemplateName}
        templateVersion={clusterTemplateVersion}
        clusterName={clusterName}
      />

      {/** TODO: MetadataLabel needs to be refactored. This causing a performance issue with rerendering in circle. */}
      <MetadataLabels
        userDefinedLabelKeys={currentCluster.userDefinedLabelKeys ?? []}
        regionMeta={siteData?.inheritedMetadata?.location ?? []}
        siteMeta={siteData?.metadata ?? []}
        clusterLabels={currentCluster.clusterLabels ?? {}}
        getInheritedMeta={(meta) => setInheritedMeta(meta)}
        getUserDefinedMeta={(meta) => setUserDefinedMeta(meta)}
      />

      {siteData && siteData.region && (
        <HostSelection
          cluster={{
            ...currentCluster,
            locationList: [
              {
                locationType: "LOCATION_TYPE_REGION_ID",
                locationInfo: siteData.region.resourceId,
              },
              {
                locationType: "LOCATION_TYPE_REGION_NAME",
                locationInfo: siteData.region.name,
              },
              {
                locationType: "LOCATION_TYPE_SITE_ID",
                locationInfo: siteData.resourceId,
              },
              {
                locationType: "LOCATION_TYPE_SITE_NAME",
                locationInfo: siteData.name,
              },
            ],
          }}
          configuredClusterNodes={initialCluster.nodes?.nodeInfoList}
          onNodesSave={(nodeInfoList) => {
            dispatch(updateClusterNodes({ nodeInfoList }));
          }}
          onRemoveLastNode={(removed) => setRemoveLast(removed)}
          HostsTableRemote={HostsTableRemote}
        />
      )}

      <ButtonGroup className="edit-cluster__actions">
        <Button
          size={ButtonSize.Large}
          variant={ButtonVariant.Secondary}
          onPress={() => {
            dispatch(clearCluster());
            navigate("/infrastructure/clusters");
          }}
        >
          Cancel
        </Button>

        <Button
          data-cy="saveBtn"
          size={ButtonSize.Large}
          variant={ButtonVariant.Action}
          isDisabled={!templateUpdated && !nodesUpdated && !labelsUpdated}
          onPress={editHandler}
        >
          Save
        </Button>
      </ButtonGroup>
      <Toast
        message={
          onReqSuccess()
            ? "Cluster updated, redirecting you back to the Clusters page..."
            : onReqError()
              ? "Failed to edit cluster try again later, redirecting you back to Clusters page..."
              : onReqWarning()
                ? `This is the only host in ${clusterName}. Delete the cluster to remove host and return to an unassinged state`
                : ""
        }
        state={
          onReqSuccess()
            ? ToastState.Success
            : onReqError()
              ? ToastState.Danger
              : ToastState.Warning
        }
        position={ToastPosition.TopRight}
        visibility={
          onReqSuccess() || onReqError() || onReqWarning()
            ? ToastVisibility.Show
            : onReqSuccess()
              ? successVisibility
              : errorVisibility
        }
        canClose={true}
        duration={3000}
        onHide={() => {
          if (onReqSuccess()) {
            setSuccessVisibility(ToastVisibility.Hide);
            navigate("../clusters");
          }
          if (onReqError()) {
            setErrorVisibility(ToastVisibility.Hide);
            navigate("../clusters");
          }
          if (onReqWarning()) {
            setRemoveLast(false);
          }
        }}
        data-cy={
          onReqSuccess()
            ? "successToast"
            : onReqError()
              ? "errorToast"
              : "warningToast"
        }
      />
    </div>
  );
};

export default ClusterEdit;
