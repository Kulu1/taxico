window.onload = function () {
    const searchInput = document.getElementById("search");
    const searchForm = document.getElementById("searchForm");

    loadDataOnPageLoad();

    searchForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        const keyWord = searchInput.value; // Get the keyWord from the input field
        console.log(keyWord);
        search(keyWord);
    });
}

async function loadDataOnPageLoad() {
    try {
        const response = await axios.get("http://localhost:4000/api/drivers/getActivedriver");

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
    // const mainElement = document.getElementById('main');
    // mainElement.innerHTML = ''; // Clear the existing content
    var num = 0

    data.forEach(data => {
        num = num + 1
        eachData(data, num);
    });
}


function eachData(data, num) {
    var table = document.getElementById("table");

    var newRow = table.insertRow(table.rows.length);
    var cellIndex = newRow.insertCell(0);
    var cellName = newRow.insertCell(1);
    var cellId = newRow.insertCell(2);
    var cellVehicle = newRow.insertCell(3);
    var cellPhone = newRow.insertCell(4);
    var cellAction = newRow.insertCell(5);

    cellIndex.innerHTML = num;
    cellName.innerHTML = data.name;
    cellId.innerHTML = data.license;
    cellVehicle.innerHTML = data.carType;
    cellPhone.innerHTML = data.contact;

    // Adding a button with the onclick event
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.className = "status delivered";
    deleteButton.id = "rideButton";
    deleteButton.style.border = "none";
    deleteButton.onclick = showRideConfirmation;

    cellAction.appendChild(deleteButton);
}

async function search(keyWord) {
    try {
        const response = await axios.get(`http://localhost:4000/api/drivers/getDriverDetails/${keyWord}`);

        if (response.data.status === 'Success') {
            alert('Success! Drivers retrieved successfully');
            // Update the page with the new data
            showSingleDriver(response.data.data);
            localStorage.setItem("d-datas", keyWord);
            alert("finished")
        } else {
            alert('API request was successful, but the response status is not "Success"');
        }
    } catch (err) {
        let message = err.response ? err.response.data.message : err.message;
        alert(`Error: ${message}`);
    }
}


function showSingleDriver(data) {
    const mainElement = document.getElementById('table');
    mainElement.innerHTML = ''; // Clear the existing content
    var table = document.getElementById("table");

    var newRow = table.insertRow(table.rows.length);
    var cellIndex = newRow.insertCell(0);
    var cellName = newRow.insertCell(1);
    var cellId = newRow.insertCell(2);
    var cellVehicle = newRow.insertCell(3);
    var cellPhone = newRow.insertCell(4);
    var cellAction = newRow.insertCell(5);

    cellIndex.innerHTML = 1;
    cellName.innerHTML = data.name;
    cellId.innerHTML = data.license;
    cellVehicle.innerHTML = data.carType;
    cellPhone.innerHTML = data.contact;

    // Adding a button with the onclick event
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.className = "status delivered";
    deleteButton.id = "rideButton";
    deleteButton.style.border = "none";
    deleteButton.onclick = showRideConfirmation;

    cellAction.appendChild(deleteButton);
}

document.addEventListener('click', function (event) {
    const inputField = document.getElementById("search");
    const searchResults = document.getElementById("searchResult");
    const mainElement = document.getElementById('table');

    // Check if the click target is not the input field or search results
    if (event.target !== inputField && event.target !== searchResults) {
        // Hide the search results and show the main content
        searchResults.style.visibility = 'hidden';
        mainElement.style.visibility = 'visible';
    }
});

function sendData(e) {
    const searchResults = document.getElementById("searchResult");

    let match = e.value.match(/^[a-zA-Z]*/)
    let match2 = e.value.match(/\s*/)
    if (match2[0] === e.value) {
        searchResults.innerHTML = "";
        return;
    }
    if (match[0] === e.value) {
        fetch("/api/drivers/searchCar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ payload: e.value })
        }).then(res => res.json()).then(data => {
            const mainElement = document.getElementById('table');
            mainElement.style.visibility = 'hidden';
            searchResults.style.visibility = 'visible';

            let payload = data.payload;
            searchResults.innerHTML = "";
            if (payload.length < 1) {
                searchResults.innerHTML = "<p>Sorry. Nothing Found</p>";
                return;
            }
            payload.forEach((item, index) => {
                if (index > 0) searchResults.innerHTML += "<hr>";
                // Set the input field value when a suggestion is clicked
                searchResults.innerHTML += `<p><a href="javascript:void(0);" onclick="setOption('${item.license}')">${item.license}</a></p>`;
            });
        });
    }
}

// Function to set the selected option as the input field value
function setOption(option) {
    const inputField = document.getElementById("search");
    inputField.value = option;
    // Clear the suggestion results
    const searchResults = document.getElementById("searchResult");
    searchResults.innerHTML = "";
    searchResults.style.visibility = 'hidden';

    const mainElement = document.getElementById('main');
    mainElement.style.visibility = 'visible';
}

// tandins code
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


// // type is either 'password' or data
// const driverDelete = async (keyWord) => {
//     try {
//         // console.log(data)
//         const res = await axios({
//             method: 'Delete',
//             url: (`http://localhost:4000/api/drivers/deleteDriver/${keyWord}`),
//             headers: {
//                 'Content-Type': 'application/json', // Set content type to JSON
//             },
//             data: keyWord,
//         });
//         console.log(res.data.status);
//         if (res.data.status === 'success') {
//             // alert('success', 'Data updated successfully!');
//             successful()
//         }
//     } catch (err) {
//         let message =
//             typeof err.response !== 'undefined'
//                 ? err.response.data.message
//                 : err.message;
//         // showAlert('error', 'Error: Please provide valid email address', message)
//         console.log(err);
//         console.log(message);
//         // alert('error', err.response.data.message);
//         unSuccessful()
//     }
// };


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


function successful() {
    var modal = document.getElementById("confirmationModal");
    modal.style.display = "none";
    var popup = document.getElementById("confirmationPopup");
    popup.style.display = "block";
    document.getElementById("popupMessage").innerHTML = "Driver deleted successfully!";
    setTimeout(function () {
        popup.style.display = "none";
    }, 3000); // Hide popup after 3 seconds (3000 milliseconds)
}

function unSuccessful() {
    var modal = document.getElementById("confirmationModal");
    modal.style.display = "none";
    var popup = document.getElementById("confirmationPopup");
    popup.style.display = "block";
    document.getElementById("popupMessage").innerHTML = "Deletion failed!";
    setTimeout(function () {
        popup.style.display = "none";
    }, 2000); // Hide popup after 3 seconds (3000 milliseconds)
}


async function driverDelete(keyWord) {
    try {
        const response = await axios.delete(`http://localhost:4000/api/drivers/deleteDriver/${keyWord}`);

        if (response.data.status === 'Success') {
            alert('Driver deleted successfully.');
            // Perform additional actions if needed, e.g., update the UI.
        } else {
            alert('Failed to delete driver. Please try again.');
        }
    } catch (err) {
        let message = err.response ? err.response.data.message : err.message;
        alert(`Error: ${message}`);
    }
}