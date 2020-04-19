const functions = require('firebase-functions');
const app = require('express')();

const{
    getAllTodos,
    postOneTodo,
    deleteOneTodo
} = require('./APIs/todos')

app.delete('/todo/:todoId', deleteOneTodo); //delete one todo

app.post('/todo', postOneTodo); //post one todo

app.get('/todos',getAllTodos); //get element from database

exports.api = functions.https.onRequest(app);