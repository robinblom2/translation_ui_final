import axios from 'axios';

export default {
  async fetchNodes(locale) {
    return await axios.get('/test/api/admin/Nodes?locale=' + locale);
  },
  fetchSelectOptions() {
    return axios.get('/test/api/admin/Locales');
  },
  updateNode(node) {
    const requestData = {
      ParentId: node.parentId,
      Name: node.name,
    };
    return axios.put(`/test/api/admin/Nodes/${node.id}`, requestData);
  },
  updateKey(key) {
    const requestData = {
      NodeId: key.nodeId,
      Name: key.name,
    };
    return axios.put(`/test/api/admin/Keys/${key.id}`, requestData);
  },
  updateTranslation(translation, keyId, locale) {
    const requestData = {
      KeyId: keyId,
      LocaleId: locale,
      Value: translation.value,
    };
    return axios.put(
      `/test/api/admin/Translations/${translation.id}`,
      requestData
    );
  },
  addKey(keyName, nodeId) {
    const requestData = {
      NodeId: nodeId,
      Name: keyName,
    };
    return axios.post('/test/api/admin/Keys', requestData);
  },
  deleteKey(keyId) {
    return axios.delete(`/test/api/admin/Keys/${keyId}`);
  },
  addNode(nodeName, parentId) {
    const requestData = {
      ParentId: parentId,
      Name: nodeName,
    };
    return axios.post('/test/api/admin/Nodes', requestData);
  },
  deleteNode(nodeId) {
    return axios.delete(`/test/api/admin/Nodes/${nodeId}`);
  },

  // Locales
  AddLocale(locale) {
    const requestData = {
      Name: locale.name,
    };
    console.log(requestData);
    return axios.post('/test/api/admin/Locales', requestData);
  },
  DeleteLocale(id) {
    return axios.delete(`/test/api/admin/Locales/${id}`);
  },
  UpdateLocale(locale) {
    const requestData = {
      Name: locale.name,
    };
    return axios.put(`/test/api/admin/Locales/${locale.id}`, requestData);
  },
};
