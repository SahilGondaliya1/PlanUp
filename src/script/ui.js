

import {addTask , handleDeleteTask,handleTaskInputButton,handleEditTask} from "./task.js";


export const taskGrid = document.querySelector('.taskGrid');
/**
 * @function loadTaskFromStorage - Displays tasks from local storage to be consistent list of task
 */
export const loadTaskFromStorage = () => {
    taskGrid.innerHTML = "";
    Object.keys(localStorage).forEach(taskID => {
      if (taskID.startsWith('t')) { // load only task keys
        let taskObj;
        try {
          const data  = JSON.parse(localStorage.getItem(taskID));
          taskObj = {id:taskID, ...data};
        } catch {
          // fallback for old format
          console.log("Issue found in loading data from Local.");
        }
        const card = buildTaskCard(taskObj);
        // Add edit button

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
//usinng flatpickr for date time accessibility
  //creating inout-window
  const fragment = createInputWindowByTemplate();
  const inputWindow = fragment.querySelector(".inputWindow");
  const date = flatpickr(inputWindow.querySelector('#task-input-due'),{
    enableTime: true,
    dateFormat:'Y-m-d H:i',
  })
  // console.log(inputWindow.querySelector('#task-input.due').value)
  //adding window to body;
  document.body.appendChild(inputWindow);
  
  inputWindow.querySelector("#input-submit-button")
    .addEventListener("click", () => {
      handleTaskInputButton(inputWindow);
    });

  inputWindow.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      handleTaskInputButton(inputWindow);
    }
  });

  inputWindow.querySelector("#input-cancle-button").onclick = () => {
    hideInputWindow(inputWindow);
  };
};

/**
 * @function hideInputWindow
 * @description - removes window from display
 */
export const hideInputWindow = () => {
  document.body.querySelector(".inputWindow").remove();
};

export const createPermissionWindow = () => {
    const window = document.createElement('div');
    const h2 = document.createElement('h2');
    const button = document.createElement('button');
    window.setAttribute('id','permission-window');
    h2.setAttribute('id', 'permission-text');
    button.setAttribute('id','permission-button');
    button.innerHTML = 'DELETE EVERYTHING!'
    h2.innerHTML = "All task will be deleted, permenanly!";
    window.appendChild(h2);
    window.appendChild(button);
    return window;
}

export const removePermissionWindow= (window) => {
    document.body.querySelector('#permission-window').remove();
}

export const showEditTaskWindow = (taskObj) => {
  if(document.body.querySelector('.inputWindow')) return;
  // Clone the input window template
  const fragment = createInputWindowByTemplate();
  const inputWindow = fragment.querySelector('.inputWindow');

  // Pre-fill values
  inputWindow.querySelector('#task-input-title').value = taskObj.title;
  inputWindow.querySelector('#task-input-desc').value = taskObj.description || '';
  // Change button text to 'Save'
  inputWindow.querySelector('#input-submit-button').textContent = 'Save';

  // Remove any existing input window

  const existing = document.body.querySelector('.inputWindow');
  //if(existing) return;
  if (existing) existing.remove();
    document.body.appendChild(inputWindow);

  // Save handler
  inputWindow.querySelector('#input-submit-button').onclick = () => {
    const newTitle = inputWindow.querySelector('#task-input-title').value.trim();
    const newDesc = inputWindow.querySelector('#task-input-desc').value;
    const newDue = inputWindow.querySelector('time-input-due').value.split(' ');
    if (newTitle.length === 0) {
      alert('Title cannot be empty.');
      return;
    }
    // Call handler in task.js
    handleEditTask(taskObj.id, newTitle,newDesc,newDue);
    hideInputWindow();
  };
  // Cancel handler
  inputWindow.querySelector('#input-cancle-button').onclick = () => {
    hideInputWindow();
  };
};



export const buildTaskCard= (taskObj) => {
    const fragment = document.getElementById("taskCardTemplate").content.cloneNode(true);
    const card = fragment.querySelector('.task-card');
    card.setAttribute('id', taskObj.id)
    card.querySelector(".task-title").textContent = taskObj.title;
    card.querySelector(".task-description").textContent = taskObj.description || '';
    card.querySelector('.task-due-date').textContent = taskObj.date;
    card.querySelector('.task-due-time').textContent = taskObj.time;
    // Completion checkbox
    const checkbox = card.querySelector('.task-complete-checkbox');
    const completed = !!taskObj.completed;
    checkbox.checked = completed;
    if (completed) {
      card.classList.add('task-completed');
    } else {
      card.classList.remove('task-completed');
    }
    checkbox.addEventListener('change', () => {
      // Update localStorage
      const updatedTask = { ...taskObj, completed: checkbox.checked };
      localStorage.setItem(taskObj.id, JSON.stringify(updatedTask));
      // Update UI
      if (checkbox.checked) {
        card.classList.add('task-completed');
      } else {
        card.classList.remove('task-completed');
      }
      // Also update taskObj for edit
      taskObj.completed = checkbox.checked;
    });
    card.querySelector(".task-delete-button").addEventListener("click", () => handleDeleteTask(taskObj));
    card.querySelector('.task-edit-button').addEventListener("click",()=>showEditTaskWindow(taskObj));
    return card;
}



//crating new card
/**
 *@function createNewTaskCard
 * @param {String} taskTitle - Task heading displayed on bold
 */
export const createNewTaskCard = (taskObj) => {
  const card = buildTaskCard(taskObj);
  try {
    localStorage.setItem(taskObj.id, JSON.stringify({ title: taskObj.title, description: taskObj.description,date:taskObj.date,time:taskObj.time, completed: taskObj.completed }));
  } catch {
    window.alert("Task Not Saved. Local Storage is full")
    return;
  }
  return card;
}