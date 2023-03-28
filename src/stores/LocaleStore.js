import { defineStore } from 'pinia';
import api from '../services/Api';

export const useLocaleStore = defineStore('localeStore', {
  state: () => ({
    selectOptions: [],
    showModal: false,
    localeName: '',
    selectedLocale: null,
  }),
  actions: {
    async getSelectOptions() {
      const res = await api.fetchSelectOptions();
      this.selectOptions = res.data;
    },
    async createLocale(locale) {
      try {
        const res = await api.AddLocale(locale);
        this.selectOptions.push(res.data);
      } catch (err) {
        console.log(err);
      }
    },
    async deleteLocale(id) {
      try {
        const res = await api.DeleteLocale(id);

        const index = this.selectOptions.findIndex((option) => option.id == id);
        if (index !== -1) {
          this.selectOptions.splice(index, 1);
        }
      } catch (err) {
        console.log(err);
      }
    },
    async updateLocale(updatedLocale) {
      try {
        const res = await api.UpdateLocale(updatedLocale);
        const updatedIndex = this.selectOptions.findIndex(
          (option) => option.id === updatedLocale.id
        );
        this.selectOptions[updatedIndex] = updatedLocale;
      } catch (err) {
        console.log(err);
      }
    },
  },
});
