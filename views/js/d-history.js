document.addEventListener('DOMContentLoaded', function() {
    const driverhistory = document.getElementById('d-history');
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
        driverhistory.innerHTML = ''; // Clear previous content

        bookings.forEach(booking => {
        // Create a Date object from the date string
        const date = new Date(booking.date);

        // Extract the year, month, and day
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1; // Months are zero-based, so add 1
        const day = date.getUTCDate();

        // Format the date as "YYYY-MM-DD"
        const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
            const listItem = document.createElement('div');
            listItem.innerHTML =`
            <div class="H-content">
            <ul>
              <ul class="H-details">
                <li>${formattedDate}</li>    
              <li>${booking.location} to ${booking.destination} </li>
              <li>- Number of passenger : 4 </i></li>
              
              </ul>
              <ul class="H-status">
                <li><input type="checkbox" name="status" id="accepted" class="accepted">
                  <label for="accepted">Accepted</label></li>
                <li><input type="checkbox" name="status" id="rejected" class="rejected">
                  <label for="rejected">Rejected</label></li>
              </ul>
              <ul class="H-option">
  
                <li>
                  <div class="dropdown">
                    <i class="bi bi-three-dots-vertical" title="Action" id="dropdown-toggle"></i>
                    <div class="dropdown-content">
                      <a href="#">Delete</a>
                    </div>
                  </div>
                </li>
              </ul>
            </ul>
            <hr>
          </div>
    `;
            if (booking.status === "Accepted") {
                listItem.querySelector('.accepted').checked = true;
                listItem.querySelector('.rejected').disabled = true;
            }
            if (booking.status === "Declined") {
                listItem.querySelector('.rejected').checked = true;
                listItem.querySelector('.accepted').disabled = true;
            }

    driverhistory.appendChild(listItem);
});
}


})