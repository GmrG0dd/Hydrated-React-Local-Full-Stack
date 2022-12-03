/**
 * 
 * Initializing our express server.
 * 
 */
import express from "express";
export const app = express();


/**
 * 
 * Declare your server prop types.
 * 
 */
declare global { 
    type ServerPropsType = {
        isAdmin?: boolean
    }
}
export type { ServerPropsType };



/**
 * 
 * Import utility functions / middleware before your routes
 * 
 */
import './utils/serverConfig';
import './utils/authentication';


/**
 * 
 * Declare your routes
 * 
 */
import index from './routes/index';
import users from './routes/users';
import admin from './routes/admin';

app.use('/', index);
app.use('/user', users);
app.use('/admin', admin);


/**
 * 
 * Declaring static files in the assets folder and starting up server
 * 
 */
app.use('/assets', express.static('src/puclic/assets'));
app.use('/CSS', express.static('src/public/CSS'));
app.use('/JS', express.static('src/public/JS'));

app.listen(3000);