var username = document.getElementById('username');
var password1 = document.getElementById('password1');
var password2 = document.getElementById('password2');

function removeUsernameError (e) {
    e.currentTarget.classList.remove("error");
    document.querySelectorAll(".username.field-error").forEach(element => {
        element.remove();    
    });
    username.removeEventListener('click', removeUsernameError)
}

function removePassword1Error (e) {
    e.currentTarget.classList.remove("error");
    document.querySelectorAll(".password1.field-error").forEach(element => {
        element.remove();
    });
    password1.removeEventListener('click', removePassword1Error)
}

function removePassword2Error (e) {
    e.currentTarget.classList.remove("error");
    document.querySelectorAll(".password2.field-error").forEach(element => {
        element.remove();
    });
    password2.removeEventListener('click', removePassword2Error)
}

username.addEventListener('click', removeUsernameError);
password1.addEventListener('click', removePassword1Error);
password2.addEventListener('click', removePassword2Error);