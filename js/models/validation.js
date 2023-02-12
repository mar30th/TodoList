function Validation() {
  this.inputCheck = function (value, id, mes) {
    if (value === "") {
      getELe(id).style.display ="block";
      getELe(id).innerHTML = mes;
      return false
    }
    getELe(id).style.display ="none";
    getELe(id).innerHTML = "";
    return true;
  };


  this.taskExist = function (value, id, mes, arr) {
    var exist = false;
    for (var i = 0; i < arr.length; i++) {
      var task = arr[i];
      if (task.taskName === value) {
        exist = true;
        break;
      };
    };
    if (exist) {
      getELe(id).style.display ="block";
      getELe(id).innerHTML = mes;
      return false;
    }
    getELe(id).style.display ="none";
    getELe(id).innerHTML = "";
    return true
  };
}