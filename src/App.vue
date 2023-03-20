<script>
import api from './services/Api';
import TreeItem from './components/TreeItem.vue';
import RootNodeModal from './components/RootNodeModal.vue';
import HandleLocaleComponent from './components/HandleLocaleComponent.vue';
import { useTranslationStore } from '../src/stores/TranslationStore';
import { useLocaleStore } from './stores/LocaleStore';

export default {
  components: {
    TreeItem,
    RootNodeModal,
    HandleLocaleComponent,
  },
  data() {
    return {
      showRootNodeModal: false,
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

<template>
  <div class="edit-btn-container">
    <HandleLocaleComponent />
    <RootNodeModal
      v-show="showRootNodeModal"
      @close-modal="showRootNodeModal = false"
    />

    <button class="rootnode-btn" @click="showRootNodeModal = true">
      Add Root Node
    </button>
  </div>
  <div class="select-container">
    <select
      class="select"
      v-model="translationStore.selectedLanguageLeft"
      @change="translationStore.getTranslationsLeft($event)"
    >
      <option disabled value="">Select Language</option>
      <option v-for="option in localeStore.selectOptions" :value="option.name">
        {{ option.name }}
      </option>
    </select>
    <select
      class="select"
      v-model="translationStore.selectedLanguageRight"
      @change="translationStore.getTranslationsRight($event)"
    >
      <option disabled value="">Select Language</option>
      <option v-for="option in localeStore.selectOptions" :value="option.name">
        {{ option.name }}
      </option>
    </select>
  </div>
  <hr class="line-divider" />
  <ul class="node-list">
    <div v-for="node in translationStore.nodes">
      <div v-if="node.parentId == null">
        <TreeItem :model="node" />
      </div>
    </div>
  </ul>
</template>

<style>
.item {
  cursor: pointer;
  line-height: 1.5;
}
.bold {
  font-weight: bold;
}
.select-container {
  display: flex;
  justify-content: flex-end;
  margin-right: 135px;
  padding-bottom: 20px;
}
.select {
  margin: 0px 30px;
  border-radius: 3px;
}
.line-divider {
  width: 100%;
  margin-bottom: 20px;
}
.edit-btn-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.rootnode-btn {
  cursor: pointer;
  height: 22px;
  padding: 0;
  margin: 0;
  border: none;
}
</style>
