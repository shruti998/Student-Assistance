/**
 * Title : App.js
 * Description : Establish the connection with DB
 * @author : Romil Tiwari
 */

import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import model from './models/models.js';

import routes from './routes/index.js';

import cors from 'cors';

const __dirname = path.resolve();

// mongoose instance connection url connection
mongoose.connect('mongodb://localhost:27017/StudentBuddyApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.Promise = global.Promise;

const app = express();
app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(express.json());

//Allow Server to accept different request from different domain
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

routes(app);

export default app;
