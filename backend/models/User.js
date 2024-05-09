const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required."],
        match: [/^.{2,99}$/, "The first name length is too short."]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required."],
        match: [/^.{2,99}$/, "The last name length is too short."]
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, "Email is required."],
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i, 'Please fill a valid email address.']
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        match: [/^.{8,100}$/, "The password must have length [8, 100]."]
    },
});

module.exports = mongoose.model("users", UserSchema);
