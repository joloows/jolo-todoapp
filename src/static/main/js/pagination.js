
// This part should handle how the todo objects display on paginate button click
// and how pagination buttons display based on pages and todo objects



var currentPage = 1; // increments/decrements on pagination button clicks.

// Buttons for pagination
var firstPageBtn = $(".first-page-btn");
var previousPageBtn = $(".previous-page-btn");
var nextPageBtn = $(".next-page-btn");
var lastPageBtn = $(".last-page-btn");

initPaginationBtn();

$(document).on("click", ".first-page-btn, .previous-page-btn, .next-page-btn, .last-page-btn", function () {
    if ($(this).hasClass("first-page-btn")) {
        currentPage = 1;
    } else if ($(this).hasClass("previous-page-btn")) {
        currentPage--;
    } else if ($(this).hasClass("next-page-btn")) {
        currentPage++;
    } else if($(this).hasClass("last-page-btn")) {
        currentPage = numPages;
    }
    getPage(currentPage);
    document.getElementById("current-page").innerHTML = currentPage;
    initPaginationBtn();
})

function initPaginationBtn() {
    console.log("initPaginationBtn()");
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

function getPage(p) {
    $.ajax(
        {
            url: "",
            type: "GET",
            async: false,
            data: {
                page: p,
            },
            success: function (response) {
                console.log("getPage()");
                $(".todo-list-container").empty();
                r = JSON.parse(response);
                r.forEach(data => {
                    var id = data.pk;
                    var title = data.fields["todo_title"];
                    var desc = data.fields["todo_desc"];
                    $(".todo-list-container").append(createTodoHTML(id, title, desc));
                });
            }
        }
    );
}

function updateNumPages() {
    $.ajax(
        {
            url: '',
            type: 'GET',
            data: {
                getPageNum: 1
            },
            success: function (response) {
                console.log("updateNumPages()");
                numPages = response;
                console.log("numPages = " + response);
                initPaginationBtn();
            }
        }
    );
}
