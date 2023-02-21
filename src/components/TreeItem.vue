<script>
import api from '../services/Api';

export default {
  name: 'TreeItem', // necessary for self-reference
  props: {
    model: Object,
  },
  data() {
    return {
      isOpen: false,
      nodeName: '',
    };
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
    addChild() {
      this.model.children.push({
        name: 'new stuff',
      });
    },
    async updateNodeName(newNodeName) {
      const updatedNode = { ...this.model, newNodeName };
      const response = await api.updateNode(updatedNode);
      console.log(response);
    },
  },
};
</script>

<template>
  <li>
    <div class="tree-content">
      <div class="node-container">
        <p>{{ model.name }}</p>
        <input
          type="text"
          v-model="model.name"
          @keyup.enter="updateNodeName(model.name)"
        />
        <span v-if="isFolder" @click="toggle" @dbclick="changeType">
          [{{ isOpen ? '-' : '+' }}]</span
        >
      </div>
      <div class="translation-container" v-if="model.keys.length > 0">
        <li v-for="key in model.keys">{{ key.name }}</li>
      </div>
    </div>
    <ul v-show="isOpen" v-if="isFolder">
      <TreeItem class="item" v-for="model in model.childNodes" :model="model" />
      <li class="add" @click="addChild">+</li>
    </ul>
  </li>
</template>

<style>
.tree-content {
  display: flex;
  justify-content: space-between;
}
</style>
