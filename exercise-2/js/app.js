let itemsListArray = {};
var incompleteTasksHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");

function init() {
  const todo = localStorage.getItem("itemsListArray");
  if(todo) {
    itemsListArray = JSON.parse(todo);
    const existingItemsListArray = Object.keys(itemsListArray);
    for(let i = 0; i < existingItemsListArray.length; i++) {
      addItemOnClick(itemsListArray[existingItemsListArray[i]], existingItemsListArray[i]);
    }
  }
}

const setLocalStorage = () => {
  localStorage.setItem("itemsListArray", JSON.stringify(itemsListArray));
}

const createNewTaskElement = function (taskStringObj, id) {
  const listItem = document.createElement("li");
  const checkBox = document.createElement("input");
  const label = document.createElement("label");
  const editInput = document.createElement("input");
  const editBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");

  listItem.id = id ? id : new Date().getTime();
  checkBox.type = "checkbox";
  checkBox.tabIndex = 0;
  editInput.type = "text";
  editBtn.innerText = "Edit";
  editBtn.className = "edit";
  deleteBtn.innerText = "Delete";
  deleteBtn.className = "delete";
  label.innerText = taskStringObj.name;
  if(taskStringObj.isCompleted) {
    checkBox.checked = true;
  }

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editBtn);
  listItem.appendChild(deleteBtn);

  return listItem;
};

const inputValueKeyDown = () => {
  if(this.event.keyCode === 13) {
    addItem();
  }
}

const addItem = () => {
  const taskInput = document.getElementById("new-task-input");
  let listItemName = taskInput.value;
  listItemName = listItemName && listItemName.trim();
  if(listItemName) {
    const listItemNameObj = {"name": listItemName, "isCompleted": false};
    const currentListItem = addItemOnClick(listItemNameObj);
    itemsListArray[currentListItem["id"]] = listItemNameObj;
    setLocalStorage();
  } else {
    alert("Input value cannot be empty");
  }
    taskInput.value = "";  
}

var addItemOnClick = function (valueObj, id) {
  const listItem = createNewTaskElement(valueObj, id);
  const folderToAppend = valueObj.isCompleted ? completedTasksHolder : incompleteTasksHolder;
  folderToAppend.appendChild(listItem);
  const eventToBind = valueObj.isCompleted ? ItemIncomplete : ItemComplete;
  bindItemsEvents(listItem, eventToBind);
  return listItem;
};

var editItem = function () {
  var listItem = this.parentNode;
  var editInput = listItem.querySelectorAll("input[type=text")[0];
  var label = listItem.querySelector("label");
  var button = listItem.getElementsByTagName("button")[0];

  var containsClass = listItem.classList.contains("editMode");
  if (containsClass) {
    label.innerText = editInput.value;
    itemsListArray[listItem["id"]]["name"] = editInput.value;
    setLocalStorage();
    button.innerText = "Edit";
  } else {
    editInput.value = label.innerText
    button.innerText = "Save";
  }
  listItem.classList.toggle("editMode");
};

var deleteItem = function (el) {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  delete itemsListArray[listItem["id"]];
  setLocalStorage();
  ul.removeChild(listItem);
};

var ItemComplete = function (el) {
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  itemsListArray[listItem["id"]]["isCompleted"] = true;
  setLocalStorage();
  bindItemsEvents(listItem, ItemIncomplete);
};

var ItemIncomplete = function () {
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  itemsListArray[listItem["id"]]["isCompleted"] = false;
  setLocalStorage();
  bindItemsEvents(listItem, ItemComplete);
};

var bindItemsEvents = function (taskListItem, checkBoxEventHandler, cb) {
  var checkBox = taskListItem.querySelectorAll("input[type=checkbox]")[0];
  var editBtn = taskListItem.querySelectorAll("button.edit")[0];
  var deleteBtn = taskListItem.querySelectorAll("button.delete")[0];
  editBtn.onclick = editItem;
  deleteBtn.onclick = deleteItem;
  checkBox.onchange = checkBoxEventHandler;
};
