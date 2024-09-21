const debug = require('debug')('app:startup');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');
const authenticator = require('./authenticator');
const express = require('express');


const app = express();

app.set('view engine', 'pug');
app.set('views', './views'); //default

// Built-in middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

// Third-part middleware
app.use(helmet());

// For any route that starts with /api/courses uses the courses router object)
app.use('/api/courses', courses);

// Hompage
app.use('/', home);

// Configuration
console.log('Application Name: ' +  config.get('name'));
console.log('Mail Server: ' +  config.get('mail.host'));
// console.log('Mail Password: ' +  config.get('mail.password'));

if (app.get('env') === 'development'){
    app.use(morgan('tiny'));
    //console.log('Morgan enabled...');
    debug('Morgan enabled...');
}

// Custom third-part middleware by me :)
app.use(logger);
app.use(authenticator);

//Environment Variable called PORT
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on Port ${port}`));