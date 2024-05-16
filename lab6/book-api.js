const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

let books = [];

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/book', (req, res) => {
    const book = req.body;

    console.log(book);
    books.push(book);

    res.send('Book is added to the database');
});

app.post('/book/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const newBook = req.body;
    let bookFound = false;

    for (let i = 0; i < books.length; i++) {
        if (books[i].isbn === isbn) {
            books[i] = { ...newBook, isbn };
            bookFound = true;
            break;
        }
    }

    if (bookFound) {
        res.send('Book is edited');
    } else {
        res.status(404).send('Book not found');
    }
});


app.get('/books', (req, res) => {
    res.json(books);
});

app.get('/book/:isbn', (req, res) => {
    const isbn = req.params.isbn;

    for (let i = 0; i < books.length; i++) {
        let book = books[i];

        if (book.isbn === isbn) {
            res.json(book);
        }
    }
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));
