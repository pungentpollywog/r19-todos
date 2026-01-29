import { authFetch } from '../helpers/authFetch';
import { baseUrl } from '../constants/api';

const listsUrl = `${baseUrl}/lists`;

export async function getLists(authDetails, setAuthDetails) {
  return authFetch(authDetails, setAuthDetails, listsUrl).then((data) => data.lists);
}

export async function getList(authDetails, setAuthDetails, id) {
  return authFetch(authDetails, setAuthDetails, `${listsUrl}/${id}`);
}

export async function createList(authDetails, setAuthDetails, list) {
  return authFetch(authDetails, setAuthDetails, `${listsUrl}`, {
    method: 'POST',
    body: JSON.stringify(list),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }); 
}

export async function modifyList(authDetails, setAuthDetails, list, fields) {
  const newList = { ...list, ...fields };

  return authFetch(authDetails, setAuthDetails, `${listsUrl}/${list._id}`, {
    method: 'PATCH',
    body: JSON.stringify(newList),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}

export async function destroyList(authDetails, setAuthDetails, id) {
  return authFetch(authDetails, setAuthDetails, `${listsUrl}/${id}`, {
    method: 'DELETE',
  });
}
