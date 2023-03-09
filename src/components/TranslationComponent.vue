<template>
  <div class="test" v-for="node in translationList">
    <div v-for="key in node.keys">
      <div v-if="key.id === this.keyId">
        <div v-for="translation in key.translations">
          <input
            class="input"
            type="text"
            v-model="translation.value"
            @keyup.enter="
              translationStore.updateTranslation(
                translation,
                key.id,
                translation.localeId
              )
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useTranslationStore } from '../stores/TranslationStore';

export default {
  name: 'TranslationComponent',
  data() {
    return {};
  },
  props: {
    keyId: Number,
    translationList: Array,
  },
  setup() {
    const translationStore = useTranslationStore();

    return { translationStore };
  },
};
</script>

<style>
.input {
  padding: 3px;
  border-radius: 3px;
  border: 1px solid black;
}
</style>
