export function toggleStorage(){
  const container = document.getElementById(`header-container`);
  const button = document.createElement(`button`);
  const storageTypes = {
    default: `localStorage`,
    current: getStorageType(),
    alternative() {
      return this.current === `API` ? this.default : `API`
    }
  }

  button.classList.add(`btn`, `btn-warning`)
  button.textContent = `Переключиться на ${storageTypes.alternative()}`
  container.append(button)

  button.addEventListener(`click`, (e) => {
    e.preventDefault();
    setStorageType(storageTypes.alternative());
    location.reload();
  })

  if (storageTypes.current === null) {
    return setStorageType(storageTypes.default)
  } else {
    return storageTypes.current;
  }
}

function setStorageType(data) { // внесение типа хранения данных
  localStorage.setItem(`storageType`, data);
  return data
}

function getStorageType() { // Получение типа хранения данных
  return localStorage.getItem(`storageType`);
}
