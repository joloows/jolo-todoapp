// This part should handle how the todo objects display on paginate button click




var currentPage = 1 // increments/decrements on pagination button clicks.

// Buttons for pagination
var firstPageBtn = $(".first-page-btn");
var previousPageBtn = $(".previous-page-btn");
var nextPageBtn = $(".next-page-btn");
var lastPageBtn = $(".last-page-btn");

$(document).on("click", ".first-page-btn, .previous-page-btn, .next-page-btn, .last-page-btn", function () {
    if ($(this).hasClass("first-page-btn")) {
        currentPage = 1;
    } else if ($(this).hasClass("previous-page-btn")) {
        currentPage--;
    } else if ($(this).hasClass("next-page-btn")) {
        currentPage++;
    } else if($(this).hasClass("last-page-btn")) {
        console.log("last page")
        // currentPage = obj.pages;
    }
    getPage(currentPage);
    document.getElementById("current-page").innerHTML = currentPage;

    if (currentPage == 1) {
        firstPageBtn.removeClass("show");
        previousPageBtn.removeClass("show");        
    // } else if (currentPage == obj.pages) {
    //     nextPageBtn.removeClass(".show");
    //     lastPageBtn.removeClass(".show");        
    } else {
        firstPageBtn.addClass("show");
        previousPageBtn.addClass("show");
        nextPageBtn.addClass("show");
        lastPageBtn.addClass("show");
    }
})

function getPage(p) {
    var page = p;
    $.ajax(
        {
            url: "",
            type: "GET",
            data: {
                page: page,
            },
            success: function (response) {
                $(".todo-list-container").empty();
                JSON.parse(response).forEach(data => {
                    var id = data.pk;
                    var title = data.fields["todo_title"];
                    var desc = data.fields["todo_desc"];
                    $(".todo-list-container").append(createTodoHTML(id, title, desc));
                });
            }
        }
    )    
}

