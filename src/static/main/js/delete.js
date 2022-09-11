
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
                test(this['type'], this['url'], this['data']);
                
                id = element.id;
                $(".todo-object-container-" + id).remove();
                if ($(".todo-list-container").children().length <= 0) {
                    $(".todo-list-container").prepend(`<p id="nothing">Nothing to do.</p>`);
                }
            },
            error: function () {
                alert('error');
            }
        });
    }
}