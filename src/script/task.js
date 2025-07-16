import { showInputWindow,createNewTaskCard , hideInputWindow ,taskGrid, createPermissionWindow,removePermissionWindow} from "./ui.js";



/**
 * @param {String} taskTitle - task detail to be displayed
 */

export const addTask = (taskTitle, taskDescription) => {
  const card = createNewTaskCard(taskTitle, taskDescription);
  taskGrid.appendChild(card);
}

/**
 *
 * @param {String} taskID - task-id to be deleted
 */
export const handleDeleteTask = (taskID)=> {
  if(document.body.querySelector('.inputWindow')) return;
  var deletingTask = document.getElementById(taskID);
  if (deletingTask) {
    localStorage.removeItem(taskID);
    console.log("removing task");
    deletingTask.remove();
  }
}

/**
 * @function handleTaskInputButton 
 * @description - it accepts ele
 */
export const handleTaskInputButton = (inputWindow) => {
  let taskTitle = inputWindow.querySelector("#task-input-title").value;
  let taskDescription = inputWindow.querySelector("#task-input-desc").value;
  hideInputWindow();
  taskTitle = taskTitle.trim();
  if (taskTitle.length > 0) {
    addTask(taskTitle, taskDescription);
  }
}

export const clearTaskGrid = ()=>{
    const permissionWindow = createPermissionWindow();
    if(!document.querySelector('#permission-window')){
      document.body.appendChild(permissionWindow);
    }
    const button = permissionWindow.querySelector('#permission-button');
    button.addEventListener("click" , () => { 
        removePermissionWindow(permissionWindow);      
        taskGrid.innerHTML =" ";
    })        
}

export function handleEditTask(taskID, newTitle, newDesc) {
  // Update localStorage
  localStorage.setItem(taskID, JSON.stringify({ title: newTitle, description: newDesc }));
  // Update UI if card is present
  const card = document.getElementById(taskID);
  if (card) {
    card.querySelector('.task-title').textContent = newTitle;
    card.querySelector('.task-description').textContent = newDesc;
  }
}
