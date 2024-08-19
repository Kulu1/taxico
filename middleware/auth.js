const jwt = require("jsonwebtoken");
const userModel = require("../models/userModels")
const adminModel = require("../models/adminModels")
const driverModel = require("../models/driverModels")

const userAuth = async(req,res,next) => {
    try{
        const {cookies} = req; 
        var token = ""

        console.log(cookies)
        if("session_id" in cookies){
            console.log("JWT")
            token = cookies.session_id
        }else{
            return res.status(401).send("Please Authenticate")
        }     

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(401).send({error:"Please Authenticate."})
        }

        req.token = token
        req.user = user
        
        next() 
    }catch(e) {
         res.status(401).send({error:"Please Authenticate."})
    }
}

const adminAuth = async(req,res,next) => {
    try{
        const {cookies} = req; 
        var token = ""

        console.log(cookies)
        if("session_id" in cookies){
            console.log("JWT")
            token = cookies.session_id
        }else{
            return res.status(401).send("Please Authenticate")
        }     

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user = await adminModel.findById(decoded.id);

        if (!user) {
            return res.status(401).send({error:"Please Authenticate."})
        }

        req.token = token
        req.user = user
        
        next() 
    }catch(e) {
         res.status(401).send({error:"Please Authenticate."})
    }
}

const driverAuth = async(req,res,next) => {
    try{
        const {cookies} = req; 
        var token = ""

        console.log(cookies)
        if("session_id" in cookies){
            console.log("JWT")
            token = cookies.session_id
        }else{
            return res.status(401).send("Please Authenticate")
        }     

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user = await driverModel.findById(decoded.id);

        if (!user) {
            return res.status(401).send({error:"Please Authenticate."})
        }

        req.token = token
        req.user = user
        
        next() 
    }catch(e) {
         res.status(401).send({error:"Please Authenticate."})
    }
}
module.exports = {userAuth,adminAuth,driverAuth}