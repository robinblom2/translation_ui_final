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
  updateTranslation(translation, keyId, locale) {
    const requestData = {
      KeyId: keyId,
      LocaleId: locale,
      Value: translation.value,
    };
    return axios.put(`/test/api/Translation/${translation.id}`, requestData);
  },
  addKey(keyName, nodeId) {
    const requestData = {
      NodeId: nodeId,
      Name: keyName,
    };
    return axios.post('/test/api/Key', requestData);
  },
  deleteKey(keyId) {
    return axios.delete(`/test/api/Key/${keyId}`);
  },
  addNode(nodeName, parentId) {
    const requestData = {
      ParentId: parentId,
      Name: nodeName,
    };
    return axios.post('/test/api/Node', requestData);
  },
  deleteNode(nodeId) {
    return axios.delete(`/test/api/Node/${nodeId}`);
  },
};
