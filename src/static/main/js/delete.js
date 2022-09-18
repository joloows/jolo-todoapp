
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

                if (todoList.children().length <= 0) {
                    todoList.empty();
                    todoList.prepend(`<p id="nothing">Nothing to do.</p>`);
                    // remove pagination buttons here
                } else {
                    todoList.empty();
                    getPage(currentPage); // get current page content
                }
            },
            error: function () {
                alert('error');
            }
        });
    }
}