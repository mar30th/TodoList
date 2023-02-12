var taskList = new TaskList();
var completeList = [];
getLocalStorage();
/**
 * Ham DOM id
 * @param {*} id 
 * @returns 
 */
function getELe(id) {
  return document.getElementById(id);
};

getELe("addItem").addEventListener("click", function () {
  var task = getData()
  if (task) {
    taskList.addTask(task)
    renderTaskTodo(taskList.arr);
    resetValue()
    setLocalStorage();
  }

});

/**
 * Lay du lieu data tu the input
 * @returns 
 */
function getData() {
  var taskName = getELe("newTask").value;
  var status = "todo";

  var isValid = true;
  var validation = new Validation()
  isValid = validation.inputCheck(taskName, "notiInput", "(*) Please type your task") && validation.taskExist(taskName, "notiInput", "(*) This task aleardy exist", taskList.arr)

  if (!isValid) return null;
  var task = new Task(taskName, status);
  return task
};



/**
 * Ham hien thi bang todo task
 * @param {*} data 
 */
function renderTaskTodo(data) {
  content = "";
  for (var i = 0; i < data.length; i++) {
    if (data[i].status == "todo") {
      content +=
      `
      <li id = "todoList">
      ${data[i].taskName}
      <p>
      <span id = "delete" style="cursor: pointer;"><i class="fa-solid fa-trash" onclick = "deleteTask ('${data[i].id}')"></i></span>
      <span id = "delete" style="cursor: pointer;"><i class="fa-regular fa-circle-check" onclick = "completeTask ('${data[i].id}')"></i></span>
      </p>
      </li> 
    `

    }

  }
  getELe("todo").innerHTML = content;
};

/**
 * Ham hien thi bang completed task
 * @param {*} data 
 */
function renderTaskCompleted(data) {
  content = "";
  for (var i = 0; i < data.length; i++) {
    if (data[i].status == "completed") {
      content +=
      `
      <li>
      ${data[i].taskName}
      <p>
      <span id = "delete" style="cursor: pointer;"><i class="fa-solid fa-trash" onclick = "deleteTask ('${data[i].id}')"></i></span>
      <span id = "delete" style="cursor: pointer;"><i class="fa-regular fa-circle-check" onclick = "completeTask ('${data[i].id}')"></i></span>
      </p>
      </li> 
    `
    }


  }
  getELe("completed").innerHTML = content;
};


/**
 * reset value input
 */
function resetValue() {
  getELe("newTask").value = "";
};

/**
 * Delete Task
 * @param {*} id 
 */
function deleteTask(id) {
  taskList.deleteTask(id);
  renderTaskTodo(taskList.arr);
  renderTaskCompleted(taskList.arr)
  setLocalStorage();
};


/**
 * Ham thay doi status task va di chuyen task
 * @param {*} id 
 */
function completeTask(id) {
  var arr = taskList.getIDTask(id);
  var task = taskList.changeID(arr);
  if (task.status == "completed") {

    deleteTask(id);
    taskList.addTask(task);
    renderTaskCompleted(taskList.arr);

  }
  if (task.status == "todo") {
    deleteTask(id);
    taskList.addTask(task);
    renderTaskTodo(taskList.arr);

  }
  setLocalStorage()

};

/**
 * getLocalStorage
 */
function setLocalStorage() {
  //   // convert type data
  var dataString = JSON.stringify(taskList.arr);
  localStorage.setItem("taskList", dataString);
};


// /**
//  * lay data tu local storage 
//  */
function getLocalStorage() {
  var dataString = localStorage.getItem("taskList");
  // convert string to JSON
  taskList.arr = JSON.parse(dataString) || [];
  // render tbody
  renderTaskTodo(taskList.arr);
  renderTaskCompleted(taskList.arr)
};