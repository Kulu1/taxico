document.getElementById("main").addEventListener("submit", function(e){
    e.preventDefault();

    var formData = {
        location: document.getElementById("location").value,
        destination: document.getElementById("destination").value,
        date: document.querySelector("input[type='date']").value,
        time: document.querySelector("input[type='time']").value
    };

    // Store the form data in sessionStorage
    localStorage.setItem('formData', JSON.stringify(formData));

    // Navigate to the page where you can obtain the driver's license data
    // window.open("passengerpage2.html", "_self");
    window.setTimeout(() => {
        location.assign('/driverCarTyper')
    },500)
});


//logout
const logout = async () => {
    try{
        const res = await axios({
            method: 'GET',
            url: 'http://localhost:4000/api/v1/users/logout',
        })
        if (res.data.status === 'success'){
            location.reload(true)
        }
    } catch(err){
        alert('error', 'Error logging out! Try again.')
    }
}

