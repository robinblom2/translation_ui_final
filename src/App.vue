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
    };
  },
  methods: {
    getNodes(locale) {
      api.fetchNodes(locale).then((res) => {
        console.log(res.data);
        this.nodes = res.data;
      });
    },
  },
  mounted() {
    this.getNodes('en');
  },
};
</script>

<template>
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
