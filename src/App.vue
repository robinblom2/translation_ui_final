<script>
import api from './services/Api';
import TreeItem from './components/TreeItem.vue';
import RootNodeModal from './components/RootNodeModal.vue';
import { useTranslationStore } from '../src/stores/TranslationStore';

export default {
  components: {
    TreeItem,
    RootNodeModal,
  },
  data() {
    return {
      selectOptions: [],
      selectedLanguageLeft: null,
      selectedLanguageRight: null,
      showRootNodeModal: false,
    };
  },
  methods: {
    getSelectOptions() {
      api
        .fetchSelectOptions()
        .then((res) => {
          this.selectOptions = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  watch: {
    selectedLanguageLeft: function (newVal, oldVal) {
      this.translationStore.getTranslationsLeft(newVal);
    },
    selectedLanguageRight: function (newVal, oldVal) {
      this.translationStore.getTranslationsRight(newVal);
    },
  },
  mounted() {
    this.translationStore.getDefaultNodes();
    this.getSelectOptions();
  },
  setup() {
    const translationStore = useTranslationStore();

    return { translationStore };
  },
};
</script>

<template>
  <RootNodeModal
    v-show="showRootNodeModal"
    :model="model"
    @close-modal="showRootNodeModal = false"
  />
  <button @click="showRootNodeModal = true">Add Root Node</button>
  <div class="select-container">
    <select class="select" v-model="selectedLanguageLeft">
      <option disabled value="">Select Language</option>
      <option v-for="option in selectOptions" :value="option.name">
        {{ option.name }}
      </option>
    </select>
    <select class="select" v-model="selectedLanguageRight">
      <option disabled value="">Select Language</option>
      <option v-for="option in selectOptions" :value="option.name">
        {{ option.name }}
      </option>
    </select>
  </div>
  <hr class="line-divider" />
  <ul class="node-list" v-for="node in translationStore.nodes">
    <div v-if="node.parentId == null">
      <TreeItem
        :model="node"
        :selectedLanguageLeft="selectedLanguageLeft"
        :selectedLanguageRight="selectedLanguageRight"
      />
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
}
.line-divider {
  width: 100%;
  margin-bottom: 20px;
}
</style>
