const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
// TO DEBUG
// set DEBUG=*,-not_this
// $env:DEBUG = "*,-not_this"
// node app.js
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000; 
const bookRouter = express.Router();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist/')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const books = [
    {
        title: 'War and Peace',
        genre: 'History',
        author: 'Lev',
        read: false
    },
    {
        title: 'Men and Women',
        genre: 'Life',
        author: 'Chilly',
        read: false
    }
];

bookRouter.route('/')
    .get((req, res) => {
        res.render('books', 
        {
            nav: [{link:'/books', title:'Books'}, 
                {link:'/authors', title:'Authors'}],
            title: 'Library',
            books
        });
    });

bookRouter.route('/single')
    .get((req, res) => {
        res.send('hello single books');
    });

app.use('/books', bookRouter);
app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, '/views/index.html'));
    res.render(
        'index', 
        {
            nav: [{link:'/books', title:'Books'}, 
                {link:'/authors', title:'Authors'}],
            title: 'Library'
        }
    );
});

app.listen(port, () => {
    debug(`listening at port ${chalk.green(port)}`);
});