const modal = document.querySelector(".form-popup");
const trigger = document.querySelector(".todo-create");
const closeButton = document.querySelector(".btn.cancel");

function toggleModal() {
    modal.classList.toggle("show-form-popup");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

$("#myForm").on("submit", function(e) {
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