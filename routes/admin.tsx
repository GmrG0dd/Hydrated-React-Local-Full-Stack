import express from "express";
import React from "react";
import Admin from "../pages/Admin";
import exportHTML from "../utils/exportHTML";
import { isAdmin } from "../utils/authentication";

const admin = express.Router();

admin.route('/')
    .get(isAdmin, async (req, res) => {
        res.send(exportHTML(<Admin ServerProps={req.session.serverProps}></Admin>, 'Admin', req.session.serverProps));
    });

export default admin;