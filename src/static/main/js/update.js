function updateObj(elem) {
    const trigger = elem.className;
    let matches = trigger.match(/\d+$/);
    const modal = document.querySelector(".update-form-popup-" + matches);
    const closeButton = document.querySelector(".btn.cancel-" + matches);

    function toggleModal() {
        modal.classList.toggle("show-form-popup");
    }

    function windowOnClick(event) {
        if (modal.classList.contains("show-form-popup")) {
            if (event.target === modal) {
                toggleModal();
            }
        }
    }

    toggleModal();
    closeButton.addEventListener("click", toggleModal);
    window.addEventListener("click", windowOnClick);
}

$(document).on("submit", "[id^=todo-update-form]", function (e) {
    e.preventDefault();
    let formData = $(this).serializeArray();
    $.ajax({
        url: $(this).attr("data-url"),
        type: "POST",
        data: formData,
        success: function (response) {
            let data = JSON.parse(response);
            let todo_id = data[0].pk;
            let title = data[0].fields["todo_title"];
            let desc = data[0].fields["todo_desc"];

            $(".todo-object-container-" + todo_id).replaceWith(
                generateTodoHTML(todo_id, title, desc)
            );
            alert("Successfully updated todo.");
        },

        error: function () {
            alert("error");
        },
    });
});

$(document).on("submit", "[id^=task-update-form]", function (e) {
    e.preventDefault();
    let formData = $(this).serializeArray();
    $.ajax({
        url: $(this).attr("data-url"),
        type: "POST",
        data: formData,
        success: function (response) {
            let data = JSON.parse(response);
            let todo_id = data[0].fields["todo"];
            let task_id = data[0].pk;
            let title = data[0].fields["task_title"];
            let desc = data[0].fields["task_desc"];

            $(".task-object-container-" + task_id).replaceWith(
                generateTaskHTML(todo_id, task_id, title, desc)
            );
            alert("Successfully updated task.");
        },
        error: function () {
            alert("error");
        },
    });
});
