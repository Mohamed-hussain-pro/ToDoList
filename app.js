//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const date = require('date-and-time');
const date2 = require(__dirname + "/date.js")

const app = express();
let items = [];
let workItems = [];

var urlencodedParser = bodyParser.urlencoded({
    extended: true
})
app.use(express.static("public"));

app.set('view engine', 'ejs');


app.get("/", (req, res) => {

    let today = new Date();

    let currentDay = date.format(today, "dddd, MMM DD YYYY") //today.getDay();
    let day = date2.getDate();

    res.render("list", {
        listTitle: day,
        newListItems: items
    });

});

// POST /login gets urlencoded bodies
app.post('/', urlencodedParser, function (req, res) {
    let item = req.body.newItem;
    
    if (req.body.list === "Work") {

        workItems.push(item);
        res.redirect("/work")

    } else{

        items.push(item)
        res.redirect("/")
    }

});

// work items list
app.get("/work", (req, res) => {
    res.render("list", {
        listTitle: "Work List",
        newListItems: workItems
    });
})

app.get("/about",(req,res) => {
    res.render("about")
})

app.listen(3000, () => console.log("Server is running on port 3000"));
