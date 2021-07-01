$(document).ready(function() {

  let catPage = null;

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
        <div id="checklist">
          <input type="checkbox" value="${task.id}" ${task.completed ? 'checked' : ''}>
          <label>${task.description}</label>
        </div>
          <button type="button" class="btn btn-outline-secondary btn-sm" data-toggle="modal" data-target="#edit-modal" data-description="${task.description}" data-id="${task.id}" data-category="${task.category}">Edit</button>
      </li>
    `);
    return $list;
  };

  const renderTasks = function(category, tasks) {
    $(".full-list li").remove();

    for(const task of tasks.list) {
      if (category === null) {
        if (task.completed) {
          $(".complete").prepend(createList(task));
        } else {
          $(".incomplete").prepend(createList(task));
        }
      } else if (task.category && category === task.category) {
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
    }).then((result) => {
        renderTasks(category, result);
        return result;
    }).then((res) => {
      let taskId;
      $('input[type="checkbox"]').click(function(){
        taskId = $(this).val();
        console.log(taskId);

        if($(this).prop("checked") == true){
          const data = "b";
          $.post(`/complete/${taskId}`, data, function(data, status) {

          }).then(() => {
            loadTasks(category, res);
            console.log("Checkbox is checked.");
          })
        } else if ($(this).prop("checked") == false){
          const data = "b";
          $.post(`/complete/${taskId}`, data, function(data, status) {
            loadTasks(category, res);
          }).then(() => {
            console.log("Checkbox is unchecked.");
          })
        }
      });
    })
  };

  //submit new task
  $("#new-task-form").submit(function(event) {
    event.preventDefault();

    const data = $(this).serialize();
    $.post("/create", data, function(data, status) {
    }).then(() => {
      $("#new-task-form input").val('');
      loadTasks(catPage);
    })
  });

  //Edit Modal
  let taskId;

  $("#edit-modal").on("show.bs.modal", function (event) {
    const button = $(event.relatedTarget);
    const description = button.data("description");
    taskId = button.data("id");
    const category = button.data("category");
    const modal = $(this);

    modal.find(".modal-body input").val(description);
    modal.find(".modal-body #category-dropdown").val(category);
  });

  $("#edit-task-form").submit(function(event) {
    event.preventDefault();

    const data = $(this).serialize();
    $.post(`/update/${taskId}`, data, function(data, status) {
      loadTasks(catPage);
    }).then(() => {
      $('#edit-modal').modal('hide');
      loadTasks(catPage);
    });
  });

  $("#delete-task-button").click(function(event) {
    event.preventDefault();

    $.post(`/delete/${taskId}`, function(data, status) {
      loadTasks(catPage);
    }).then(() => {
      $('#edit-modal').modal('hide');
      loadTasks(catPage);
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
    $("h3 #category-title").remove();
    $('h3').append(renderHeading(catPage));
  });
  $("#books").click(function() {
    loadTasks("books");
    catPage = "books";
    $("h3 #category-title").remove();
    $('h3').append(renderHeading(catPage));
  });
  $("#films").click(function() {
    loadTasks("films");
    catPage = "films";
    $("h3 #category-title").remove();
    $('h3').append(renderHeading(catPage));
  });
  $("#restaurants").click(function() {
    loadTasks("restaurants");
    catPage = "restaurants";
    $("h3 #category-title").remove();
    $('h3').append(renderHeading(catPage));
  });
  $("#products").click(function() {
    loadTasks("products");
    catPage = "products";
    $("h3 #category-title").remove();
    $('h3').append(renderHeading(catPage));
  });

  loadTasks(null);
  $('h3').append(renderHeading(null));


});
