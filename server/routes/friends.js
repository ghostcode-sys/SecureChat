const express = require("express")

const userModel = require("../models/user");


const route = express.Router()

route.get("/alluser", async (req, res) => {
    try{
        const allUser = await userModel.find();
    
        const list = allUser.map((value) => {
            return ({
                name:value.name,
                username: value.username
            })
        })
    
        res.status(200).json({list})
    }
    catch(error){
        res.status(400).send("Something went wrong")
    }
})


module.exports = route;