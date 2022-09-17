import express, { Request, Response, NextFunction, Application } from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import myDB from "./db/myDB.js";
import crypto from 'crypto';

import { ServerPropsDefault, ServerPropsType } from './utils/serverProps';

const app:Application = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

declare global {
    interface Window {
        ServerProps:ServerPropsType;
    }
}

passport.use(new LocalStrategy({
    usernameField: 'username', 
    passwordField: 'password'
}, (username, password, done) => {
    let user:any = myDB.find('Users.username', username);
    if(!user || !user[0]) return done(null, null);
    user = user[0];
    if (user.hash === crypto.pbkdf2Sync(password, user.salt, 10000, 64, 'sha512').toString('hex')) {
        return done(null, user);
    } 
    return done(null, null);
}));
app.use(session({ 
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie : { 
        secure : false, 
        maxAge : (4 * 60 * 60 * 1000),
        sameSite: true
    },
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user:any, done) => {
    done(null, user.id);
});
passport.deserializeUser((userID, done) => {
    let user:any = myDB.find("Users.id", userID);
    if(user[0]) done(null, user[0]);
    else done(null, null);
});


import staticFiles  from './routes/staticFiles.js';
import authentication from './routes/authentication.js';
import admin from './routes/admin.js';
import pages from './routes/pages';

app.use('/static', staticFiles);
app.use('/user', authentication);
app.use('/admin', admin);
app.use('/pages', pages);



import React from "react";
import App from "./pages/App.js";
import { renderToString } from "react-dom/server";
import exportHTML from "./utils/exportHTML.js";

app.get('/', async ( req:any, res:Response ) => {
    res.setHeader("Content-Type", "text/html");
    var serverProps = ServerPropsDefault;
    req.session.passport?.user ? serverProps.isAdmin = true : serverProps.isAdmin = false;

    res.send(exportHTML(renderToString(<App ServerProps={serverProps}/>), 'App', serverProps));
});

app.listen(3000, () => { console.log("starting!") } );

