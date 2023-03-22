<template>
  <div class="d-flex justify-content-between">
    <div class="d-flex">
      <HandleLocaleComponent />
    </div>
    <div class="me-4">
      <select
        class="me-5"
        v-model="translationStore.selectedLanguageLeft"
        @change="translationStore.renderExpandedNodesLeft($event)"
      >
        <option disabled value="">Select Language</option>
        <option
          v-for="option in localeStore.selectOptions"
          :value="option.name"
        >
          {{ option.name }}
        </option>
      </select>
      <select
        v-model="translationStore.selectedLanguageRight"
        @change="translationStore.renderExpandedNodesRight($event)"
      >
        <option disabled value="">Select Language</option>
        <option
          v-for="option in localeStore.selectOptions"
          :value="option.name"
        >
          {{ option.name }}
        </option>
      </select>
    </div>
  </div>
  <hr class="border border-white border-1 opacity-50 mb-5 mt-5" />
  <div v-if="translationStore.loadingNodes">
    <div class="spinner-border text-light" role="status"></div>
    <span class="text-white ps-3">Fetching nodes...</span>
  </div>
  <ul>
    <div v-for="node in translationStore.nodes">
      <div v-if="node.parentId == null">
        <TreeItem :model="node" />
      </div>
    </div>
  </ul>
</template>

<script>
import api from './services/Api';
import TreeItem from './components/TreeItem.vue';
import HandleLocaleComponent from './components/HandleLocaleComponent.vue';
import { useTranslationStore } from '../src/stores/TranslationStore';
import { useLocaleStore } from './stores/LocaleStore';

export default {
  components: {
    TreeItem,
    HandleLocaleComponent,
  },
  data() {
    return {
      showLocaleModal: false,
    };
  },
  methods: {
    getSelectOptions() {
      api
        .fetchSelectOptions()
        .then((res) => {
          this.localeStore.selectOptions = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.translationStore.getDefaultNodes();
    this.localeStore.getSelectOptions();
  },
  setup() {
    const translationStore = useTranslationStore();
    const localeStore = useLocaleStore();

    return { translationStore, localeStore };
  },
};
</script>
