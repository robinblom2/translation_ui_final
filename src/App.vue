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
      selectedLanguageLeft: null,
      selectedLanguageRight: null,
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
    // setSelectedLanguageLeft(enteredSelectedLanguageLeft) {
    //   this.selectedLanguageLeft = enteredSelectedLanguageLeft;
    // },
  },
  mounted() {
    this.getDefaultNodes();
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
  <select v-model="selectedLanguageRight">
    <option disabled value="">Select Language</option>
    <option v-for="option in selectOptions" :value="option.name">
      {{ option.name }}
    </option>
  </select>

  <ul v-for="node in nodes">
    <div v-if="node.parentId == null">
      <TreeItem
        class="item"
        :model="node"
        :selectedLanguageLeft="selectedLanguageLeft"
        :selectedLanguageRight="selectedLanguageRight"
      />
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
