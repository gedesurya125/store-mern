import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();


//### Config ###
const tokenExpire = '15s';
const genereateToken = (data, secreet, expire, cb) => {
  !expire ? jwt.sign(data, secreet, (err, generatedToken) => cb(err, generatedToken)) :
  jwt.sign(data, secreet, {expiresIn: expire}, (err, generatedToken) => cb(err, generatedToken));
}

//Generate new token for first login
export const generateNewToken = (data, cb) => {
  genereateToken(data, process.env.AUTHENTICATION_SECRET, tokenExpire, cb);
}

//Generate refresher token

export const generateRefToken = (data, cb) => {
  genereateToken(data, process.env.REFRESH_SECRET, null, cb);
}