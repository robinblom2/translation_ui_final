import { defineStore } from 'pinia';
import apiService from '../services/Api';

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
      await apiService.fetchNodes(locale).then((res) => {
        console.log(res.data);
        this.nodes = res.data;
      });
    },
    async getTranslationsLeft(locale) {
      console.log(this.selectedLanguageLeft);
      await apiService.fetchTranslations(locale).then((res) => {
        this.translationListLeft = res.data;
        console.log(this.translationListLeft);
      });
    },
    async getTranslationsRight(locale) {
      await apiService.fetchTranslations(locale).then((res) => {
        this.translationListRight = res.data;
        console.log(this.translationListRight);
      });
    },
    async updateTranslation(translation, translationId) {
      const response = await apiService.updateTranslation(translation, translationId);
      console.log(response);
    },
  },
});
