import express, { Response } from "express";
import React from "react";
import App from "../pages/App.js";
import exportHTML from "../utils/exportHTML.js";

const index = express.Router();



index.get('/', async ( req:any, res:Response ) => {
    res.setHeader("Content-Type", "text/html");
    res.send(exportHTML(<App ServerProps={req.session.serverProps}/>, 'App', req.session.serverProps));
});



export default index;