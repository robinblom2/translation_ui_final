<template>
  <div class="d-flex flex-row">
    <div v-for="translation in translationStore.translationListLeft">
      <div v-if="translation.keyId == keyId">
        <input
          class="rounded"
          v-model="translation.value"
          @keyup.enter="updateTranslationRequest(translation, $event)"
        />
      </div>
    </div>
    <div v-for="translation in translationStore.translationListRight">
      <div v-if="translation.keyId == keyId">
        <input
          class="rounded"
          v-model="translation.value"
          @keyup.enter="updateTranslationRequest(translation, $event)"
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
  methods: {
    async updateTranslationRequest(translation, event) {
      var updatedTranslation = {
        keyId: translation.keyId,
        localeId: translation.localeId,
        value: event.target.value,
      };

      await this.translationStore.updateTranslation(
        updatedTranslation,
        translation.id
      );
    },
  },
};
</script>
