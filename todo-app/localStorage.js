function assignIdForItem(tasks) { // Генератор ID > последнего из массива
  if (!tasks || !tasks.length) {
    return 0
  }
  let maxId = tasks[0];
  for (let i = 1; i < tasks.length; i++) {
    if (tasks[i].id > maxId.id) {
      maxId = tasks[i]
    }
  }
  return maxId.id + 1
}

function dataToJson(data) { // Конвертация данных в LocalStorage
  return JSON.stringify(data);
}

function jsonToData(data) { // Конвертация данных из LocalStorage
  return JSON.parse(data);
}

function getTaskData(owner) { // Получение данных из LocalStorage
  return localStorage.getItem(owner);
}

function setTaskData(owner, data) { // Создание LocalStorage
  localStorage.setItem(owner, data);
}

export function getTodoList(owner) { // чтение массива объектов из Localstorage
  return jsonToData(getTaskData(owner));
}


// main

export function onDoneClick({ todoItem, element }) { // Изменение состояния элемента списка
  const taskList = getTodoList(todoItem.owner);
  todoItem.done = !todoItem.done;
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === todoItem.id) {
      taskList[i].done = !taskList[i].done;
    }
  }
  setTaskData(todoItem.owner, dataToJson(taskList));
}

export function OnCreateFormSubmit({ owner, name }) { // Добавление элемента в список
  let taskList = getTaskData(owner);
  console.log(taskList);

  const todoItem = {
    name,
    owner,
    done: false,
    id: assignIdForItem(jsonToData(taskList)),
  }

  taskList = taskList ? jsonToData(taskList) : [];
  taskList.push(todoItem);
  setTaskData(owner, dataToJson(taskList));

  return todoItem
}

export function onDeleteClick({ todoItem, element }) { // Удаление элемента из списка

  if (!confirm(`Вы уверены?`)) {
    return;
  }
  element.remove();

  const taskList = jsonToData(getTaskData(todoItem.owner));
  const newTaskList = [];

  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id !== todoItem.id) {
      newTaskList.push(taskList[i]);
    }
  }
  setTaskData(todoItem.owner, dataToJson(newTaskList));
}
