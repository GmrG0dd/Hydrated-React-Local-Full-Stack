import express, { Response } from "express";
import React from "react";
import App from "../pages/App.js";
import { renderToString } from "react-dom/server";
import exportHTML from "../utils/exportHTML.js";
import { ServerPropsDefault } from '../utils/serverProps';

const index = express.Router();



index.get('/', async ( req:any, res:Response ) => {
    res.setHeader("Content-Type", "text/html");
    var serverProps = ServerPropsDefault;
    req.session.passport?.user ? serverProps.isAdmin = true : serverProps.isAdmin = false;

    res.send(exportHTML(renderToString(<App ServerProps={serverProps}/>), 'App', serverProps));
});



export default index;