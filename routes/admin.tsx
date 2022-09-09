import express, { Request, Response } from "express";
const admin = express.Router();
import { isAuth } from "./authentication";

import React from "react";
import { renderToString } from "react-dom/server";
import Admin from "../src/Admin";
import exportHTML from "../utils/exportHTML";

admin.route('/')
    .get(isAuth, async (req:Request, res: Response) => {
        res.send(exportHTML(renderToString(<Admin/>), 'Admin'));
    });

export default admin;