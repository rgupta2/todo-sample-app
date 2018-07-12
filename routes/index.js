

let express = require('express');

router = express.Router([]);


//takes us to the root(/) URL
router.get('/', function (req, res) {

    //when we visit the root URL express will respond with all available endpoints
    res.send('todo app: GET /todo/all, GET todo/:id, DELETE todo/:id, POST /todo/add, POST /todo/:id/toggle');
});


//the todo array with initial placeholders for added todo
let todos = [{
    id: 1,
    text: "practise with nodejs",
    completed: false
}];

// get route for listing all todos
router.get('/todo/all', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.json(todos);
});

//get route to retrieve a specific todo
router.get('/todo/:id', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let response = todos.filter((x) => x.id === parseInt(req.params.id));

    if (response && response.length > 0) {
        response = response[0];
        res.json(response);
    } else {
        res.status(404).json({'errorMessage': 'Not found'});
    }
});

//get route to retrieve a specific todo
router.post('/todo/:id/toggle', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let todoToBeToggled = todos.filter((x) => x.id === parseInt(req.params.id));

    if (todoToBeToggled && todoToBeToggled.length > 0) {
        todoToBeToggled = todoToBeToggled[0];
        todoToBeToggled.completed = !todoToBeToggled.completed;
        res.json(todoToBeToggled);
    } else {
        res.status(404).json({'errorMessage': 'Not found'});
    }
});

//get route to retrieve a specific todo
router.delete('/todo/:id', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const oldtodoCount = todos.length;
    todos = todos.filter((x) => x.id !== parseInt(req.params.id));
    const newtodoCount = todos.length;

    if (newtodoCount < oldtodoCount) {
        res.status(204).json({});
    } else {
        res.status(404).json({'errorMessage': 'todo doesn\'t exist found'});
    }
});

//post route for adding new todo
router.post('/todo/add', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const newtodo = req.body;

    //add the new todo from the post route into the array
    todos.push(newtodo);

    //after adding to the array go back to the root route
    res.json(todos);
});

module.exports = router;
