document.addEventListener('DOMContentLoaded', function () {
  const driverlist = document.getElementById('driver_list')
  let serialNumber = 1;

  fetch('/api/drivers/getalld', {
      method: 'GET',
  })
  .then(response => response.json())
  .then(data => {
      if (data.status === 'success') {
          const drivers = data.data.drivers
          console.log(drivers)
          displayDrivers(drivers);
      } else {
          console.log('Error: Could not get drivers');
      }
  })
  .catch(err => {
      console.log("An error occurred:", err);
  })

  function displayDrivers(drivers) {
      driverlist.innerHTML = '';

      if (drivers && drivers.length > 0) {
          drivers.forEach(driver => {
            if (driver.status !== "Active"){
              return
            }
              const listItem = document.createElement('tr')
              const driverId = driver._id;

              listItem.innerHTML = `
                  <td>${serialNumber}</td>
                  <td>${driver.name}</td>
                  <td>${driver.license}</td>
                  <td>${driver.carType}</td>
                  <td>${driver.contact}</td>
                  <td>
                      <button class="status delivered" style="border: none;" onclick="showRideConfirmation('${driverId}')">Delete</button>
                  </td>
                  <div class="btns">
                      <div id="confirmationModal${driverId}" class="modal">
                          <div class="modal-content">
                              <h2>Confirmation</h2>
                              <p>Are you sure you want to delete this driver?</p>
                              <div class="button-container">
                                  <button class="no-button" onclick="cancelride('${driverId}')">No</button>
                                  <button class="yes-button" onclick="confirmride('${driverId}')">Yes</button>
                              </div>
                          </div>
                      </div>

                      <div id="confirmationPopup${driverId}" class="popup">
                          <div class="popup-content">
                              <span id="popupMessage${driverId}"></span>
                          </div>
                      </div>
                  </div>
              `;
              driverlist.appendChild(listItem);
              serialNumber++;
          })
      } else {
          console.log("Error: No drivers to display")
      }
  }
})

function showRideConfirmation(driverId) {
  var modal = document.getElementById(`confirmationModal${driverId}`);
  modal.style.display = "block";
}

function cancelride(driverId) {
  var modal = document.getElementById(`confirmationModal${driverId}`);
  modal.style.display = "none";
}

function confirmride(driverId) {
  // Call your server API to delete the driver with the given driverId
  console.log(driverId)
  fetch(`/api/drivers/${driverId}`, {
      method: 'DELETE',
  })
  .then(response => response.json())
  .then(data => {
      if (data.status === 'Success') {
          const popup = document.getElementById(`confirmationPopup${driverId}`);
          popup.style.display = "block";
          document.getElementById(`popupMessage${driverId}`).innerHTML = "Driver Deleted!";
          setTimeout(function () {
              popup.style.display = "none";
              window.location.reload();
          }, 2000);
      } else {
          console.log('Error: Could not delete driver');
      }
  })
  .catch(err => {
      console.log("An error occurred:", err);
  })
  .finally(() => {
      // Close the confirmation modal
      var modal = document.getElementById(`confirmationModal${driverId}`);
      modal.style.display = "none";
  });
}
