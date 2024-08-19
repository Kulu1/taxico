// document.getElementById("booking-ride").addEventListener("submit", function(e){
//     e.preventDefault()

//     var _data = {
//         location : document.getElementById("location").value,
//         destination : document.getElementById("destination").value,
//         date : document.querySelector("input[type=date]").value,
//         time : document.querySelector("input[type=time]").value
//     }

//     localStorage.setItem("location", _data.location)
//     localStorage.setItem("destination", _data.destination)
//     localStorage.setItem("date", _data.date)
//     localStorage.setItem("time", _data.time)
    
//     window.open("passengerpage2.html","_self")
//     // fetch('/api/bookings', {
//     //     method: 'POST',
//     //     headers: {"Content-type": "application/json; charset=UTF-8"},
//     //     body: JSON.stringify(_data)
//     // }).then(response => {
//     //     if(response.ok){
//     //         alert("success!! Ride Booked")
//     //     }else{
//     //         throw new Error(response.statusText)
//     //     }
//     // }).catch(e => {
//     //     alert(e)
//     //     return
//     // })
// }
// )