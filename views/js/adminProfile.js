document.addEventListener('DOMContentLoaded', function () {
    var obj;

    console.log(document.cookie);

    if (document.cookie) {
        obj = JSON.parse(document.cookie.substring(6));
    } else {
        obj = JSON.parse('{}');
    }

    // console.log(obj.name);

    var fullNameInput = document.getElementById('name');
    var phoneNumberInput = document.getElementById('contact');
    // Get the img element by its id
    var imgElement = document.getElementById('profileImage');

    // Set the src attribute
    imgElement.src = "../img/admins/" + obj.photo

    fullNameInput.value = obj.name;
    phoneNumberInput.value = obj.contact;
    var spanElement = document.querySelector('.font-weight-bold');

    if (spanElement) {
        spanElement.textContent = obj.name;
    }

    document.getElementById("profileImageUpload").addEventListener("change", function (event) {
        var reader = new FileReader();

        reader.onload = function () {
            document.getElementById("profileImage").src = reader.result;
            const dataURL = reader.result;
            localStorage.setItem('image', dataURL);
        };

        reader.readAsDataURL(event.target.files[0]);
    });

    document.getElementById("changeSetting").addEventListener("click", function (e) {
        e.preventDefault();

        var obj = JSON.parse(document.cookie.substring(6));
        const dataURL = localStorage.getItem('image');
        const imageFile = dataURL ? dataURLtoFile(dataURL, 'image.jpeg') : null;
        const image = imageFile;
        const name = document.getElementById('name').value;
        const contact = document.getElementById('contact').value;
        const photo = image;
        const userId = obj._id;

        updateSettings(name, contact, photo, userId);
    });

    document.getElementById("changePassword").addEventListener("click", function (e) {
        e.preventDefault();

        var obj = JSON.parse(document.cookie.substring(6));

        //password
        const passwordCurrent = document.getElementById('password-current').value
        const password = document.getElementById('password').value
        const passwordConfirm = document.getElementById('password-confirm').value
        const userId = obj._id;

        if (password !== passwordConfirm) {
            return (alert("Invalid password"))
        }
        //image and name

        updatePasswords({ userId, passwordCurrent, password, passwordConfirm });
        document.getElementById('password-current').value = ''
        document.getElementById('password').value = ''
        document.getElementById('password-confirm').value = ''
    });

});

function dataURLtoFile(dataURL, fileName) {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], fileName, { type: mime });
}

const updateSettings = async (name, contact, photo) => {
    try {
        alert("apple");
        console.log(typeof (photo));
        var obj = JSON.parse(document.cookie.substring(6));
        if (photo == null) {
            photo = obj.photo
        }
        console.log(name, contact, photo);
        var formData = new FormData();
        formData.append('name', name);
        formData.append('contact', contact);
        formData.append('photo', photo);


        var url
        var headers
        if (typeof (photo) == "object") {
            url = `http://localhost:4000/api/admins/updateMePic`
            headers = {
                'Content-Type': 'multipart/form-data',
            }
        } else {
            url = `http://localhost:4000/api/admins/updateMe`
            headers = {
                'Content-Type': 'application/json',
            }
            formData = { name, contact }
            console.log(typeof (formData))
            console.log(formData)

        }
        const res = await axios({
            method: 'PATCH',
            url: url,
            data: formData,
            headers: headers,
        });

        // Check if the response status is 2xx (success)
        if (res.status >= 200 && res.status < 300) {
            // alert('success', 'Data updated successfully!');
            successful()
            localStorage.removeItem('image');
        } else {
            // Log or handle the error based on the response
            // console.error('Update failed:', res.statusText);
            unSuccessful()

        }
    } catch (err) {
        // Handle network errors or unexpected issues
        // console.error('Update failed:', err.message);
        unSuccessful()

    }
};

// type is either 'password' or data
export const updatePasswords = async (data) => {
    try {
        console.log(data)
        const res = await axios({
            method: 'PATCH',
            url: `http://localhost:4000/api/admins/updatePassword`,
            headers: {
                'Content-Type': 'application/json', // Set content type to JSON
            },
            data: data,
        });
        console.log(res.data.status);
        if (res.data.status === 'success') {
            // alert('success', 'Data updated successfully!');
            successful()
        }
    } catch (err) {
        let message =
            typeof err.response !== 'undefined'
                ? err.response.data.message
                : err.message;
        // showAlert('error', 'Error: Please provide valid email address', message)
        console.log(err);
        console.log(message);
        // alert('error', err.response.data.message);
        unSuccessful()
    }
};


function successful() {
    var modal = document.getElementById("confirmationModal");
    modal.style.display = "none";
    var popup = document.getElementById("confirmationPopup");
    popup.style.display = "block";
    document.getElementById("popupMessage").innerHTML = "Data updated successfully!";
    setTimeout(function () {
        popup.style.display = "none";
    }, 3000); // Hide popup after 3 seconds (3000 milliseconds)
}

function unSuccessful() {
    var modal = document.getElementById("confirmationModal");
    modal.style.display = "none";
    var popup = document.getElementById("confirmationPopup");
    popup.style.display = "block";
    document.getElementById("popupMessage").innerHTML = "Data update Unsuccessful!";
    setTimeout(function () {
        popup.style.display = "none";
    }, 2000); // Hide popup after 3 seconds (3000 milliseconds)
}
