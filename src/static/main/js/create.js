
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
      
  // Fix bug close button not working for the second time
  toggleModal();
  closeButton.addEventListener("click", toggleModal);
  window.addEventListener("click", windowOnClick);
}

$(document).on("submit", "#todo-create-form", function(e) {
  if ($(".todo-list-container").children("p")) {
    $(".todo-list-container").children("p").remove();
  }
  e.preventDefault();
  var formData = $(this).serializeArray();
  $.ajax(
    {
      url: "create/",
      type: "POST",
      data: formData,
      success: function (response) {
        // test
        // test(this['type'], this['url'], this['data']);
        
        var data = JSON.parse(response);
        id = data[0].pk;
        title = data[0].fields["todo_title"];
        desc = data[0].fields["todo_desc"];

        $(".todo-list-container").prepend(createTodoHTML(id, title, desc));
      },
      error:function() {
        alert('error');
      }
    }
  );
});

function createTodoHTML(id, title, desc) {
  return `<div class="todo-object-container-${id}">
            <input class="chkbox" id="${id}" type="checkbox" name="todo_is_finished" value="0">
              <a id="todo-object-title" href="/main/${id}/">${title}</a>
              <a onclick="showDropdown(this.id);" class="dropbtn" id="${id}">···</a>
            <div class="dropdown">
              <div id="dropdown-${id}" class="dropdown-content">
              <a class="todo-update-${id}" onclick="updateTodo(this)">Edit</a>
              <a data-url="/main/${id}/delete/" id="${id}" onclick="deleteTodo(this)">Delete</a>
              <a href="#">Set a Reminder</a>
            </div>
          </div>
            <div class="update-form-popup-${id}">
              <form data-url="/main/${id}/update/" method="post" class="form-container" id="todo-update-form-${id}">
                <input type="hidden" name="csrfmiddlewaretoken" value=${csrftoken}>
                <h1>Edit Todo</h1>
                <label for="todo_title">
                  <b>Task Title</b>
                </label>
                <input type="text" value="${title}" name="todo_title" required>
                <label for="todo_desc">
                  <b>Task Description</b>
                </label>
                <input type="text" value="${desc}" name="todo_desc">
                <input type="submit" class="btn" value="Update">
                <button type="button" class="btn cancel-${id}">Close</button>
              </form>
            </div>
          </div>`
}