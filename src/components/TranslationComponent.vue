<template>
  <div class="parent">
    <div v-for="translation in translationStore.translationListLeft">
      <div v-if="translation.keyId == keyId">
        <input
          v-model="translation.value"
        />
      </div>
    </div>
    <div v-for="translation in translationStore.translationListRight">
      <div v-if="translation.keyId == keyId">
        <input
          v-model="translation.value"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useTranslationStore } from '../stores/TranslationStore';

export default {
  name: 'TranslationComponent',
  props: {
    keyId: Number,
  },
  setup() {
    const translationStore = useTranslationStore();
    return { translationStore };
  },
  data() {
    return {};
  },
};
</script>

<style>
.parent {
  display: flex;
}
.input {
  padding: 3px;
  border-radius: 3px;
  border: 1px solid black;
}
</style>
