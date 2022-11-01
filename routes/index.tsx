import express, { Response } from "express";
import React from "react";
import App from "../pages/App";
import exportHTML from "../utils/exportHTML";

const index = express.Router();

index.get('/', async ( req, res ) => {
    res.send(exportHTML(<App ServerProps={req.session.serverProps}/>, 'App', req.session.serverProps));
});

export default index;