import { baseUrl } from '../constants/api';

const listsUrl = `${baseUrl}/lists`;

function authHeader(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function parseResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(res.statusText);
  }
}

export async function getLists(token) {
  return fetch(listsUrl, {
    headers: { ...authHeader(token) },
  })
    .then(parseResponse)
    .then((data) => data.lists);
}

export async function getList(id, token) {
  return fetch(`${listsUrl}/${id}`, {
    headers: { ...authHeader(token) },
  }).then(parseResponse);
}

export async function createList(list, token) {
  return fetch(`${listsUrl}`, {
    method: 'POST',
    body: JSON.stringify(list),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      ...authHeader(token),
    },
  }).then(parseResponse);
}

export async function modifyList(list, fields, token) {
  const newList = { ...list, ...fields };

  return fetch(`${listsUrl}/${list._id}`, {
    method: 'PATCH',
    body: JSON.stringify(newList),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      ...authHeader(token),
    },
  }).then(parseResponse);
}

export async function destroyList(id, token) {
  return fetch(`${listsUrl}/${id}`, {
    method: 'DELETE',
    headers: { ...authHeader(token) },
  }).then(res => res.ok ? 'success' : 'error');
}
