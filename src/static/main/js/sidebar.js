const menu_toggle = document.querySelector(".menu-toggle");
const sidebar = document.querySelector(".sidebar");

menu_toggle.addEventListener("click", () => {
    menu_toggle.classList.toggle("is-active");
    sidebar.classList.toggle("is-active");
});

$(".overlay").click(() => {
    $("#uploader").trigger("click");
});

a = $("#new_link").click((e) => {
    e.preventDefault();
});

alertElement = document.getElementsByClassName("alert")[0];

$("#uploader").change((e) => {
    let image_file = e.target.files[0];
    let image_file_name = image_file.name;

    console.log("Uploaded file changed.");
    imageProfileResizer(image_file)
        .then((resized_image) => {
            console.log("image compression and resizing complete.");
            let form_data = new FormData();

            console.log(resized_image);
            form_data.append("avatar", resized_image, `${image_file_name}`);
            form_data.append("csrfmiddlewaretoken", csrftoken);

            console.log("Now running ajax method.");
            $.ajax({
                url: "/profile/",
                method: "POST",
                data: form_data,
                processData: false,
                contentType: false,
                success: (response) => {
                    console.log("ajax method success.");
                    console.log(response.message);
                    let img_element = document.getElementById("avatar");
                    img_element.src = URL.createObjectURL(resized_image);

                    alertUser(response.message);
                },
                error: (error) => {
                    console.error(error);
                },
            });
        })
        .catch((error) => {
            console.error(error);
        });
});

function alertUser(message) {
    $(".app").prepend(`
    <div class="alert">
      <p id="alert-message">${message}</p>
    </div>
    `);

    window.setTimeout(() => {
        $(".alert").remove();
    }, 7500);
}

function imageProfileResizer(image_file) {
    console.log("Running imageProfileResizer...");
    const PROFILE_SIZE = 90;

    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.readAsDataURL(image_file);

        reader.onload = (readerEvent) => {
            let resized_image;
            let image = new Image();
            image.src = readerEvent.target.result;
            image.onload = (imageEvent) => {
                let canvas = document.createElement("canvas");
                canvas.width = canvas.height = PROFILE_SIZE;
                canvas
                    .getContext("2d")
                    .drawImage(image, 0, 0, canvas.width, canvas.height);
                let dataUrl = canvas.toDataURL("image/png", 90);
                resized_image = dataURLToBlob(dataUrl);

                resolve(resized_image);
            };
        };

        reader.onerror = (error) => {
            reject(error);
        };
    });
}

/* Utility function to convert a canvas to a BLOB */
var dataURLToBlob = function (dataURL) {
    var BASE64_MARKER = ";base64,";
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
        var parts = dataURL.split(",");
        var contentType = parts[0].split(":")[1];
        var raw = parts[1];

        return new Blob([raw], { type: contentType });
    }

    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(":")[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
};
/* End Utility function to convert a canvas to a BLOB      */
