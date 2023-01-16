function deleteTodo(element) {
    if (confirm("Are you sure you want to delete this?")) {
        $.ajax({
            url: $(element).attr("data-url"),
            type: "POST",
            data: {
                csrfmiddlewaretoken: csrftoken,
            },
            success: function () {
                todoList = $(".todo-list-container");
                todoListChild = $(
                    ".todo-list-container [class^=todo-object-container-]"
                ).length;
                $(".todo-object-container-" + element.id).remove();
                if (todoListChild <= 1) {
                    // If todo list is empty
                    if (numPages == 1) {
                        console.log("append p tag");
                        todoList.append(`<p id="nothing">Nothing to do.</p>`);
                    } else {
                        // If numPages > 1, move previous page
                        console.log("move previous page");
                        currentPage--;
                        document.getElementById("current-page").innerHTML =
                            currentPage;
                        getPage(currentPage, "todo");
                    }
                } else {
                    getPage(currentPage, "todo");
                }
                updateNumPages();
                console.log("Delete success");
            },
            error: function () {
                alert("error");
            },
        });
    }
}

function deleteTask(element) {
    if (confirm("Are you sure you want to delete this?")) {
        $.ajax({
            url: $(element).attr("data-url"),
            type: "POST",
            data: {
                csrfmiddlewaretoken: csrftoken,
            },
            success: function () {
                $(".task-object-container-" + element.id).remove();
                taskList = $(".task-list-container");
                taskListChild = $(
                    ".task-list-container [class^=task-object-container-]"
                ).length;
                console.log(taskListChild);
                if (taskListChild < 1) {
                    // If task list is empty
                    if (numPages == 1) {
                        console.log("append p tag");
                        taskList.append(`<p id="nothing">Nothing to do.</p>`);
                    } else {
                        // If numPages > 1, move previous page
                        console.log("move previous page");
                        currentPage--;
                        document.getElementById("current-page").innerHTML =
                            currentPage;
                        getPage(currentPage, "task");
                    }
                } else if (taskListChild == 7) {
                    getPage(currentPage, "task");
                }
                updateNumPages();
                console.log("Delete success");
            },
            error: function () {
                alert("error");
            },
        });
    }
}
