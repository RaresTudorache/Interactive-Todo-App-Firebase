const functions = require('firebase-functions');
const app = require('express')();

const{
    getAllTodos,
    postOneTodo
} = require('./APIs/todos')

app.post('/todo', postOneTodo); //post one todo

app.get('/todos',getAllTodos); //get element from database

exports.api = functions.https.onRequest(app);