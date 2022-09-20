import express, { Response } from "express";
import { isAdmin } from "../utils/authentication";

import React from "react";
import Admin from "../pages/Admin";
import exportHTML from "../utils/exportHTML";

const admin = express.Router();



admin.route('/')
    .get(isAdmin, async (req:any, res: Response) => {
        res.send(exportHTML(<Admin ServerProps={req.session.serverProps}/>, 'Admin', req.session.serverProps));
    });



export default admin;