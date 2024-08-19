window.onload = function () {
    // const searchInput = document.getElementById("search");
    // const searchForm = document.getElementById("searchForm");

    loadDataOnPageLoad();
}

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
    var cellAction = newRow.insertCell(2);

    cellIndex.innerHTML = num;
    cellName.innerHTML = data.name;

    // Adding a link with the specified href and class
    var linkElement = document.createElement("a");
    linkElement.href = "./admin_form.html";
    linkElement.className = "status delivered";
    linkElement.innerHTML = "View";

    cellAction.appendChild(linkElement);
}