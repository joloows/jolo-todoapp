$(".chkbox").click(function() {
    var id = $(this).attr('id');
    if ($(this).is(':checked') == true) {
        $(this).val("1");
    } else {
        $(this).val("0");
    }
    var value = $(this).attr('value');
    $.ajax({
        url: '',
        type: 'post',
        data: {
            'csrfmiddlewaretoken': csrftoken,
            _id: id,
            value: value
        }
    })
})