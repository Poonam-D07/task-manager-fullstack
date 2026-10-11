import { useState } from "react";

function TaskForm ({ onAddTask }){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("MEDIUM");


    const handleSubmit = async (e) =>{
        e.preventDefault();
        await onAddTask({ title, description, priority});
        setTitle("");
        setDescription("");
        setPriority("MEDIUM");
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <input type="text" 
            placeholder="Title" 
            value={title} 
            onChange={(e)=>setTitle(e.target.value)}
            />

            <input type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />

            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="LOW"> Low </option>
                <option value="MEDIUM"> Medium </option>
                <option value="HIGH"> High </option>
            </select>

<button type="submit" disabled={title.trim() === ""}>➕ Add Task</button>        </form>
    );
}

export default TaskForm;