
function deleteTodo(element) {
    if (confirm('Are you sure you want to delete this?')) {
        $.ajax({
            url: $(element).attr('data-url'),
            type: "POST",
            data: {
                'csrfmiddlewaretoken': csrftoken,
            },
            success: function () {
                // test
                // test(this['type'], this['url'], this['data']);
                todoList = $(".todo-list-container");
                todoListChild = $(".todo-list-container [class^=todo-object-container-]").length;
                $(".todo-object-container-" + element.id).remove();
                if (todoListChild <= 1) { // If todo list is empty
                    if (numPages == 1) { 
                        console.log("append p tag");
                        todoList.append(`<p id="nothing">Nothing to do.</p>`);
                    } else { // If numPages > 1, move previous page
                        console.log("move previous page");
                        currentPage--;
                        document.getElementById("current-page").innerHTML = currentPage;
                        getPage(currentPage);
                    }
                } else {
                    getPage(currentPage);
                }
                updateNumPages();
                console.log('Delete success');
            },
            error: function () {
                alert('error');
            }
        });
    }
}