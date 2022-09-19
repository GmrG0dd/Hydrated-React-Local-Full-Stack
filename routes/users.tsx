import express, { Response, Request} from 'express';
import passport from 'passport';
import crypto from 'crypto';
import { myDB } from '../server';

import React from 'react'
import { ServerPropsDefault } from "../utils/serverProps";
import { renderToString } from "react-dom/server";
import exportHTML from "../utils/exportHTML.js";
import Login from '../pages/Login';
import Register from "../pages/Register.js";

const users = express.Router();

users.route('/login')
    .post(passport.authenticate('local', {successRedirect: '/', failureRedirect: '/user/register'}))
    .get(async (req:any, res: Response) => {
        var serverProps = ServerPropsDefault;
        req.session.passport?.user ? serverProps.isAdmin = true : serverProps.isAdmin = false;

        res.send(exportHTML(renderToString(<Login ServerProps={serverProps}/>), 'Login', serverProps));
    });

users.route('/logout')
    .get(async (req:Request, res:Response) => {
        req.logout(() => {
            res.redirect('/');
        });
    });

users.route('/register')
    .post((req:Request, res:Response) => {
        const salthash = generatePassword(req.body.password);
        const user = {
            id: crypto.randomBytes(32).toString('hex'),
            username: req.body.username,
            hash: salthash.hash,
            salt: salthash.salt,
            admin: true
        };
        if(myDB.find('users', {username: req.body.username})) {
            res.send(false); 
            return;
        }
        const usersuccess = myDB.write('users', user);
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


export default users;

