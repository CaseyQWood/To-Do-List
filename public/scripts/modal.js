$(document).ready(function() {

  $("#edit-modal").on("show.bs.modal", function (event) {
    const button = $(event.relatedTarget); // Button that triggered the modal
    const description = button.data("description");
    const taskId = button.data("taskId");
    const category = button.data("category");
    const modal = $(this);
    console.log("button**: ", button);

    modal.find(".modal-body input").val(description);
    modal.find(".modal-body #category-dropdown").val(category);
  })

});
