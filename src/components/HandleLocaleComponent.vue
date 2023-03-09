<template>
  <div>
    <button class="locale-btn" @click="openModal">Handle Locales</button>
    <div class="modal" v-if="showModal" @click.self="closeModal">
      <div class="modal-content">
        <button type="button" class="close-button" @click="closeModal">
          X
        </button>
        <h2>Create new Locale</h2>
        <form @submit="createLocale">
          <label for="locale-name">Locale Name: </label>
          <input type="text" id="locale-name" v-model="localeName" required />
          <button type="submit">Create</button>
        </form>
        <br />
        <h2>Update or Delete Locale</h2>
        <label for="locale-select">Choose a locale:</label>
        <select id="locale-select" v-model="selectedLocale">
          <option v-for="option in selectOptions" :value="option">
            {{ option.name }}
          </option>
        </select>
        <div v-if="selectedLocale">
          <h2>Selected Locale: {{ selectedLocale.name }}</h2>
          <form @submit.prevent="updateLocale(selectedLocale)">
            <label for="locale-name">Locale Name:</label>
            <input
              type="text"
              id="locale-name"
              v-model="selectedLocale.name"
              required
            />
            <button type="submit">Update</button>
            <button
              @click.prevent="deleteLocale(selectedLocale.id)"
              class="delete-button"
            >
              Delete
            </button>
          </form>
          <div v-if="updateSuccess" class="success-message">
            You've successfully updated a locale.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useLocaleStore } from '../stores/LocaleStore';

export default {
  props: {
    selectOptions: Array,
  },
  data() {
    return {
      showModal: false,
      selectedLocale: null,
      localeName: '',
      updateSuccess: false,
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.localeName = '';
    },
    async createLocale() {
      try {
        const createLocale = { name: this.localeName };
        await this.localeStore.createLocale(createLocale);
        this.localeName = '';
        this.closeModal();
      } catch (err) {
        console.log(err);
      }
    },
    async deleteLocale(id) {
      try {
        await this.localeStore.deleteLocale(id);
      } catch (err) {
        console.log(err);
      }
    },
    async updateLocale(updatedLocale) {
      try {
        await this.localeStore.updateLocale(updatedLocale);
        this.updateSuccess = true;
      } catch (err) {
        console.log(err);
      }
    },
  },
  setup() {
    const localeStore = useLocaleStore();

    // kolla om datan behöver returneras här.
    return {
      localeStore,
    };
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
}

.locale-name {
  align-self: flex-start;
  font-size: 16px;
  font-weight: bold;
}

.close-button {
  width: 8%;
  align-self: flex-end;
}
.locale-btn {
  cursor: pointer;
  height: 22px;
  padding: 0px;
  margin: 0;
  border: none;
  margin-right: 20px;
}

.delete-button {
  align-self: flex-end;
  background-color: red;
}

button {
  cursor: pointer;
}

.success-message {
  color: green;
  margin-top: 10px;
}
</style>
