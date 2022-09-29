import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

const staticFiles = express.Router();



const files = fs.readdirSync("./pages").toString().split(',');
files.splice( files.length-1, 1 );

staticFiles.route('/styles/*')
    .get( async (req:Request, res: Response) => {
        res.sendFile(path.resolve('./public/styles' + req.path.split('styles')[1]));
    });

staticFiles.route('/scripts/*')
    .get( async (req:Request, res: Response) => {
        res.sendFile(path.resolve('./public/src' + req.path.split('scripts')[1]));
    });



export default staticFiles;