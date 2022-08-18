$(".chkbox").click(function() {
    var id = $(this).attr('id');
    if ($(this).attr('checked') == true) {
        $(this).prop('value', 'false');
    } else {
        $(this).prop('value', 'true');
    }
    var value = $(this).attr('value');
    console.log(value);
    $.ajax({
        url: '',
        type: 'post',
        data: {
            'csrfmiddlewaretoken': csrftoken,
            _id: id,
            value: value
        },
        cache: false,
        success: function (data) {
            console.log(data);
        }
    })
})