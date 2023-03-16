import { defineStore } from 'pinia';
import api from '../services/Api';

export const useTranslationStore = defineStore('translationStore', {
  state: () => ({
    nodes: [],
    translationListLeft: [],
    translationListRight: [],
    selectedLanguageLeft: null,
    selectedLanguageRight: null,
  }),
  actions: {
    async getDefaultNodes(locale) {
      await api.fetchNodes(locale).then((res) => {
        console.log(res.data);
        this.nodes = res.data;
      });
    },
    async getTranslationsLeft(locale) {
      console.log(this.selectedLanguageLeft);
      await api.fetchTranslations(locale).then((res) => {
        this.translationListLeft = res.data;
        console.log(this.translationListLeft);
      });
    },
    async getTranslationsRight(locale) {
      await api.fetchTranslations(locale).then((res) => {
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
