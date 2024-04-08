function createAppTitle(title) {
  const appTitle = document.createElement(`h2`)
  appTitle.innerHTML = title;
  return appTitle;
}

function createTodoItemForm() {
  const form = document.createElement(`form`);
  const input = document.createElement(`input`);
  const buttonWrapper = document.createElement(`div`);
  const button = document.createElement(`button`);

  form.classList.add(`input`, `mb-3`);
  input.classList.add(`form-control`, `mb-3`);
  input.placeholder = `Введите название нового дела`;
  buttonWrapper.classList.add(`input-group-append`);
  button.classList.add(`btn`, `btn-primary`);
  button.textContent = `Добавить дело`

  buttonWrapper.append(button);
  form.append(input);
  form.append(buttonWrapper);

  return {
    form,
    input,
    button,
  }
}

function createTodoList() {
  const list = document.createElement(`ul`);
  list.classList.add(`list-group`);
  return list
}

function createTodoItemElement(todoItem, { onDone, onDelete }) {
  const doneClass = `list-group-item-success`;

  const item = document.createElement(`li`);
  const buttonGroup = document.createElement(`div`);
  const doneButton = document.createElement(`button`);
  const deleteButton = document.createElement(`button`);

  item.classList.add(`list-group-item`, `d-flex`, `justify-content-between`, `align-item-center`);
  if (todoItem.done) {
    item.classList.add(doneClass);
  }

  item.textContent = todoItem.name;

  buttonGroup.classList.add(`btn-group`, `btn-group-sm`);
  doneButton.classList.add(`btn`, `btn-success`);
  doneButton.textContent = `Готово`;
  deleteButton.classList.add(`btn`, `btn-danger`);
  deleteButton.textContent = `Удалить`;

  doneButton.addEventListener(`click`, () => {
    onDone({ todoItem, element: item });
    item.classList.toggle(doneClass, todoItem.done);
  });

  deleteButton.addEventListener(`click`, () => {
    onDelete({ todoItem, element: item });
  })

  buttonGroup.append(doneButton);
  buttonGroup.append(deleteButton);
  item.append(buttonGroup);

  return item;
}

async function createTodoApp(container, {
  title,
  owner,
  todoItemList = [],
  OnCreateFormSubmit,
  onDoneClick,
  onDeleteClick,
}) {
  const todoAppTitle = createAppTitle(title);
  const todoitemForm = createTodoItemForm();
  const todoList = createTodoList();
  const handlers = { onDone: onDoneClick, onDelete: onDeleteClick };

  container.append(todoAppTitle);
  container.append(todoitemForm.form);
  container.append(todoList);

  if (todoItemList) {
    todoItemList.forEach(todoItem => {
      const todoItemElement = createTodoItemElement(todoItem, handlers);
      todoList.append(todoItemElement);
    });
  }

  todoitemForm.form.addEventListener(`submit`, async e => {
    e.preventDefault();

    if (!todoitemForm.input.value.trim()) {
      return;
    }

    const todoItem = await OnCreateFormSubmit({
      owner,
      name: todoitemForm.input.value.trim(),
    });

    const todoItemElement = createTodoItemElement(todoItem, handlers);

    todoList.append(todoItemElement);

    todoitemForm.input.value = ``;

  });

}

export { createTodoApp };
