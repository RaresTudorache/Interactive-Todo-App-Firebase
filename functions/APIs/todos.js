const {db} = require ('../util/admin');


exports.getAllTodos = (request,response) => {
    db
       .collection('todos');
}