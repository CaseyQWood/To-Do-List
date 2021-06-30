$(document).ready(function() {

  let taskId;

  $("#edit-modal").on("show.bs.modal", function (event) {
    const button = $(event.relatedTarget); // Button that triggered the modal
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
      console.log("submit edit");
    }).then(() => {
      $('#edit-modal').modal('hide');
      console.log("task edit completed");
    });
  });

  $("#delete-task-button").click(function(event) {
    event.preventDefault();

    $.post(`/delete/${taskId}`, function(data, status) {
      console.log("submit delete")
    }).then(() => {
      $('#edit-modal').modal('hide');
      console.log("task deleted");
    });
  });

});
