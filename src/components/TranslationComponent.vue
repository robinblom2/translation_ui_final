<template>
  <div class="translation">
    <input />
    <p>{{ keyId }}</p>
    <p>{{ selectedLanguage }}</p>
  </div>

  <!-- <div class="test" v-for="node in translationListLeft">
    <div v-for="key in node.keys">
      <div v-for="translation in key.translations">
        <input type="text" v-model="translation.value" />
      </div>
    </div>
  </div> -->
</template>

<script>
export default {
  name: 'TranslationComponent',
  props: {
    model: Object,
    keyId: Number,
    selectedLanguage: String,
  },
  computed: {
    printStuff() {
      console.log(languageLeft);
    },
  },
};
</script>

<style>
.translation {
  border: 2px solid black;
  margin: 10px;
}
</style>
