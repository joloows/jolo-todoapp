let currentPage = 1; // increments/decrements on pagination button clicks.

// Buttons for pagination
let firstPageBtn = $(".first-page-btn");
let previousPageBtn = $(".previous-page-btn");
let nextPageBtn = $(".next-page-btn");
let lastPageBtn = $(".last-page-btn");

initPaginationBtn();

$(document).on(
    "click",
    ".first-page-btn, .previous-page-btn, .next-page-btn, .last-page-btn",
    function () {
        if ($(this).hasClass("first-page-btn")) {
            currentPage = 1;
        } else if ($(this).hasClass("previous-page-btn")) {
            currentPage--;
        } else if ($(this).hasClass("next-page-btn")) {
            currentPage++;
        } else if ($(this).hasClass("last-page-btn")) {
            currentPage = numPages;
        }
        elem = document.getElementById("pagination");
        if (elem.classList.contains("todo")) {
            getPage(currentPage, "todo");
        } else if (elem.classList.contains("task")) {
            getPage(currentPage, "task");
        }
        document.getElementById("current-page").innerHTML = currentPage;
        initPaginationBtn();
    }
);

function initPaginationBtn() {
    if (currentPage == 1) {
        if (numPages > 1) {
            firstPageBtn.removeClass("show");
            previousPageBtn.removeClass("show");
            nextPageBtn.addClass("show");
            lastPageBtn.addClass("show");
        }
        if (numPages == 1) {
            firstPageBtn.removeClass("show");
            previousPageBtn.removeClass("show");
            nextPageBtn.removeClass("show");
            lastPageBtn.removeClass("show");
        }
    } else if (currentPage == numPages) {
        firstPageBtn.addClass("show");
        previousPageBtn.addClass("show");
        nextPageBtn.removeClass("show");
        lastPageBtn.removeClass("show");
    } else {
        firstPageBtn.addClass("show");
        previousPageBtn.addClass("show");
        nextPageBtn.addClass("show");
        lastPageBtn.addClass("show");
    }
}

function getPage(p, obj) {
    $.ajax({
        url: "",
        type: "GET",
        data: {
            page: p,
        },
        success: function (response) {
            r = JSON.parse(response);
            if (obj == "todo") {
                $(".todo-list-container").empty();
                r.forEach((data) => {
                    let id = data.pk;
                    let title = data.fields["todo_title"];
                    let desc = data.fields["todo_desc"];
                    $(".todo-list-container").append(
                        generateTodoHTML(id, title, desc)
                    );
                });
            } else if (obj == "task") {
                $(".task-list-container").empty();
                r.forEach((data) => {
                    let todo_id = data.fields["todo"];
                    let task_id = data.pk;
                    let title = data.fields["task_title"];
                    let desc = data.fields["task_desc"];
                    let is_finished = data.fields["task_is_finished"];
                    $(".task-list-container").append(
                        generateTaskHTML(
                            todo_id,
                            task_id,
                            title,
                            desc,
                            is_finished
                        )
                    );
                });
            }
        },
    });
}

function updateNumPages() {
    $.ajax({
        url: "",
        type: "GET",
        data: {
            getPageNum: 1,
        },
        success: function (response) {
            numPages = response;
            initPaginationBtn();
        },
    });
}
