//گرفتن المنت های html
let $ = document;
const colorBoxes = $.querySelectorAll("#colorBoxes");
let selectedColor = ""; // متغیری برای ذخیره رنگ انتخاب‌شده

let addTodoInput = $.querySelector("#input");
let listContainer = $.querySelector("#listContainer");
let newElemDiv;
let newElemP;
let newElemCircleIcon;
let newElemTrashIcon;
let todoArray = [];

function setArrayInLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todoArray));
}

function getTodosFromLocalStorage() {
  let savedTodos = localStorage.getItem("todos");

  // چک کردن اینکه آیا داده‌ای موجود است یا خیر
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

  let newElemP = document.createElement("p");
  newElemP.className = "col-span-6 text-gray-200 text-lg";
  newElemP.innerHTML = todo.title;

  let newElemCircleIcon = document.createElement("i");
  newElemCircleIcon.className = "fa fa-check-circle-o text-gray-300";
  newElemCircleIcon.style = "font-size: 20px";

  let newElemTrashIcon = document.createElement("button");
  newElemTrashIcon.className = "fa fa-trash text-gray-300";
  newElemTrashIcon.style = "font-size: 20px";
  newElemTrashIcon.setAttribute("onclick", "removeTodo(" + todo.id + ")");

  newElemDiv.append(newElemP, newElemCircleIcon, newElemTrashIcon);
  listContainer.append(newElemDiv);
}

function createNewtodo(event) {
  if (event.keyCode === 13 && addTodoInput.value) {
    let newTodoObj = {
      id: todoArray.length + 1,
      title: addTodoInput.value,
      compelete: false,
      color: selectedColor,
    };
    todoArray.push(newTodoObj);
    createTodoElement(newTodoObj); // المنت جدید را ایجاد و به صفحه اضافه کنید
    addTodoInput.value = "";
    setArrayInLocalStorage();
  }
}

function removeTodo(todoId) {
  // حذف تودوی مربوطه از todoArray
  todoArray = todoArray.filter((todo) => todo.id !== todoId);

  // ذخیره کردن آرایه به‌روزشده در localStorage
  setArrayInLocalStorage();

  // پاک کردن لیست موجود در DOM
  listContainer.innerHTML = "";

  // دوباره رندر کردن تمام تودوها
  todoArray.forEach((todo) => {
    createTodoElement(todo);
  });
}

function setColorForTodos(i) {
  // حذف تمام کلاس‌های رنگی از addTodoInput
  addTodoInput.classList.remove(
    "bg-black",
    "bg-white",
    "bg-red-600",
    "bg-blue-600",
    "bg-yellow-600",
    "bg-green-600",
    "bg-purple-600"
  );

  // تنظیم رنگ انتخاب‌شده
  if (colorBoxes[i].classList.contains("bg-black")) {
    selectedColor = "bg-black";
    addTodoInput.classList.add("bg-black");
  } else if (colorBoxes[i].classList.contains("bg-gray-600")) {
    selectedColor = "bg-gray-600";
    addTodoInput.classList.add("bg-gray-600");
  } else if (colorBoxes[i].classList.contains("bg-red-600")) {
    selectedColor = "bg-red-600";
    addTodoInput.classList.add("bg-red-600");
  } else if (colorBoxes[i].classList.contains("bg-blue-600")) {
    selectedColor = "bg-blue-600";
    addTodoInput.classList.add("bg-blue-600");
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

// addTodoInput.addEventListener("keydown", setArrayInLocalStorage);

// //ایونت کلید اینتر و اد شدن تودو جدید
// addTodoInput.addEventListener("keydown", function (event) {
//   if (event.keyCode === 13) {
//     newElemDiv = $.createElement("div");
//     newElemDiv.className = "grid grid-cols-8 mt-4 items-center h-10";

//     newElemP = $.createElement("p");
//     newElemP.className = "col-span-6 text-gray-200";
//     newElemP.innerHTML = addTodoInput.value;

//     newElemCircleIcon = $.createElement("i");
//     newElemCircleIcon.className = "fa fa-check-circle-o text-gray-300";
//     newElemCircleIcon.style = "font-size: 20px";

//     //انجام دادن تودو
//     let toggleCircleIcon = true;
//     newElemCircleIcon.addEventListener("click", function (event) {
//       if (toggleCircleIcon) {
//         event.target.className = "fa fa-circle-o text-gray-300";
//         newElemP.className = "col-span-6 line-through text-gray-200";
//         toggleCircleIcon = false;
//       } else {
//         event.target.className = "fa fa-check-circle-o text-gray-300";
//         newElemP.className = "col-span-6 text-gray-200";
//         toggleCircleIcon = true;
//       }
//       console.log(event);
//     });
//     newElemTrashIcon = $.createElement("i");
//     newElemTrashIcon.className = "fa fa-trash text-gray-300";
//     newElemTrashIcon.style = "font-size: 20px";

//     //حذف کردن تودو
//     newElemTrashIcon.addEventListener("click", function (event) {
//       event.target.parentElement.remove();
//     });

//     newElemDiv.append(newElemP, newElemCircleIcon, newElemTrashIcon);
//     listContainer.append(newElemDiv);
//     addTodoInput.value = "";
//   }
// });
