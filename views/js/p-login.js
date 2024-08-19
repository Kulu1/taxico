document.getElementById("passengerLoginPage").addEventListener("submit", function (e) {
    e.preventDefault()
    var _data = {
        contact: document.getElementById("contact").value,
        password: document.getElementById("password").value
    }

    if (_data.contact == "") {
        alert("Please Enter your number")
        return
    }

    if (_data.password == "") {
        alert("Password cannot be blank")
        return
    }
    fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(_data),
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
            window.setTimeout(() => {
                location.assign('passengerpage1.html')
            }, 1500)
            // console.log(res)
            var obj = data.data.user
            console.log(obj)
            document.cookie = 'token= ' + JSON.stringify(obj)

        })
        .catch(error => {
            // if (error.message === "Unauthorized") {
            //     alert(error + ". Credentials do not match");
            // }
            unSuccessful()
        });
})

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


// function Logout() {
//     fetch("/logout")
//     .then(response => {
//         if (response.ok){
//             console.log("success");
//             window.open("index.html","_self")
//         }else{
//             throw response.statusText
//         }
//     }).catch(e => {
//         alert(e)
//     })
// }