const {db} = require ('../util/admin');

//function for PUT, POST, DELETE and GET HTTP methods
exports.getAllTodos = (request,response) => {
    db
       .collection('todos')
       .orderBy('createAt', 'desc')
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

exports.postOneTodo = (request, response) => {

    if(request.body.body.trim() === ''){
        return response.status(400).json({body: 'Must not be empty'});
    }

    if(request.body.title.trim() === ''){
        return response.status(400).json({body: 'Must not be empty'});
    }

    const newTodoitem = {
        title : request.body.title,
        body : request.body.body,
        createAt : new Date().toISOString()
    }
    db
        .collection('todos')
        .add(newTodoitem)
        .then(doc => {
            const responseTodoItem = newTodoitem;
            responseTodoItem.id = doc.id;
            return response.json(responseTodoItem);
        })
        .catch(err => {
            response.status(500).json({error: "Something went wrong"});
            console.error(err);
        });

};

exports.deleteOneTodo = (request, response) => {
    const document = db.doc(`/todos/${request.params.todoId}`);
    document
            .get()
            .then(doc => {
                if(!doc.exists){
                    return response.status(400).json({error: 'TodoItem not found'})
                }
                return document.delete();
            })
            .then( () => {
                response.json({message: 'Delete successful'});
            })
            .catch( err => {
                console.error(err);
                return response.status(500).json({error: err.code});
            });
};

exports.putOneTodo = (request, response) => {
    if(request.body.todoId || request.body.createdAt){
        response.status(403).json({message: 'Not allowed to edit'});
    }

    let document = db.collection('todos').doc(`${request.params.todoId}`);
    document.update(request.body)
            .then(() => {
                response.json({message : 'Updated successfully'});
            })
            .catch((err) => {
                console.error(err);
                return response.status(500).json({ 
                        error: err.code 
                });
            });

};