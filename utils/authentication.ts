import { Request, Response, NextFunction } from "express";
import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import crypto from 'crypto';
import { User } from '../db/Users';

passport.use(new LocalStrategy({
    usernameField: 'username', 
    passwordField: 'password'
}, async (username, password, done) => {
    const user = await User.findOne({ username: username }).exec();
    if (user && user.hash === crypto.pbkdf2Sync(password, user.salt, 10000, 64, 'sha512').toString('hex')) {
        return done(null, user);
    }
    return done(null, null);
}));

import { app } from '../server';

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user.passportid);
});
passport.deserializeUser(async (userID, done) => {
    const user = await User.findOne({ passportid: userID }).exec();
    if(user) done(null, user);
    else done(null, null);
});

app.use((req, res, next) => {
    if(req.session.passport?.user) req.session.serverProps = {...req.session.serverProps, isAdmin: true};
    else req.session.serverProps = {...req.session.serverProps, isAdmin: false};  
    req.session.save();
    next();
});

function isAuth ( req:Request, res:Response, next:NextFunction ) {
    if(req.isAuthenticated()) { next() }
    else res.send("Unauthenticated");
};

function isAdmin ( req:Request, res:Response, next:NextFunction ) {
    if(req.isAuthenticated() && req.user.admin) { next() }
    else res.send("Unauthenticated");
}

export { isAdmin, isAuth };