// document.addEventListener("DOMContentLoaded", function() {
//   const bookingList = document.getElementById('bookingList');

//   const getBookingData = async() => {
//     const res = await axios({
//       method: 'GET',
//       url: 'http://localhost:4000/api/bookings/UserBooking',
//     })
//     // .then(response => {
    
//     // }).catch(err =>{
//     //   console.log(err)
//     // })
//     if (res.data.status === 'success') {
//       const bookings = response.data;
//       displayBookings(bookings);
//     }
//     else {
//       console.log('Error: Could not get bookings');
//     }

//     function displayBookings(bookings) {
//       bookingList.innerHTML = ''; // Clear previous content

//       bookings.forEach(booking => {
//           const listItem = document.createElement('li');
//           listItem.textContent = `Location: ${booking.location}, Destination: ${booking.destination}, Date: ${booking.date}, Time: ${booking.time}, Contact: ${booking.contact}`;
//           bookingList.appendChild(listItem);
//       });
//     }
//   }
//   getBookingData();
// })







// function showRideConfirmation() {
//   var modal = document.getElementById("confirmationModal1");
//   modal.style.display = "block";
// }

// function cancelride() {
//   var modal = document.getElementById("confirmationModal1");
//   modal.style.display = "none";
//   var popup = document.getElementById("confirmationPopup1");
//   setTimeout(function() {
//       popup.style.display = "none";
//     }, 2000); // Hide popup after 3 seconds (3000 milliseconds)
// }

// function confirmride() {
//   var modal = document.getElementById("confirmationModal1");
//   modal.style.display = "none";
//   var popup = document.getElementById("confirmationPopup1");
//   popup.style.display = "block";
//   document.getElementById("popupMessage1").innerHTML = "Ride Declined!";
//   setTimeout(function() {
//       popup.style.display = "none";
//     }, 2000); // Hide popup after 3 seconds (3000 milliseconds)
// }

// function showConfirmation() {
//   var modal = document.getElementById("confirmationModal");
//   modal.style.display = "block";
// }

// function cancelBooking() {
//   var modal = document.getElementById("confirmationModal");
//   modal.style.display = "none";
//   var popup = document.getElementById("confirmationPopup");
//   setTimeout(function() {
//     popup.style.display = "none";
//   }, 2000); // Hide popup after 3 seconds (3000 milliseconds)
// }

// function confirmBooking() {
//   var modal = document.getElementById("confirmationModal");
//   modal.style.display = "none";
//   var popup = document.getElementById("confirmationPopup");
//   popup.style.display = "block";
//   document.getElementById("popupMessage").innerHTML = "Ride Accepted!";
//   setTimeout(function() {
//     popup.style.display = "none";
//   }, 2000); // Hide popup after 3 seconds (3000 milliseconds)
// }


// function showRideConfirmation() {
//   var modal = document.getElementById("confirmationModal1");
//   modal.style.display = "block";
// }

// function cancelride() {
//   var modal = document.getElementById("confirmationModal1");
//   modal.style.display = "none";
//   var popup = document.getElementById("confirmationPopup1");
//   setTimeout(function() {
//       popup.style.display = "none";
//   }, 2000); // Hide popup after 3 seconds (3000 milliseconds)
// }

// function confirmride() {
//   var modal = document.getElementById("confirmationModal1");
//   modal.style.display = "none";
//   var popup = document.getElementById("confirmationPopup1");
//   popup.style.display = "block";
//   document.getElementById("popupMessage1").innerHTML = "Ride Declined!";
//   setTimeout(function() {
//       popup.style.display = "none";
//   }, 2000); // Hide popup after 3 seconds (3000 milliseconds)
// }

// function showConfirmation() {
//   var modal = document.getElementById("confirmationModal");
//   modal.style.display = "block";
// }

// function cancelBooking() {
//   var modal = document.getElementById("confirmationModal");
//   modal.style.display = "none";
//   var popup = document.getElementById("confirmationPopup");
//   setTimeout(function() {
//   popup.style.display = "none";
//   }, 2000); // Hide popup after 3 seconds (3000 milliseconds)
// }

// function confirmBooking() {
//   var modal = document.getElementById("confirmationModal");
//   modal.style.display = "none";
//   var popup = document.getElementById("confirmationPopup");
//   popup.style.display = "block";
//   document.getElementById("popupMessage").innerHTML = "Ride Accepted!";
//   setTimeout(function() {
//   popup.style.display = "none";
//   }, 2000); // Hide popup after 3 seconds (3000 milliseconds)
// }
