import { defineStore } from 'pinia';
import api from '../services/Api';

export const useTranslationStore = defineStore('translationStore', {
  state: () => ({
    nodes: [],
    keys: [],
    translationListLeft: [],
    fetchedNodeIdsLeft: [],
    translationListRight: [],
    fetchedNodeIdsRight: [],
    selectedLanguageLeft: null,
    selectedLanguageRight: null,
    loadingNodes: true,
  }),
  actions: {
    async getAllNodes() {
      await api.getAllNodes().then((res) => {
        this.nodes = res.data;
        this.loadingNodes = false;
      });
    },
    async getKeysByNodeId(id) {
      if (!this.fetchedNodeIdsLeft.includes(id)) {
        await api.getAllKeysByNode(id).then((res) => {
          this.keys = this.keys.concat(res.data);
        });
      }
    },
    async getTranslationsForLeftTree(event, nodeId) {
      if (
        !this.fetchedNodeIdsLeft.includes(nodeId) &&
        this.selectedLanguageLeft
      ) {
        this.fetchedNodeIdsLeft.push(nodeId);
        await api.fetchTranslationsByNode(event, nodeId).then((res) => {
          this.translationListLeft = this.translationListLeft.concat(res.data);
        });
      }
    },
    async getTranslationsForRightTree(event, nodeId) {
      if (
        !this.fetchedNodeIdsRight.includes(nodeId) &&
        this.selectedLanguageRight
      ) {
        this.fetchedNodeIdsRight.push(nodeId);
        await api.fetchTranslationsByNode(event, nodeId).then((res) => {
          this.translationListRight = this.translationListRight.concat(
            res.data
          );
        });
      }
    },
    renderExpandedNodesLeft(event) {
      this.translationListLeft = [];
      var nodeIdCopy = [...this.fetchedNodeIdsLeft];
      this.fetchedNodeIdsLeft = [];

      nodeIdCopy.forEach((id) => {
        this.getTranslationsForLeftTree(event.target.value, id);
      });
    },
    renderExpandedNodesRight(event) {
      this.translationListRight = [];
      var nodeIdCopy = [...this.fetchedNodeIdsRight];
      this.fetchedNodeIdsRight = [];

      nodeIdCopy.forEach((id) => {
        this.getTranslationsForRightTree(event.target.value, id);
      });
    },
    async updateTranslation(translation, translationId) {
      const response = await api.updateTranslation(translation, translationId);
    },
  },
});
