
// import { showInputWindow,createNewTaskCard , hideInputWindow ,taskGrid, createPermissionWindow,removePermissionWindow} from "./ui.js";

// const state = {
//   tasks:[],
// }

// /**
//  * @param {String} taskTitle - task detail to be displayed
//  */

// export const addTask = (taskObj) => {
//   const card = createNewTaskCard(taskObj);
//   taskGrid.appendChild(card);
// }

// /**
//  *
//  * @param {String} taskID - task-id to be deleted
//  */
// export const handleDeleteTask = (taskObj)=> {
//   if(document.body.querySelector('.inputWindow')) return;
//   var deletingTask = document.getElementById(taskObj.id);
  
//   if (deletingTask) {
//     localStorage.removeItem(taskObj.id);
//     console.log("removing task");
//     deletingTask.remove();
//   }
// }

// /**
//  * @function handleTaskInputButton 
//  * @description - it accepts ele
//  */
// export const handleTaskInputButton = async (inputWindow) => {
//   const taskID = `t-${Date.now()}`;
//   let taskDue = inputWindow.querySelector('#task-input-due').value;
//   let taskTitle = inputWindow.querySelector("#task-input-title").value;
//   const taskDescription = inputWindow.querySelector("#task-input-desc").value;
//   taskDue = taskDue.split(" ");
//   const date = taskDue[0];
//   const time = taskDue[1];
//   taskTitle = taskTitle.trim();
//   if (taskTitle.length > 0) {
//     const taskObj = {
//         id:`${taskID}`,
//         title:`${taskTitle}`,
//         description:`${taskDescription}`,
//         date:`${date}`,
//         time:`${time}`,
//         completed:false,
//       }
//     state.tasks.push(taskObj);
//     try{
//       const {data}=  await axios.post('http://localhost:4000/task', taskObj,
//          {
//         headers:{
//           'Content-type': 'application/json'
//         }
//       }
//       );
//       console.log(data.message);
//     }
//     catch(err){
//       console.error("axios promise is not resolved", err.message ,err);
//     }
//     addTask(taskObj);
//   }
  
//   hideInputWindow();
  
// }

// export const clearTaskGrid = ()=>{
//     const permissionWindow = createPermissionWindow();
//     if(!document.querySelector('#permission-window')){
//       document.body.appendChild(permissionWindow);
//     }
//     const button = permissionWindow.querySelector('#permission-button');
//     button.addEventListener("click" , () => { 
//         Object.keys(localStorage).forEach(taskID => {
//               if (taskID.startsWith('t')) { // load only task keys
//                 try {
//                  localStorage.removeItem(taskID)
//                 } catch {
//                   // fallback for old format
//                  alert("local storage issue. Fix to delete all the task");
//                 }
//               }
//             });     
//         taskGrid.innerHTML =" ";
//         removePermissionWindow();
//     })   

// }

// export async function handleEditTask(taskID, newTitle, newDesc, newDue) {
//   // Update localStorage
//   localStorage.setItem(taskID, JSON.stringify({ title: newTitle, description: newDesc }));
//   // Update UI if card is present
//   const card = document.getElementById(taskID);
//   //*******************-----update the file
//   const newTask = {
//     id:taskID,
//     title:newTitle,
//     description:newDesc,
//     date:newDue[0],
//     time:newDue[1]
//   }
//   try{
//   const res = await axios.put('http://localhost:4000/task',{
//               newTask:newTask,
//               });
//   console.log(res.message);
//   }catch(err){
//     console.error("Cant update the task");
//   }
//   //**************** */

//   //update state variable
//   const updatedCard = Object.values(state.tasks).find(obj => obj.id === taskID)
//   updatedCard.title = newTitle;
//   updatedCard.description = newDesc;;
//   updatedCard.date= newDue[0];
//   updatedCard.time=newDate[1];
//   if(card){
//     card.querySelector('.task-title').textContent = updatedCard.title;
//     card.querySelector('.task-description').textContent = updatedCard.description;
//     card.querySelector('.task-due-date').textContent = updatedCard.date;
//     card.querySelector('.task-due-time').textContent = updatedCard.time;
//   }
// }

import {renderTasks} from "./ui.js";
import {api} from "./api.js";


export const state = {
  task:[]
};

export const loadTask = async () => {
  try{
    state.task = await api.getTask();
    renderTasks();
  }catch(error){
    console.error('Failed to load tasks:' ,error);
  }
};

export const addTask = async (taskData) => {
  try{
    const task = await api.createTask(taskData);
    state.task.push(task);
    renderTasks();
  }catch(error){
    console.error("Failed to add the task:",error);
  }
}

export const deleteTask = async (taskId) => {
  try{
    await api.deleteTask(taskId);
    state.task = state.task.filter(t => t.id !== taskId);
    renderTasks();
  }catch(error){
    console.log('Failed to delete task:',error);
  }
}


export const updateTask = async (taskData) => {
  try{
    const updatedTask = await api.updateTask(taskData);
    const index = state.task.findIndex(t => t.id === taskData.id);
    if(index !== -1){
      state.task[index] = updatedTask;
    }
  }catch(error){
    console.log('Failed to update task:',error);
  }
}