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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var express = require("express");
var router = express.Router({ mergeParams: true });
var axios = require("axios");
// api to search for books
const googleapi = process.env.API_BASE_URL;
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
        let url = googleapi + searchTerm + "&startIndex=" + startIndex + "&maxResults=12";
        // api call to google books.
        yield axios.get(url, axiosConfig)
            .then((data) => {
            // return the response
            res.send(data.data);
        })
            // if error happens return 500 and throw it
            .catch(next);
    });
});
module.exports = router;
