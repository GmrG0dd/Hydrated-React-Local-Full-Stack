import express, { Request, Response } from "express";
import { isAdmin } from "../utils/authentication";

import React from "react";
import Admin from "../pages/Admin";
import exportHTML from "../utils/exportHTML";
import { myDB } from "../server";

const admin = express.Router();



admin.route('/')
    .get(async (req:any, res: Response) => {
        const dataTypes = myDB.find('dataType');
        if(dataTypes) req.session.serverProps = {...req.session.serverProps, dataTypes: dataTypes};
        res.send(exportHTML(<Admin ServerProps={req.session.serverProps}/>, 'Admin', req.session.serverProps));
    })
    .post(async (req:Request, res: Response) => {
        const inputDataType = req.body;
        if(inputDataType.title && inputDataType.dataFieldTypes && myDB.write('dataType', inputDataType)) res.send(true);
        else res.send(false);
    })
    .delete(async (req:Request, res:Response) => {
        const inputDataType = req.body;
        let response;
        if(inputDataType.title && inputDataType.dataFieldTypes) response = myDB.delete('dataType', inputDataType);
        if(response) res.send(response.toString());
        else res.send(false);
    })



export default admin;