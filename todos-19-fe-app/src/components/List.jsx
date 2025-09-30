import { useState } from 'react';
import PropTypes from 'prop-types';

import Suggestions from './Suggestions';
import Task from './Task';
import { TaskEditor } from './TaskEditor';

import './List.scss';

export default function List({ list, deleteList, updateList }) {
  const [taskDesc, setTaskDesc] = useState('');
  const showSuggestions = true;

  // List handles the CRUD for tasks
  function addTask(desc = taskDesc) {
    const newTask = {
      // Task: id, desc, editing, complete
      // id: crypto.randomUUID(),
      // Note: _id is now created by the backend.
      desc,
      editing: false,
      complete: false,
    };
    const updatedTasks = [...list.tasks, newTask];

    updateList(list, { tasks: updatedTasks });
    setTaskDesc('');
  }

  function updateTask(task, fields) {
    console.log(fields);
    const modifiedTask = { ...task, ...fields };
    const newTasks = list.tasks.map((_task) => {
      if (task._id === _task._id) {
        return modifiedTask;
      } else {
        return _task;
      }
    });
    updateList(list, { tasks: newTasks });
  }

  function deleteTask(id) {
    const newTasks = list.tasks.filter((_task) => _task._id !== id);
    updateList(list, { tasks: newTasks });
  }

  function addOnEnter(ev) {
    if (ev.key === 'Enter') {
      addTask();
    }
  }

  return (
    <div className="list">
      <h1>{list.name}</h1>

      <input
        placeholder="item or task"
        value={taskDesc}
        onChange={(ev) => setTaskDesc(ev.target.value)}
        onKeyDown={addOnEnter}
      />
      <button type="button" onClick={() => addTask()}>
        Add
      </button>

      <article className="contents">
        <ul>
          {list.tasks.map((task) => (
            <li key={task._id}>
              {task.editing ? (
                <TaskEditor task={task} updateTask={updateTask} />
              ) : (
                <Task
                  task={task}
                  updateTask={updateTask}
                  deleteTask={deleteTask}
                />
              )}
            </li>
          ))}
        </ul>
        {showSuggestions && <Suggestions items={list.tasks} addItem={addTask} />}
      </article>

      <button onClick={deleteList}>Delete list</button>
    </div>
  );
}

List.propTypes = {
  list: PropTypes.object,
  deleteList: PropTypes.func,
  updateList: PropTypes.func,
};
