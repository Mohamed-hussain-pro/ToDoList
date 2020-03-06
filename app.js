//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const date = require('date-and-time');

const app = express();
let items = [];
let workItems = [];

var urlencodedParser = bodyParser.urlencoded({
    extended: true
})
app.use(express.static("public"));

app.set('view engine', 'ejs');


app.get("/", (req, res) => {

    var today = new Date();

    var currentDay = date.format(today, "dddd, MMM DD YYYY") //today.getDay();

    res.render("list", {
        listTitle: currentDay,
        newListItems: items
    });

});

// POST /login gets urlencoded bodies
app.post('/', urlencodedParser, function (req, res) {
    var item = req.body.newItem
    if (listTitle === "Work") {

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
        newListItem: workItems
    });
})


app.listen(3000, () => console.log("Server is running on port 3000"));
