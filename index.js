const input = document.querySelector("[data-text-field]");
const addTodoBtn = document.querySelector("[data-add-todo-btn]");
const container = document.querySelector("[data-todo-container]");

// Загружаем список задач из localStorage
const todoList = JSON.parse(localStorage.getItem("todos")) || [];

// Сохраняем список задач в localStorage
const saveToLocalStorage = (key = "todos") => {
  localStorage.setItem(key, JSON.stringify(todoList));
};

// Обработчик события для добавления новой задачи
addTodoBtn.addEventListener("click", () => {
  if (input.value.trim()) {
    todoList.push(input.value);
    input.value = ""; // Очищаем поле ввода

    saveToLocalStorage(); // Сохраняем в localStorage
    render(); // Обновляем отображение
  }
});

// Функция для создания нового элемента
const createElement = (tagName, textContent) => {
  const element = document.createElement(tagName);
  element.textContent = textContent;
  return element;
};

// Функция для отображения задач
const render = () => {
  container.innerHTML = ""; // Очищаем контейнер
  todoList.forEach((todo, index) => {
    const todoElement = createElement("div", todo);
    const removeBtn = createElement("button", "❌");

    // Обработчик события для удаления задачи
    removeBtn.addEventListener("click", () => {
      todoList.splice(index, 1); // Удаляем задачу по индексу
      saveToLocalStorage(); // Сохраняем обновленный список
      render(); // Обновляем отображение
    });

    todoElement.append(removeBtn);
    container.append(todoElement);
  });
};

// Первоначальное отображение задач
render();
