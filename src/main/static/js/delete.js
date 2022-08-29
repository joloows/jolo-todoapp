
function deleteTodo(element) {
    if (confirm('Are you sure you want to delete this?')) {
        $.ajax({
            url: $(element).attr('data-url'),
            type: "post",
            data: {
                'csrfmiddlewaretoken': csrftoken,
            },
            success: function () {
                console.log($(element).closest('.div'));
            },
            error: function (url) {
                alert('error');
            }
        });
    }
}