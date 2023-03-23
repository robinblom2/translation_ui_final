import axios from 'axios';
import { getAccessToken } from './MsalService';

export const api = axios.create();


api.interceptors.request.use(
  async config => {
    const token = await getAccessToken()
    config.headers['Authorization'] = `bearer ${token}`
    return config;
  },
  error => {
    return Promise.reject(error)
  }
)

export default {

  async fetchNodes(locale) {
      return await api.get('/test/api/admin/Nodes?locale=' + locale);    
  },
  async fetchTranslations(locale) {
    return await api.get(`/test/api/admin/Translations/${locale}/test`);
  },
  fetchSelectOptions() {
    return api.get('/test/api/admin/Locales');
  },
  updateNode(node) {
    const requestData = {
      ParentId: node.parentId,
      Name: node.name,
    };
    return api.put(`/test/api/admin/Nodes/${node.id}`, requestData);
  },
  updateKey(key) {
    const requestData = {
      NodeId: key.nodeId,
      Name: key.name,
    };
    return api.put(`/test/api/admin/Keys/${key.id}`, requestData);
  },
  updateTranslation(translation, translationId) {
    const requestData = {
      KeyId: translation.keyId,
      LocaleId: translation.localeId,
      Value: translation.value,
    };
    return api.put(
      `/test/api/admin/Translations/${translationId}`,
      requestData
    );
  },
  addKey(keyName, nodeId) {
    const requestData = {
      NodeId: nodeId,
      Name: keyName,
    };
    return api.post('/test/api/admin/Keys', requestData);
  },
  deleteKey(keyId) {
    return api.delete(`/test/api/admin/Keys/${keyId}`);
  },
  addNode(nodeName, parentId) {
    const requestData = {
      ParentId: parentId,
      Name: nodeName,
    };
    return api.post('/test/api/admin/Nodes', requestData);
  },
  deleteNode(nodeId) {
    return api.delete(`/test/api/admin/Nodes/${nodeId}`);
  },

  // Locales
  AddLocale(locale) {
    const requestData = {
      Name: locale.name,
    };
    console.log(requestData);
    return api.post('/test/api/admin/Locales', requestData);
  },
  DeleteLocale(id) {
    return api.delete(`/test/api/admin/Locales/${id}`);
  },
  UpdateLocale(locale) {
    const requestData = {
      Name: locale.name,
    };
    return api.put(`/test/api/admin/Locales/${locale.id}`, requestData);
  },

  
};
