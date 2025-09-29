import { baseUrl } from "../constants/api";

const listsUrl = `${baseUrl}/lists`;

export async function getLists() {
  return fetch(listsUrl)
    .then((res) => res.json())
    .then((data) => data.lists);
}

export async function getList(id) {
  return fetch(`${listsUrl}/${id}`).then((res) => res.json());
}

export async function createList(list) {
  return fetch(`${listsUrl}`, {
    method: 'POST',
    body: JSON.stringify(list),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then(res => {
    // console.log(res);
    if (res.status === 200) {
      return res.json();
    } else {
      return {status: res.status, statusText: res.statusText};
    }
  });
};

export async function modifyList(list, fields) {
  const newList = {...list, ...fields};

  // console.log({list, fields});

  return fetch(`${listsUrl}/${list._id}`, {
    method: 'PATCH',
    body: JSON.stringify(newList),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then(res => {
    // console.log(res);
    if (res.status === 200) {
      return res.json();
    } else {
      return {status: res.status, statusText: res.statusText};
    }
  });
}

export async function destroyList(id) {
  return fetch(`${listsUrl}/${id}`, {
    method: 'DELETE'
  }).then(res => {
    console.log(res);
    // TODO: check the status
    // 404: Not Found
    // 200: Success (with results return)
    // 204: No content
    // 5xx: Server level error 
    if (res.status === 200 || res.status === 204) {
      return 'success';
    } else {
      return 'error'; 
    }
  })
}