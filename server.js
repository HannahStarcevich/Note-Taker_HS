// connect to express
const {
    response
} = require("express");
const express = require("express");

const fs = require("fs")

// set up for connecting through file paths
const path = require("path");

//call the express function
const app = express();

app.use(express.static("public"))

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());


// identify the port connection 
const PORT = process.env.PORT || 3000;

// set up URL for html page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
})

// set up URL for notes page

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"))
})

// let notes = []

// Grab the full note database from db.json
app.get("/api/notes", (req, res) => {

    // res.sendFile(path.join(__dirname, "db/db.json"))
    // console.log(notes)
    // console.log(response)

    fs.readFile("db/db.json", "utf-8", (err, data) => {
        if (err) throw error
        console.log("this is data", data)
        // notes = JSON.parse(data)
        res.json(JSON.parse(data))
    })

})

// Create New Note - takes in JSON input
app.post("/api/notes", function (req, res) {

    fs.readFile("db/db.json", "utf-8", (err, data) => {
        if (err) throw error
        let notes = JSON.parse(data)

        var newNote = req.body;
        notes.push(newNote);
        var idNumber = 0
        for (var i = 0; i < notes.length; i++) {
            notes[i].id = idNumber
            idNumber++
        }
        console.log(notes)

        fs.writeFile("db/db.json", JSON.stringify(notes), function (err) {
            if (err) return console.log(err);
            res.json(true)
        })
    })
});

// // Displays a single note, or shows "No note found"
// app.get("/api/notes/:id", function (req, res) {
//     var noteSelected = req.params.notes;

//     console.log(chosen);

//     for (var i = 0; i < notes.length; i++) {
//         if (chosen === notes[i].routeName) {
//             return res.json(notes[i]);
//         }
//     }

//     return res.send("No note found");

// });






// launch the listener to listen for requests from the client
app.listen(PORT, function () {
    console.log(`running on port ${PORT}`)
})