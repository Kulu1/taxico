import { myNumberOtp } from './d-register';

var myNumber = myNumberOtp()
const client = require ('twilio')('AC0546a00fb39072aferty646c50f6f186d6ee', '471f68b1e3e8393dasdefrt1ba675b34d799a86');

export async function SendSms(){
    generateOTP()
    try {
        const message = await client.messages.create({
            body: `Your OTP is ${otp}, 
        Please do not share this OTP with anyone`,
            from: '+12054094701',
            to: `+975${myNumber}`
        });
        return console.log(message);
    } catch (err) {
        return console.log(err);
    }
}

function generateOTP() {
    var otp = Math.floor(1000 + Math.random() * 9000);
    console.log(otp);
    setInterval(() => {
        otp = Math.floor(1000 + Math.random() * 9000);
        console.log(otp);
    }, 300000); // 5 minutes in milliseconds
}




// var myNumber = sessionStorage.getItem("number")
// var userOtp = "";



// document.getElementById("otp").addEventListener("submit", function(e){
//     e.preventDefault()
//     num1 = document.getElementById("num1").value;
//     num2 = document.getElementById("num2").value;
//     num3 = document.getElementById("num3").value;
//     num4 = document.getElementById("num4").value;
//     userOtp = num1 + num2 + num3 + num4
//     userOtp = parseInt(userOtp)
//     console.log(userOtp)
// })

