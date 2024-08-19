document.addEventListener("DOMContentLoaded", function() {
        const bookingList = document.getElementById('bookingList');
        const driverlicense = localStorage.getItem('license');
    
        fetch('/api/bookings/BookingData', {
            method: 'GET',
        })
        .then(response => response.json())  
        .then(data => {
            if (data.status === 'success') {
                const bookings = data.data.bookings.filter((booking) => booking.license === driverlicense);
                displayBookings(bookings);
            }
            else {
                console.log('Error: Could not get bookings');
            }
        })
        .catch(err => {
            console.log("an error occured:", err)
        })
        function displayBookings(bookings) {
            bookingList.innerHTML = ''; // Clear previous content
    
            bookings.forEach(booking => {
                if (booking.status === "Declined") {
                    return;
                }
                const listItem = document.createElement('div');
                const bookingId = booking._id;
                listItem.innerHTML =`
                <p><b>Passenger:</b><span id="username"></span></p>
                <p><b>From: </b><span id="location">${booking.location}</span></p>
                <p><b>To: </b><span id="destination">${booking.destination}</span></p>
                <p><b>Date: </b><span id="date">${booking.date}</span></p>
                <p><b>Time: </b><span id="time">${booking.time}</span></p>
                <p><b>Phone Number: </b><span id="contact">${booking.contact}</span></p>
                <p><b>Status: </b><span >${booking.status}</span></p>
                <div class="go-corner"></div>
            <div class="btns">
            <button class="ride-button" onclick="showRideConfirmation('${bookingId}')">Decline</button>

            <div id="confirmationModal-${bookingId}" class="modal">
                <!-- Unique modal content for each booking -->
                <div class="modal-content">
                    <h2>Confirmation</h2>
                    <p>Are you sure you want to decline this ride?</p>
                    <div class="button-container">
                        <button class="yes-button" onclick="confirmRide('${bookingId}')">Yes</button>
                        <button class="no-button" onclick="cancelRide('${bookingId}')">No</button>
                    </div>
                </div>
            </div>

            <button id="bookButton" onclick="showConfirmation('${bookingId}')">Accept</button>

            <div id="confirmationModal1-${bookingId}" class="modal">
              <div class="modal-content">
                <h2>Confirmation</h2>
                <p>Are you sure you want to accept this ride?</p>
                <div class="button-container">
                  <button class="yes-button" onclick="confirmBooking('${bookingId}')">Yes</button>
                  <button class="no-button" onclick="cancelBooking('${bookingId}')">No</button>
                </div>
              </div>
            </div>
  
            <div id="confirmationPopup1-${bookingId}" class="popup">
              <div class="popup-content">
                <span id="popupMessage-${bookingId}"></span>
              </div>
            </div>
          </div>    
            </div>
        `;

        bookingList.appendChild(listItem);
    });
}
});

function showRideConfirmation(bookingId) {
var modal = document.getElementById(`confirmationModal-${bookingId}`);
modal.style.display = "block";
}

function cancelRide(bookingId) {
var modal = document.getElementById(`confirmationModal-${bookingId}`);
modal.style.display = "none";
var popup = document.getElementById(`confirmationPopup-${bookingId}`);
setTimeout(function() {
    popup.style.display = "none";
}, 2000); // Hide popup after 2 seconds (2000 milliseconds)
}

function confirmRide(bookingId) {
fetch(`/api/bookings/${bookingId}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ status: "Declined" })
})
.then(response => {
    if (response.ok) {
        var modal = document.getElementById(`confirmationModal-${bookingId}`);
        modal.style.display = "none";
        var popup = document.getElementById(`confirmationPopup-${bookingId}`);
        popup.style.display = "block";
        document.getElementById(`popupMessage-${bookingId}`).innerHTML = "Ride Declined!";
         // Hide the buttons
      var buttons = document.querySelectorAll(`.ride-button`);
      buttons.forEach(function(button) {
        button.style.display = "none";
      });

        setTimeout(function () {
            popup.style.display = "none";
            window.location.reload();
        }, 2000);

    } else {
        console.error("Error declining ride:", response.statusText);
    }
})
.catch(error => {
    console.error("Error in the fetch request:", error);
});

}

function showConfirmation(bookingId) {
    var modal = document.getElementById(`confirmationModal1-${bookingId}`);
    modal.style.display = "block";
  }
  
function cancelBooking(bookingId) {
    var modal = document.getElementById(`confirmationModal1-${bookingId}`);
    modal.style.display = "none";
    var popup = document.getElementById(`confirmationPopup1-${bookingId}`);
    setTimeout(function () {
      popup.style.display = "none";
    }, 2000); // Hide popup after 2 seconds (2000 milliseconds)
}

  
function confirmBooking(bookingId) {
    fetch(`/api/bookings/${bookingId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status: "Accepted" })
    })
      .then((response) => {
        if (response.ok) {
          var modal = document.getElementById(`confirmationModal1-${bookingId}`);
          modal.style.display = "none";
          var popup = document.getElementById(`confirmationPopup1-${bookingId}`);
          popup.style.display = "block";
          document.getElementById(`popupMessage-${bookingId}`).innerHTML = "Ride Accepted!";
              // Hide the buttons
            var buttons = document.querySelectorAll(`.ride-button`);
            buttons.forEach(function(button) {
            button.style.display = "none";
      });
          setTimeout(function () {
            popup.style.display = "none";
            window.location.reload();
          }, 2000);
        } else {
          console.error("Error accepting ride:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error in the fetch request:", error);
      });
    }