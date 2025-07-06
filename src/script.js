
document.querySelector(".add-task-button").addEventListener("click", () => {
  inputEvent();
});
document.querySelector(".add-task-button").addEventListener("keydown", (event) => {
  if(event.key === 'Enter'){
    inputEvent();
  }
});

/**
 *
 * @param {String} tasktitle - Task heading displayed on bold
 * @param {String} description - task information
 * @param {String} status - pending , completed
 */
function createTaskCard(taskTitle) {
  const template = document.getElementById("taskCardTemplate");
  //cloneNode(true) is to deep clone the element with child nodes
  const card = template.content.cloneNode(true);
  card.querySelector(".task-title").textContent = taskTitle;
  const taskID = "t" + new Date().getTime();
  card.setAttribute = ('id',taskID);
  card.querySelector(".task-delete-button").addEventListener("click", () => handleDeleteTask(taskID));

  return card;
}

/**
 * @param {String} taskTitle - task detail to be displayed
 */

function addTask(taskTitle) {
  
  const card = createTaskCard(taskTitle);
  
  const taskGrid = document.querySelector(".taskGrid");
  taskGrid.appendChild(card.querySelector(".task-card"));
}

/**
 *
 * @param {String} taskID - task-id to be deleted
 */
function handleDeleteTask(taskID) {
  var deletingTask = document.getElementById(taskID);
  console.log(taskID+ `${deletingTask}`);
  if (deletingTask) {
    console.log("removing task");
    deletingTask.remove();
  }
}

// let taskID = 0; ---> removing global counter to maintain uniqueness and seperability
/**
 * @function -creates input winow that shows up on screen
 * @returns {Element} - returns container div
 */
function createInptWinFromTemp() {
  //get template
  const template = document.getElementById("inputWindowTemplate");
  //creation of input-window-container
  const container = template.content.cloneNode(true).firstElementChild;
  return container;
}

/**
 *  @function inputEvent - runs the input event on click of addTask button
 */

function inputEvent() {
  //creating inout-window
  const inputWindow  = createInptWinFromTemp();
  //adding window to body;
  document.body.appendChild(inputWindow);
  //add event Listeners
  document
    .querySelector("#input-submit-button").addEventListener("click", () => {
      let taskTitle = document.getElementById("input-task-title").value;
      document.body.querySelector(".inputWindow").remove();
      if (taskTitle) {
        addTask(taskTitle);
      }
    });

  inputWindow.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      let taskTitle = document.getElementById("input-task-title").value;
      document.body.querySelector(".inputWindow").remove();
      if (taskTitle) {
        addTask(taskTitle);
      }
    }
  });

  document.querySelector("#input-cancle-button").onclick = () => {
    document.body.querySelector(".inputWindow").remove();
  };
}

