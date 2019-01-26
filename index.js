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

server.get('/api/actions', (req, res) => {
    db('actions')
    .then(actionsInfo => {
        res.send(actionsInfo)
    })
    .catch(error => {
        res.status(500)
        res.json(`Huh, I can't find those actions`)
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

server.post('/api/actions', (req, res) => {
    const action = req.body;
    console.log('amadeus, line 48');
    db('actions').insert(action)
    .then(action => {
        console.log('mozart, line 51')
        res.json(action)
    })
    .catch(error => {
        res.status(500)
        res.json(`Error posting, please check and try again`)
    })
})