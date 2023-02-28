<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modal" @click.stop>
      <div class="key-container">
        <div class="add-key-container">
          <h6>Add Key:</h6>
          <p>Specify a keyname:</p>
          <input type="text" v-model="newKeyName" />
          <button @click="addKey(newKeyName, model.id), $emit('close-modal')">
            Add
          </button>
        </div>
        <div class="remove-key-container">
          <h6>Remove Key:</h6>
          <div class="modal-key">
            <select class="select" v-model="selectedKey">
              <option disabled value="">Select Key</option>
              <option v-for="key in model.keys" :value="key">
                {{ key.name }}
              </option>
            </select>
            <button
              class="remove-btn"
              @click="removeKey(selectedKey), $emit('close-modal')"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <hr />
      <div class="node-container">
        <div class="add-node-container">
          <input
            type="text"
            placeholder="Specify a nodename..."
            v-model="newNodeName"
          />
          <button @click="addNode(newNodeName, model.id), $emit('close-modal')">
            Add Node
          </button>
        </div>
        <div class="remove-node-container">
          <button @click="removeNode(model.id), $emit('close-modal')">
            Remove Node
          </button>
        </div>
      </div>
    </div>
    <div class="close" @click="$emit('close-modal')">
      <p class="close-btn">X</p>
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
    };
  },
  methods: {
    async addKey(keyName, nodeId) {
      const response = await api.addKey(keyName, nodeId);
      this.newKeyName = '';
      console.log(response);
      this.translationStore.getDefaultNodes();
    },
    async removeKey(selectedKey) {
      const response = await api.deleteKey(selectedKey.id);
      this.translationStore.getDefaultNodes();
    },
    async addNode(nodeName, parentId) {
      const response = await api.addNode(nodeName, parentId);
      console.log(response);
      this.translationStore.getDefaultNodes();
    },
    async removeNode(nodeId) {
      const response = await api.deleteNode(nodeId);
      console.log(response);
      this.translationStore.getDefaultNodes();
    },
  },
  setup() {
    const translationStore = useTranslationStore();

    return { translationStore };
  },
};
</script>

<style scoped>
.key-container {
  display: flex;
  width: 100%;
  justify-content: space-around;
}
.node-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: flex-end;
  padding: 10px;
}
.close-btn {
  color: white;
}
.remove-key-container {
  margin: 30px;
}
.key-name {
  margin: 0;
}
.remove-btn {
  height: 20px;
}
.modal-key {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
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
  z-index: 2;
}

.modal {
  text-align: center;
  background-color: white;
  height: 500px;
  width: 1000px;
  margin-top: 10%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.close {
  margin: 10% 0 0 16px;
  cursor: pointer;
}

.close-img {
  width: 25px;
}

.check {
  width: 150px;
}

h6 {
  font-weight: 500;
  font-size: 28px;
  margin: 20px 0;
}

p {
  font-size: 16px;
  margin: 20px 0;
}
</style>
