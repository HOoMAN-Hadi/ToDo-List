let $ = document;
const colorBoxes = $.querySelectorAll("#colorBoxes");
let selectedColor = ""; // متغیری برای ذخیره رنگ انتخاب‌شده
let addTodoInput = $.querySelector("#input");
let listContainer = $.querySelector("#listContainer");
let todoArray = [];
let dragSrcEl = null; // برای ذخیره المنت در حال درگ

function setArrayInLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todoArray));
}

function getTodosFromLocalStorage() {
  let savedTodos = localStorage.getItem("todos");
  if (savedTodos) {
    todoArray = JSON.parse(savedTodos);
    todoArray.forEach((todo) => {
      createTodoElement(todo);
    });
  } else {
    todoArray = [];
  }
}

function createTodoElement(todo) {
  // ساخت یک div جدید با رنگ انتخاب‌شده
  let newElemDiv = document.createElement("div");
  newElemDiv.className = `grid grid-cols-8 mt-4 hover:shadow-bs2 items-center h-10 rounded px-3 ${todo.color}`;
  newElemDiv.setAttribute("draggable", "true"); // درگ کردن فعال شود
  newElemDiv.setAttribute("data-id", todo.id); // ذخیره id برای تودو

  newElemDiv.addEventListener("dragstart", handleDragStart);
  newElemDiv.addEventListener("dragover", handleDragOver);
  newElemDiv.addEventListener("drop", handleDrop);
  newElemDiv.addEventListener("dragend", handleDragEnd);

  let newElemP = document.createElement("p");
  newElemP.className = "col-span-6 text-gray-200 text-lg";
  newElemP.innerHTML = todo.title;

  // اضافه کردن کلاس line-through اگر complete باشد
  if (todo.complete) {
    newElemP.classList.add("line-through");
  }

  let newElemCircleIcon = document.createElement("button");
  newElemCircleIcon.className = todo.complete
    ? "fa fa-check-circle-o text-green-300"
    : "fa fa-circle-o text-gray-300";
  newElemCircleIcon.style = "font-size: 20px";

  // افزودن event listener برای تغییر وضعیت و کلاس‌ها
  newElemCircleIcon.addEventListener("click", function () {
    editTodo(todo.id, newElemCircleIcon, newElemP);
  });

  let newElemTrashIcon = document.createElement("button");
  newElemTrashIcon.className = "fa fa-trash text-gray-300";
  newElemTrashIcon.style = "font-size: 20px";
  newElemTrashIcon.addEventListener("click", function () {
    removeTodo(todo.id);
  });

  newElemDiv.append(newElemP, newElemCircleIcon, newElemTrashIcon);
  listContainer.append(newElemDiv);
}

// تغییر دادن وضعیت complete و به‌روزرسانی کلاس آیکون و p
function editTodo(todoId, iconElement, textElement) {
  todoArray.forEach(function (todo) {
    if (todo.id === todoId) {
      todo.complete = !todo.complete;

      // تغییر کلاس آیکون بر اساس مقدار complete
      if (todo.complete) {
        iconElement.classList.replace("fa-circle-o", "fa-check-circle-o");
        iconElement.classList.replace("text-gray-300", "text-green-300");
      } else {
        iconElement.classList.replace("fa-check-circle-o", "fa-circle-o");
        iconElement.classList.replace("text-green-300", "text-gray-300");
      }

      // اضافه/حذف کردن کلاس line-through به عنصر <p>
      textElement.classList.toggle("line-through");
    }
  });
  setArrayInLocalStorage();
}

function createNewtodo(event) {
  if (event.keyCode === 13 && addTodoInput.value) {
    let newTodoObj = {
      id: todoArray.length + 1,
      title: addTodoInput.value,
      complete: false,
      color: selectedColor,
    };
    todoArray.push(newTodoObj);
    createTodoElement(newTodoObj);
    addTodoInput.value = "";
    setArrayInLocalStorage();
  }
}

function removeTodo(todoId) {
  todoArray = todoArray.filter((todo) => todo.id !== todoId);
  setArrayInLocalStorage();
  listContainer.innerHTML = "";
  todoArray.forEach((todo) => {
    createTodoElement(todo);
  });
}

function setColorForTodos(i) {
  addTodoInput.classList.remove(
    "bg-gray-900",
    "bg-white",
    "bg-red-600",
    "bg-blue-700",
    "bg-yellow-600",
    "bg-green-600",
    "bg-purple-600"
  );

  if (colorBoxes[i].classList.contains("bg-black")) {
    selectedColor = "bg-black";
    addTodoInput.classList.add("bg-gray-900");
  } else if (colorBoxes[i].classList.contains("bg-gray-600")) {
    selectedColor = "bg-gray-600";
    addTodoInput.classList.add("bg-gray-600");
  } else if (colorBoxes[i].classList.contains("bg-red-600")) {
    selectedColor = "bg-red-600";
    addTodoInput.classList.add("bg-red-600");
  } else if (colorBoxes[i].classList.contains("bg-blue-600")) {
    selectedColor = "bg-blue-600";
    addTodoInput.classList.add("bg-blue-700");
  } else if (colorBoxes[i].classList.contains("bg-yellow-600")) {
    selectedColor = "bg-yellow-600";
    addTodoInput.classList.add("bg-yellow-600");
  } else if (colorBoxes[i].classList.contains("bg-green-600")) {
    selectedColor = "bg-green-600";
    addTodoInput.classList.add("bg-green-600");
  } else if (colorBoxes[i].classList.contains("bg-purple-600")) {
    selectedColor = "bg-purple-600";
    addTodoInput.classList.add("bg-purple-600");
  }
}

for (let i = 0; i < colorBoxes.length; i++) {
  colorBoxes[i].setAttribute("onclick", "setColorForTodos(" + i + ")");
}

addTodoInput.addEventListener("keydown", createNewtodo);
window.addEventListener("load", getTodosFromLocalStorage);

// Functions for Drag and Drop
function handleDragStart(e) {
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/plain", this.getAttribute("data-id"));
  this.classList.add("dragging");
}

function handleDragOver(e) {
  e.preventDefault();
  return false;
}

function handleDrop(e) {
  e.stopPropagation();
  const draggedTodoId = e.dataTransfer.getData("text/plain");
  const droppedTodoId = this.getAttribute("data-id");

  if (draggedTodoId !== droppedTodoId) {
    // Swap todos in the array
    let draggedTodoIndex = todoArray.findIndex(
      (todo) => todo.id == draggedTodoId
    );
    let droppedTodoIndex = todoArray.findIndex(
      (todo) => todo.id == droppedTodoId
    );

    [todoArray[draggedTodoIndex], todoArray[droppedTodoIndex]] = [
      todoArray[droppedTodoIndex],
      todoArray[draggedTodoIndex],
    ];

    // Clear and re-render todos
    listContainer.innerHTML = "";
    todoArray.forEach((todo) => {
      createTodoElement(todo);
    });

    setArrayInLocalStorage(); // ذخیره آرایه به‌روزشده
  }
  return false;
}

function handleDragEnd() {
  this.classList.remove("dragging");
}
