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
        console.log(this.selectOptions);
    },
    async createLocale(locale) {
      try {
        const res = await api.AddLocale(locale);
        console.log(res);
        this.selectOptions.push(res.data);
      } catch (err) {
        console.log(err);
      };
    },
    async deleteLocale(id) {
      try {
        const res = await api.DeleteLocale(id);
        
        // Filter out the deleted locale from the selectOptions array
        // index = a.findIndex(x => x.prop2 ==="yutu");
        console.log('detta är typen av idet', typeof id)
        console.log('typen av grejjem', this.selectOptions)
        const index = this.selectOptions.findIndex(option => option.id == id);
        console.log('id!!', id)
        console.log("index: ", index);
        if (index !== -1) {
          this.selectOptions.splice(index, 1);
          // console.log(this.selectOptions);
        };
        
      } catch(err){
        console.log(err);
      }
    },
    async updateLocale(updatedLocale){
      try{
        const res = await api.UpdateLocale(updatedLocale);
        const updatedIndex = this.selectOptions.findIndex(option => option.id === updatedLocale.id);
        this.selectOptions[updatedIndex] = updatedLocale;
      } catch(err){
        console.log(err);
      }
    }
  }
})