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
    books.push(book);
    
    res.send('Book is added to the database');
});

app.post('/book/:isbn', (req, res) => {
    
    console.log(req.params);
    const isbn = req.params.isbn;
    const newBook = req.body;
   
    for (let i = 0; i < books.length; i++) {
        let book = books[i]

        if (book.isbn === isbn) {
            books[i] = newBook;
        }
    }

    res.send('Book is edited');
    
});


app.get('/books', (req, res) => {
    
    res.json(books);

});

app.get('/book/:isbn', (req, res) => {
    
    const isbn = req.params.isbn;
    let book = null;
    
    for (let i = 0; i < books.length; i++) {
        if (books[i].isbn === isbn) {
            book = books[i];
            break;
        }
    }

    if (book) {
        res.json(book);
    } 
    else {
        res.status(404).send('Book not found');
    }

});

app.delete('/book/:isbn', (req, res) => {
   
    const isbn = req.params.isbn;
    
    for (let i = 0; i < books.length; i++) {
        if (books[i].isbn === isbn) {
            books.splice(i, 1);
            break;
        }
    }

    res.send('Book is deleted');

});



app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));
