import express, { Request, Response, NextFunction } from 'express';
import fs from 'fs';
const staticFiles = express.Router();
import path from 'path';

staticFiles.route('/styles/*')
    .get( async (req:Request, res: Response) => {
        res.sendFile(path.resolve('./public/styles' + req.path.split('styles')[1]));
    });

staticFiles.route('/scripts/*')
    .get( async (req:Request, res: Response) => {
        res.sendFile(path.resolve('./public/src' + req.path.split('scripts')[1]));
    });

export default staticFiles;