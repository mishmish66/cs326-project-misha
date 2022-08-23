import express from 'express';
import logger from 'morgan';

import { database } from './database.js';

const app = express();
const port = process.env.PORT || 3000;

database.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use('/', express.static('client'));