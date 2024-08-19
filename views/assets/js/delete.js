function showRideConfirmation() {
  // Get the license data from the corresponding row
  var licenseData = this.closest('tr').cells[2].innerHTML;

  // Store the license data in local storage
  localStorage.setItem("selectedLicense", licenseData);

  var modal = document.getElementById("confirmationModal1");
  modal.style.display = "block";
}

function cancelride() {
  var modal = document.getElementById("confirmationModal1");
  modal.style.display = "none";
  var popup = document.getElementById("confirmationPopup1");

  setTimeout(function () {
    popup.style.display = "none";
  }, 2000); // Hide popup after 3 seconds (3000 milliseconds)
}

function confirmride() {
  const license = JSON.parse(localStorage.getItem('selectedLicense'));
  driverDelete(license)
  var modal = document.getElementById("confirmationModal1");
  modal.style.display = "none";
  var popup = document.getElementById("confirmationPopup1");
  popup.style.display = "block";
  document.getElementById("popupMessage1").innerHTML = "Driver Deleted!";

  setTimeout(function () {
    popup.style.display = "none";
  }, 2000); // Hide popup after 3 seconds (3000 milliseconds)
}





function showConfirmation() {
  var modal = document.getElementById("confirmationModal");
  modal.style.display = "block";
}

function cancelBooking() {
  var modal = document.getElementById("confirmationModal");
  modal.style.display = "none";
  var popup = document.getElementById("confirmationPopup");
  setTimeout(function () {
    popup.style.display = "none";
  }, 2000); // Hide popup after 3 seconds (3000 milliseconds)
}

function confirmBooking() {

  var modal = document.getElementById("confirmationModal");
  modal.style.display = "none";
  var popup = document.getElementById("confirmationPopup");
  popup.style.display = "block";
  document.getElementById("popupMessage").innerHTML = "Form Accepted!";
  setTimeout(function () {
    popup.style.display = "none";
  }, 2000); // Hide popup after 3 seconds (3000 milliseconds)
}

