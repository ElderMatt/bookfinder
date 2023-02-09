"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router({ mergeParams: true });
var axios = require("axios");
// api to search for books
const googleapi = 'https://www.googleapis.com/books/v1/volumes?q=';
// axiosConfig to allow Cors
const axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
};
// entry into API
router.get("/", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        res.header("Access-Control-Allow-Origin", "*");
        let searchTerm = req.query.name;
        let startIndex = req.query.startIndex;
        var response;
        // api call to google books.
        yield axios.get(googleapi + searchTerm + "&startIndex=" + startIndex + "&maxResults=12", axiosConfig)
            .then((data) => {
            response = data;
            // return the response
            res.send(response.data);
        })
            // if error happens return 500 and throw it
            .catch(next);
    });
});
module.exports = router;
