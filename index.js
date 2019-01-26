const express = require('express');
const knex = require('knex');

const db_config = require('./knexfile');

const server = express();
const db = knex(db_config.development);
const PORT = 9876;

server.use(express.json());

server.listen(PORT, () => {
    console.log('Hello!')
})