import { omApi } from "@orch-ui/apis";
import {
  alertDefinitionEight,
  alertDefinitionFive,
  alertDefinitionFour,
  alertDefinitionNine,
  alertDefinitionOne,
  alertDefinitionSeven,
  alertDefinitionSix,
  alertDefinitionTen,
  alertDefinitionThree,
  alertDefinitionTwo,
} from "../data/alert-definitions";

const multipleAlertDefinitions: omApi.AlertDefinition[] = [
  alertDefinitionOne,
  alertDefinitionTwo,
  alertDefinitionThree,
  alertDefinitionFour,
  alertDefinitionFive,
  alertDefinitionSix,
  alertDefinitionSeven,
  alertDefinitionEight,
  alertDefinitionNine,
  alertDefinitionTen,
];

export default class AlertDefinitionStore {
  alertDefinitions: omApi.AlertDefinition[];
  constructor() {
    this.alertDefinitions = multipleAlertDefinitions;
  }

  list(): omApi.AlertDefinition[] {
    return this.alertDefinitions;
  }

  get(id: string): omApi.AlertDefinition | undefined {
    return this.alertDefinitions.find((ad) => ad.id === id);
  }
}
