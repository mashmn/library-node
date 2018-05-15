const express = require('express');
const bookRouter = express.Router();

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
        res.render('bookListView',
            {
                nav: [{link:'/books', title:'Books'}, 
                    {link:'/authors', title:'Authors'}],
                title: 'Library',
                books
            }
        );
    });

bookRouter.route('/:id')
    .get((req, res) => {
        const id = req.params.id;
        res.render('bookView',
            {
                nav: [{link:'/books', title:'Books'}, 
                    {link:'/authors', title:'Authors'}],
                title: 'Library',
                book: books[id]
            }
        );
    });

module.exports = bookRouter;