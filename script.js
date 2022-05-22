const taskList = document.getElementById('lista-tarefas');

const taskClass = 'task bg-gray-100 rounded-lg p-2 text-lg border-2 border-gray-400 mb-4'

function selectTask(item) {
  const taskItem = item;
  const tasksList = document.getElementsByClassName('task');

  for (let index = 0; index < tasksList.length; index += 1) {
    tasksList[index].style.backgroundColor = '';
    tasksList[index].classList.remove('selected');
    tasksList[index].classList.remove('border-black');
  }

  taskItem.classList.add('selected');
  taskItem.classList.add('border-black');

}

function toggleDoneTask(item) {
  const taskItem = item;
  const taskText = taskItem.outerText
  
  if(taskItem.classList.contains('completed')) {
    taskItem.innerHTML = `<i class="far fa-circle mr-4"></i>${taskText}`
  } else {
    taskItem.innerHTML =`<i class="fas fa-circle mr-4"></i>${taskText}` ;
  }

  taskItem.classList.toggle('completed');
  taskItem.classList.toggle('line-through');
}

function clearTaskButton() {
  taskList.innerHTML = '';

  localStorage.removeItem('tasks');
}

function createTask() {
  const taskInputName = document.getElementById('texto-tarefa');

  if(taskInputName.value === ''){
    return;
  }

  const taskItem = document.createElement('li');
  taskItem.innerHTML =`<i class="far fa-circle mr-4"></i>${taskInputName.value}` ;
  taskItem.className = taskClass;
  taskItem.onclick = () => selectTask(taskItem);
  taskItem.ondblclick = () => toggleDoneTask(taskItem);
  taskInputName.value = '';

  taskList.appendChild(taskItem);
}

function removeDoneTask() {
  const taskItems = document.querySelectorAll('.completed');
  for (let index = 0; index < taskItems.length; index += 1) {
    taskList.removeChild(taskItems[index]);
  }
}

function saveAllTasks() {
  const tasks = document.querySelectorAll('.task');
  const taskArray = [];

  for (let index = 0; index < tasks.length; index += 1) {
    const taskObj = {
      name: tasks[index].innerHTML,
      completed: tasks[index].classList.contains('completed'),
    };
    taskArray.push(taskObj);
  }

  localStorage.setItem('tasks', JSON.stringify(taskArray));
}

function getTasksFromStorage() {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  if (!tasks) return;

  for (let index = 0; index < tasks.length; index += 1) {
    const taskItem = document.createElement('li');
    taskItem.innerHTML  = tasks[index].name;
    taskItem.className = taskClass;
    if (tasks[index].completed) {
      taskItem.classList.add('completed');
    }
    taskItem.onclick = () => selectTask(taskItem);
    taskItem.ondblclick = () => toggleDoneTask(taskItem);

    taskList.appendChild(taskItem);
  }
}

function moveTaskDown() {
  const selectedTask = document.querySelector('.selected');
  if (selectedTask !== null) {
    const nextTask = selectedTask.nextElementSibling;
    if (taskList.lastChild !== selectedTask) {
      nextTask.parentNode.insertBefore(nextTask, selectedTask);
    }
  }
}

function moveTaskUp() {
  const selectedTask = document.querySelector('.selected');
  if (!selectedTask) {
    return;
  }
  if (taskList.firstChild.nextElementSibling !== selectedTask) {
    const afterTask = selectedTask.previousElementSibling;
    afterTask.parentNode.insertBefore(selectedTask, afterTask);
  }
}

function removeSelected() {
  const selectedTask = document.querySelector('.selected');
  taskList.removeChild(selectedTask);
}

window.onload = () => {
  const createTaskButton = document.getElementById('criar-tarefa');
  const removeButtonElement = document.getElementById('remover-finalizados');
  const clearButtonElement = document.getElementById('apaga-tudo');
  const saveTaskButtonElement = document.getElementById('salvar-tarefas');
  const moveUpButtonElement = document.getElementById('mover-cima');
  const moveDownButtonElement = document.getElementById('mover-baixo');
  // const removeSelectedElement = document.getElementById('remover-selecionado');

  removeButtonElement.onclick = removeDoneTask;
  createTaskButton.onclick = createTask;
  clearButtonElement.onclick = clearTaskButton;
  saveTaskButtonElement.onclick = saveAllTasks;
  moveUpButtonElement.onclick = moveTaskUp;
  moveDownButtonElement.onclick = moveTaskDown;
  // removeSelectedElement.onclick = removeSelected;

  getTasksFromStorage();
};
