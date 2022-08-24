import express from 'express';
import logger from 'morgan';

import { database } from './database.js';

console.log(database);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use('/', express.static('client'));

const motor_values = ['name', 'power', 'torque', 'price', 'mass'];

app.post('/addMotor', async (request, response) => {
    const motor = request.body.motor;
    if (motor_values.reduce((acc, val) => val in motor && acc, true)) {
        response.status(200).json({
            status: `success`,
            motor: await database.add_motor(body.motor),
        });
    } else
        response.status(400).json({ error: `Invalid add motor request. Needs name, power, torque, price, and mass in motor in body` });
});

app.get('/getMotors', async (request, response) => {
    response.status(200).json({
        status: 'success',
        motors: await database.get_motors(),
    });
})

app.listen(port, () => {
        // This is totally just for fun!
    }); 