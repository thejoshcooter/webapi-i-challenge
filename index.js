// implement your API here
const express = require('express');
const db = require('./data/db');

const server = express();
server.use(express.json());

const port = 5000;

server.get('/', (req, res) => {
    res.send('Hello from express');
});

server.get('/api/users', (req, res) => {
  db
    .find()
    .then(users => {
      res.json({ users })
    })
    .catch(error => {
      res.status(500).json({ errorMessage: 'error retrieving user', error })
    })
});

server.get('/api/users/:id', (req, res) => {
  db
    .findById(req.params.id)
    .then(users => {
      res.json({ users })
    })
    .catch(error => {
      res.status(500).json({ errorMessage: 'error retrieving user id', err })
    })
  });

server.post('/api/users', (req, res) => {
  console.log('[REQ BODY]', req.body);
  const { name, bio, created_at, updated_at } = req.body;
  if (!name || !bio) {
    res.status(400).json({ errorMessage: 'name and bio required' })
  }

  db
    .insert({
      name,
      bio,
      created_at,
      updated_at
    })
    .then(response => {
      res.status(201).json(response)
    })
    .catch(error => {
      res.status(400).json({ errorMessage: 'error adding user' })
    })
});

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, bio } = req.body;
    if (!name || !bio) {
      res.status(400).json({ errorMessage: 'name and bio required' })
    }

    db
      .update(id, {name, bio})
      .then(response => {
        if (user.length === 0) {
          res.status(404).json({ errorMessage: 'user not found' })
          return;
        }
        res.status(201).json(user);
      })
      .catch(error => {
        res.status(500).json({ errorMessage: 'error finding user' })
      })
});

server.delete('/apit/users/:id', (req, res) => {
    const { id } = req.params;
    db
      .remove(id)
      .then(response => {
        if(response === 0) {
          res.status(200).json({ success: 'delete successful' })
        } else {
          res.status(404).json({ errorMessage: 'user does not exist' })
        }
      })
      .catch(error => {
        res.status(500).json({ errorMessage: 'error deleting user' })
      })
});

server.listen(port, () => console.log('server is listening on port 5000'))
