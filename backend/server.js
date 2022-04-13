const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();


// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



const DB_NAME = 'test3';

// Connection to MongoDB
mongoose.connect('mongodb://mongo:27017/' + DB_NAME, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB Connected!");
})

// routes
var testAPIRouter = require("./routes/testAPI");
var vendorRouter = require("./routes/Vendor");
var buyerRouter = require("./routes/Buyer");
var orderRouter = require("./routes/Orders");
var walletRouter = require("./routes/Wallet");

// setup API endpoints
app.use("/api", testAPIRouter);
app.use("/api/testAPI", testAPIRouter);
app.use("/api/vendor", vendorRouter);
app.use("/api/buyer", buyerRouter);
app.use("/api/orders", orderRouter);
app.use("/api/wallet", walletRouter);

const PORT = 4001;

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
