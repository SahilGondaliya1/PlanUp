import { showInputWindow , hideInputWindow } from "./ui.js";

/**
 *
 * @param {String} taskTitle - Task heading displayed on bold
 */
export const createTaskCard = (taskTitle) => {
  //cloneNode(true) is to deep clone the element with child nodes
  const taskID = "t" + new Date().getTime();
  const fragment = document.getElementById("taskCardTemplate").content.cloneNode(true);
  const card = fragment.querySelector('.task-card');
  if(card){console.log(true)}
  card.setAttribute('id', taskID)
  card.querySelector(".task-title").textContent = taskTitle;
  localStorage.setItem(taskID, taskTitle);
  card.querySelector(".task-delete-button").addEventListener("click", () => handleDeleteTask(taskID));
  return card;
}

/**
 * @param {String} taskTitle - task detail to be displayed
 */

export const addTask = (taskTitle) => {
  const card = createTaskCard(taskTitle);
  const taskGrid = document.querySelector(".taskGrid");
  taskGrid.appendChild(card);
}

/**
 *
 * @param {String} taskID - task-id to be deleted
 */
export const handleDeleteTask = (taskID)=> {
  var deletingTask = document.getElementById(taskID);
  if (deletingTask) {
    localStorage.removeItem(taskID);
    console.log("removing task");
    deletingTask.remove();
  }
}

