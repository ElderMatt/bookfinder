import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

var express = require("express");
var router = express.Router({ mergeParams: true });
var axios = require("axios");

// api to search for books
const googleapi = process.env.API_BASE_URL!;

// axiosConfig to allow Cors
const axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
};

// entry into API
router.get("/", async function(req: Request, res: Response, next: NextFunction) {
    res.header("Access-Control-Allow-Origin", "*");
    let searchTerm = req.query.name;
    let startIndex = req.query.startIndex;
    let url:string = googleapi + searchTerm + "&startIndex=" + startIndex+ "&maxResults=12";

    // api call to google books.
    await axios.get(url, axiosConfig)
    .then((data: any) => { 
        // return the response
        res.send(data.data);
    })
    // if error happens return 500 and throw it
    .catch(next);
});

module.exports = router;