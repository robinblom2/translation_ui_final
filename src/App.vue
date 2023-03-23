<script>
import api from './services/Api';
import TreeItem from './components/TreeItem.vue';
import RootNodeModal from './components/RootNodeModal.vue';
import HandleLocaleComponent from './components/HandleLocaleComponent.vue';
import { useTranslationStore } from '../src/stores/TranslationStore';
import { useLocaleStore } from './stores/LocaleStore';
import LoginComponent from './components/LoginComponent.vue';
import { useUserSessionStore } from './stores/UserSessionStore';

export default {
  components: {
    TreeItem,
    RootNodeModal,
    HandleLocaleComponent,
    LoginComponent,
  },
  data() {
    return {
      selectOptions: [],
      selectedLanguageLeft: null,
      selectedLanguageRight: null,
      showRootNodeModal: false,
      showLocaleModal: false,
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
    "userSessionStore.activeAccount": {
      handler(newActiveAccount, oldActiveAccount) {
        if (newActiveAccount && !oldActiveAccount) {
          this.translationStore.getDefaultNodes();
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
  mounted() {

  },
  setup() {
    const translationStore = useTranslationStore();
    const localeStore = useLocaleStore();
    const userSessionStore = useUserSessionStore();

    return { translationStore, localeStore, userSessionStore };
  },
  created() {
    this.userSessionStore.init();
  }
};
</script>

<template>
  <div v-if="!userSessionStore.isLoggedIn">
    <LoginComponent />
  </div>
  <div v-else>
    <div class="edit-btn-container">
      <HandleLocaleComponent :selectOptions="selectOptions" />
      <RootNodeModal v-show="showRootNodeModal" :model="model" @close-modal="showRootNodeModal = false" />

      <button class="rootnode-btn" @click="showRootNodeModal = true">
        Add Root Node
      </button>
    </div>
    <div class="select-container">
      <select class="select" v-model="selectedLanguageLeft">
        <option disabled value="">Select Language</option>
        <option v-for="option in localeStore.selectOptions" :value="option.name">
          {{ option.name }}
        </option>
      </select>
      <select class="select" v-model="selectedLanguageRight">
        <option disabled value="">Select Language</option>
        <option v-for="option in localeStore.selectOptions" :value="option.name">
          {{ option.name }}
        </option>
      </select>
    </div>
    <hr class="line-divider" />
    <ul class="node-list" v-for="node in translationStore.nodes">
      <div v-if="node.parentId == null">
        <TreeItem :model="node" :selectedLanguageLeft="selectedLanguageLeft"
          :selectedLanguageRight="selectedLanguageRight" />
      </div>
    </ul>
  </div>
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
