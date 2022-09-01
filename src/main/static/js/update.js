
function updateTodo(elem) {
    const trigger = elem.className
    var matches = trigger.match(/\d+$/);
    const modal = document.querySelector(".update-form-popup-" + matches);
    const closeButton = document.querySelector(".btn.cancel-" + matches);
    
    function toggleModal() {
        modal.classList.toggle("show-form-popup");
    }

    function windowOnClick(event) {
        if (modal.classList.contains("show-form-popup")) {
            if (event.target === modal) {
                toggleModal();
            }
        }
    }
    
    toggleModal();
    closeButton.addEventListener("click", toggleModal);
    window.addEventListener("click", windowOnClick);
}

$("[id^=todo-update-form]").on("submit", function(e) {
    e.preventDefault();
    
    var formData = $(this).serializeArray()
    formData.push({ name: "csrfmiddlewaretoken", value: csrftoken });
    console.log(formData);
    console.log($(this).attr('data-url'));
  $.ajax(
    {
      url: $(this).attr('data-url'),
      type: "post",
      data: formData,
      success:function() {
        alert("todo has been updated.")
        location.href = "http://127.0.0.1:8000/main"
      },
      error:function() {
        alert('error');
      }
    }
  );
});