
// let taskID = 0; ---> removing global counter to maintain uniqueness and seperability
/**
 * @function -creates input winow that shows up on screen
 * @returns {Element} - returns container div
 */
function createTaskInputWindow() {
  //creation of input-window-container
  const container = document.createElement("div");
  container.setAttribute("class", "inputWindow");

  //creation of task-inputs
  const lable = document.createElement("label");
  lable.textContent = "Task:";
  lable.htmlFor = "input-task-title";
  lable.className = "input-window-item";

  const taskInput = document.createElement("input");
  taskInput.id = "input-task-title";
  taskInput.type = "text";
  taskInput.className = "input-window-item";

  //creation of container div to pack the buttons
  const buttonDiv = document.createElement("div");
  buttonDiv.id = "buttonDiv";
  buttonDiv.className = "input-window-item";
  //creation of buttons
  const submitBtn = document.createElement("button");
  submitBtn.id = "submitBtn";
  submitBtn.textContent = "Add";
  submitBtn.className = "input-window-button";

  const cancleBtn = document.createElement("button");
  cancleBtn.id = "cancleBtn";
  cancleBtn.textContent = "Cancle";
  cancleBtn.className = "input-window-button";

  //bind events => meaning adding event Listeners
  submitBtn.onclick = () => {
    let taskTitle = document.getElementById('input-task-title').value;
    document.body.querySelector(".inputWindow").remove();
    if(taskTitle){
      addTask(taskTitle);
    }
  };

  cancleBtn.onclick = () => {
    document.body.querySelector(".inputWindow").remove();
  };

  container.appendChild(lable);
  container.appendChild(taskInput);
  buttonDiv.appendChild(submitBtn);
  buttonDiv.appendChild(cancleBtn);
  container.appendChild(buttonDiv);

  return container;
}

/**
 *  @function inputEvent - runs the input event on click of addTask button
 */

function inputEvent() {
  //creating inout-window
  const inputWindow = createTaskInputWindow();
  //adding window to body;
  document.body.appendChild(inputWindow);
}

document.querySelector('.add-task-button').addEventListener("click", () =>{
  inputEvent();
});


/**
 * 
 * @param {String} tasktitle - Task heading displayed on bold
 * @param {String} description - task information
 * @param {String} status - pending , completed
 */
function createTaskCard(taskTitle){
  const template  = document.getElementById("taskCardTemplate");
   //cloneNode(true) is to deep clone the element with child nodes 
  const card = template.content.cloneNode(true);
  card.querySelector('.task-title').textContent = taskTitle;
  card.querySelector('.delete-button').addEventListener("click", ()=>handleDeleteTask(taskId));
  return card;
}

/**
 * @param {String} taskTitle - task detail to be displayed
 */

function addTask(taskTitle) {

  const taskID = 't'+ new Date().getTime();
  const card = createTaskCard(taskTitle);
  card.id = taskID;
  if(card){console.log(card)}
  const taskGrid = document.querySelector(".taskGrid");
  taskGrid.appendChild(card);
}




function handleDeleteTask(taskId) {
  var deletingTask = document.getElementById(taskId);
  if (deletingTask) {
    console.log("removing task");
    deletingTask.remove();
  }
}

function changColor() {
  var a = document.getElementsByClassName("add-task-wrapper");
}
