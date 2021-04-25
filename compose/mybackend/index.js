const express = require("express");
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const redis = require('redis');
const { request } = require('express');

const redisClient = redis.createClient({
    host: "myredis", 
    port: 6379
    //retry_strategy: () => 1000
});

redisClient.on('connect', () => {
    console.log("Connected to RedisClient");
});

const { Pool } = require('pg');
const pgClient = new Pool({
    user: "postgres",
    password: "1qaz2wsx",
    database: "postgres",
    host: "mypostgres",
    port: "5432"
});

pgClient.on('error', () => {
    console.log("Postgres not connected!");
});

pgClient
.query('CREATE TABLE IF NOT EXISTS games (id serial primary key, name TEXT, price decimal(6,2));')
.catch( (err) => {
    console.log('pgClient error:' + err);
});

app.get('/', (req, res) => {
    res.send("Welcome! Devipod server is running!");
});

app.get("/games", (req, res) => {
    pgClient.query('select * from games order by 1 desc;', (err, result) => {
        if(err) throw error;
        res.status(200).json(result.rows);
    })
});

app.get("/game/:id", (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const textId = `/game/:${id}`;
        
        redisClient.get(textId, async (error, result) => {
            if(result) {
                return res.status(200).send({
                    data: JSON.parse(result),
                    msg: 'Cache.'
                })
            } else {
                pgClient.query('select * from games where id = $1;', [id], (err, result) => {
                    if(err) throw error;

                    const rows = JSON.stringify(result.rows);
                    console.log(`id: ${id}, data: ${rows}`);

                    redisClient.set(textId, rows, 'EX', 60 * 60 * 24);
                    return res.status(200).send({
                        data: JSON.parse(rows),
                        msg: 'Server.'
                    })
                });
            }
        });
    } catch (error) {
        console.log(error);
    }
});

app.post('/game', (req, res) => {
    const { name, price } = req.body;

    pgClient.query('insert into games (name, price) values ($1, $2) returning id;', [name, price], (err, result) => {
        if(err) throw error;
        
        const id = result.rows[0].id;
        const textId = `/game/:${id}`;

        redisClient.set(textId, JSON.stringify([{id: id, ...req.body}]), 'EX', 60 * 60 * 24);
        res.status(201).json({
            msg: 'Success. You add record to db.',
            data: {id: result.rows[0].id, name: name, price: price}
        });
    })
});

app.delete('/game/:id', (req, res) => {
    const id = parseInt(req.params.id);

    pgClient.query('delete from games where id = $1;', [id], (err, result) => {
        if(err) throw error;
        res.status(201).json({
            msg: 'OK. You delete record from db.',
        });
    })
});

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`);
});