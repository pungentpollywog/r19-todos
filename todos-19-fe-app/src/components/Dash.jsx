import { useEffect, useState } from 'react';

import List from './List';

import './Dash.scss';

import {
  getLists,
  createList,
  modifyList,
  destroyList,
} from '../services/TodosAPI.js';

export default function Dash() {
  const [listName, setListName] = useState('');
  const [lists, setLists] = useState([]);

  function fetchLists() {
    getLists()
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

    createList(newList)
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

    destroyList(id).then((resp) => {
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

    modifyList(list, fields)
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
      <div className="controls">
        <input
          type="text"
          placeholder="New list name"
          value={listName}
          onChange={(ev) => setListName(ev.target.value)}
        />
        <button onClick={addList}>Create List</button>
      </div>
    </>
  );
}
