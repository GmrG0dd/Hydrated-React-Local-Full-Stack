import { app } from '../server';
import express from 'express';
import session from "express-session";
import connectMongoDBSession from 'connect-mongodb-session';


/**
 * 
 * Adding correct typing to the express sessions via delclaration merging.
 * 
 */
declare global {
    namespace Express {
        interface Partial<SessionData> {
            passport?: {
                user?: string
            },
            serverProps: ServerPropsType
        }
    }
}


/**
 * 
 * Declaring some middleware functions.
 * 
 */
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('etag', false);


/**
 * 
 * Initializing the sessions and how they're stored in mongoDB 
 * 
 */
const MongoDBStore = connectMongoDBSession(session);
app.use(session({ 
    secret: 'secret', //save in env variables 
    resave: true,
    saveUninitialized: true,
    cookie: { 
        secure: false, //change to true when hosting on https server
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: true
    },
    store: new MongoDBStore({
        uri: 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.0',
        databaseName: 'test',
        collection: 'User Sessions',
        expires: 1000 * 60 * 60 * 24
    })
}));