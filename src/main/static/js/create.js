
function createTodo() {
  const modal = document.querySelector(".create-form-popup");
  const closeButton = document.querySelector(".btn.cancel-create");

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

$("#todo-create-form").on("submit", function(e) {
  e.preventDefault();
  var formData = $(this).serializeArray()
  formData.push({ name: "csrfmiddlewaretoken", value: csrftoken });
  $.ajax(
    {
      url: "create/",
      type: "post",
      data: formData,
      success:function(data) {
        alert('Todo has been created.');
        var vals = []
        for (i = 0; i < 2; i++) {
          vals[0] = Object.values(formData[0]);
        }
        console.log(vals);
        location.href = "http://127.0.0.1:8000/main"
      },
      error:function() {
        alert('error');
      }
    }
  );
});