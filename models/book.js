const mongoose = require("mongoose"),
    bookSchema = mongoose.Schema({
        name: String,
        author: String,
        link: String,
        book: {
            type:String,
            unique:true,
        }
    });
module.exports = mongoose.model("book", bookSchema)