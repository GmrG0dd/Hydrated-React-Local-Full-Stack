import express, { NextFunction, Request, Response } from "express";
import { isAdmin } from "../utils/authentication";

import React from "react";
import { renderToString } from "react-dom/server";
import { ServerPropsDefault } from "../utils/serverProps";
import Admin from "../pages/Admin";
import exportHTML from "../utils/exportHTML";

const admin = express.Router();



admin.route('/')
    .get(isAdmin, async (req:any, res: Response, next: NextFunction) => {
        var serverProps = ServerPropsDefault;
        req.session.passport?.user ? serverProps.isAdmin = true : serverProps.isAdmin = false;

        res.send(exportHTML(renderToString(<Admin ServerProps={serverProps}/>), 'Admin', serverProps));
    });



export default admin;