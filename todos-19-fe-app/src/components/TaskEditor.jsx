import { useState } from "react";

export function TaskEditor({ task, updateTask }) {
  const [text, setText] = useState(task.desc);

  function updateText(ev) {
    setText(ev.target.value);
  }

  function saveTaskOnEnter(ev) {
    if (ev.key === 'Enter') {
      saveTask();
    }
  }

  function saveTask() {
    updateTask(task, {desc: text, editing: false});
  }

  function cancel() {
    updateTask(task, {editing: false});
  }

  return (
    <div className="task">
      <input value={text} 
      onChange={updateText} onKeyDown={saveTaskOnEnter} />
      <button onClick={saveTask}>save</button>
      <button onClick={cancel}>cancel</button>
    </div>
  );

}
