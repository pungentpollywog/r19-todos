import './Task.scss';

export default function Task({ task, updateTask, deleteTask }) {
  function makeEdits() {
    updateTask(task, { editing: true });
  }

  function removeTask() {
    deleteTask(task._id);
  }

  return (
    <div className="task">
      {task.desc}
      <button onClick={makeEdits}>edit</button>
      <button onClick={removeTask}>delete</button>
    </div>
  );
}
