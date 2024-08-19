window.onload = function () {
    loadDataOnPageLoad();
}

const container = document.getElementById("container3");

async function loadDataOnPageLoad() {
    try {
        const response = await axios.get("http://localhost:4000/api/drivers/getInactivedriver");

        if (response.data.status === 'Success') {
            showPassenger(response.data.data);
        } else {
            alert('API request was successful, but the response status is not "Success"');
        }
    } catch (err) {
        let message = err.response ? err.response.data.message : err.message;
        console.error(`Error: ${message}`);
    }
}

function showPassenger(data) {
    container.innerHTML = '';
    data.forEach(data => {
        eachData(data);
    });
}

function eachData(data) {
    var carSeat;
    if (data.carType == "Manual car") {
        carSeat = 4;
    }
    if (data.carType == "Electric car") {
        carSeat = 5;
    }
    if (data.carType == "MPV") {
        carSeat = 6;
    }
    if (data.carType == "Mini Van") {
        carSeat = 7;
    }

    const formid = data._id;

    const listItem = document.createElement("div")
    listItem.className = "box1";
    listItem.innerHTML = `
        <div class="name_job">Driver Application Form</div>
        <p><b>Full Name: </b><span>${data.name}</span></p>
        <p><b>Phone Number: </b>${data.contact}</p>
        <p><b>License Number: </b>${data.license}</p>
        <p><b>Vehicle Type: </b>${data.carType}</p>
        <p><b>Number of Seats: </b>${carSeat}</p>
        <div class="btns">
          <button id="rideButton" onclick="showRideConfirmation('${formid}')">Decline</button>
          <button id="bookButton" onclick="showConfirmation('${formid}')">Accept</button>
        </div>

        <div id="confirmationPopup1-${formid}" class="popup">
        <div class="popup-content">
          <span id="popupMessage1-${formid}"></span>
        </div>
      </div>
      <div id="confirmationModal1-${formid}" class="modal">
        <div class="modal-content">
          <h2>Confirmation</h2>
          <p>Are you sure you want to decline this form?</p>
          <div class="button-container">                    
            <button class="no-button" onclick="cancelride('${formid}')">No</button>
            <button class="yes-button" onclick="confirmride('${formid}')">Yes</button>
          </div>
        </div>
      </div>
      
      <div id="confirmationModal-${formid}" class="modal">
        <div class="modal-content">
          <h2>Confirmation</h2>
          <p>Are you sure you want to accept this form?</p>
          <div class="button-container">                    
            <button class="no-button" onclick="cancelBooking('${formid}')">No</button>
            <button class="yes-button" onclick="confirmBooking('${formid}')">Yes</button>
          </div>
        </div>
      </div>
      <div id="confirmationPopup-${formid}" class="popup">
        <div class="popup-content">
          <span id="popupMessage-${formid}"></span>
        </div>
      </div>  
    `;

    // Append the new div to the body or another existing container
    container.appendChild(listItem);
}


function showRideConfirmation(formid) {
    var modal = document.getElementById(`confirmationModal1-${formid}`);
    modal.style.display = "block";
  }
  
  function cancelride(formid) {
    var modal = document.getElementById(`confirmationModal1-${formid}`);
    modal.style.display = "none";
    var popup = document.getElementById(`confirmationPopup1-${formid}`);
    setTimeout(function() {
        popup.style.display = "none";
      }, 2000); // Hide popup after 3 seconds (3000 milliseconds)
  }
  
  function confirmride(formid) {
    fetch(`/api/drivers/${formid}`, {
        method: "DELETE",
    }).then(response => {
        if (response.ok) {
            var modal = document.getElementById(`confirmationModal1-${formid}`);
            modal.style.display = "none";
            var popup = document.getElementById(`confirmationPopup1-${formid}`);
            popup.style.display = "block";
            document.getElementById(`popupMessage1-${formid}`).innerHTML = "Form Declined!";
            setTimeout(function() {
                popup.style.display = "none";
                window.location.reload();
            }, 2000); // Hide popup after 3 seconds (3000 milliseconds)
        }
        else {
            console.error("Error declining form:", response.statusText);
        }
    }).catch(error => {
        console.log("Error in the fetch request:", error);
    });
    }
  function showConfirmation(formid) {
    var modal = document.getElementById(`confirmationModal-${formid}`);
    modal.style.display = "block";
  }
  
  function cancelBooking(formid) {
    var modal = document.getElementById(`confirmationModal-${formid}`);
    modal.style.display = "none";
    var popup = document.getElementById(`confirmationPopup-${formid}`);
    setTimeout(function() {
      popup.style.display = "none";
    }, 2000); // Hide popup after 3 seconds (3000 milliseconds)
  }
  
  function confirmBooking(formid) {

    fetch(`/api/drivers/${formid}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: "Active" })
    }).then(response => {
        if (response.ok) {
          
        var modal = document.getElementById(`confirmationModal-${formid}`);
        modal.style.display = "none";
        var popup = document.getElementById(`confirmationPopup-${formid}`);
        popup.style.display = "block";
        document.getElementById(`popupMessage-${formid}`).innerHTML = "Form Accepted!";

        // const countryCode = "+975"
        const phoneNumber =  "+97577832984";
        const message = `You have been acceptted`;
      
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
              setTimeout(function() {
                popup.style.display = "none";
                window.location.reload();
              }, 2000); //
            } else {
              successful();
              // Handle error
            }
          })
          .catch((error) => {
            console.error(error);
          });
        // setTimeout(function() {
        //   popup.style.display = "none";
        //   window.location.reload();
        // }, 2000); // Hide popup after 3 seconds (3000 milliseconds)
    } else {
        console.error("Error accepting form:", response.statusText);
    }
    })
    .catch(error => {
        console.error("Error in the fetch request:", error);
    });
    
  }
  