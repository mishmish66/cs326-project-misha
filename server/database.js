import { readFile } from 'fs/promises';
import pg from 'pg'

const { Client } = pg

export const database = await (async() => {
    const config = JSON.parse(
        await readFile("./server/pgconfig.json", 'utf8')
    );
    const client = new Client(config);
    await client.connect();

    const init_text = `
    create table if not exists motors (
        id serial not null primary key,
        name varchar(128),
        power double precision,
        torque double precision,
        price double precision,
        mass double precision
    )`;
    const res = await client.query(init_text);

    return {
        add_motor: async (motor) => {
            const query = {
                text: `
                INSERT INTO motors
                VALUES (DEFAULT, ${motor.name}, ${motor.power}, ${motor.torque}, ${motor.price}, ${motor.mass})
                RETURNING *`,
                rowmode: 'array'
            };
            const res = await client.query(query);
            return res.rows[0];
        },
        delete_motor: async (id) => {
            const query = { text: `DELETE FROM motors WHERE id = ${id}` }
            await client.query(query)
        },
        get_motor_by_id: async (id) => {
            const query = { text: `SELECT * FROM motors WHERE id = ${id}`, rowmode: 'array' };
            const data = await client.query(query).rows;
        },
        get_motor_ids: async () => {
            const query = { text: 'SELECT id FROM motors', rowmode: 'array' };
            const data = (await client.query(query)).rows;
        },
        get_motors: async () => {
            const query = { text: 'SELECT * FROM motors', rowmode: 'array' };
            const data = (await client.query(query)).rows;
            return data;
        },
        update_motor: async (motor) => {
            const query = {
                text: `
                    UPDATE motors SET
                    name = ${motor.name},
                    power = ${motor.power},
                    torque = ${motor.torque},
                    price = ${motor.price},
                    mass = ${motor.mass},
                    WHERE id = ${motor.id}
                    RETURNING *`
            }
        },
        close: async () => { await client.release() },
    }
})()