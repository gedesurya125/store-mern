// ####################### AUTH SERVER ##########################

import express from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';


dotenv.config();
const PORT = process.env.PORT || 6000;
const app = express();

// ### COMMON FUNCTION ####
//======================================================
const generateToken = (data, secret, expire, cb) => {
  if(expire === null) return jwt.sign(data, secret, (err, token) => cb(err, token));
  jwt.sign(data, secret, {expiresIn: expire}, (err, token) => cb(err, token));
};

const verifyToken = (token, secret, cb) => {
  jwt.verify(token, secret, (err, data) => cb(err, data))
}

const genAuthToken = (data, cb) => {
  generateToken(data, process.env.AUTHENTICATION_SECRET, '20s', (err, token) => cb(err, token));
}

const genRefreshToken = (data, cb) => {
  generateToken(data, process.env.REFRESH_SECRET, null, (err, token) => cb(err, token));
}

const verAuthToken = (token, cb) => {
  verifyToken(token, process.env.AUTHENTICATION_SECRET, (err, data) => cb(err, data))
}

const verRefreshToken = (token, cb) => {
  verifyToken(token, process.env.REFRESH_SECRET, (err, data) => cb(err, data))
}

function responseJson (isErr, errMsg, data) {
  try{ 
    if(typeof isErr != 'boolean') throw new TypeError('first argument must be boolean');
    if(typeof errMsg != 'string') throw new TypeError('second argument must be string');
    if(typeof data != 'object') throw new TypeError('third argument must be object');

    this.error = isErr;
    this.message = errMsg;
    this.data = data;

  }catch(err){
    console.log(err)
  }
}

function loginInfo (data) {
  this.username = data.username;
  this.password = data.password;
}

// ### ROUTERS ###
//===============================================================
let refreshTokenStore = [];
// login roter
const loginRouter = express.Router();
loginRouter.post('/', (req,res) => {
  const {username, password} = req.body;
  if(!username && !password) return res.status(403).json({
    error: true,
    message: 'please provide username and password',
    data: null
  })
  const data = {
    username,
    password
  }

  let generatedToken = {
    authToken: '',
    refreshToken: ''
  };

  genAuthToken(data, (err, authToken) => {
    if(err) return res.status(403).json({
      error: true,
      message: 'error generate auth token',
      data: err
    });

    generatedToken = {...generatedToken, authToken};

    genRefreshToken(data, (err2, refreshToken) => {
      if(err2) return res.status(403).json({
        error: true,
        message: 'error generate refresh token',
        data: err2
      });
  
      generatedToken = {...generatedToken, refreshToken};

      res.status(200).json({
        error: false,
        message: 'token generated',
        data: generatedToken
      })

      refreshTokenStore.push(generatedToken.refreshToken);
      console.log(refreshTokenStore);
    })
  })
})

//==============================================================

loginRouter.get('/', (req, res, next) => {
  const authorization = req.header('authorization');
  if(!authorization) return res.send(403).json({
    error: true,
    message: 'please provide authorization',
    data: null
  });
  const token = authorization.split(" ")[1];

  if(!token) return res.send(403).json({
    error: true,
    message: 'please provide the token',
    data: null
  });

  verAuthToken(token, (err, data) => {
    err ? res.status(403).json({
      error: true,
      message: err,
      data: null
    }) : req.data = data
  })
  next();

}, (req, res) => {
  const data =  req.data;
  res.status(200).json({
    error: false,
    message: 'data found',
    data
  })
})

//=== TOKEN ROUTER ===

const tokenRouter = express.Router();

tokenRouter.post('/', (req, res) => {
  const {tokenku} = req.body; //

  if(!tokenku) return res.status(403).json(new responseJson(true,'please provide tokenku',{}));
  if(!refreshTokenStore.includes(tokenku)) return res.status(403).json(new responseJson(true,'Refresh Token Not Registered',{}));

  verRefreshToken(tokenku, (err, data) => {
    if(err) return res.status(403).json(new responseJson(true, 'Token Is Not Valid', err));
    const auth = {
      username: data.username,
      password: data.password
    };
    console.log(auth);
    genAuthToken(auth, (err, newToken) => {
      if(err) return res.status(401).json(new responseJson(true, 'generate new Token Failed', {err}));
      res.status(200).json(new responseJson(false, 'new Token Generated', {newToken}));
    })
  })


});

//==

tokenRouter.delete("/", (req,res) => {
  const {tokenku} = req.body;

  if(!tokenku) return res.status(403).json(new responseJson(true,'please provide tokenku',{}));
  if(!refreshTokenStore.includes(tokenku)) return res.status(403).json(new responseJson(true,'Refresh Token Not Registered',{}));

  refreshTokenStore = refreshTokenStore.filter(token => token !== tokenku);
  console.log(refreshTokenStore);
  
  if(!refreshTokenStore.includes(tokenku)) return res.status(200).json(new responseJson(false,'Token Deleted Successfully',{}));
  
  

})


// ### MAIN ####
//==================================================
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.listen(PORT, () => console.log('Server 2 - Auth Server Running On Port : ', PORT));

//root route
app.get('/',(req,res) => res.status(200).json({
  error : null, 
  message : 'Hello From Root Path of Auth Server',
  data : null
}));

//login route
app.use('/login', loginRouter)
app.use('/token', tokenRouter)