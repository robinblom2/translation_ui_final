import axios from 'axios';
import { getAccessToken } from './MsalService';

export const api = axios.create();

api.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();
    config.headers['Authorization'] = `bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default {
  // Locales
  async AddLocale(locale) {
    const requestData = {
      Name: locale.name,
    };
    return await api.post('/test/api/admin/Locales', requestData);
  },
  async DeleteLocale(id) {
    return await api.delete(`/test/api/admin/Locales/${id}`);
  },
  async UpdateLocale(locale) {
    const requestData = {
      Name: locale.name,
    };
    return await api.put(`/test/api/admin/Locales/${locale.id}`, requestData);
  },
  async fetchSelectOptions() {
    return await api.get('/test/api/admin/Locales');
  },

  // Nodes
  async getAllNodes() {
    return await api.get('/test/api/admin/Nodes/GetAllNodes');
  },
  async addNode(nodeName, parentId) {
    const requestData = {
      ParentId: parentId,
      Name: nodeName,
    };
    return await api.post('/test/api/admin/Nodes', requestData);
  },
  async updateNode(node) {
    const requestData = {
      ParentId: node.parentId,
      Name: node.name,
    };
    return await api.put(`/test/api/admin/Nodes/${node.id}`, requestData);
  },
  async deleteNode(nodeId) {
    return await api.delete(`/test/api/admin/Nodes/${nodeId}`);
  },

  // Keys
  async addKey(keyName, nodeId) {
    const requestData = {
      NodeId: nodeId,
      Name: keyName,
    };
    return await api.post('/test/api/admin/Keys', requestData);
  },
  async updateKey(key) {
    const requestData = {
      NodeId: key.nodeId,
      Name: key.name,
    };
    return await api.put(`/test/api/admin/Keys/${key.id}`, requestData);
  },
  async deleteKey(keyId) {
    return await api.delete(`/test/api/admin/Keys/${keyId}`);
  },
  async getAllKeysByNode(nodeId) {
    return await api.get(`/test/api/admin/Keys/GetAllKeysByNode/${nodeId}`);
  },

  // Translations
  async fetchTranslationsByNode(locale, nodeId) {
    return await api.get(
      `/test/api/admin/Translations/GetTranslationsByNode/${nodeId}?locale=` +
        locale
    );
  },
  async updateTranslation(translation, translationId) {
    const requestData = {
      KeyId: translation.keyId,
      LocaleId: translation.localeId,
      Value: translation.value,
    };
    return await api.put(
      `/test/api/admin/Translations/${translationId}`,
      requestData
    );
  },
};
