function createObj() {
    const modal = document.querySelector(".create-form-popup");
    const closeButton = document.querySelector(".btn.cancel-create");

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

    // Fix bug close button not working for the second time
    toggleModal();
    closeButton.addEventListener("click", toggleModal);
    window.addEventListener("click", windowOnClick);
}

$(document).on("submit", "#todo-create-form", function (e) {
    if ($(".todo-list-container").children("p")) {
        $(".todo-list-container").children("p").remove();
    }

    e.preventDefault();
    let formData = $(this).serializeArray();
    $.ajax({
        url: "create/",
        type: "POST",
        data: formData,
        success: function (response) {
            data = JSON.parse(response);
            console.log(data);
            title = data[0].fields["todo_title"];
            getPage(currentPage, "todo");
            updateNumPages();
            alert(`Todo "${title}" has been created.`);
        },
        error: function () {
            alert("error");
        },
    });
});

$(document).on("submit", "#task-create-form", function (e) {
    if ($(".task-list-container").children("p")) {
        $(".task-list-container").children("p").remove();
    }

    e.preventDefault();
    let formData = $(this).serializeArray();
    $.ajax({
        url: "create/",
        type: "POST",
        data: formData,
        success: function (response) {
            let data = JSON.parse(response);
            let todo_id = data[0].fields["todo"];
            let task_id = data[0].pk;
            let title = data[0].fields["task_title"];
            let desc = data[0].fields["task_desc"];

            if ($(".task-list-container").children().length < 8) {
                $(".task-list-container").append(
                    generateTaskHTML(todo_id, task_id, title, desc)
                );
            }
            updateNumPages();
            alert(`Task "${data[0].fields["task_title"]}" has been created.`);
        },
        error: function () {
            alert("error");
        },
    });
});

function generateTodoHTML(todo_id, title, desc) {
    return `<div class="todo-object-container-${todo_id}">
				<a id="todo-object-title" href="/main/${todo_id}/">${title}</a>
				<a onclick="showDropdown(this.id);" class="dropbtn" id="${todo_id}">···</a>
				<div class="dropdown">
					<div id="dropdown-${todo_id}" class="dropdown-content">
						<a class="todo-update-${todo_id}" onclick="updateObj(this)">Edit</a>
						<a data-url="/main/${todo_id}/delete/" id="${todo_id}" onclick="deleteTodo(this)">Delete</a>
						<a href="#">Set a Reminder</a>
					</div>
				</div>
				<div class="update-form-popup-${todo_id}">
					<form data-url="/main/${todo_id}/update/" method="post" class="form-container" id="todo-update-form-${todo_id}">
						<input type="hidden" name="csrfmiddlewaretoken" value=${csrftoken}>
						<h1>Edit Todo</h1>
						<label for="todo_title">
							<b>Task Title</b>
						</label>
						<input type="text" value="${title}" name="todo_title" required>
						<label for="todo_desc">
							<b>Task Description</b>
						</label>
						<input type="text" value="${desc}" name="todo_desc">
						<input type="submit" class="btn" value="Update">
						<button type="button" class="btn cancel-${todo_id}">Close</button>
					</form>
				</div>
			</div>`;
}

function generateTaskHTML(todo_id, task_id, title, desc, is_finished) {
    var generatedHTML = ``;
    if (is_finished) {
        generatedHTML = generatedHTML.concat(
            `<div class="task-object-container-${task_id} finished">
                <input class="chkbox" id="${task_id}" type="checkbox" name="task_is_finished" value="1" checked>
                <a id="task-object-title" class="finished" href="">${title}</a>`
        );
    } else {
        generatedHTML = generatedHTML.concat(
            `<div class="task-object-container-${task_id}">
                <input class="chkbox" id="${task_id}" type="checkbox" name="task_is_finished" value="0">
                <a id="task-object-title" href="">${title}</a>`
        );
    }
    generatedHTML = generatedHTML.concat(
        `   <a onclick="showDropdown(this.id);" class="dropbtn" id="${task_id}">···</a>
            <div class="dropdown">
                <div id="dropdown-${task_id}" class="dropdown-content">
                <a class="task-update-${task_id}" onclick="updateObj(this)">Edit</a>
                <a data-url="/main/${todo_id}/${task_id}/delete/" id="${task_id}" onclick="deleteTask(this)">Delete</a>
                <a href="#">Set a Reminder</a>
                </div>
            </div>
            <div class="update-form-popup-${task_id}">
                <form data-url="/main/${todo_id}/${task_id}/update/" method="post" class="form-container" id="task-update-form-${task_id}">
                    <input type="hidden" name="csrfmiddlewaretoken" value=${csrftoken}>
                    <h1>Edit Task</h1>
                    <label for="task_title">
                        <b>Task Title</b>
                    </label>
                    <input type="text" value="${title}" name="task_title" required>
                    <label for="task_desc">
                        <b>Task Description</b>
                    </label>
                    <input type="text" value="${desc}" name="task_desc">
                    <input type="submit" class="btn" value="Update">
                    <button type="button" class="btn cancel-${task_id}">Close</button>
                </form>
            </div>
        </div>`
    );
    return generatedHTML;
}
