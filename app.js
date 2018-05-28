const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
// TO DEBUG
// set DEBUG=*,-not_this
// $env:DEBUG = "*,-not_this"
// node app.js
const morgan = require('morgan');
const path = require('path');
const sql = require('mssql');

const app = express();
const port = process.env.PORT || 3000;

const config = require('./config');

// Create a "config.js" file and add the database configuration.
// In this case, I have used Azure SQL server.
// 
// const config = {
//     user: 'user',
//     password: 'password123',
//     server: 'library.database.windows.net',
//     database: 'Library',
//     options: {
//         encrypt: true
//     }
// }
// module.exports = config;

sql.connect(config).catch(err => debug(err));

app.use(morgan('tiny'));
app.use((req, res, next) => {
    debug('my middleware');
    next();
});

app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist/')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [
    {link:'/books', title:'Book'}, 
    {link:'/authors', title:'Author'}
]

const bookRouter = require('./src/routes/bookRoutes')(nav);

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