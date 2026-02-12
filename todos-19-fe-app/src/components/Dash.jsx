import { useContext, useEffect, useState } from 'react';

import './Dash.scss';

import List from './List';
import { getLists, createList, modifyList, destroyList } from '../services/TodosAPI.js';
import { AuthContext } from '../context/AuthContext';

export default function Dash() {
  const [listName, setListName] = useState('');
  const [lists, setLists] = useState([]);
  const [authDetails, setAuthDetails] = useContext(AuthContext);

  function withAuth(fn, ...args) {
    return fn(authDetails, setAuthDetails, ...args);
  }

  function fetchLists() {
    withAuth(getLists)
      .then((lists) => {
        setLists(lists);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    fetchLists();
  }, [authDetails]);

  // Dash handles CRUD for lists

  function addList() {
    const newList = {
      // Database now adds _id. So no need for:
      // id: crypto.randomUUID(),
      name: listName || 'My List',
      tasks: [],
    };

    withAuth(createList, newList)
      .then(() => {
        // useOptimistic ?
        fetchLists();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setListName('');
      });
  }

  function removeList(id) {
    withAuth(destroyList, id).then((resp) => {
      if (resp === 'success') {
        fetchLists();
      } else {
        console.error('Unable to delete!');
      }
    });
  }

  // fields = {tasks: [...]}
  // fields = {name: 'new name'}
  function updateList(list, fields) {
    // TODO: should add a spinner
    // TODO: useOptimistic ?

    withAuth(modifyList, list, fields)
      .then(() => {
        fetchLists();
        // TODO: just fetch the list that was updated using the _id in the response.
        // Then use the result to update that one list in lists instead of calling fetchLists.
      })
      .catch((err) => console.error(err));
  }

  return (
    <>
      <div className="controls">
        <input
          type="text"
          placeholder="New list name"
          value={listName}
          onChange={(ev) => setListName(ev.target.value)}
        />
        <button onClick={addList}>Create List</button>
      </div>
      <div className="dash">
        {lists.map((list) => (
          <List
            key={list._id}
            list={list}
            deleteList={() => removeList(list._id)}
            updateList={updateList}
          />
        ))}
      </div>
    </>
  );
}
