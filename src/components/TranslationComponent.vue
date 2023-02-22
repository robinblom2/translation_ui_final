<script>
export default {
  name: 'TranslationComponent',
  props: {
    translationListLeft: Object,
    key: Object,
  },
};
</script>

<template>
  <div class="test" v-for="node in translationListLeft">
    <div v-for="key in node.keys">
      <div v-for="translation in key.translations">
        <input type="text" v-model="translation.value" />
      </div>
    </div>
  </div>
</template>

<style>
.test {
  border: 2px solid red;
}
</style>
