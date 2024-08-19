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
        const response = await axios.get('http://localhost:4000/api/drivers/getAlldriver');

        if (response.data.status === 'Success') {
            showCarType(response.data.data);
        } else {
            alert('API request was successful, but the response status is not "Success"');
        }
    } catch (err) {
        let message = err.response ? err.response.data.message : err.message;
        console.error(`Error: ${message}`);
    }
}

function showCarType(data) {
    const mainElement = document.getElementById('main');
    mainElement.innerHTML = ''; // Clear the existing content

    data.forEach(carType => {
        eachData(carType);
    });
}

async function search(keyWord) {
    try {
        const response = await axios.get(`http://localhost:4000/api/drivers/retrieveCarType/${keyWord}`);

        if (response.data.status === 'Success') {
            alert('Success! Drivers retrieved successfully');
            // Update the page with the new data
            showCarType(response.data.data);
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

function eachData(carType) {
    // console.log(carType)
    var carSeat;
    if (carType.carType == "Manual car") {
        carSeat = 4
    }
    if (carType.carType == "Electric car") {
        carSeat = 5
    }
    if (carType.carType == "MPV") {
        carSeat = 6
    }
    if (carType.carType == "Mini Van") {
        carSeat = 7
    }

    // Create a new div element with the class "blog-card"
    const blogCard = document.createElement('div');
    blogCard.className = 'blog-card';

    // Set an ID for the div element
    blogCard.id = 'my-blog-card';

    // Create the meta div element
    const meta = document.createElement('div');
    meta.className = 'meta';

    // Create the photo div element and set its background image
    const photo = document.createElement('div');
    photo.className = 'photo';
    photo.style.backgroundImage = 'url(../assets/img/vehicle.jpg)';

    // Append the photo div to the meta div
    meta.appendChild(photo);

    // Create the description div element
    const description = document.createElement('div');
    description.className = 'description';

    // Create the heading (h1) element with the text "Minivan"
    const heading = document.createElement('h1');
    heading.textContent = `${carType.carType}`;

    // Create the driver paragraph
    const driverParagraph = document.createElement('p');
    driverParagraph.innerHTML = `<b>Driver:</b> <span>${carType.name}</span>`;

    // Create the driver paragraph
    const driverLiscense = document.createElement('p');
    driverLiscense.innerHTML = `<b>Liscense:</b> <span>${carType.license}</span>`;

    // Create the seats available paragraph
    const seatsAvailableParagraph = document.createElement('p');
    seatsAvailableParagraph.innerHTML = `<b>Seats available:</b> <span>${carSeat}</span>`;

    // Create the "Read More" paragraph with a link
    const readMoreParagraph = document.createElement('p');
    readMoreParagraph.className = 'read-more';
    // const link = document.createElement('a');
    // link.href = ''; // Add your link URL here
    readMoreParagraph.textContent = 'View';
    // readMoreParagraph.appendChild(link);
    // Set the license number as a custom attribute on the link
    readMoreParagraph.setAttribute('data-license', carType.license); // Store the license number
    // Add an onclick function to the link
    // ...

    readMoreParagraph.onclick = async function () {
        // Retrieve the license number from the custom attribute
        const licenseNumber = readMoreParagraph.getAttribute('data-license');
        try {
            const response = await axios.get(`http://localhost:4000/api/drivers/getDriverDetails/${licenseNumber}`);
            console.log(response);
            if (response.status === 200) {
                if (response.data.status === 'Success') {
                    // alert('Success! Drivers retrieved successfully');
                    // Store the driver details in localStorage
                    localStorage.setItem('driverDetails', JSON.stringify(response.data.data));

                    // Update the page with the new data
                    window.setTimeout(() => {
                        location.assign('/getBookPage')
                    }, 500)

                } else {
                    alert('API request was successful, but the response status is not "Success"');
                }
            } else {
                alert(`API request failed with status code: ${response.status}`);
            }
        } catch (err) {
            let message = err.response ? err.response.data.message : err.message;
            alert(`Error: ${message}`);
        }
    };

    // Append all the elements to the blog card
    description.appendChild(heading);
    description.appendChild(driverParagraph);
    description.appendChild(driverLiscense);
    description.appendChild(seatsAvailableParagraph);
    description.appendChild(readMoreParagraph);

    blogCard.appendChild(meta);
    blogCard.appendChild(description);
    const mainElement = document.getElementById('main');
    mainElement.appendChild(blogCard);
}

document.addEventListener('click', function (event) {
    const inputField = document.getElementById("search");
    const searchResults = document.getElementById("searchResult");
    const mainElement = document.getElementById('main');

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
            const mainElement = document.getElementById('main');
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
                searchResults.innerHTML += `<p><a href="javascript:void(0);" onclick="setOption('${item.carType}')">${item.carType}</a></p>`;
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

