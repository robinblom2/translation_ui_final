<script>
import api from '../services/Api';
import TranslationComponent from '../components/TranslationComponent.vue';

export default {
  name: 'TreeItem', // necessary for self-reference
  components: {
    TranslationComponent,
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
    async updateNodeName(newNodeName) {
      const updatedNode = { ...this.model, newNodeName };
      const response = await api.updateNode(updatedNode);
      console.log(response);
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
  <li>
    <div class="tree-content">
      <div class="node-container">
        <input
          type="text"
          v-model="model.name"
          @keyup.enter="updateNodeName(model.name)"
        />
        <span v-if="isFolder" @click="toggle" @dbclick="changeType">
          [{{ isOpen ? '-' : '+' }}]</span
        >
      </div>
    </div>
    <div class="key-container" v-for="key in model.keys">
      <input type="text" v-model="key.name" />
      <div v-if="languageLeft" class="translation-container">
        <TranslationComponent
          :keyId="key.id"
          :model="model"
          :selectedLanguage="languageLeft"
        />
        <TranslationComponent
          :keyId="key.id"
          :model="model"
          :selectedLanguage="languageRight"
        />
      </div>
    </div>
    <ul v-show="isOpen" v-if="isFolder">
      <TreeItem
        class="item"
        v-for="model in model.childNodes"
        :model="model"
        :selectedLanguageLeft="languageLeft"
        :selectedLanguageRight="languageRight"
      />
    </ul>
  </li>
</template>

<style>
.tree-content {
  display: flex;
}
.key-container {
  padding-left: 15px;
}
.translation-container {
  display: flex;
  justify-content: flex-end;
}
</style>
