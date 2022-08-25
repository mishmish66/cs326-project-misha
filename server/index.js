import express from 'express';
import logger from 'morgan';

import { database } from './database.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use('/', express.static('client'));

const motor_values = ['name', 'power', 'torque', 'price', 'mass'];

app.post('/addMotor', async (request, response) => {
    const body = request.body;
    if ('motor' in body && motor_values.reduce((acc, val) => val in body.motor && acc, true)) {
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

app.post('/updateMotor', async (request, response) => {
    const body = request.body;
    if ('motor' in body && motor_values.reduce((acc, val) => val in body.motor && acc, true)) {
        response.status(200).json({
            status: `success`,
            motor: await database.update_motor(body.motor),
        });
    } else
        response.status(400).json({ error: `Invalid update motor request. Needs name, power, torque, price, and mass in motor in body` });
})

app.delete('/deleteMotor', async (request, response) => {
    const id = request.body.id;
    if (database.delete_motor(id)) {
        response.status(200).json({
            status: 'success',
        })
    } else
        response.status(400).json({ error: 'id in delete motor request must exist' });
})

app.listen(port, () => {
    // This is totally just for fun!
}); 