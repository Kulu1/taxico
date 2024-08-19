let otp = null;
let comboNumber = null;

function generateOTP() {
  otp = Math.floor(1000 + Math.random() * 9000);
  console.log(otp);
}


document.getElementById("pReg").addEventListener("submit", function (e) {
  e.preventDefault()
  generateOTP()

  var userData = {
    name: document.getElementById("fullName").value,
    contact: document.getElementById("phoneNumber").value,
    photo: null,
    password: document.getElementById("password").value,
    passwordConfirm: document.getElementById("confirmPassword").value

  }

  // Store the form data in sessionStorage
  localStorage.setItem('userData', JSON.stringify(userData));
  localStorage.setItem('otp', JSON.stringify(otp));

  // console.log(userData)
  if ((userData.name).trim() === "") {
    alert("Please enter your Full Name");
    return
  }

  var phoneNumberPattern = /^\d{8}$/;

  if (!phoneNumberPattern.test((userData.contact))) {
    alert("Please enter a valid Phone Number (8 digits)");
    return
  }

  if ((userData.password).trim().length < 8) {
    alert("Password must be at least 8 characters long");
    return
  }

  if ((userData.password) !== (userData.passwordConfirm)) {
    alert("PASSWORD do not match!")
    return
  }

  // const countryCode = "+975"
  // const phoneNumber = countryCode + userData.contact;
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
          location.assign('/getOtpHomeP')
        }, 1500)
      } else {
        unSuccessful()
        // Handle error
      }
    })
    .catch((error) => {
      console.error(error);
    });


})


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
