function showRideConfirmation() {
  var modal = document.getElementById("confirmationModal1");
  modal.style.display = "block";
}

function successful() {
  var modal = document.getElementById("confirmationModal");
  modal.style.display = "none";
  var popup = document.getElementById("confirmationPopup");
  popup.style.display = "block";
  document.getElementById("popupMessage").innerHTML = "Login Successful!";
  setTimeout(function () {
    popup.style.display = "none";
  }, 2000); // Hide popup after 3 seconds (3000 milliseconds)
}

function unSuccessful() {
  var modal = document.getElementById("confirmationModal");
  modal.style.display = "none";
  var popup = document.getElementById("confirmationPopup");
  popup.style.display = "block";
  document.getElementById("popupMessage").innerHTML = "Login Unsuccessful! Couldn't login in";
  setTimeout(function () {
    popup.style.display = "none";
  }, 2000); // Hide popup after 3 seconds (3000 milliseconds)
}



