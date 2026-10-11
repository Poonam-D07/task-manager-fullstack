import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:8080/api/tasks",

});

export const getAllTasks = async()=>{
    const response = await api.get("/getAll");
    return response.data;
};

export const createTask = async(task)=>{
    const response = await api.post("/create", task);
    return response.data;
};

export const getPendingTasks = async()=>{
    const response = await api.get("/pending");
     return response.data;
};
//markComplete
export const markComplete = async(id)=>{
    const response = await api.put(`/markComplete/${id}`);
    return response.data;
};
//Update Task
export const updateTask = async(id,task)=>{
    const response = await api.put(`/update/${id}`,task);
    return response.data;
}
//Delete one Task
export const deleteTask = async(id)=>{
    const response = await api.delete(`/deleteOne/${id}`);
    
};
//Delete All Tasks
export const deleteAllTasks = async()=>{
    await api.delete("/deleteAll");
    
};