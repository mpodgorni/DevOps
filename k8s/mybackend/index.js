const express = require("express");
const cors = require('cors');
const redis = require("redis");
const { v4: uuidv4 } = require('uuid'); 
const serverId = uuidv4();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const { Pool } = require('pg');
const { text } = require("body-parser");
const pgClient = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    port: "5432"
});

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
});

redisClient.on('connect', () => {
    console.log("Connected to redis.");
});
redisClient.on('error', (err) => {
    console.log(error);
});

pgClient.on('connect', () => {
    console.log("Postgres connected!");
});
pgClient.on('error', (err) => {
    console.log(err);
});

pgClient
.query('CREATE TABLE IF NOT EXISTS games (id serial primary key, name TEXT, price decimal(6,2));')
.catch( (err) => {
    console.log('pgClient error:' + err);
});

app.get('/', (req, res) => {
    res.send("Welcome! Devipod server is running!");
});

app.get('/server', (req, res) => {
    res.send(`Server uuid: ${serverId}`);
});

app.get("/games", (req, res) => {
    pgClient.query('select * from games order by 1 desc;', (err, result) => {
        if(err) { throw err; }
        res.status(200).json(result.rows);
    });
});

app.get("/game/:id", (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const textId = `/game/:${id}`;
        
        redisClient.get(textId, async (err, result) => {
            if(result) {
                return res.status(200).send({
                    message: 'Get from cache.',
                    data: JSON.parse(result)
                });
            } else {
                pgClient.query('select * from games where id = $1;', [id], (err, result) => {
                    if(err) { throw err; }
                    const rows = JSON.stringify(result.rows);
                    redisClient.set(textId, rows, 'EX', 60 * 60 * 24);
                    res.status(200).send({
                        message: 'Get from server.',
                        data: JSON.parse(rows)
                    });
                });
            }
        });
    } catch (err) {
        console.log(err);
    }
});

app.post('/game', (req, res) => {
    const { name, price } = req.body;

    pgClient.query('insert into games (name, price) values ($1, $2) returning id;', [name, price], (err, result) => {
        if(err) { throw err; }
        
        const id = result.rows[0].id;
        const textId = `/game/:${id}`;

        redisClient.set(textId, JSON.stringify([{id: id, ...req.body}]), 'EX', 60 * 60 * 24);
        res.status(201).json({
            message: 'Success. You add record to db.',
            data: {id: result.rows[0].id, name: name, price: price}
        });
    });
});

app.delete('/game/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const textId = `/game/:${id}`;

        pgClient.query('delete from games where id = $1;', [id], (err, result) => {
            if(err) { throw err; }
            redisClient.del(textId, function(err, re) {
                console.log(re);
            });
            res.status(201).json({
                message: 'OK. You delete record from db.',
            });
        });
    } catch (err) {
        console.log(err);
    }
});

app.put('/game/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const textId = `/game/:${id}`;
    const { name, price } = req.body;

    pgClient.query(`update games set name = $1, price = $2 where id = ${id};`, [name, price], (err, result) => {
        if(err) { throw err; }

        redisClient.set(textId, JSON.stringify([{id: id, ...req.body}]));

        res.status(201).json({
            message: 'OK. You update record in db.'
        });
    });
});


const PORT = 4000;

app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`);
});