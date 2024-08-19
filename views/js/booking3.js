document.addEventListener('DOMContentLoaded', function () {
    var carSeat

    const driverDetails = JSON.parse(localStorage.getItem('driverDetails'));
    const bookingDetails = JSON.parse(localStorage.getItem('formData'));

    if (driverDetails.carType == "Manual car") {
        carSeat = 4
    }
    if (driverDetails.carType == "Electric car") {
        carSeat = 5
    }
    if (driverDetails.carType == "MPV") {
        carSeat = 6
    }
    if (driverDetails.carType == "Mini Van") {
        carSeat = 7
    }
    // Populate Driver information
    document.getElementById('DriverName').innerHTML = `<b>Name: </b><span>${driverDetails.name}</span>`;
    document.getElementById('PhoneNo').innerHTML = `<b>Phone Number: </b>${driverDetails.contact}`;
    document.getElementById('license').innerHTML = `<b>License Number: </b>${driverDetails.license}`;

    // Populate trip information
    document.getElementById('From').innerHTML = `<b>From: </b><span>${bookingDetails.location}</span>`;
    document.getElementById('To').innerHTML = `<b>To: </b><span>${bookingDetails.destination}</span>`;
    document.getElementById('Date').innerHTML = `<b>Date: </b>${bookingDetails.date}`;
    document.getElementById('Time').innerHTML = `<b>Time: </b><span>${bookingDetails.time}</span>`;
    document.getElementById('VehicleType').innerHTML = `<b>Vehicle Type: </b><span>${driverDetails.carType}</span>`;
    document.getElementById('seatNumber').innerHTML = `<b>Number of Seats: </b><span>${carSeat}</span>`;


    document.getElementById("bookButton").addEventListener("click", function (e) {
        e.preventDefault()

        const location = bookingDetails.location
        const destination = bookingDetails.destination
        const date = bookingDetails.date
        const time = bookingDetails.time
        const contact = driverDetails.contact
        const license = driverDetails.license
        const contactString = contact.toString()
        // console.log(obj)

        // Validation logic
        if (location.trim() === "") {
            alert("Please enter a valid From location");
            return;
        }

        if (destination.trim() === "") {
            alert("Please enter a valid To destination");
            return;
        }

        if (date.trim() === "") {
            alert("Please select a valid Date");
            return;
        }

        if (time.trim() === "") {
            alert("Please enter a valid Time");
            return;
        }

        if (isNaN(contact) || contactString.length !== 8) {
            alert("Please enter a valid Phone Number (8 digits)");
            return;
        }

        if (license.trim() === "" || isNaN(license)) {
            alert("Please enter a valid License Number");
            return;
        }
        showConfirmation(location, destination, date, time, contact, license)
    })
});


const book = async (location, destination, date, time, contact, license) => {
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://localhost:4000/api/bookings/UserBooking',
            data: {
                location,
                destination,
                date,
                time,
                contact,
                license
            },
        })
        if (res.data.status === 'success') {
            // alert('success!!! Booking successfully')
            displayPopupMessage("Booking confirmed!");
            localStorage.removeItem('formData');
            localStorage.removeItem('driverDetails');

        }
    } catch (err) {
        let message =
            typeof err.response !== 'undefined'
                ? err.response.data.message
                : err.message
        alert('Error: Something is wrong are not the same!', message)
        displayPopupMessage("Booking error!");
        console.log(err.message)
    }
};


// popup passenger3
var swiper = new Swiper('.blog-slider', {
    spaceBetween: 30,
    effect: 'fade',
    loop: true,
    mousewheel: {
        invert: false,
    },
    // autoHeight: true,
    pagination: {
        el: '.blog-slider__pagination',
        clickable: true,
    }
});
// Function to open the book confirmation modal
function showConfirmation(location, destination, date, time, contact, license) {
    var modal = document.getElementById("confirmationModal");
    modal.style.display = "block";

    document.getElementById("yes-button").addEventListener("click", function (e) {
        e.preventDefault()
        confirmBooking(location, destination, date, time, contact, license)
    })
}

// Function to close the book confirmation modal
function closeConfirmationModal() {
    var modal = document.getElementById("confirmationModal");
    modal.style.display = "none";
    window.setTimeout(() => {
        location.assign("/getPassangerPage");
    }, 1500)
}

// Function to open the cancel confirmation modal
function showCancelConfirmation() {
    var modal = document.getElementById("cancelConfirmationModal");
    modal.style.display = "block";
}

// Function to close the cancel confirmation modal
function closeCancelConfirmationModal() {
    var modal = document.getElementById("cancelConfirmationModal");
    modal.style.display = "none";
}

// Function to confirm the booking
function confirmBooking(location, destination, date, time, contact, license) {

    book(location, destination, date, time, contact, license)
    closeConfirmationModal();
}

// Function to cancel the booking
function cancelBooking() {
    closeConfirmationModal();
}

// Function to confirm the cancellation
function confirmCancel() {
    closeCancelConfirmationModal();
    displayPopupMessage("Ride Cancelled!");
}

// Function to display the popup message
function displayPopupMessage(message) {
    var popup = document.getElementById("confirmationPopup");
    var popupMessage = document.getElementById("popupMessage");
    popupMessage.textContent = message;
    popup.style.display = "block";
    setTimeout(function () {
        popup.style.display = "none";
    }, 2000); // Display the popup for 2 seconds
}
