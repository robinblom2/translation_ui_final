<script>
export default {
  name: 'TranslationComponent',
  props: {
    model: Object,
    selectedLanguageLeft: String
  },
};
</script>

<template>
  <div v-for="key in model.keys">
    <div v-for="translation in key.translations">
      <input type="text" v-model="translation.value" />
      <p>{{ selectedLanguageLeft }}</p>
    </div>
  </div>
</template>
