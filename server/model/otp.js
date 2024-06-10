const mongoose = require("mongoose");

const otpModel = new mongoose.Schema({
    userId:
        mongoose.Schema.Types.ObjectId
    ,
    otp: String,
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '300s',
    }
   
    })

module.exports = mongoose.model("otpData", otpModel);