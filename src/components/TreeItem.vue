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
  },
  data() {
    return {
      isOpen: false,
      showModal: false,
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
};
</script>

<template>
  <EditKeyModal v-if="showModal" :model="model" @close-modal="closeModal" />
  <li class="list-item">
    <div class="tree-content">
      <div class="node-container">
        <input
          class="input"
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
    <div class="key-container" v-for="key in model.keys" v-if="isOpen">
      <div>
        <input
          class="input"
          type="text"
          v-model="key.name"
          @keyup.enter="updateKeyName(key)"
        />
      </div>
      <div
        v-if="translationStore.translationListLeft"
        class="translation-container"
      >
        <TranslationComponent :keyId="key.id" />
      </div>
      <div
        v-else="translationStore.translationListLeft"
        class="translation-container"
      >
        <TranslationComponent :keyId="key.id" />
      </div>
    </div>
    <ul v-show="isOpen" v-if="isFolder">
      <TreeItem v-for="model in model.childNodes" :model="model" />
    </ul>
  </li>
</template>

<style scoped>
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
.expand-btn {
  cursor: pointer;
  color: white;
  font-weight: bold;
}
.list-item {
  color: white;
}
.input {
  padding: 3px;
  border-radius: 3px;
}
</style>
