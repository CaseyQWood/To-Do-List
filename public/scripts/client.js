$(document).ready(function() {

  const checkIcon = function(category) {
    if (category === null) {
      return "fas fa-list-ul";
    }
    if (category === "books") {
      return "fas fa-book";
    }
    if (category === "films") {
      return "fas fa-film";
    }
    if (category === "restaurants") {
      return "fas fa-utensils";
    }
    if (category === "products") {
      return "fas fa-shopping-basket";
    }
  };

  const createList = function(task) {

    const icon = checkIcon(task.category);
    let $list = $(`
      <li><i class="${icon}"></i>
          <input type="checkbox">
          <span>${task.description}</span>
          <button type="submit" formaction="/update/${task.id}" formmethod="POST">Edit</button>
          <button type="submit" formaction="/delete/${task.id}" formmethod="POST">Delete</button>
      </li>
    `);
    return $list;
  };



  const renderTasks = function(tasks) {
    $(".full-list li").remove();

    for(const task of tasks.list) {
      if (task.completed) {
        $(".complete").prepend(createList(task));
      } else {
        $(".incomplete").prepend(createList(task));
      }
    };
  };

  const renderCategorizedTasks = function(category, tasks) {
    $(".full-list li").remove();
    for(const task of tasks.list) {
      if (task.category && category === task.category) {
        if (task.completed) {
          $(".complete").prepend(createList(task));
        } else {
          $(".incomplete").prepend(createList(task));
        }
      };
    };
  };

  const loadTasks = function(category) {

    $.get("/home", function() {
      console.log("reached home route")
    }).then((result) => {
      if (category) {
        renderCategorizedTasks(category, result);
      } else {
        renderTasks(result);
      }
    })
  };

  //submit new task
  $("#new-task-form").submit(function(event) {
    event.preventDefault();

    console.log("this: ", this);

    const data = $(this).serialize();
    console.log("data: ", data);
    $.post("/create", data, function(data, status) {
      console.log("create task sent")
    }).then(() => {
      console.log("task created");
    })

  });

  $("#homes").click(function() {
    loadTasks(null);
  });
  $("#books").click(function() {
    loadTasks("books");
  });
  $("#films").click(function() {
    loadTasks("films");
  });
  $("#resturants").click(function() {
    loadTasks("restaurants");
  });
  $("#products").click(function() {
    loadTasks("products");
  });

  loadTasks();
});
