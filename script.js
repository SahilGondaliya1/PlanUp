// const { createElement } = require("react");
let taskCount = 0
function addTask() {
    taskCount = ++taskCount;
    var taskList = document.querySelector(".task-grid");
    var newTask = document.createElement('div');
    newTask.id = "task-${taskCount}";
    var deleteButton = Object.assign(document.createElement('button'), {id :"delete-button-wrapper"});
    deleteButton.textContent = 'DELETE';
    console.log(deleteButton.id)
    newTask.appendChild(deleteButton); 
    console.log("adding task")           
    taskList.appendChild(newTask);    
    var del = document.getElementById("delete-button-wrapper");
    del.addEventListener("click", () => handleDeleteTask(this.anewTask.id));
    newTask.appendChild(deleteButton); 
    console.log("adding task")           
    taskList.appendChild(newTask);    
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