'use strict';

const path = require('path');

const express = require('express');

const app = express();

const { port, host, storage } = require('./serverConfig.json');

const Datastorage = require(path.join(__dirname, storage.storageFolder, storage.dataLayer));

const dataStorage = new Datastorage();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'pages'));

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

const menuPath = path.join(__dirname, 'menu.html');

app.get('/', (req, res) => res.sendFile(menuPath));

app.get('/all', (req, res) =>
    dataStorage.getAll().then(data => res.render('allBooks', {result:data}))
);

app.get('/getBook', (req, res) => 
    res.render('getSingleBook',{
        title: 'get',
        header1:'get',
        action:'/getSingleBook'
    })
);

app.post('/getSingleBook', (req, res) => {
    if (!req.body) return res.sendStatus(500);

    dataStorage.getOne(req.body.id)
    .then(book => res.render('bookPage', {result:book}))
    .catch(error => sendErroPage(res, error));
});

app.get('/inputForm', (req, res) =>  
res.render('form', {
    title: "Add book",
    header1: "Add a new book",
    action: "/input",
    bookID: {value: "", readonly: ""},
    name: {value: "", readonly: ""},
    author: {value: "", readonly: ""},
    year: {value: "", readonly: ""},
    type: {value: "", readonly: ""},
})
);

app.post('/input', (req, res) => {
    if (!req.body) return res.statusCode(500);

    dataStorage.insert(req.body)
    .then(status => sendStatusPage(res, status))
    .catch(error => sendErroPage(res, error))
})

app.get('/updateForm', (req, res) =>  
res.render('form', {
    title: "Update book",
    header1: "Update book data",
    action: "/updateData",
    bookID: {value: "", readonly: ""},
    name: {value: "", readonly: "readonly"},
    author: {value: "", readonly: "readonly"},
    year: {value: "", readonly: "readonly"},
    type: {value: "", readonly: "readonly"},
})
);

app.post('/updateData', (req, res) => {
    if(!req.body) return res.sendStatus(500);

    dataStorage.getOne(req.body.bookID)
    .then(book => 
        res.render('form', {
            title: "Update book",
            header1: "Update book data",
            action: "/update",
            bookID: {value: book.bookID, readonly: "readonly"},
            name: {value: book.name, readonly: ""},
            author: {value: book.author, readonly: ""},
            year: {value: book.year, readonly: ""},
            type: {value: book.type, readonly: ""},
        }))
    .catch(error => sendErroPage(res, error));
});

app.post('/update', (req, res) => {
    if (!req.body) return res.statusCode(500);

    dataStorage.update(req.body)
    .then(status => sendStatusPage(res, status))
    .catch(error => sendErroPage(res, error))
});

app.get('/removeBook', (req, res) => 
    res.render('getSingleBook',{
        title: 'Remove',
        header1:'Remove',
        action:'/removeBook'
    })
);

app.post('/removeBook', (req, res) => {
    if (!req.body) return res.sendStatus(500);

    dataStorage.remove(req.body.id)
    .then(status => sendStatusPage(res, status))
    .catch(error => sendErroPage(res, error));
});

app.listen(port, host, () => console.log(`Server running on port ${port} on ${host}`));

const sendErroPage = (res, error, title='Error', header1='Error') => {
    sendStatusPage(res, error, title, header1);
}

const sendStatusPage = (res, status, title='Status', header1='Status') => {
    return res.render('statusPage', {title, header1, status});
}