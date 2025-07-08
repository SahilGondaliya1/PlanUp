import { addTask , handleDeleteTask} from "./task.js";

/**
 * @function loadTaskFromStorage - Displays tasks from local storage to be consistent list of task
 */
export const loadTaskFromStorage = ()=>{
    const taskGrid = document.querySelector('.taskGrid');
    taskGrid.innerHTML = "";
    Object.keys(localStorage).forEach(key=> {
      if(key.startsWith('t')){// load only task keys
      const taskTitle = localStorage.getItem(key);
      const fragment = document.getElementById("taskCardTemplate").content.cloneNode(true);
      const card = fragment.querySelector('.task-card');
      card.setAttribute('id', key);
      card.querySelector(".task-title").textContent = taskTitle;
      card.querySelector(".task-delete-button").addEventListener("click", () => handleDeleteTask(key));
      taskGrid.appendChild(card);
      }
    });
};

/**
 * 
 * @function createInputWindowByTemplate - uses input window template present in html
 * @returns {fragment} - blueprint of html present in template
 */
export const createInputWindowByTemplate = () => {
  //get template
  const template = document.getElementById("inputWindowTemplate");
  //creation of input-window-container
  const container = template.content.cloneNode(true);
  return container;
};

/**
 * @function showInputWindow
 * @description - creates the input window via DOM 
 */
export const showInputWindow = () => {
  //creating inout-window
  const fragment = createInputWindowByTemplate();
  const inputWindow = fragment.querySelector(".inputWindow");

  //adding window to body;
  document.body.appendChild(inputWindow);
  
    inputWindow.querySelector("#input-submit-button")
    .addEventListener("click", () => {
      let taskTitle = inputWindow.querySelector("#task-input-title").value;
      hideInputWindow();
      if (taskTitle) {
        addTask(taskTitle);
      }
    });

  inputWindow.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      let taskTitle = inputWindow.querySelector("#task-input-title").value;
      hideInputWindow();
      if (taskTitle) {
        addTask(taskTitle);
      }
    }
  });

  inputWindow.querySelector("#input-cancle-button").onclick = () => {
    hideInputWindow();
  };
};

/**
 * @function hideInputWindow
 * @description - removes window from display
 */
export const hideInputWindow = () => {
  document.body.querySelector(".inputWindow").remove();
};
