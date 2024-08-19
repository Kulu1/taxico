function verifyOTP(otp, combinedNumber) {
    if (otp == combinedNumber) {
        return true;
    } else {
        return false;
    }
}

document.getElementById("otpConfirmButton").addEventListener("click", function (e) {
    e.preventDefault();

    // Select the div containing the input fields
    const form = document.getElementById("otp");
    const inputField = form.querySelector(".input-field"); // Use .input-field to target the div

    // Get all input elements within the div
    const inputElements = inputField.querySelectorAll("input[type='string']"); // Use 'string' type for your inputs

    // Initialize comboNumber variable
    let comboNumber = "";

    // Iterate through the input elements and concatenate their values
    inputElements.forEach(function (input) {
        comboNumber += input.value;
    });

    // Convert the combined string to a number
    comboNumber = parseInt(comboNumber);

    console.log(comboNumber);

    // You'll need to define 'otp' variable here or pass it as an argument to the function.
    // let otp = "your_otp_value"; // Replace with your actual OTP value
    const otp = JSON.parse(localStorage.getItem('otp'));


    let verification = verifyOTP(otp, comboNumber);
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (verification) {
        fetch("/api/users/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=UTF-8" },
            body: JSON.stringify(userData)
        })
            .then((response) => {
                if (response.status == 201) {
                    successful()
                    window.setTimeout(() => {
                        location.assign('/loginUser')
                    }, 1500)
                    localStorage.removeItem('userData');
                    localStorage.removeItem('otp');
                }
                if (response.status == 500) {
                    alert("An error occurred while signing up. Please try again later.");
                    console.log(response)
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    } else {
        unSuccessful()
    }
});


function successful() {
    var modal = document.getElementById("confirmationModal");
    modal.style.display = "none";
    var popup = document.getElementById("confirmationPopup");
    popup.style.display = "block";
    document.getElementById("popupMessage").innerHTML = "Registeration Successful!";
    setTimeout(function () {
        popup.style.display = "none";
    }, 3000); // Hide popup after 3 seconds (3000 milliseconds)
}

function unSuccessful() {
    var modal = document.getElementById("confirmationModal");
    modal.style.display = "none";
    var popup = document.getElementById("confirmationPopup");
    popup.style.display = "block";
    document.getElementById("popupMessage").innerHTML = "Incorrect OTP entered!";
    setTimeout(function () {
        popup.style.display = "none";
    }, 2000); // Hide popup after 3 seconds (3000 milliseconds)
}
