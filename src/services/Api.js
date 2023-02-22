import axios from 'axios';

export default {
  async fetchNodes(locale) {
    return await axios.get('/test/test?locale=' + locale);
  },
  fetchSelectOptions() {
    return axios.get('/test/api/Locale');
  },
  updateNode(node) {
    const requestData = {
      ParentId: node.parentId,
      Name: node.name,
    };
    return axios.put(`/test/api/Node/${node.id}`, requestData);
  },
  updateKey(key) {
    const requestData = {
      NodeId: key.nodeId,
      Name: key.name,
    };
    return axios.put(`/test/api/Key/${key.id}`, requestData);
  },
};
