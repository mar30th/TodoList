function TaskList() {
  this.arr = [];
  this.addTask = function (task) {
    this.arr.push(task);

  };

  this.findTask = function (id) {
    var index = -1;
    for (var i = 0; i < this.arr.length; i++) {
      if (this.arr[i].id == id) {
        index = i;
      }
    }
    return index;
  };

  this.deleteTask = function (id) {
    var index = this.findTask(id);
    if (index != -1) {
      this.arr.splice(index, 1);
    }
  };

  this.getIDTask = function (id) {
    var index = this.findTask(id);
    if ( index !== -1 ) {
      return this.arr[index]

    }
    return null;
  };

  this.changeID = function (task) {
    if(task.status == "todo"){
      task.status = "completed";
      return task;
    }
    else if (task.status == "completed") {
      task.status = "todo"
      return task;
    }

    return null;
  }
  
}