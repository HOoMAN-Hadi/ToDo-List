//گرفتن المنت های html
let $ = document;
let addTodoInput = $.querySelector("#input");
let listContainer = $.querySelector("#listContainer");
let newElemDiv;
let newElemP;
let newElemCircleIcon;
let newElemTrashIcon;
//ایونت کلید اینتر و اد شدن تودو جدید
addTodoInput.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    newElemDiv = $.createElement("div");
    newElemDiv.className = "grid grid-cols-8 mt-4 items-center h-10";

    newElemP = $.createElement("p");
    newElemP.className = "col-span-6 text-gray-200";
    newElemP.innerHTML = addTodoInput.value;

    newElemCircleIcon = $.createElement("i");
    newElemCircleIcon.className = "fa fa-check-circle-o text-gray-300";
    newElemCircleIcon.style = "font-size: 20px";

    //انجام دادن تودو
    let toggleCircleIcon = true;
    newElemCircleIcon.addEventListener("click", function (event) {
      if (toggleCircleIcon) {
        event.target.className = "fa fa-circle-o text-gray-300";
        newElemP.className = "col-span-6 line-through text-gray-200";
        toggleCircleIcon = false;
      } else {
        event.target.className = "fa fa-check-circle-o text-gray-300";
        newElemP.className = "col-span-6 text-gray-200";
        toggleCircleIcon = true;
      }
      console.log(event);
    });
    newElemTrashIcon = $.createElement("i");
    newElemTrashIcon.className = "fa fa-trash text-gray-300";
    newElemTrashIcon.style = "font-size: 20px";

    //حذف کردن تودو
    newElemTrashIcon.addEventListener("click", function (event) {
      event.target.parentElement.remove();
    });

    newElemDiv.append(newElemP, newElemCircleIcon, newElemTrashIcon);
    listContainer.append(newElemDiv);
    addTodoInput.value = "";
  }
});
