<script>
import api from '../services/Api';
import TranslationComponent from '../components/TranslationComponent.vue';
import { useTranslationStore } from '../stores/TranslationStore';
import EditKeyModal from '../components/EditKeyModal.vue';

export default {
  name: 'TreeItem', // necessary for self-reference
  components: {
    TranslationComponent,
    EditKeyModal,
  },
  props: {
    model: Object,
    selectedLanguageLeft: String,
    selectedLanguageRight: String,
  },
  data() {
    return {
      languageLeft: '',
      languageRight: '',
      isOpen: false,
      test: null,
      showModal: false,
    };
  },
  setup() {
    const translationStore = useTranslationStore();

    return { translationStore };
  },
  computed: {
    isFolder() {
      return this.model.childNodes && this.model.childNodes.length;
    },
  },
  methods: {
    toggle() {
      if (this.isFolder) {
        this.isOpen = !this.isOpen;
      }
    },
    changeType() {
      if (!this.isFolder) {
        this.model.children = [];
        this.addChild();
        this.isOpen = true;
      }
    },
    async updateNodeName(newNodeName) {
      const updatedNode = { ...this.model, newNodeName };
      const response = await api.updateNode(updatedNode);
      console.log(response);
    },
    async updateKeyName(key) {
      const response = await api.updateKey(key);
      console.log(response);
    },
    closeModal() {
      this.showModal = false;
      this.translationStore.getDefaultNodes();
    },
  },
  watch: {
    selectedLanguageLeft: function (newVal, oldVal) {
      this.languageLeft = newVal;
    },
    selectedLanguageRight: function (newVal, oldVal) {
      this.languageRight = newVal;
    },
  },
};
</script>

<template>
  <EditKeyModal v-show="showModal" :model="model" @close-modal="closeModal" />
  <li>
    <div class="tree-content">
      <div class="node-container">
        <input
          type="text"
          v-model="model.name"
          @keyup.enter="updateNodeName(model.name)"
        />
        <button class="edit-btn" @click="showModal = true">Edit Node</button>
        <span
          class="expand-btn"
          v-if="isFolder"
          @click="toggle"
          @dbclick="changeType"
        >
          [{{ isOpen ? '-' : '+' }}]</span
        >
      </div>
    </div>
    <div class="key-container" v-for="key in model.keys">
      <div class="key-input">
        <input
          type="text"
          v-model="key.name"
          @keyup.enter="updateKeyName(key)"
        />
      </div>
      <div v-if="languageLeft" class="translation-container">
        <TranslationComponent
          :keyId="key.id"
          :translationList="translationStore.translationListLeft"
        />
        <TranslationComponent
          :keyId="key.id"
          :translationList="translationStore.translationListRight"
        />
      </div>
    </div>
    <ul v-show="isOpen" v-if="isFolder">
      <TreeItem
        v-for="model in model.childNodes"
        :model="model"
        :selectedLanguageLeft="languageLeft"
        :selectedLanguageRight="languageRight"
      />
    </ul>
  </li>
</template>

<style>
.edit-btn {
  margin-left: 5px;
}
.tree-content {
  display: flex;
}
.key-container {
  display: flex;
  justify-content: space-between;
  padding-left: 15px;
}
.translation-container {
  display: flex;
  justify-content: flex-end;
}
.key-input {
  display: flex;
}
.expand-btn {
  cursor: pointer;
}
</style>
