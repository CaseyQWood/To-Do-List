$(document).ready(function() {

  const checkIcon = function(category) {
    if (category === null) {
      return 'fas fa-list-ul';
    }
    if (category === 'books') {
      return 'fas fa-book';
    }
    if (category === 'films') {
      return 'fas fa-film';
    }
    if (category === 'restaurants') {
      return 'fas fa-utensils';
    }
    if (category === 'products') {
      return 'fas fa-shopping-basket';
    }
  };

  const createList = function(task) {

    const icon = checkIcon(task.category);
    console.log("icon: ", icon);
    let $list = $(`
      <li><i class="${icon}"></i>
          <input type="checkbox">
          <span>${task.description}</span>
          <button type="submit" formmethod="GET">Edit</button>
      </li>
    `);
    return $list
  }

  const renderTasks = function(tasks) {
    //console.log("tasks: ", tasks);
    for(const task of tasks.list) {
      console.log("task1: ", task);
      console.log("complete: ", task.completed);
      if (task.completed) {
        $('.complete').append(createList(task));
      } else {
        $('.incomplete').append(createList(task));
      }
    }

  }


  const loadTasks = function() {

    $.get("/home", function() {
      console.log("reached home route")
    }).then((result) => {
      console.log("homeres: ", result);
      renderTasks(result);
    })
  }

  loadTasks();
});
