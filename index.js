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

server.get('/', (req, res) => {
    res.send(`Good morning!`)
})

server.get('/api/projects', (req, res) => {
    db('projects')
    .then(projectsInfo => {
        res.send(projectsInfo)
    })
    .catch(error => {
        res.status(500) 
        res.json(`Huh, I can't find those projects`)

    })
})

server.post('/api/projects', (req, res) => {
    const project = req.body;
    console.log('marco, line 30');
    db('projects').insert(project)
    .then(project => {
        console.log('polo, line 33')
        res.json(project)
    })
    .catch(error => {
        res.status(500)
        res.json(`Error posting, please check and try again`)
    })
})