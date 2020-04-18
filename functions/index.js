const functions = require('firebase-functions');
const app = require('express')();

const{
    getAllTodos
} = require('./APIs/todos')

//get the objects statically at the moment
app.get('/todos',getAllTodos);

exports.api = functions.https.onRequest(app);