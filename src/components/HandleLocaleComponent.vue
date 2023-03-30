<template>
  <div>
    <button class="locale-btn locale-btn-s2" @click="openModal">
      Handle Locales
    </button>
    <div class="modal" v-if="showModal" @click.self="closeModal">
      <div class="close-btn-container">
        <p class="close-btn" @click="closeModal">X</p>
      </div>
      <div class="modal-bg">
        <div class="modal-content">
          <div class="d-flex justify-content-end">
            <select v-model="selectedLocale">
              <option value="">Select a locale...</option>
              <option
                v-for="option in localeStore.selectOptions"
                :value="option"
              >
                {{ option.name }}
              </option>
            </select>
          </div>
          <div class="d-flex flex-column h-100">
            <div class="mb-5">
              <h2 class="mb-3">Add Locale</h2>
              <form @submit.prevent="createLocale">
                <input
                  type="text"
                  id="locale-name"
                  placeholder="Add new locale..."
                  v-model="localeName"
                  required
                />
                <button type="submit">Create</button>
              </form>
            </div>

            <div>
              <div class="d-flex align-items-center justify-content-between">
                <h2 class="mb-3">Update or Delete Locale</h2>
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
                  <button
                    @click.prevent="deleteLocale(selectedLocale.id)"
                    class="delete-button"
                  >
                    Delete
                  </button>
                </form>
              </div>
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
.locale-btn {
  padding: 10px 25px;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  background: transparent;
  outline: none !important;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
}
.locale-btn-s2 {
  border: 2px solid rgb(255, 255, 255);
  z-index: 1;
  color: white;
  border-radius: 3px;
}
.locale-btn-s2:after {
  position: absolute;
  content: '';
  width: 0;
  height: 100%;
  top: 0;
  left: 0;
  direction: rtl;
  z-index: -1;
  background: rgb(255, 255, 255);
  transition: all 0.3s ease;
}
.locale-btn-s2:hover {
  color: rgb(0, 0, 0);
}

.locale-btn-s2:hover:after {
  left: auto;
  right: 0;
  width: 100%;
}
.locale-btn-s2:active {
  top: 2px;
}

.modal-bg {
  display: flex;
  align-items: center;
  width: 600px;
  height: 360px;
  margin: auto;
  position: relative;
  border: 3px solid transparent;
  color: #fff;
  background: #000;
  border-radius: 1em;
  /* padding: 13% 23%; */
}

.modal-bg:before {
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
.modal {
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

.modal-content {
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

.success-message {
  color: green;
  margin-top: 10px;
}

.delete-message {
  color: red;
  margin-top: 10px;
}
</style>
