import { readFile, writeFile } from 'fs/promises';
import pg from 'pg'

const { Client } = pg

export const database = async () => {
    const config = json.parse(
        await readFile("./server/pgconfig.json", 'utf8')
    );
    const client = new Client(config);
    await this.client.connect();

    const init_text = `
    create table if not exists motors (
        id integer,
        name varchar(30),
        power real,
        weight real,
        torque real
    )`
}