const ENDPOINT_URL = `http://localhost:3000/api/todos`;

export async function getTodoList(owner) {
    const response = await fetch(`${ENDPOINT_URL}?owner=${owner}`);
    return await response.json();
}

export async function OnCreateFormSubmit({ owner, name }) {
    const response = await fetch(ENDPOINT_URL, {
        method: `POST`,
        body: JSON.stringify({
            name,
            owner,
        }),
        headers: { 'Content-Type': 'application/json' }
    });
    return await response.json();
}

export function onDoneClick({ todoItem }) {
    todoItem.done = !todoItem.done;
    fetch(`${ENDPOINT_URL}/${todoItem.id}`, {
        method: `PATCH`,
        body: JSON.stringify({ done: todoItem.done }),
        headers: { 'Content-Type': 'application/json' }
    });
}

export function onDeleteClick({ element, todoItem }) {
    if (!confirm(`Вы уверены?`)) {
        return;
    }
    element.remove();
    fetch(`${ENDPOINT_URL}/${todoItem.id}`, {
        method: `DELETE`
    });
}
