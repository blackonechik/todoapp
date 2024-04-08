import { createTodoApp } from "./todo-app/view.js";
import { toggleStorage } from "./todo-app/change-storage.js"

const storageType = toggleStorage();
const owner = document.getElementById(`todo-app`).dataset.owner;

import(`./todo-app/${storageType}.js`)
  .then(({
    getTodoList,
    OnCreateFormSubmit,
    onDoneClick,
    onDeleteClick,
  }) => {
    (async () => {
      const todoItemList = await getTodoList(owner)
      createTodoApp(document.getElementById(`todo-app`), {
        title: `Владелец списка дел: ${owner}`,
        owner,
        todoItemList,
        OnCreateFormSubmit,
        onDoneClick,
        onDeleteClick,
      });
    })()
  })
  .catch((error) => {
    console.log('Ошибка загрузки модуля', error);
  });
