<template>
  <EditNodeModal v-if="showModal" :model="model" @close-modal="closeModal" />
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
        @click="toggleNode(model.id)"
        @dbclick="changeType"
      >
        [{{ isOpen ? '-' : '+' }}]</span
      >
    </div>
    <div class="" v-for="key in this.translationStore.keys" v-if="isOpen">
      <div v-if="key.nodeId === model.id">
        <div class="d-flex flex-row justify-content-between align-items-center">
          <input
            class="rounded ms-5"
            type="text"
            v-model="key.name"
            @keyup.enter="updateKeyName(key)"
          />
          <div v-if="translationStore.translationListLeft">
            <TranslationComponent :keyId="key.id" />
          </div>
          <div v-else="translationStore.translationListLeft">
            <TranslationComponent :keyId="key.id" />
          </div>
        </div>
      </div>
    </div>
    <ul v-show="isOpen" v-if="isFolder" style="margin-left: 30px">
      <TreeItem v-for="model in model.childNodes" :model="model" />
    </ul>
  </li>
</template>

<script>
import api from '../services/Api';
import TranslationComponent from '../components/TranslationComponent.vue';
import { useTranslationStore } from '../stores/TranslationStore';
import EditNodeModal from './EditNodeModal.vue';
import { useLocaleStore } from '../stores/LocaleStore';

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
    const localeStore = useLocaleStore();

    return { translationStore, localeStore };
  },
  computed: {
    isFolder() {
      return true;
    },
  },
  methods: {
    toggleNode(id) {
      if (this.isFolder && this.isOpen) {
        this.isOpen = false;
      } else if (this.isFolder && !this.isOpen) {
        this.translationStore.getKeysByNodeId(id);
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
      const res = await api.addNode(nodeName, 1);
      this.translationStore.nodes.push(res.data);
      this.rootNodeName = '';
      await this.translationStore.getAllNodes();
    },
    async updateNodeName(newNodeName) {
      const updatedNode = { ...this.model, newNodeName };
      await api.updateNode(updatedNode);
    },
    async updateKeyName(key) {
      await api.updateKey(key);
    },
    async closeModal() {
      this.showModal = false;
      await this.translationStore.getAllNodes();
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
