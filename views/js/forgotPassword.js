let otp = null;
let comboNumber = null;

function generateOTP() {
    otp = Math.floor(1000 + Math.random() * 9000);
    console.log(otp);
}

document.getElementById('phoneNumber').addEventListener('submit', function (e) {
    e.preventDefault();
    generateOTP()

    var formData = {
        contact: document.getElementById("number").value,
    };

    // Store the form data in sessionStorage
    // localStorage.setItem('formData', JSON.stringify(formData));
    localStorage.setItem('otp', JSON.stringify(otp));



    const countryCode = "+975"
    const phoneNumber = countryCode + formData.contact;
    const message = `Your OTP is ${otp}, Please do not share this OTP with anyone, This OTP is valid for 5 minutes.`;
    userCheck(formData.contact, phoneNumber, message)


});

const userCheck = async (contact, phoneNumber, message) => {
    try {
        var contact = contact
        const res = await axios({
            method: 'GET',
            url: `http://localhost:4000/api/users/${contact}`, // Use backticks for template literals
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                contact
            },
        });
        if (res.data.status === 'Success') {
            console.log(res.data.data[0])
            localStorage.setItem('userFound', JSON.stringify(res.data.data[0]));

            fetch('/send-sms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ to: phoneNumber, message }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.status === 'success') {
                        // alert('SMS sent successfully');
                        successful()
                        // Handle success
                        window.setTimeout(() => {
                            location.assign('/getFotp')
                        }, 1500)
                    } else {
                        // alert('Failed to send SMS');
                        unSuccessful()
                        // Handle error
                    }
                })
                .catch((error) => {
                    // console.error(error);
                    unSuccessful()
                });
        }
    } catch (err) {
        let message =
            typeof err.response !== 'undefined'
                ? err.response.data.message
                : err.message;
        // alert('Error: Something is wrong or not the same!', message);
        unSuccessful()
        console.log(err.message);
    }
};


function successful() {
    var modal = document.getElementById("confirmationModal");
    modal.style.display = "none";
    var popup = document.getElementById("confirmationPopup");
    popup.style.display = "block";
    document.getElementById("popupMessage").innerHTML = "OTP sent Successful!";
    setTimeout(function () {
        popup.style.display = "none";
    }, 2000); // Hide popup after 3 seconds (3000 milliseconds)
}

function unSuccessful() {
    var modal = document.getElementById("confirmationModal");
    modal.style.display = "none";
    var popup = document.getElementById("confirmationPopup");
    popup.style.display = "block";
    document.getElementById("popupMessage").innerHTML = "OTP sent Failed!";
    setTimeout(function () {
        popup.style.display = "none";
    }, 2000); // Hide popup after 3 seconds (3000 milliseconds)
}
