import { apiHelper } from '../helpers/api.helper';

export const printerService = {
  setInfo,
  getInfo,
  getStatus,
  getProgress
};

async function setInfo(body) {
  return fetch(apiHelper.getUrl() + '/printer/info', {
    method: 'POST',
    headers: apiHelper.getHeaders(),
    body: JSON.stringify(body)
  })
  .then(res => res.json());
}

async function getInfo() {
  return fetch(apiHelper.getUrl() + '/printer/info', {
    headers: apiHelper.getHeaders()
  })
  .then(res => res.json());
}

async function getStatus() {
  return fetch(apiHelper.getUrl() + '/printer/status', {
    headers: apiHelper.getHeaders()
  })
  .then(res => res.json());
}

async function getProgress() {
  return fetch(apiHelper.getUrl() + '/printer/progress', {
    headers: apiHelper.getHeaders()
  })
  .then(res => res.json());
}