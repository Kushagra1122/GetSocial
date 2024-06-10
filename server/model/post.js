const mongoose = require("mongoose")


const postModel = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        require: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userData"
}],
    comments: [{
        comment: { type: String },
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userData" }
    }],
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userData"
    }
}, { timestamps: true })
module.exports = mongoose.model("postData", postModel);