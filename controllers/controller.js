const Book = require("../models/book");

exports.getAllBooks = (req, res, next) => {
    Book.find({}, (error, books) => {
        if (error) next(error);
        req.data = books;
        next();
    });
};
exports.getSingleBook = (req, res, next) => {
    let paramsName = req.params.number;
    console.log(paramsName)
    Book.find({book: paramsName}, (error, books) => {
        if (error) next(error);
        req.data = books;
        next();
    });
};


exports.getBookPage = (req, res, next) => {
    res.render("contact");
};

exports.deletePage = (req, res, next) => {
    Book.find({}, (error, books) => {
        if (error) next(error);
        req.data = books;
        next();
    });
};

exports.saveBook = (req, res, next) => {
    let newBook = new Book({
        name: req.body.name,
        author: req.body.author,
        book: req.body.book,
        link: req.body.link,
    });
    newBook.save((error, result) => {
        if (error) res.render("error");
        res.render("thanks");
    });
};

exports.delete = (req, res, next) => {
    let userId = req.params.id;
    console.log("Deleting Book")
    Book.findByIdAndRemove(userId)
        .then(() => {
            res.locals.redirect = "/home";
            next();
        })
        .catch(error => {
            console.log(`Error deleting user by ID: ${error.message}`);
            next();
        });
}

exports.redirectView = (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next ();
}

