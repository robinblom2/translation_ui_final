<template>
  <div class="parent">
    <input
      v-model="translationValue.value"
      @input="updateTranslation"
      @keyup.enter="updateTranslationRequest"
    />
  </div>
</template>

<script>
import { useTranslationStore } from '../stores/TranslationStore';

export default {
  name: 'TranslationComponent',
  props: {
    keyId: Number,
    translationList: Array,
  },
  setup() {
    const translationStore = useTranslationStore();
    return { translationStore };
  },
  data() {
    return {
      translationValue: Object,
    };
  },
  created() {
    this.setTranslationValue();
  },
  methods: {
    setTranslationValue() {
      const translationObj = this.translationList.find(
        (t) => t.keyId == this.keyId
      );

      if (translationObj) {
        this.translationValue = {
          value: translationObj.value,
          localeId: translationObj.localeId,
          translationId: translationObj.id,
          keyId: translationObj.keyId,
        };
      }
    },
    async updateTranslationRequest() {
      if (this.translationValue) {
        // console.log(this.translationValue.value);
        // console.log(this.keyId);
        // console.log(this.translationValue.localeId);

        await this.translationStore.updateTranslation(
          this.translationValue,
          this.translationValue.translationId
        );
      }
    },
    updateTranslation(event) {
      this.translationValue.value = event.target.value;
    },
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
