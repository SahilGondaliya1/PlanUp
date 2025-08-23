

import { state, addTask, deleteTask, updateTask } from "./task.js";

export const taskGrid = document.querySelector(".taskGrid");

export const renderTasks = () => {
  taskGrid.innerHTML = "";
  state.task.forEach((task) => {
    const card = buildTaskCard(task);
    taskGrid.appendChild(card);
  });
};

export const showInputWindow = (taskToEdit = null) => {
  const fragment = document
    .getElementById("inputWindowTemplate")
    .content.cloneNode(true);
  const inputWindow = fragment.querySelector(".inputWindow");

  if (taskToEdit) {
    //Pre-fil form for editing
    inputWindow.querySelector("#task-input-title").value = taskToEdit.title;
    inputWindow.querySelector("#task-input-description").value =
      taskToEdit.description;
    inputWindow.querySelector(
      "#task-input-due"
    ).value = `${taskToEdit.date} ${taskToEdit.time}`;
  }

  //setup date picker
  flatpickr(inputWindow.querySelector("#task-input-due"), {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
  });

  //handle form submission
  inputWindow.querySelector("#input-submit-button").onclick = () =>
    handleSubmit(inputWindow, taskToEdit);
  inputWindow.querySelector("#input-cancle-button").onclick = () =>
    inputWindow.remove();

  document.body.appendChild(inputWindow);

  inputWindow.querySelector("#task-input-title").focus();
};

const handleSubmit = (inputWindow, taskToEdit) => {
  const title = inputWindow.querySelector("#task-input-title").value.trim();
  const description = inputWindow
    .querySelector("#task-input-description")
    .value.trim();
  const [date, time] = inputWindow
    .querySelector("#task-input-due")
    .value.split(" ");

  if (!title) return;

  const taskData = {
    id: taskToEdit?.id || `t-${Date.now()}`,
    title,
    description,
    date,
    time,
    completed: taskToEdit?.completed || false,
  };

  if (taskToEdit) {
    updateTask(taskData);
  } else {
    addTask(taskData);
  }

  inputWindow.remove();
};

const handleDeleteTask = (task) => {
  const tasktoDelete = state.task.find(t=> t.id === task.id);
  if(tasktoDelete){
     deleteTask(task.id);
  }
  else {
    alert(`task not found ${task.id}`);
    // create error flag
  }
};

const handleEditTask = (task) => {
    //show inputWindow   
    showInputWindow(task);
};

export const buildTaskCard = (task) => {
  const fragment = document
    .getElementById("taskCardTemplate")
    .content.cloneNode(true);
  const card = fragment.querySelector(".task-card");

  card.id = task.id;
  card.querySelector(".task-title").textContent = task.title;
  card.querySelector(".task-description").textContent = task.description || "";
  card.querySelector(".task-due-date").textContent = task.date;
  card.querySelector(".task-due-time").textContent = task.time;

  // Completion checkbox
  const checkbox = card.querySelector(".task-complete-checkbox");
  checkbox.checked = task.completed;

  checkbox.addEventListener("change", () => {
    updateTask({ ...task, completed: checkbox.checked });
  });

  card
    .querySelector(".task-delete-button")
    .addEventListener("click", () => handleDeleteTask(task));
  card
    .querySelector(".task-edit-button")
    .addEventListener("click", () => handleEditTask(task));

  return card;
};
