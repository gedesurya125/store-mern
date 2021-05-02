import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import {generateNewToken, generateRefToken} from '../commons/function/jwtGenerator.js';
dotenv.config();


export const login = (req, res) => {
  console.log(req.body);
  const username = req.body.username;
  const data = {
    username: username
  };

  let token = {
    authToken: '',
    refToken: ''
  }
  
  generateNewToken(data, (err, generatedAuthToken) => {
    if(err) return res.status(400).json({
      error: true, 
      message: 'error generate new Auth Token : ' + err, 
      data: null
    });

    token = {...token, authToken: generatedAuthToken};

    generateRefToken(data, (err2, generatedRefToken) => {
      if(err2) return res.status(400).json({
        error: true, 
        message: 'error generate Refresher Token ' + err2, 
        data: null
      });
      token = {...token, refToken: generatedRefToken}

      res.status(200).json({
        error: false, 
        message: null, 
        data: token
      })
    })




    // err ? res.status(400).json({error: true, message: err, data: null}) : res.json({error: false, mesage: null, data: generatedToken});
  })

  // const token = jwt.sign(data, process.env.AUTHENTICATION_SECRET);
  // res.json({
  //   accessToken: token
  // });
}
