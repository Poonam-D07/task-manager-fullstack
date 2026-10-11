import { useEffect, useState } from "react";
import { createTask, deleteAllTasks, deleteTask, getAllTasks, markComplete, updateTask } from "./api/taskApi";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";


function App() {


  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getAllTasks();
        setTasks(data);
      } catch (error) {
        console.error("Tasks load nhi hua ;", error);
        setError("Tasks load nahi ho paye. Kya backend chal raha hai?");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  //HANDLE ADD TASKS
  const handleAddTask = async (newTask) => {
    try {
      const savedTask = await createTask(newTask);
      setError("");
      setTasks([...tasks, savedTask]);
    } catch (error) {
      console.error("Task add nhi hua : ", error);
setError(error.response?.data?.message || "Task add nahi ho paya.");    }
  };

  //HANDLE DELETE TASK

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setError("");
      setTasks(tasks.filter((task) => task.taskId !== id));
    } catch (error) {
      console.error("Tas delete nhi hua : ", error);
setError(error.response?.data?.message || "Task delete nahi ho paya.");    }
  };

  //HANDLE MARK COMPLETE TASK
  const handleCompleteTask = async (id) => {
    try {
      const completedTask = await markComplete(id);
      setError("");
      setTasks(tasks.map((task) => (task.taskId === id ? completedTask : task)));
    } catch (error) {
      console.error("Task complete nhi hua: ", error);
setError(error.response?.data?.message || "Task complete nahi ho paya.");    }
  };

//HANDLE UPDATE TASK
const handleUpdateTask = async (id, changedData) => {
  try {
    const updatedTask = await updateTask(id, changedData);
    setError("");
    setTasks(tasks.map((task) => (task.taskId === id ? updatedTask : task)));
    return true;
  } catch (error) {
    console.error("Task update nhi hua: ", error);
    setError(error.response?.data?.message || "Task update nahi ho paya.");
    return false;
  }
};

  //HANDLE DELETE ALL TASKS

  const handleDeleteAll = async () =>{
    const sure = window.confirm("Are you sure? will DELETE All Tasks. ")
    if(!sure) return;

    try{
      await deleteAllTasks();
      setError("");
      setTasks([])
    }catch(error){
      console.error("Not delete all tasks : ", error);
      setError(error.response?.data?.message || "Not delete all tasks")
    }
  };

  //Handle Pending Tasks

  const visibleTasks = tasks.filter((task) =>{
    if(filter === "pending") return !task.completed;
    if(filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="app">

      <h1>Task Manager </h1>
      <TaskForm onAddTask={handleAddTask} />

      <button className="btn-delete-all"
              onClick={handleDeleteAll}
              disabled={tasks.length === 0}> 🗑️ Delete All </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="filter-bar">
        {/*  button for all */}
        <button className={filter === "all" ? "filter-btn active" : "filter-btn"}
                onClick={() => setFilter("all")}> All </button>

                  {/*  button for Pending */}
        <button className={filter === "pending" ? "filter-btn active" : "filter-btn"}
        onClick={() => setFilter("pending")}>⏳ Pending</button>
                  
                {/*  button for Completed */}
        <button className={filter === "completed" ? "filter-btn active": "filter-btn"}
                onClick={() => setFilter("completed")}>✅ Completed</button>
      </div>

      {loading ? (
        <p>Loading ...</p>
      ) : (
        <TaskList tasks={visibleTasks} onDelete={handleDeleteTask} onComplete={handleCompleteTask} onUpdate={handleUpdateTask} />
      )}




    </div>
  );
}
export default App;