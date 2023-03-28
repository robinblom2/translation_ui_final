<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modal" @click.stop>
      <div class="close" @click="$emit('close-modal')">
        <p class="close-btn">X</p>
      </div>
      <div class="node-container">
        <div class="add-node-container">
          <h2 class="heading">Modify node:</h2>
          <div style="align-self: flex-start">
            <input
              type="text"
              placeholder="Specify a nodename..."
              v-model="newNodeName"
            />
            <button class="btn" @click="addNode(newNodeName, model.id)">
              Add
            </button>
          </div>
        </div>
        <div class="remove-node-container">
          <button @click="removeNode(model.id), $emit('close-modal')">
            Remove
          </button>
        </div>
      </div>
      <hr style="width: 100%" />
      <div class="key-container">
        <div class="add-key-container">
          <h2 class="heading">Modify keys:</h2>
          <input
            type="text"
            v-model="newKeyName"
            placeholder="Specify a keyname..."
          />
          <button class="btn add-btn" @click="addKey(newKeyName, model.id)">
            Add key
          </button>
        </div>

        <div class="remove-key-container">
          <div class="modal-key">
            <select class="select" v-model="selectedKey">
              <option disabled value="">Select Key</option>
              <option v-for="key in selectOptions.data" :value="key">
                {{ key.name }}
              </option>
            </select>
            <button class="btn remove-btn" @click="removeKey(selectedKey)">
              Remove key
            </button>
          </div>
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
.key-container {
  display: flex;
  width: 600px;
  flex: 1;
  justify-content: space-around;
  align-items: center;
}
.node-container {
  display: flex;
  width: 600px;
  flex: 1;
  justify-content: space-around;
  align-items: center;
}
.close-btn {
  color: black;
  font-weight: bold;
  margin: 0;
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
  height: 250px;
  width: 600px;
  margin-top: 10%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}
.close {
  cursor: pointer;
  display: flex;
  align-self: flex-end;
  margin: 0px 8px;
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

.heading {
  text-align: left;
}
.select {
  margin: 0;
}
.btn {
  margin-left: 5px;
}
.remove-node-container {
  align-self: flex-end;
  padding: 3px;
}
.add-node-container {
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  width: 70%;
}
</style>
