import express, { Response, Request } from 'express';
import passport from 'passport';
import crypto from 'crypto';
import { myDB } from '../server';

import React from 'react';
import exportHTML from "../utils/exportHTML.js";
import Login from '../pages/Login';
import Register from "../pages/Register.js";

const users = express.Router();

users.route('/login')
    .post(passport.authenticate('local', {successRedirect: '/', failureRedirect: '/user/register'}))
    .get(async (req:any, res: Response) => {
        res.send(exportHTML(<Login ServerProps={req.session.serverProps}/>, 'Login', req.session.serverProps));
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
        console.log(usersuccess);
        if(usersuccess) res.redirect('/user/login');
        else { res.redirect('/user/register') }
    })
    .get(async (req:any, res: Response) => {
        res.send(exportHTML(<Register ServerProps={req.session.serverProps}/>, 'Register'));
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

