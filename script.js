// const { createElement } = require("react");
let taskCount = 0


function inputEvent(){
    //creating inout-window
    const inputWindow = document.createElement('div');
    inputWindow.setAttribute('class', 'inputWindow');
    //adding window to body;
    document.body.appendChild(inputWindow);
    //adding input fields
    const taskTitle = document.createElement('')
}

function addTask(){
    //creating task div 
    var task = Object.assign(document.createElement('div'), {id:`task-${++taskCount}`}); task.className = "taskCard";

    //adding to task-grid  
    let taskGrid = document.querySelector('.taskGrid');
    task.textContent = task.id;
    taskGrid.appendChild(task);

    //creating delete button 
    var deleteButton = document.createElement('button');
    deleteButton.setAttribute('class','deleteButton');
    deleteButton.textContent = 'delete';
    deleteButton.addEventListener("click", ()=>handleDeleteTask(task.id));

    //adding button to taskCard
    var taskCard = document.getElementById(task.id);
    taskCard.appendChild(deleteButton)

}
function handleDeleteTask(taskId){
    var deletingTask = document.getElementById(taskId);
    if(deletingTask){
        console.log("removing task")
        deletingTask.remove();
    }
}

 function changColor() {
    var a  = document.getElementsByClassName("add-task-wrapper")
 }