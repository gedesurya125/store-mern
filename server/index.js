import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import ItemRouter from './routes/item.js';

const app = express();
const PORT = process.env.PORT || 5000;

const MONGOO_URI = "mongodb://gedesurya125:karisma125@product-shard-00-00.b4o2i.mongodb.net:27017,product-shard-00-01.b4o2i.mongodb.net:27017,product-shard-00-02.b4o2i.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-b5juax-shard-0&authSource=admin&retryWrites=true&w=majority";

app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(cors());

app.get("/", (req, res) => res.send("Hello From server"));

app.use("/item", ItemRouter);

mongoose.connect(MONGOO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log(`App started at PORT : ${PORT}`)))
.catch( err => console.log(err));

mongoose.set('useFindAndModify', false);

const connection =  mongoose.connection;
connection.once('open', () => console.log('connection to database succesfull'));



