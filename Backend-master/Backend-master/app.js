require('dotenv').config();
const Server = require('./models/server');
const { append } = require('express/lib/response');

const server = new Server();


server.listen();