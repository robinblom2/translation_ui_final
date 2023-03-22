<template>
  <EditNodeModal v-if="showModal" :model="model" @close-modal="closeModal" />
  {{ model.id }}
  <li>
    <div class="d-flex">
      <div v-if="model.id == 1">
        <input class="me-2 rounded" type="text" v-model="rootNodeName" />
        <button @click="addRootNode(rootNodeName)">Add Root Node</button>
      </div>
      <div v-else>
        <input
          class="me-2 rounded"
          type="text"
          v-model="model.name"
          @keyup.enter="updateNodeName(model.name)"
        />
        <button @click="showModal = true">Edit Node</button>
      </div>
      <span
        class="expand-btn"
        v-if="isFolder"
        @click="toggleNode(model.id)"
        @dbclick="changeType"
      >
        [{{ isOpen ? '-' : '+' }}]</span
      >
    </div>
    <div
      class="d-flex justify-content-between"
      v-for="key in model.keys"
      v-if="isOpen"
    >
      <div>
        <input
          class="rounded ms-5"
          type="text"
          v-model="key.name"
          @keyup.enter="updateKeyName(key)"
        />
      </div>
      <div v-if="translationStore.translationListLeft">
        <TranslationComponent :keyId="key.id" />
      </div>
      <div v-else="translationStore.translationListLeft">
        <TranslationComponent :keyId="key.id" />
      </div>
    </div>
    <ul v-show="isOpen" v-if="isFolder">
      <TreeItem v-for="model in model.childNodes" :model="model" />
    </ul>
  </li>
</template>

<script>
import api from '../services/Api';
import TranslationComponent from '../components/TranslationComponent.vue';
import { useTranslationStore } from '../stores/TranslationStore';
import EditNodeModal from './EditNodeModal.vue';

export default {
  name: 'TreeItem',
  components: {
    TranslationComponent,
    EditNodeModal,
  },
  props: {
    model: Object,
  },
  data() {
    return {
      isOpen: false,
      showModal: false,
      rootNodeName: '',
    };
  },
  setup() {
    const translationStore = useTranslationStore();

    return { translationStore };
  },
  computed: {
    isFolder() {
      return (
        (this.model.childNodes && this.model.childNodes.length) ||
        (this.model.keys && this.model.keys.length)
      );
    },
  },
  methods: {
    toggleNode(id) {
      if (this.isFolder && this.isOpen) {
        this.isOpen = false;
      } else if (this.isFolder && !this.isOpen) {
        this.isOpen = true;
        if (this.translationStore.selectedLanguageLeft) {
          this.translationStore.getTranslationsForLeftTree(
            this.translationStore.selectedLanguageLeft,
            id
          );
        } else {
          if (!this.translationStore.fetchedNodeIdsLeft.includes(id)) {
            this.translationStore.fetchedNodeIdsLeft.push(id);
          }
        }
        if (this.translationStore.selectedLanguageRight) {
          this.translationStore.getTranslationsForRightTree(
            this.translationStore.selectedLanguageRight,
            id
          );
        } else {
          if (!this.translationStore.fetchedNodeIdsRight.includes(id)) {
            this.translationStore.fetchedNodeIdsRight.push(id);
          }
        }
      }
    },
    changeType() {
      if (!this.isFolder) {
        this.model.children = [];
        this.addChild();
        this.isOpen = true;
      }
    },
    async addRootNode(nodeName) {
      const response = await api.addNode(nodeName, 1);
      console.log(response);
      this.rootNodeName = '';
      await this.translationStore.getDefaultNodes();
      console.log(response);
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
    async closeModal() {
      this.showModal = false;
      await this.translationStore.getDefaultNodes();
    },
  },
};
</script>

<style scoped>
.expand-btn {
  margin-left: 5px;
  cursor: pointer;
  color: grey;
}
.expand-btn:hover {
  color: red;
}
</style>
