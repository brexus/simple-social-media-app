const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const UserModel = require("./models/User");
const PostModel = require("./models/Post");
const isAuthenticated = require("./middlewares/isAuthenticated");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
const app = express();
const routes = require('./api/routes');

const port = 3000
var DATABASENAME = "szkielety_programistyczne_projekt_db";

mongoose.connect("mongodb+srv://brexus:sW1cf0cpSlxHoBDi@cluster0.cmyw4ny.mongodb.net/szkielety_programistyczne_projekt_db");

// Routing
app.use('/', routes);

app.listen(port, () => {
    console.log("Server is running");
});