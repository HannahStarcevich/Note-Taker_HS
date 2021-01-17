// connect to express
const express = require("express");

// set up for connecting through file paths
const path = require("path");

//call the express function
const app = express();

// identify the port connection 
const PORT = process.env.PORT || 3000;

// identify the request address and send a response
app.get("/", (req, res) => {
    res.send("this is it!")
})

// set up URL for html page
app.get("/home", (req, res) => {
    res.sendFile(path.join(_dirname, "./public/index.html"))
})

// connect CSS stylesheet
app.use(express.static("./public/assets/css/style.css"))








// launch the listener to listen for requests from the client
app.listen(PORT, function () {
    console.log(`running on port ${PORT}`)
})