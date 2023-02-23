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
  <div class="select-container">
    <select class="select" v-model="selectedLanguageLeft">
      <option disabled value="">Select Language</option>
      <option v-for="option in selectOptions" :value="option.name">
        {{ option.name }}
      </option>
    </select>
    <select class="select" v-model="selectedLanguageRight">
      <option disabled value="">Select Language</option>
      <option v-for="option in selectOptions" :value="option.name">
        {{ option.name }}
      </option>
    </select>
  </div>

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
.select-container {
  display: flex;
  justify-content: flex-end;
  margin-right: 135px;
}
.select {
  margin: 0px 30px;
}
</style>
