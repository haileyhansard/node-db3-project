const express = require('express');

const SchemeRouter = require('./schemes/scheme-router.js');

const server = express();

server.use(express.json());
server.use('/api/schemes', SchemeRouter);

server.get('/', (req, res) => {
    res.status(200).json({message: 'API is up and running for DB3 Project: Schemes'});
});

module.exports = server;