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

server.get('/api/projects/:id', (req, res) => {
    const {id} = req.params;
    db('projects')
    .where({id})
    .first()
    .then(projects => {
        db('actions')
        .where({project_id: id})
        .then(actions => {
            const foo = Object.assign(projects);
            console.log(projects)
            const response = {...foo, actions};
            res.status(200).json(response)
        })
    })
    .catch(error => {
        res.status(500)
        res.json(`Hm, can't find that one. Sure you've got the ID right?`)
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

