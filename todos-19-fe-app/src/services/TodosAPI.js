import { baseUrl } from '../constants/api';

const listsUrl = `${baseUrl}/lists`;

function makeAuthHeader(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function parseResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    // TODO: if !res.ok check for 401 status (Unauthorized)
    throw new Error(res.statusText);
  }
}

function checkResponse(res) {
  if (res.status === 401) {
    console.log('Do a refresh');
  }
  return res.ok;
}

export async function getLists(token) {
  console.log('headers', JSON.stringify(makeAuthHeader(token)));

  return fetch(listsUrl, {
    headers: { ...makeAuthHeader(token) },
  })
    .then(parseResponse)
    .then((data) => data.lists);
}

export async function getList(id, token) {
  return fetch(`${listsUrl}/${id}`, {
    headers: { ...makeAuthHeader(token) },
  }).then(parseResponse);
}

export async function createList(list, token) {
  return fetch(`${listsUrl}`, {
    method: 'POST',
    body: JSON.stringify(list),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      ...makeAuthHeader(token),
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
      ...makeAuthHeader(token),
    },
  }).then(parseResponse);
}

export async function destroyList(id, token) {
  return fetch(`${listsUrl}/${id}`, {
    method: 'DELETE',
    headers: { ...makeAuthHeader(token) },
  }).then((res) => (res.ok ? 'success' : 'error'));
}
