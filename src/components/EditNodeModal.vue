<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="close-btn-container" @click="$emit('close-modal')">
      <p class="close-btn">X</p>
    </div>
    <div class="modal-linear-bg">
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <h2>Add data:</h2>
          <button
            class="remove-btn"
            @click="removeNode(model.id), $emit('close-modal')"
          >
            Remove
          </button>
        </div>
        <div class="input-container">
          <div class="d-flex flex-column align-items-center">
            <div>
              <input
                type="text"
                placeholder="Add new childnode..."
                v-model="newNodeName"
              />
              <button class="add-btn" @click="addNode(newNodeName, model.id)">
                Add
              </button>
            </div>
            <div class="d-flex align-items-center">
              <input
                type="text"
                v-model="newKeyName"
                placeholder="Add new key..."
              />
              <button class="add-btn" @click="addKey(newKeyName, model.id)">
                Add
              </button>
            </div>
          </div>
        </div>
        <hr style="width: 100%" />
        <div class="select-container">
          <select class="select" v-model="selectedKey">
            <option selected disabled>Select Key</option>
            <option v-for="key in selectOptions.data" :value="key">
              {{ key.name }}
            </option>
          </select>
          <button class="remove-btn" @click="removeKey(selectedKey)">
            Remove key
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../services/Api';
import { useTranslationStore } from '../stores/TranslationStore';

export default {
  props: {
    model: Object,
  },
  data() {
    return {
      newNodeName: '',
      newKeyName: '',
      selectedKey: [],
      selectOptions: [],
    };
  },
  methods: {
    async addKey(keyName, nodeId) {
      const res = await api.addKey(keyName, nodeId);
      this.translationStore.keys.push(res.data);
      this.newKeyName = '';
    },
    async removeKey(selectedKey) {
      await api.deleteKey(selectedKey.id);
      this.translationStore.keys = this.translationStore.keys.filter(
        (key) => key.id !== selectedKey.id
      );
      this.selectOptions = await api.getAllKeysByNode(this.model.id);
    },
    async addNode(nodeName, parentId) {
      const res = await api.addNode(nodeName, parentId);
      this.translationStore.nodes.push(res.data);
      this.newNodeName = '';
    },
    async removeNode(nodeId) {
      const result = await api.deleteNode(nodeId);
      this.translationStore.nodes = result.data;
    },
  },
  setup() {
    const translationStore = useTranslationStore();
    return { translationStore };
  },
  async created() {
    this.selectOptions = await api.getAllKeysByNode(this.model.id);
  },
};
</script>

<style scoped>
.select-container {
  display: flex;
  flex: 1;
  justify-content: space-around;
  align-items: center;
}
.input-container {
  display: flex;
  flex: 1;
  align-items: flex-end;
}

.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
  z-index: 1;
}
.modal-linear-bg {
  display: flex;
  align-items: center;
  width: 600px;
  height: 300px;
  margin: auto;
  position: relative;
  border: 3px solid transparent;
  color: #fff;
  background: #000;
  border-radius: 1em;
  /* padding: 13% 23%; */
}

.modal-linear-bg:before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  margin: -5px;
  border-radius: inherit;
  background: linear-gradient(to right, red, orange);
}
.modal-container {
  background-color: rgb(0, 0, 0);
  padding: 2rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
}
.close-btn-container {
  position: absolute;
  top: 10px;
  right: 20px;
}
.close-btn {
  color: rgb(255, 255, 255);
  font-weight: bold;
  cursor: pointer;
}

.modal-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.remove-btn {
  align-items: center;
  background-clip: padding-box;
  background-color: #a8100b;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  line-height: 1.25;
  margin: 0;
  min-height: 3rem;
  padding: calc(0.875rem - 1px) calc(1.5rem - 1px);
  position: relative;
  text-decoration: none;
  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  width: auto;
}

.remove-btn:hover,
.remove-btn:focus {
  background-color: #e01811;
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
}

.remove-btn:hover {
  transform: translateY(-1px);
}

.remove-btn:active {
  background-color: #c85000;
  box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
  transform: translateY(0);
}
</style>
