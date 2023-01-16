$(document).on("click", ".chkbox", function () {
    var id = $(this).attr("id");
    if ($(this).is(":checked") == true) {
        $(this).val("1");
    } else {
        $(this).val("0");
    }

    task = $(`.task-object-container-${id}`);
    taskTitle = task.find("#task-object-title");
    console.log(taskTitle);
    task.toggleClass("finished");
    taskTitle.toggleClass("finished");

    var value = $(this).attr("value");
    $.ajax({
        url: `${id}/is-finished/`,
        type: "POST",
        data: {
            csrfmiddlewaretoken: csrftoken,
            value: value,
        },
        success: function (response) {
            is_finished = response["is_finished"];
            if (is_finished) {
            }
        },
        error: function () {
            alert("error");
        },
    });
});
