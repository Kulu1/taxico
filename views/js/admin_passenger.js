document.addEventListener('DOMContentLoaded', function() {
    const passengerlist = document.getElementById('passenger_list')
    let serialNumber = 1;

    fetch('/api/users', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        if(data.status === 'success') {
            const users = data.data.users;
            displayUsers(users);
        } else {
            console.log('Error: Could not get users');
        }
    })
    .catch(err => {
        console.log("An error occurred:", err);
    })

    function displayUsers(users) {
        passengerlist.innerHTML = '';
        

        if(users && users.length > 0) {
            users.forEach(user => {
                const listItem = document.createElement('tr');

                listItem.innerHTML =`
                            <td>${serialNumber}</td>
                            <td>${user.name}</td>
                            <td>${user.contact}</td>
                `;

                passengerlist.appendChild(listItem); // Append the created table to the container
                serialNumber++;
            });
        } else {
            console.log('Error: No users to display');
        }
    }
});
