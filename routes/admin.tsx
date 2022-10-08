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
        const inputDataType:DataType[] = req.body;
        if(inputDataType && inputDataType.length == 1){
            if(myDB.write('dataType', inputDataType[0])) {
                res.send(true);
                return;
            }
        } else if(inputDataType && inputDataType.length == 2) {
            if(myDB.write('dataType', inputDataType[0], inputDataType[1])) {
                res.send(true);
                return;
            }
        }
        res.send(false);
    })
    .delete(async (req:Request, res:Response) => {
        const inputDataType:DataType = req.body;
        if(inputDataType && myDB.delete('dataType', inputDataType)) res.send(true);
        else res.send(false);
    })



export default admin;