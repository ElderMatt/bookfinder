"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
const router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});
module.exports = router;
