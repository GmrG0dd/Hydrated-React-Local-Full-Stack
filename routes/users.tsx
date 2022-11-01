import express, { Response, Request } from 'express';
import passport from 'passport';
import crypto from 'crypto';
import React from 'react';
import exportHTML from "../utils/exportHTML";
import Login from '../pages/Login';
import { User } from '../db/Users';

const users = express.Router();

users.route('/login')
    .post(passport.authenticate('local', {successRedirect: '/', failureRedirect: '/user/register'}))
    .get(async (req, res) => {
        res.send(exportHTML(<Login ServerProps={req.session.serverProps}/>, 'Login', req.session.serverProps));
    });

users.route('/logout')
    .get(async (req, res) => {
        req.logout(() => {
            res.redirect('/');
        });
    });

users.route('/register')
    .post(async (req, res) => {
        const salthash = generatePassword(req.body.password);
        const user = {
            passportid: crypto.randomBytes(32).toString('hex'),
            username: req.body.username,
            hash: salthash.hash,
            salt: salthash.salt,
            admin: true
        };
        if(await User.findOne({username: req.body.username}).exec()) {
            res.send(false); 
            return;
        }
        User.create(user, err => {
            if(err) res.send(false); 
            else res.send(true);
            return;
        });
    })


function generatePassword(password: string) {
    var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return {
        salt: salt,
        hash: genHash
    }
}


export default users;

