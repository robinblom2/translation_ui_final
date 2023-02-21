<script>
import api from './services/Api';
import TreeItem from './components/TreeItem.vue';

export default {
  components: {
    TreeItem,
  },
  data() {
    return {
      nodes: [],
      selectOptions: [],
      selectedLanguageLeft: '',
      selectedLanguageRight: '',
    };
  },
  methods: {
    getDefaultNodes(locale) {
      api.fetchNodes(locale).then((res) => {
        console.log(res.data);
        this.nodes = res.data;
      });
    },
    getSelectOptions() {
      api
        .fetchSelectOptions()
        .then((res) => {
          this.selectOptions = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getDefaultNodes('en');
    this.getSelectOptions();
  },
};
</script>

<template>
  <select v-model="selectedLanguageLeft">
    <option disabled value="">Select Language</option>
    <option v-for="option in selectOptions" :value="option.name">
      {{ option.name }}
    </option>
  </select>

  <ul v-for="node in nodes">
    <div v-if="node.parentId == null">
      <TreeItem class="item" :model="node" />
    </div>
  </ul>
</template>

<style>
.item {
  cursor: pointer;
  line-height: 1.5;
}
.bold {
  font-weight: bold;
}
</style>
