import { authFetch } from '../helpers/authFetch';
import { baseUrl } from '../constants/api';
import { jwtDecode } from 'jwt-decode';

function makeListUrl(authDetails) {
  const decodedToken = authDetails && jwtDecode(authDetails.token);
  const userId = decodedToken?.user._id ?? 'unknown';
  return `${baseUrl}/users/${userId}/lists`;
}

export async function getLists(authDetails, setAuthDetails) {
  return authFetch(authDetails, setAuthDetails, makeListUrl(authDetails)).then(
    (data) => data.lists,
  );
}

export async function getList(authDetails, setAuthDetails, id) {
  return authFetch(authDetails, setAuthDetails, `${makeListUrl(authDetails)}/${id}`);
}

export async function createList(authDetails, setAuthDetails, list) {
  return authFetch(authDetails, setAuthDetails, `${makeListUrl(authDetails)}`, {
    method: 'POST',
    body: JSON.stringify(list),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}

export async function modifyList(authDetails, setAuthDetails, list, fields) {
  const newList = { ...list, ...fields };

  return authFetch(authDetails, setAuthDetails, `${makeListUrl(authDetails)}/${list._id}`, {
    method: 'PATCH',
    body: JSON.stringify(newList),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}

export async function destroyList(authDetails, setAuthDetails, id) {
  return authFetch(authDetails, setAuthDetails, `${makeListUrl(authDetails)}/${id}`, {
    method: 'DELETE',
  });
}
