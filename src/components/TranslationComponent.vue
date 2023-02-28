<template>
  <div class="test" v-for="node in translationList">
    <div v-for="key in node.keys">
      <div v-if="key.id === this.keyId">
        <div v-for="translation in key.translations">
          <input
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
.test {
  padding: 0px 20px;
}
.translation {
  border: 2px solid black;
  margin: 10px;
}
</style>
