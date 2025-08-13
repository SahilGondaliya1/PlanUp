import {showInputWindow , hideInputWindow, loadTaskFromStorage} from './ui.js';
import {addTask, handleDeleteTask,clearTaskGrid} from './task.js';

document.querySelector(".add-task-button").addEventListener("click", () => {
  if(!document.querySelector('.inputWindow'))
  showInputWindow();
});
document.querySelector(".add-task-button").addEventListener("keydown", (event) => {
  if(event.key === 'Enter'){
    showInputWindow();
  }
});
document.querySelector(".reset-task-button").addEventListener("click", ()=>{
    clearTaskGrid();
})

window.addEventListener("DOMContentLoaded", loadTaskFromStorage);





