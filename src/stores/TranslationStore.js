import { defineStore } from 'pinia';
import api from '../services/Api';

export const useTranslationStore = defineStore('translationStore', {
  state: () => ({
    nodes: [],
    translationListLeft: [],
    translationListRight: [],
    selectedLanguageLeft: null,
    selectedLanguageRight: null,
    loadingNodes: true,
  }),
  actions: {
    async getDefaultNodes(locale) {
      await api.fetchNodes(locale).then((res) => {
        console.log(res.data);
        this.nodes = res.data;
        this.loadingNodes = false;
      });
    },
    async getTranslationsLeft(event) {
      console.log(event.target.value);
      await api.fetchTranslations(event.target.value).then((res) => {
        this.translationListLeft = res.data;
        console.log(this.translationListLeft);
      });
    },
    async getTranslationsRight(event) {
      await api.fetchTranslations(event.target.value).then((res) => {
        this.translationListRight = res.data;
        console.log(this.translationListRight);
      });
    },
    async updateTranslation(translation, translationId) {
      const response = await api.updateTranslation(translation, translationId);
      console.log(response);
    },
  },
});
