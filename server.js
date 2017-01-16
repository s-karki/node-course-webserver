const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");



app.use((req, res, next)=>{

    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    fs.appendFile("server.log", log + "\n");

    next();
}); //register middleware for Express. Applictions runs when next() is called.


// app.use((req, res, next) =>{
//     res.render("maintenance.hbs");
// });

app.use(express.static(__dirname + "/public")); 

hbs.registerHelper("getCurrentYear", () =>{
    return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text) =>{
    return text.toUpperCase();
});


app.get("/", (req, res) => {
    // res.send("<h1>Hello, I am a server!</h1>");
    res.render("home.hbs", {
        pageTitle: "Welcome to this page!",
    });
}); //handler for a GET request (url, function)

app.get("/about", (req, res) => {
    res.render("about.hbs", {
        pageTitle: "About page",
    });
});


app.get("/bad", (req, res) => {
    res.send({
        errorMessage: "Unable to respond to request"
    });
});

app.listen(8124, () => console.log("Server is up on port 8124")); //bind to a port

