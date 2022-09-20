import express, { Request, Response } from 'express';
import path from 'path';
import { execSync } from 'child_process';

const staticFiles = express.Router();



const files = execSync("cd pages && ls").toString().split('\n');
files.splice(files.length-1, 1);

staticFiles.route('/styles/*')
    .get( async (req:Request, res: Response) => {
        res.sendFile(path.resolve('./public/styles' + req.path.split('styles')[1]));
    });

staticFiles.route('/scripts/*')
    .get( async (req:Request, res: Response) => {
        if(files.length == 1){
            res.sendFile('./public/src/' + files[0]);
        }
        res.sendFile(path.resolve('./public/src' + req.path.split('scripts')[1]));
    });



export default staticFiles;