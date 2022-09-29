import express, { Application } from "express";
import session from "express-session";
const app:Application = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({ 
    secret: 'secret', //save in env variables 
    resave: true,
    saveUninitialized: true,
    cookie : { 
        secure : false, //change to true when hosting on https server
        maxAge : (24 * 60 * 60 * 1000),
        sameSite: true
    },
}));


/**
 * 
 * declare your server prop types
 * 
 */
declare global { 
    type ServerPropsType = {
        isAdmin: boolean 
}}


/**
 * 
 * declare schemas for local database
 * 
 */
import db from 'my-local-json-db';
const myDB = new db({
    users: {
        id: 'string',
        username: 'string',
        hash: 'string',
        salt: 'string',
        admin: 'boolean'
    }
});


/**
 * 
 * Declare your routes
 * 
 */
import staticFiles  from './utils/staticFiles.js';
import index from './routes/index.js';
import users from './routes/users.js';
import admin from './routes/admin.js';

app.use('/', index);
app.use('/static', staticFiles);
app.use('/user', users);
app.use('/admin', admin);


/**
 * 
 * Declaring static files in the assets folder and starting up server
 * 
 */
app.use(express.static('assets'));
app.listen(3000, () => { console.log('Listening!\n\n') });



export { app, myDB };
export type { ServerPropsType };
