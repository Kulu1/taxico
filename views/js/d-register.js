let otp = null;
let comboNumber = null;

function generateOTP() {
  otp = Math.floor(1000 + Math.random() * 9000);
  console.log(otp);
}

document.getElementById('registrationForm').addEventListener('submit', function (e) {
  e.preventDefault();
  generateOTP()

  var formData = {
    name: document.getElementById("fullName").value,
    contact: document.getElementById("phoneNumber").value,
    carType: document.getElementById("vechicleType").value,
    license: document.getElementById("license").value,
    status: "Pending",
    password: document.getElementById("password").value,
    passwordConfirm: document.getElementById("confirmPassword").value
  };

  // Store the form data in sessionStorage
  localStorage.setItem('formData', JSON.stringify(formData));
  localStorage.setItem('otp', JSON.stringify(otp));


  if (formData.password != formData.passwordConfirm) {
    alert("PASSWORD doesn' match!")
    return
  }
  if (formData.name.trim() == "") {
    alert("Please enter your Full Name");
    return
  }

  var phoneNumberPattern = /^\d{8}$/;
  if (!phoneNumberPattern.test(formData.contact)) {
    alert("Please enter a valid Phone Number (8 digits)");
    return
  }
  // if (formData.license.trim() === "" || isNaN(formData.license)) {
  //   alert("Please enter a valid License Number");
  //   return
  // }
  if (formData.carType === "") {
    alert("Please select a Vehicle Type");
    return
  }
  if (formData.password.trim().length < 8) {
    alert("Password must be at least 8 characters long");
    return
  }
  if (formData.passwordConfirm.trim() === "" || formData.passwordConfirm !== formData.password) {
    alert("Passwords do not match");
    return
  }
  // const countryCode = "+97577832984"
  const phoneNumber ="+97577832984"
  const message = `Your OTP is ${otp}, Please do not share this OTP with anyone, This OTP is valid for 5 minutes.`;

  // Make an HTTP request to your server to send the SMS
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
        successful()
        // Handle success
        window.setTimeout(() => {
          location.assign('/getOtpHome')
        }, 1500)
      } else {
        successful();
        // Handle error
      }
    })
    .catch((error) => {
      console.error(error);
    });
});




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
