import TaskItem from "./TaskItem";

function TaskList({ tasks, onDelete, onComplete, onUpdate }){
    return (
        <div>
            { tasks.map((task)=>(
                <TaskItem  key={task.taskId} task={task} onDelete={onDelete} onComplete={onComplete} onUpdate={onUpdate} />
            ))}
        </div>
    );
}

export default TaskList;