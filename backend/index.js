const express = require('express');
const mongoose = require('mongoose');
const app = express();
const routes = require('./api/routes');
require('dotenv').config();

mongoose.connect(process.env.DB_URL);

app.use('/', routes);

app.listen(process.env.PORT, () => {
    console.log("Server is running");
});
