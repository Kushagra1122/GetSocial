const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    about: {
       type:String,
       default:""
    },
  
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userData"
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userData"
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "postData"
    }],
}, {
    timestamps: true
})

module.exports = mongoose.model("userData", userModel);