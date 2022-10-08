import express, { Request, Response } from "express";
import { isAdmin } from "../utils/authentication";

import React from "react";
import DataOrganizer from "../pages/DataOrganizer";
import exportHTML from "../utils/exportHTML";
import { myDB } from "../server";

const admin = express.Router();



admin.route('/')
    .get(async (req:any, res: Response) => {
        const dataTypes = myDB.find('dataType');
        if(dataTypes) req.session.serverProps = {...req.session.serverProps, dataTypes: dataTypes};
        res.send(exportHTML(<DataOrganizer ServerProps={req.session.serverProps}></DataOrganizer>, 'DataOrganizer', req.session.serverProps));
    })
    .post(async (req:Request, res: Response) => {
        const inputDataType:DataType[] = req.body;
        if(!inputDataType) { res.send(false); return; }
        if(inputDataType[0].title.length == 0 || inputDataType[0].dataFieldTypes.every(field => {
            if(field.name.length == 0 || field.type.length == 0) return true;
            else return false;
        })){
            res.send(false);
            return;
        }

        if(inputDataType.length == 1){
            if(myDB.write('dataType', inputDataType[0])) {
                res.send(true);
                return;
            }
        } else if(inputDataType.length == 2) {
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