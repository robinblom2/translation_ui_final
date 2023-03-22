<template>
  <div>
    <button class="me-5" @click="openModal">Handle Locales</button>
    <div class="modal" v-if="showModal" @click.self="closeModal">
      <div class="modal-content">
        <button type="button" class="close-button" @click="closeModal">
          X
        </button>
        <div class="d-flex flex-column h-100">
          <div class="mb-5">
            <h2 class="mb-3">Create new Locale</h2>
            <form @submit.prevent="createLocale">
              <label for="locale-name">Locale Name: </label>
              <input
                type="text"
                id="locale-name"
                v-model="localeName"
                required
              />
              <button type="submit">Create</button>
            </form>
          </div>
          <div>
            <div class="d-flex align-items-center justify-content-between">
              <h2 class="mb-3">Update or Delete Locale</h2>
              <label for="locale-select">Choose a locale:</label>
              <select id="locale-select" v-model="selectedLocale">
                <option
                  v-for="option in localeStore.selectOptions"
                  :value="option"
                >
                  {{ option.name }}
                </option>
              </select>
            </div>

            <div v-if="updateSuccess" class="success-message">
              You've successfully updated a locale.
            </div>
            <div v-if="deleteSuccess" class="delete-message">
              You've successfully deleted a locale.
            </div>
            <div v-if="selectedLocale">
              <form @submit.prevent="updateLocale(selectedLocale)">
                <label for="locale-name">Locale Name:</label>
                <input
                  type="text"
                  id="locale-name"
                  v-model="selectedLocale.name"
                  required
                />
                <button type="submit">Update</button>
              </form>
              <button
                @click.prevent="deleteLocale(selectedLocale.id)"
                class="delete-button"
              >
                Delete
              </button>
            </div>
          </div>
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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  padding: 2rem;
  width: 600px;
  height: 400px;
}

.close-button {
  align-self: flex-end;
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
