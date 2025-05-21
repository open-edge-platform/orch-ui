/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cm, infra, mbApi } from "@orch-ui/apis";
import { MetadataPair } from "@orch-ui/components";
import {
  clusterManagementRoute,
  ObjectKeyValue,
  objectToMetadataPair,
  SharedStorage,
  useInfraNavigate,
} from "@orch-ui/utils";
import { Button, ButtonGroup, Heading, Toast } from "@spark-design/react";
import {
  ButtonSize,
  ButtonVariant,
  ToastPosition,
  ToastState,
  ToastVisibility,
} from "@spark-design/tokens";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

const dataCy = "clusterEdit";
type urlParams = {
  clusterName: string;
};

export interface ClusterEditProps {
  // This is needed for testing purpose
  HostsTableRemote?: React.LazyExoticComponent<React.ComponentType<any>> | null;
}

const ClusterEdit = ({ HostsTableRemote }: ClusterEditProps) => {
  const cy = { "data-cy": dataCy };
  const { clusterName } = useParams<urlParams>() as urlParams;
  const navigate = useInfraNavigate();
  const dispatch = useAppDispatch();

  //initial nodes
  const [initialCluster, setInitialCluster] = useState<cm.ClusterDetailInfo>(
    {},
  );
  const currentCluster = useAppSelector(getCluster);
  // Labels is of type `object` in API. This is not recognized as ObjectKeyValue `{[key: string]: string}`
  const currentClusterLabel = (currentCluster.labels ?? {}) as ObjectKeyValue;

  const [clusterTemplateName, setClusterTemplateName] = useState<string>("");
  const [clusterTemplateVersion, setClusterTemplateVersion] =
    useState<string>("");
  const [inheritedMeta, setInheritedMeta] = useState<MetadataPair[]>([]); // Set Inherited Data
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
    cm.useGetV2ProjectsByProjectNameClustersAndNameQuery(
      {
        name: clusterName,
        projectName: SharedStorage.project?.name ?? "",
      },
      { skip: false, refetchOnMountOrArgChange: true },
    );

  // Used to get site id for drawer
  const { data: firstClusterHost, isSuccess: isHostSuccess } =
    infra.useGetV1ProjectsByProjectNameComputeHostsAndHostIdQuery(
      {
        projectName: SharedStorage.project?.name ?? "",
        hostId: firstHostId as string,
      },
      { skip: !firstHostId || !SharedStorage.project?.name },
    );
  // Used to get region id for drawer
  const { data: siteData } =
    infra.useGetV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdQuery(
      {
        projectName: SharedStorage.project?.name ?? "",
        regionId: "*", // Cluster or associated host have no region information
        siteId: siteId && siteId.length > 0 ? siteId : "",
      },
      { skip: !siteId || !SharedStorage.project?.name },
    );

  // Inherited metadata array for metadata display
  useEffect(() => {
    if (siteData) {
      const regionMeta = siteData?.inheritedMetadata?.location ?? [];
      const siteMeta = siteData?.metadata ?? [];
      /** Combine Region and Site Metadata (a.k.a Inherited Metadata) */
      const combinedMetadata = [
        ...regionMeta.map(({ key, value }) => ({
          key,
          value,
          type: "region",
        })),
        ...siteMeta.map(({ key, value }) => ({
          key,
          value,
          type: "site",
        })),
      ];
      setInheritedMeta(combinedMetadata);
    }
  }, [siteData]);

  const [
    editClusterByTemplateName,
    { isSuccess: isEditTemplateSuccess, isError: isEditTemplateError },
  ] = cm.usePutV2ProjectsByProjectNameClustersAndNameNodesMutation();

  const [
    editClusterByLabels,
    { isSuccess: isLabelsSuccess, isError: isLabelsError },
  ] = cm.usePutV2ProjectsByProjectNameClustersAndNameLabelsMutation();

  const [
    editClusterByNodes,
    { isSuccess: isEditNodesSuccess, isError: isEditNodesError },
  ] = cm.usePutV2ProjectsByProjectNameClustersAndNameNodesMutation();

  const [updateMetadata] =
    mbApi.useMetadataServiceCreateOrUpdateMetadataMutation();

  // set initial cluster state
  useEffect(() => {
    setInitialCluster(clusterDetail ?? {});
    updateClusterNodes(clusterDetail?.nodes ?? []);
  }, [isSuccess, clusterDetail]);

  // Component states

  // save button state update
  useEffect(() => {
    setLabelsUpdated(false);
    setTemplateUpdated(false);
    setNodesUpdated(false);

    const initial = initialCluster;
    const current = currentCluster;

    const compareNodes = (nodesA: cm.NodeInfo[], nodesB: cm.NodeInfo[]) => {
      return (
        nodesB.length != nodesA.length ||
        nodesB.some((value, index) => value.id != nodesA[index].id)
      );
    };

    if (current.template && current.template != initial.template) {
      setTemplateUpdated(true);
    }
    if (
      currentCluster.labels &&
      initialCluster.labels &&
      currentCluster.labels != initialCluster.labels
    ) {
      setLabelsUpdated(true);
    }

    if (
      currentCluster.nodes &&
      initialCluster.nodes &&
      compareNodes(currentCluster.nodes, initialCluster.nodes)
    ) {
      setNodesUpdated(true);
    }
  }, [currentCluster]);

  // template name and version state
  useEffect(() => {
    const fullTemplateName = currentCluster.template;
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
  }, [currentCluster.template]);

  // region and site state
  useEffect(() => {
    if (initialCluster.nodes && initialCluster.nodes[0].id) {
      setFirstHostId(initialCluster.nodes[0].id);
    }
    dispatch(setCluster({ ...initialCluster }));
  }, [initialCluster]);

  useEffect(() => {
    setSiteId(
      firstClusterHost?.site?.resourceId || firstClusterHost?.site?.siteID,
    );
  }, [firstClusterHost, isHostSuccess, currentCluster]);

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
  const convertNodes = (nodes: cm.NodeInfo[]) => {
    const newNodes: cm.NodeSpec[] = nodes.map((i) => ({
      id: i.id ?? "",
      role: i.role as "all" | "controlplane" | "worker",
    }));

    return newNodes;
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
        name: currentCluster.name ?? "",
        //TODO: what to update with ?
        body: [],
      }).unwrap();
      promises.push(p);
    }
    if (labelsUpdated) {
      const p = editClusterByLabels({
        projectName: SharedStorage.project?.name ?? "",
        name: currentCluster.name ?? "",
        clusterLabels: {
          labels: currentClusterLabel,
        },
      }).unwrap();
      promises.push(p);

      const metadataP = updateMetadata({
        projectName: SharedStorage.project?.name ?? "",
        metadataList: {
          metadata: [
            ...objectToMetadataPair(currentClusterLabel),
            ...inheritedMeta,
          ],
        },
      }).unwrap();
      promises.push(metadataP);
    }
    if (nodesUpdated) {
      const p = editClusterByNodes({
        projectName: SharedStorage.project?.name ?? "",
        name: currentCluster.name ?? "",
        body: convertNodes(currentCluster.nodes ?? []),
      }).unwrap();
      promises.push(p);
    }

    await Promise.all(promises);
  };

  return (
    <div {...cy} className="cluster-edit">
      <Heading semanticLevel={4}>Edit Cluster</Heading>
      <NameInfo
        templateName={clusterTemplateName}
        templateVersion={clusterTemplateVersion}
        clusterName={clusterName}
      />

      <MetadataLabels
        inheritedMetadata={inheritedMeta}
        clusterLabels={objectToMetadataPair(currentClusterLabel)}
      />

      {siteData && siteData.region && (
        <HostSelection
          cluster={{
            ...currentCluster,
          }}
          configuredClusterNodes={initialCluster.nodes}
          onNodesSave={(nodeInfo) => {
            dispatch(updateClusterNodes(nodeInfo));
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
            navigate(clusterManagementRoute);
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
            navigate(clusterManagementRoute);
          }
          if (onReqError()) {
            setErrorVisibility(ToastVisibility.Hide);
            navigate(clusterManagementRoute);
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
