import { showInputWindow,createNewTaskCard , hideInputWindow ,taskGrid, createPermissionWindow,removePermissionWindow} from "./ui.js";

const state = {
  tasks:[],
}

/**
 * @param {String} taskTitle - task detail to be displayed
 */

export const addTask = (taskObj) => {
  const card = createNewTaskCard(taskObj);
  taskGrid.appendChild(card);
}

/**
 *
 * @param {String} taskID - task-id to be deleted
 */
export const handleDeleteTask = (taskObj)=> {
  if(document.body.querySelector('.inputWindow')) return;
  var deletingTask = document.getElementById(taskObj.id);
  
  if (deletingTask) {
    localStorage.removeItem(taskObj.id);
    console.log("removing task");
    deletingTask.remove();
  }
}

/**
 * @function handleTaskInputButton 
 * @description - it accepts ele
 */
export const handleTaskInputButton = (inputWindow) => {
  const taskID = `t-${Date.now()}`;
  let taskDue = inputWindow.querySelector('#task-input-due').value;
  let taskTitle = inputWindow.querySelector("#task-input-title").value;
  const taskDescription = inputWindow.querySelector("#task-input-desc").value;
  taskDue = taskDue.split(" ");
  const date = taskDue[0];
  const time = taskDue[1];
  taskTitle = taskTitle.trim();
  if (taskTitle.length > 0) {
    const taskObj = {
        id:taskID,
        title:taskTitle,
        description:taskDescription,
        date:date,
        time:time,
        completed:false,
      }
    state.tasks.push(taskObj);
    addTask(taskObj);
  }
  
  hideInputWindow();
  
}

export const clearTaskGrid = ()=>{
    const permissionWindow = createPermissionWindow();
    if(!document.querySelector('#permission-window')){
      document.body.appendChild(permissionWindow);
    }
    const button = permissionWindow.querySelector('#permission-button');
    button.addEventListener("click" , () => { 
        Object.keys(localStorage).forEach(taskID => {
              if (taskID.startsWith('t')) { // load only task keys
                try {
                 localStorage.removeItem(taskID)
                } catch {
                  // fallback for old format
                 alert("local storage issue. Fix to delete all the task");
                }
              }
            });     
        taskGrid.innerHTML =" ";
        removePermissionWindow();
    })   

}

export function handleEditTask(taskID, newTitle, newDesc, newDue) {
  // Update localStorage
  localStorage.setItem(taskID, JSON.stringify({ title: newTitle, description: newDesc }));
  // Update UI if card is present
  const card = document.getElementById(taskID);
  //update state variable
  const updatedCard = Object.values(state.tasks).find(obj => obj.id === taskID)
  updatedCard.title = newTitle;
  updatedCard.description = newDesc;;
  updatedCard.date= newDue[0];
  updatedCard.time=newDate[1];
  if(card){
    card.querySelector('.task-title').textContent = updatedCard.title;
    card.querySelector('.task-description').textContent = updatedCard.description;
    card.querySelector('.task-due-date').textContent = updatedCard.date;
    card.querySelector('.task-due-time').textContent = updatedCard.time;
  }
}
