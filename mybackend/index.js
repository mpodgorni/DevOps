const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

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
.query('CREATE TABLE IF NOT EXISTS games (name TEXT);')
.catch( (err) => {
    console.log('pgClient error:' + err);
});

app.get("/", (req, res) => {
    res.send("Hello World")
});

const PORT = 5000
app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`);
});