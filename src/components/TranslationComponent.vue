<template>
  <!-- <div class="translation">
    <input />
    <p>{{ keyId }}</p>
    <p>{{ selectedLanguage }}</p>
    <p>{{ translationList }}</p>
  </div> -->

  <div class="test" v-for="node in translationList">
    <div v-for="key in node.keys">
      <div v-if="key.id === this.keyId">
        <div v-for="translation in key.translations">
          <input type="text" v-model="translation.value" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../services/Api';

export default {
  name: 'TranslationComponent',
  data() {
    return {
      translationList: [],
    };
  },
  props: {
    model: Object,
    keyId: Number,
    selectedLanguage: String,
  },
  watch: {
    selectedLanguage: function (newVal, oldVal) {
      this.fetchTranslations(newVal);
    },
  },
  methods: {
    async fetchTranslations(language) {
      console.log('Här är locale', language);
      await api
        .fetchNodes(language)
        .then((res) => {
          this.translationList = res.data;
          console.log(console.log(this.translationList));
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    printStuff() {
      console.log(languageLeft);
    },
  },
  mounted() {
    this.fetchTranslations(this.selectedLanguage);
  },
};
</script>

<style>
.translation {
  border: 2px solid black;
  margin: 10px;
}
</style>
