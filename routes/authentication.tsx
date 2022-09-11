import express, { Request, Response, NextFunction } from "express";
const authentication = express.Router();
import passport from 'passport';
import crypto from 'crypto';
import myDB from '../db/myDB.js';

import React from 'react'
import { ServerPropsType, ServerPropsDefault } from "../utils/serverProps";
import { renderToString } from "react-dom/server";
import exportHTML from "../utils/exportHTML.js";
import Login from '../pages/Login';
import Register from "../pages/Register.js";


function isAuth ( req:any, res:Response, next:NextFunction ) {
    if(req.isAuthenticated()) { next() }
    else res.send("Unauthenticated");
};

function isAdmin ( req:any, res:Response, next:NextFunction ) {
    if( req.isAuthenticated() && req.user.admin ) { next() }
    else res.send("Unauthenticated");
}

authentication.route('/login')
    .post(passport.authenticate('local', {successRedirect: '/', failureRedirect: '/user/register'}))
    .get(async (req:any, res: Response) => {
        var serverProps = ServerPropsDefault;
        req.session.passport?.user ? serverProps.isAdmin = true : serverProps.isAdmin = false;

        res.send(exportHTML(renderToString(<Login ServerProps={serverProps}/>), 'Login', serverProps));
    });

authentication.route('/logout')
    .get(async (req:Request, res:Response) => {
        req.logout(() => {
            res.redirect('/');
        });
    });

authentication.route('/register')
    .post((req:Request, res:Response) => {
        const salthash = generatePassword(req.body.password);
        const user = {
            id: 'new',
            username: req.body.username,
            hash: salthash.hash,
            salt: salthash.salt,
            admin: false
        }
        const usersuccess = myDB.write('Users', user);
        if(usersuccess) res.redirect('/user/login');
        else { res.redirect('/user/register') }
    })
    .get(async (req:any, res: Response) => {
        var serverProps = ServerPropsDefault;
        req.session.passport?.user ? serverProps.isAdmin = true : serverProps.isAdmin = false;

        res.send(exportHTML(renderToString(<Register ServerProps={serverProps}/>), 'Register', serverProps));
    });


function generatePassword(password: string) {
    var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return {
        salt: salt,
        hash: genHash
    }
}


export default authentication;

export {isAuth, isAdmin};

