const {db} = require ('../util/admin');


exports.getAllTodos = (request,response) => {
    db
       .collection('todos')
       .orderBy('createAt', 'desx')
       .get()
       .then( data => {
            let todos = [];
            data.forEach(doc => {
                todos.push({
                    todoId: doc.id,
                    title: doc.data().title,
                    body: doc.data().body,
                    createdAt: doc.data().createAt,
                });
            });       
            return response.json(todos); 
       })
       .catch(err => {
           console.error(err);
           return response.status(500).json({error:err.code});
       });
};