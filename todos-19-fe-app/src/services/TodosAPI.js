import { authFetch } from '../helpers/authFetch';
import { baseUrl } from '../constants/api';

const listsUrl = `${baseUrl}/lists`;

function makeAuthHeader(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function parseResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(res.statusText);
  }
}

export async function getLists(authDetails, setAuthDetails) {
  return authFetch(authDetails, setAuthDetails, listsUrl, {headers: {}})
    .then((data) => data.lists);
}

export async function getList(id, token) {
  // TODO: update to use authFetch
  return fetch(`${listsUrl}/${id}`, {
    headers: { ...makeAuthHeader(token) },
  }).then(parseResponse);
}

export async function createList(authDetails, setAuthDetails, list) {
  return authFetch(authDetails, setAuthDetails, `${listsUrl}`, {
    method: 'POST',
    body: JSON.stringify(list),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }).catch(err => console.error(err));
}

export async function modifyList(list, fields, token) {
  const newList = { ...list, ...fields };

  // TODO: update to authFetch
  return fetch(`${listsUrl}/${list._id}`, {
    method: 'PATCH',
    body: JSON.stringify(newList),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...makeAuthHeader(token),
    },
  }).then(parseResponse);
}

export async function destroyList(id, token) {
  // TODO: update to authFetch
  return fetch(`${listsUrl}/${id}`, {
    method: 'DELETE',
    headers: { ...makeAuthHeader(token) },
  }).then((res) => (res.ok ? 'success' : 'error'));
}
