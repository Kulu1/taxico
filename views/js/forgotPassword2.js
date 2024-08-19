document.getElementById('fChange').addEventListener('submit', function (e) {
    e.preventDefault();
    var password = document.getElementById("password").value
    var passwordConfirm = document.getElementById("Confirmpassword").value

    const userFound = JSON.parse(localStorage.getItem('userFound'));
    console.log(userFound._id)
    const userdID = userFound._id
    PasswordChange(password, passwordConfirm, userdID)

});

export const PasswordChange = async (password, passwordConfirm, userdID) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `http://localhost:4000/api/users/${userdID}`,
            data: {
                password,
                passwordConfirm
            },
        })
        console.log(res)
        console.log(res.data.status)

        if (res.data.status === 'success') {
            // alert('success!!! Password changed successfully')
            successful()
            window.setTimeout(() => {
                location.assign('/')
            }, 1500)
            // localStorage.removeItem('otp');
            localStorage.removeItem('userFound');

            // displayPopupMessage("Booking confirmed!");
        }
    } catch (err) {
        let message =
            typeof err.response !== 'undefined'
                ? err.response.data.message
                : err.message
        // alert('Error: Something is wrong are not the same!', message)
        unSuccessful()
        // displayPopupMessage("Booking error!");
        console.log(err.message)
        console.log(err)

    }
};

function successful() {
    var modal = document.getElementById("confirmationModal");
    modal.style.display = "none";
    var popup = document.getElementById("confirmationPopup");
    popup.style.display = "block";
    document.getElementById("popupMessage").innerHTML = "success!!! Password changed successfully";
    setTimeout(function () {
        popup.style.display = "none";
    }, 2000); // Hide popup after 3 seconds (3000 milliseconds)
}

function unSuccessful() {
    var modal = document.getElementById("confirmationModal");
    modal.style.display = "none";
    var popup = document.getElementById("confirmationPopup");
    popup.style.display = "block";
    document.getElementById("popupMessage").innerHTML = "Unsuccessful! Couldn't change the password";
    setTimeout(function () {
        popup.style.display = "none";
    }, 2000); // Hide popup after 3 seconds (3000 milliseconds)
}


