import { Request, Response, NextFunction, Router} from "express";

var express = require('express');
const router: Router = express.Router();

/* GET home page. */
router.get('/', function(req: Request, res: Response, next: NextFunction) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
