<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modal" @click.stop>
      <div class="node-container">
        <h2>Add Root node</h2>
        <div>
          <input
            type="text"
            placeholder="Specify a nodename..."
            v-model="rootNodeName"
          />
          <button @click="addNode(rootNodeName), $emit('close-modal')">
            Add Node
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
      rootNodeName: '',
    };
  },
  methods: {
    async addNode(nodeName) {
      const response = await api.addNode(nodeName, null);
      this.rootNodeName = '';
      this.translationStore.getDefaultNodes();
      console.log(response);
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
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
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
  height: 100px;
  width: 500px;
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
