<template>
  <div>
    <button class="locale-btn" @click="openModal">Locales</button>
    <div class="modal" v-if="showModal" @click.self="closeModal">
      <div class="modal-content">
        <button type="button" class="close-button" @click="closeModal">
          X
        </button>
        <h2>Create new Locale</h2>
        <form @submit.prevent="createLocale">
          <label for="locale-name">Locale Name: </label>
          <input type="text" id="locale-name" v-model="localeName" required />
          <button type="submit">Create</button>
        </form>
        <br />
        <h2>Update or Delete Locale</h2>
        <label for="locale-select">Choose a locale:</label>
        <select id="locale-select" v-model="selectedLocale">
          <option v-for="option in localeStore.selectOptions" :value="option">
            {{ option.name }}
          </option>
        </select>
        <div v-if="updateSuccess" class="success-message">
          You've successfully updated a locale.
        </div>
        <div v-if="deleteSuccess" class="delete-message">
          You've successfully deleted a locale.
        </div>
        <div v-if="selectedLocale">
          <h2>Selected Locale: {{ selectedLocale.name }}</h2>
          <form @submit.prevent="updateLocale(selectedLocale)">
            <label for="locale-name">Locale Name:</label>
            <input type="text" id="locale-name" v-model="selectedLocale.name" required />
            <button type="submit">Update</button>
          </form>
          <button @click.prevent="deleteLocale(selectedLocale.id)" class="delete-button">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useLocaleStore } from '../stores/LocaleStore';

export default {
  data() {
    return {
      showModal: false,
      selectedLocale: null,
      localeName: '',
      updateSuccess: false,
      deleteSuccess: false,
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.localeName = '';
      this.resetSelectedLocale();
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
        this.selectedLocale = null;
        this.resetSelectedLocale();
        this.deleteSuccess = true;
        setTimeout(() => {
          this.deleteSuccess = false;
        }, 3000); // Hide the success message after 3 seconds. 

      } catch (err) {
        console.log(err);
      }
    },
    async updateLocale(updatedLocale) {
      try {
        await this.localeStore.updateLocale(updatedLocale);
        this.updateSuccess = true;
        this.localeStore.getSelectOptions();
        this.resetSelectedLocale();
        setTimeout(() => {
          this.updateSuccess = false;
        }, 3000); // Hide the success message after 3 seconds. 
      } catch (err) {
        console.log(err);
      }
    },
    resetSelectedLocale() {
      this.selectedLocale = null;
      this.localeStore.getSelectOptions();
    }
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
  background-color: #ee9445d6;
  border-radius: 2px;
  box-shadow: rgba(240, 148, 44, 0.582) 0 -25px 18px -14px inset,rgba(230, 111, 26, 0.15) 0 1px 2px,rgba(219, 146, 27, 0.478) 0 2px 4px,rgba(187, 125, 44, 0.15) 0 4px 8px,rgba(187, 104, 44, 0.15) 0 8px 16px,rgba(187, 104, 44, 0.15) 0 16px 32px;
  color: bisque;
  cursor: pointer;
  display: inline-block;
  font-family: 'Roboto', sans-serif;
  padding: 7px 20px;
  text-align: center;
  text-decoration: none;
  transition: all 250ms;
  border: 0;
  font-size: 12px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-left: 40%;
}

.locale-btn:hover {
  box-shadow: rgba(187, 101, 44, 0.942) 0 -25px 18px -14px inset,rgba(231, 164, 64, 0.893) 0 1px 2px,rgba(243, 155, 67, 0.835) 0 2px 4px,rgba(243, 136, 54, 0.909) 0 4px 8px,rgba(237, 145, 54, 0.934) 0 8px 16px,rgba(251, 174, 81, 0.868) 0 16px 32px;
  transform: scale(1.05) rotate(-1deg);
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

.delete-message {
  color: red;
  margin-top: 10px;
}
</style>
