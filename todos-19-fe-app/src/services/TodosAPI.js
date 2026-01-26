import { baseUrl } from '../constants/api';

const listsUrl = `${baseUrl}/lists`;

function authHeader(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getLists(token) {
  return fetch(listsUrl, {
    headers: { ...authHeader(token) },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.statusText);
      }
    })
    .then((data) => data.lists);
}

export async function getList(id, token) {
  return fetch(`${listsUrl}/${id}`, {
    headers: { ...authHeader(token) },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(res.statusText);
    }
  });
}

export async function createList(list, token) {
  return fetch(`${listsUrl}`, {
    method: 'POST',
    body: JSON.stringify(list),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      ...authHeader(token),
    },
  }).then((res) => {
    // console.log(res);
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(res.statusText);
      // return { status: res.status, statusText: res.statusText };
    }
  });
}

export async function modifyList(list, fields, token) {
  const newList = { ...list, ...fields };

  // console.log({list, fields});

  return fetch(`${listsUrl}/${list._id}`, {
    method: 'PATCH',
    body: JSON.stringify(newList),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      ...authHeader(token),
    },
  }).then((res) => {
    // console.log(res);
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(res.statusText);
      // return { status: res.status, statusText: res.statusText };
    }
  });
}

export async function destroyList(id, token) {
  return fetch(`${listsUrl}/${id}`, {
    method: 'DELETE',
    headers: { ...authHeader(token) },
  }).then((res) => {
    console.log(res);
    // TODO: check the status
    // 404: Not Found
    // 200: Success (with results return)
    // 204: No content
    // 5xx: Server level error
    if (res.ok) {
      return 'success';
    } else {
      return 'error';
    }
  });
}
