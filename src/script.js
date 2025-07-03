
let taskCount = 0

function createTaskInputWindow(){
    //creation of input-window-container
    const container = document.createElement('div');
    container.setAttribute('class','inputWindow');
    

    //

    return container;
}

function inputEvent(){
    //creating inout-window
    const inputWindow = createTaskInputWindow();
    //adding window to body;
    document.body.appendChild(inputWindow);
}

function addTask(){
    //creating task div 
    const task = Object.assign(document.createElement('div'), {id:`task-${++taskCount}`});
    task.className = "taskCard";

    //adding to task-grid  
    const taskGrid = document.querySelector('.taskGrid');
    task.textContent = task.id;
    taskGrid.appendChild(task);

    //creating delete button 
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('class','deleteButton');
    deleteButton.textContent = 'delete';
    deleteButton.addEventListener("click", ()=>handleDeleteTask(task.id));

    //adding button to taskCard
    const taskCard = document.getElementById(task.id);
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