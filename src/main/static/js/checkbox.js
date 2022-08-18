$(".chkbox").click(function() {
    var id = $(this).attr('id');
    var value = $(this).attr('value');
    if (value == "true") {
        value = "false";
    } else {
        value = "true";
    }
    $.ajax({
        url: '',
        type: 'post',
        data: {
            'csrfmiddlewaretoken': csrftoken,
            _id: id,
            value: value
        },
        success: function (data) {
            console.log("success");
        }
    })
})