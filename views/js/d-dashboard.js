// Import any necessary libraries or modules for making API requests

// Function to fetch available ride data from your API
async function fetchRideData() {
    try {
      const response = await fetch('/api/bookings'); // Replace with your API endpoint
      if (response.ok) {
        const rideData = await response.json();
        displayRideData(rideData);
      } else {
        console.error('Failed to fetch ride data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  // Function to display the fetched ride data on your webpage
  function displayRideData(rideData) {
    const rideContainer = document.getElementById('ride-container'); // Replace with the ID of the container where you want to display ride data
  
    // Clear any existing data in the container
    rideContainer.innerHTML = '';
  
    // Iterate through the ride data and create HTML elements to display it
    rideData.forEach((ride) => {
      const rideCard = document.createElement('div');
      rideCard.className = 'ride-card';
  
      const passengerName = document.createElement('p');
      passengerName.textContent = `Passenger: ${ride.passengerName}`;
  
      const fromLocation = document.createElement('p');
      fromLocation.textContent = `From: ${ride.fromLocation}`;
  
      const toLocation = document.createElement('p');
      toLocation.textContent = `To: ${ride.toLocation}`;
  
      // Add more data as needed
  
      // Append data to the ride card
      rideCard.appendChild(passengerName);
      rideCard.appendChild(fromLocation);
      rideCard.appendChild(toLocation);
  
      // Append the ride card to the container
      rideContainer.appendChild(rideCard);
    });
  }
  
  // Call the fetchRideData function when the page loads
  window.addEventListener('load', fetchRideData);
  