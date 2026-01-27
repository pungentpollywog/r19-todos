import { useContext, useEffect, useState } from 'react';

import './Dash.scss';

import List from './List';
import { getLists, createList, modifyList, destroyList } from '../services/TodosAPI.js';
import { AuthContext } from '../context/AuthContext';
// import { withAuth } from '../helpers/decorators';

export default function Dash() {
  const [listName, setListName] = useState('');
  const [lists, setLists] = useState([]);
  const [authDetails] = useContext(AuthContext);

  function withAuth(fn, ...args) {
    return fn(...args, authDetails?.token);
  }

  function fetchLists() {
    console.log('Dash fetchLists', { authDetails });

    withAuth(getLists)
      // getLists(authDetails?.token)
      .then((lists) => {
        setLists(lists);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    fetchLists();
  }, []);

  // Dash handles CRUD for lists

  function addList() {
    const newList = {
      // TODO: name, id, tasks
      // id: crypto.randomUUID(),
      name: listName || 'My List',
      tasks: [],
    };

    createList(newList, authDetails.token)
      .then((resp) => {
        // TODO: check response

        // useOptimistic
        // setLists((lists) => [...lists, newList]);

        fetchLists();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setListName('');
      });
  }

  function removeList(id) {
    // Call an API to delete the list with passed in id.
    // If success, call API to fetch the lists.
    // update with setLists()

    // setLists((lists) => lists.filter((list) => list._id !== id));

    destroyList(id, authDetails.token).then((resp) => {
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
    // TODO: call API to update the list.
    // Then call getLists and then call setLists
    // TODO: should add a spinner

    // TODO: useOptimistic

    withAuth(modifyList, list, fields)
      .then((resp) => {
        console.log(resp);
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
