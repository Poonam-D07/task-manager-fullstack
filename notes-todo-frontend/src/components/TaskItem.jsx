import { useState } from "react";

function TaskItem({ task, onDelete, onComplete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [priority, setPriority] = useState(task.priority);

  const handleSave = async () => {
    const ok = await onUpdate(task.taskId, { title, description, priority });
    if (ok) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setTitle(task.title);
    setDescription(task.description || "");
    setPriority(task.priority);
    setIsEditing(false);
  };

  // ---------- Edit mode ----------
  if (isEditing) {
    return (
      <div className="task-card editing">
        <input
          className="edit-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <input
          className="edit-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <select
          className="edit-input"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>

        <div className="task-buttons">
          <button
            className="btn-save"
            onClick={handleSave}
            disabled={title.trim() === ""}
          >
            💾 Save
          </button>
          <button className="btn-cancel" onClick={handleCancel}>
            ✖ Cancel
          </button>
        </div>
      </div>
    );
  }

  // ---------- Normal mode ----------
  return (
    <div className={`task-card ${task.completed ? "done" : ""}`}>
      <div className="task-top">
        <h3>{task.title}</h3>
        <span className={`badge ${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>
      </div>

      <p>{task.description}</p>
      <p className="status">{task.completed ? "Completed ✅" : "Pending ⏳"}</p>

      <div className="task-buttons">
        {!task.completed && (
          <button className="btn-complete" onClick={() => onComplete(task.taskId)}>
            ✅ Mark Complete
          </button>
        )}
        <button className="btn-edit" onClick={() => setIsEditing(true)}>
          ✏️ Edit
        </button>
        <button className="btn-delete" onClick={() => onDelete(task.taskId)}>
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;