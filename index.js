require("dotenv").config();

const mongoose = require("mongoose");
const uri = process.env.ATLAS_URI;

const book = require("./models/book")
const bookController = require("./controllers/controller");
const { application } = require("express");
const methodOverride = require("method-override");

const express = require("express"),
    app = express();


app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(express.urlencoded({extended: false,}));
 
app.use(express.json())
mongoose.connect(uri,{ useUnifiedTopology: true });

const db = mongoose.connection;

db.once("open", () => {console.log("Connection to the database is Successful")});

app.use(
    methodOverride("_method", {
        methods: ["POST", "GET"]
    })
);

app.get(
    "/home", 
    bookController.getAllBooks,
    (req, res, next) => {
    console.log(req.data);
    res.render("books", {books: req.data});
    }
);


app.get("/books/:number", bookController.getSingleBook,
(req, res, next) => {
    console.log(req.data);
    res.render("listing",{books: req.data});
}
);

app.get("/DeleteABook", bookController.deletePage,
(req, res, next) => {
    console.log(req.data);
    res.render("delete",{books: req.data});
}
);
app.delete("/books/:id/delete", bookController.delete, bookController.redirectView)
app.get("/addNewBook", bookController.getBookPage)
app.post("/newBook", bookController.saveBook)

app.listen(app.get("port"), () => {
    console.log("Server is now running on port 3000")
})

