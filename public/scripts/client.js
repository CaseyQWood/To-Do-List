$(document).ready(function() {

  const checkIcon = function(category) {
    if (category === null) {
      return "fas fa-list-ul";
    };
    if (category === "books") {
      return "fas fa-book";
    };
    if (category === "films") {
      return "fas fa-film";
    };
    if (category === "restaurants") {
      return "fas fa-utensils";
    };
    if (category === "products") {
      return "fas fa-shopping-basket";
    };
  };

  const createList = function(task) {

    const icon = checkIcon(task.category);
    let $list = $(`
      <li><i class="${icon}"></i>
          <input type="checkbox">
          <span>${task.description}</span>
          <button type="button" class="btn btn-outline-dark" data-toggle="modal" data-target="#edit-modal" data-description="${task.description}" data-id="${task.id}" data-category="${task.category}">Edit</button>
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
    }
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
      }
    }
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
    });
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

  //Edit Modal

  let taskId;
  let catPage = null;

  $("#edit-modal").on("show.bs.modal", function (event) {
    const button = $(event.relatedTarget);
    const description = button.data("description");
    taskId = button.data("id");
    const category = button.data("category");
    const modal = $(this);
    console.log("des: ", description, "taskid: ", taskId, "cat: ", category);

    modal.find(".modal-body input").val(description);
    modal.find(".modal-body #category-dropdown").val(category);
  });

  $("#edit-task-form").submit(function(event) {
    event.preventDefault();

    console.log("edit this: ", this);
    const data = $(this).serialize();
    console.log("data: ", data);
    $.post(`/update/${taskId}`, data, function(data, status) {
      loadTasks(catPage);
      console.log("submit edit");
    }).then(() => {
      $('#edit-modal').modal('hide');
      loadTasks(catPage);
      console.log("task edit completed");
    });
  });

  $("#delete-task-button").click(function(event) {
    event.preventDefault();

    $.post(`/delete/${taskId}`, function(data, status) {
      console.log("submit delete");
      loadTasks(catPage);
    }).then(() => {
      $('#edit-modal').modal('hide');
      loadTasks(catPage);
      console.log("task deleted");
    });
  });

  const renderHeading = function(category) {
    let title = category;
    let heading;

    if (category) {
      heading = title.charAt(0).toUpperCase() + title.slice(1);
    } else {
      heading = "All Tasks";
    };
    let $heading = $(`<span id="category-title">${heading}</span>`);
    return $heading;
  };

  //Select category
  $("#homes").click(function() {
    loadTasks(null);
    catPage = null;
    $("h2 #category-title").remove();
    $('h2').append(renderHeading(catPage));
  });
  $("#books").click(function() {
    loadTasks("books");
    catPage = "books";
    $("h2 #category-title").remove();
    $('h2').append(renderHeading(catPage));
  });
  $("#films").click(function() {
    loadTasks("films");
    catPage = "films";
    $("h2 #category-title").remove();
    $('h2').append(renderHeading(catPage));
  });
  $("#resturants").click(function() {
    loadTasks("restaurants");
    catPage = "restaurants";
    $("h2 #category-title").remove();
    $('h2').append(renderHeading(catPage));
  });
  $("#products").click(function() {
    loadTasks("products");
    catPage = "products";
    $("h2 #category-title").remove();
    $('h2').append(renderHeading(catPage));
  });

  loadTasks(null);
  $('h2').append(renderHeading(null));
});
