import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {privilege} from '../controllers/privilegeController.js';

dotenv.config();
const router = express.Router();

//middleware///////===========================sampai disini
const authentication = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(" ")[1];
  jwt.verify(token, process.env.AUTHENTICATION_SECRET, (err, data) => {
    err ? res.status(401).json({error:true, message: err, data: null}) : req.user = data;
    next()
  })
}

router.get('/',authentication, privilege);

export default router;
