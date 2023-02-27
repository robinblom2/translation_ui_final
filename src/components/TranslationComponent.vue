<template>
  <div class="test" v-for="node in translationList">
    <div v-for="key in node.keys">
      <div v-if="key.id === this.keyId">
        <div v-for="translation in key.translations">
          <input
            type="text"
            v-model="translation.value"
            @keyup.enter="
              updateTranslation(translation, key.id, translation.localeId)
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TranslationComponent',
  data() {
    return {};
  },
  props: {
    model: Object,
    keyId: Number,
    selectedLanguage: String,
    translationList: Array,
    updateTranslation: {
      type: Function,
    },
  },
};
</script>

<style>
.test {
  padding: 0px 20px;
}
.translation {
  border: 2px solid black;
  margin: 10px;
}
</style>
