const functions = require('firebase-functions');
const app = require('express')();

const {loginUser} = require('./API/users');

app.post('/login', loginUser);

const{
    getAllTodos,
    postOneTodo,
    deleteOneTodo,
    putOneTodo
} = require('./APIs/todos')

app.put('todo/:todoId', putOneTodo); //update one todo

app.delete('/todo/:todoId', deleteOneTodo); //delete one todo

app.post('/todo', postOneTodo); //post one todo

app.get('/todos',getAllTodos); //get element from database

exports.api = functions.https.onRequest(app);