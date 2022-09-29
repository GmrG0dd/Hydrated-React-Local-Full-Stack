import { Response, NextFunction } from "express";
import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import crypto from 'crypto';
import { myDB } from '../server';

passport.use(new LocalStrategy({
    usernameField: 'username', 
    passwordField: 'password'
}, (username, password, done) => {
    let user:any = myDB.find('users', { username: username });
    if(!user || !user[0]) return done(null, null);
    user = user[0];
    if (user.hash === crypto.pbkdf2Sync(password, user.salt, 10000, 64, 'sha512').toString('hex')) {
        return done(null, user);
    } 
    return done(null, null);
}));



import { app } from '../server';

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user:any, done) => {
    done(null, user.id);
});
passport.deserializeUser((userID, done) => {
    let user:any = myDB.find("users", {id: userID});
    if(user[0]) done(null, user[0]);
    else done(null, null);
});


app.use((req:any, res:Response, next:NextFunction) => {
    if(req.session.passport?.user) req.session.serverProps = {...req.session.serverProps, isAdmin: true};
    else req.session.serverProps = {...req.session.serverProps, isAdmin: false};  
    req.session.save();
    next();
});


function isAuth ( req:any, res:Response, next:NextFunction ) {
    if(req.isAuthenticated()) { next() }
    else res.send("Unauthenticated");
};

function isAdmin ( req:any, res:Response, next:NextFunction ) {
    if( req.isAuthenticated() && req.user.admin ) { next() }
    else res.send("Unauthenticated");
}

export { isAdmin, isAuth };