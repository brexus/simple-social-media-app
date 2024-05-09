const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        required: [true, "Content is required."],
        // maxlength: [2000, "Content cannot exceed 2000 characters."],
        match: [/^.{1,2000}$/, "Content cannot exceed 2000 characters."]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    likes: [
        mongoose.Schema.Types.ObjectId      
    ]
});

module.exports = mongoose.model("posts", PostSchema);
