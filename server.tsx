/**
 * declare your 
 */
declare global { 
    type ServerPropsType = {
        isAdmin?: boolean 
}}



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

import express, { Application } from "express";
const app:Application = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));



import index from './routes/index.js';
import staticFiles  from './routes/staticFiles.js';
import users from './routes/users.js';
import admin from './routes/admin.js';

app.use('/', index);
app.use('/static', staticFiles);
app.use('/user', users);
app.use('/admin', admin);



app.listen(3000, () => { console.log("starting!") } );



export { app, myDB };
export type { ServerPropsType };
