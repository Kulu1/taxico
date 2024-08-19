window.onload = function () {
    // const searchInput = document.getElementById("search");
    // const searchForm = document.getElementById("searchForm");

    loadDataOnPageLoad();
}

async function loadDataOnPageLoad() {
    try {
        const response = await axios.get('http://localhost:4000/api/users/admin/getAllUsers');

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
    // Create a new table row
    var newRow = document.createElement("tr");

    // Create and append table cells with the provided values
    var cell1 = document.createElement("td");
    cell1.textContent = num;
    newRow.appendChild(cell1);

    var cell2 = document.createElement("td");
    cell2.textContent = data.name;
    newRow.appendChild(cell2);

    var cell3 = document.createElement("td");
    cell3.textContent = data.contact;
    newRow.appendChild(cell3);

    // Append the new row to the table with the specified ID
    var table = document.getElementById("table");
    table.appendChild(newRow);
}