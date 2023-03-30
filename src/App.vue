<template>
  <div v-if="!userSessionStore.isLoggedIn">
    <LoginComponent />
  </div>
  <div v-else>
    <div class="d-flex justify-content-between">
      <div class="d-flex">
        <HandleLocaleComponent />
      </div>
      <div class="me-4">
        <select
          class="select me-5"
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
          class="select me-5"
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
    <hr class="header-line" />
    <div class="test">
      <div v-if="translationStore.loadingNodes">
        <div class="spinner-border text-light" role="status"></div>
        <span class="text-white ps-3">Fetching nodes...</span>
      </div>

      <ul>
        <div v-for="node in translationStore.nodes" :key="node.id">
          <div v-if="node.parentId == null">
            <TreeItem :model="node" />
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import api from './services/Api';
import TreeItem from './components/TreeItem.vue';
import HandleLocaleComponent from './components/HandleLocaleComponent.vue';
import { useTranslationStore } from '../src/stores/TranslationStore';
import { useLocaleStore } from './stores/LocaleStore';
import LoginComponent from './components/LoginComponent.vue';
import { useUserSessionStore } from './stores/UserSessionStore';

export default {
  components: {
    TreeItem,
    HandleLocaleComponent,
    LoginComponent,
  },
  data() {
    return {
      showLocaleModal: false,
    };
  },
  watch: {
    'userSessionStore.activeAccount': {
      handler(newActiveAccount, oldActiveAccount) {
        if (newActiveAccount && !oldActiveAccount) {
          this.translationStore.getAllNodes();
          this.localeStore.getSelectOptions();
        }
      },
      immediate: true,
    },
    selectedLanguageLeft: function (newVal, oldVal) {
      this.translationStore.getTranslationsLeft(newVal);
    },
    selectedLanguageRight: function (newVal, oldVal) {
      this.translationStore.getTranslationsRight(newVal);
    },
  },
  mounted() {},
  setup() {
    const translationStore = useTranslationStore();
    const localeStore = useLocaleStore();
    const userSessionStore = useUserSessionStore();

    return { translationStore, localeStore, userSessionStore };
  },
  created() {
    this.userSessionStore.init();
  },
};
</script>

<style>
.header-line {
  border: none;
  height: 3px;
  
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.test {
  border-radius: 10px;
  padding: 50px;
  background-color: rgba(0, 0, 0, 0.658);
  height: auto;
  overflow-y: visible;

  border: 2px solid transparent;
  border-image: linear-gradient(to right, rgb(71, 0, 0), rgb()) 1;
}
.select {
  padding: 1px;
  border-radius: 3px;
}
</style>
