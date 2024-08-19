document.getElementById("driverloginPage").addEventListener("submit", function (e) {
    e.preventDefault();

    var _data = {
        contact: document.getElementById("contact").value,
        password: document.getElementById("password").value
    }

    if (_data.contact === "") {
        alert("Please Enter your number");
        return;
    }

    if (_data.password === "") {
        alert("Password cannot be blank");
        return;
    }


    fetch("/api/drivers/driverLogin", {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(_data)
    })
        .then(response => {
            if (response.ok) {
                return response.json(); // Parse the response as JSON
            } else {
                throw new Error(response.statusText);
            }
        })
        .then(data => {
            successful()
            // console.log(obj.license)
            // Set a cookie (you may need to adjust the expiration)
            // document.cookie = 'token=' + JSON.stringify(obj) + '; expires=Wed, 21 Oct 2023 07:28:00 UTC';
            // Redirect after a delay
            window.setTimeout(() => {
                location.assign('driverpage1.html');
            }, 1500);
            var obj = data.data.driver;
            document.cookie = 'token= ' + JSON.stringify(obj)

            localStorage.setItem('license', obj.license)
            console.log(obj)
        })
        .catch(error => {
            // if (error.message === "Unauthorized") {
            //     alert(error + ". Credentials do not match");
            // }
            unSuccessful()
        });
});

function successful() {
    var modal = document.getElementById("confirmationModal");
    modal.style.display = "none";
    var popup = document.getElementById("confirmationPopup");
    popup.style.display = "block";
    document.getElementById("popupMessage").innerHTML = "Login Successful!";
    setTimeout(function () {
        popup.style.display = "none";
    }, 2000); // Hide popup after 3 seconds (3000 milliseconds)
}

function unSuccessful() {
    var modal = document.getElementById("confirmationModal");
    modal.style.display = "none";
    var popup = document.getElementById("confirmationPopup");
    popup.style.display = "block";
    document.getElementById("popupMessage").innerHTML = "Login Unsuccessful! Couldn't login in";
    setTimeout(function () {
        popup.style.display = "none";
    }, 2000); // Hide popup after 3 seconds (3000 milliseconds)
}
