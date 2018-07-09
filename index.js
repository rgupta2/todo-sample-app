
//require the just installed express app
let express = require('express');

let bodyParser = require("body-parser");

//then we call express
let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//takes us to the root(/) URL
app.get('/', function (req, res) {

  //when we visit the root URL express will respond with all available endpoints
  res.send('todo app: /todo/all, todo/:id, /todo/add, /todo/:id/toggle');
});


//the task array with initial placeholders for added task
let task = [{
    id: 1,
    text: "practise with nodejs",
    completed: false
}];

// get route for listing all todos
app.get('/todo/all', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(task));
});

//get route to retrieve a specific task
app.get('/todo/:id', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let response = task.filter((x) => x.id === parseInt(req.params.id));

    if (response && response.length > 0) {
        response = response[0];
        res.send(JSON.stringify(response));
    } else {
        res.status(404).send(JSON.stringify({'errorMessage': 'Not found'}));
    }
});

//get route to retrieve a specific task
app.post('/todo/:id/toggle', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let todoToBeToggled = task.filter((x) => x.id === parseInt(req.params.id));

    if (todoToBeToggled && todoToBeToggled.length > 0) {
        todoToBeToggled = todoToBeToggled[0];
        todoToBeToggled.completed = !todoToBeToggled.completed;
        res.send(JSON.stringify(todoToBeToggled));
    } else {
        res.status(404).send(JSON.stringify({'errorMessage': 'Not found'}));
    }
});

//post route for adding new task
app.post('/todo/add', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const newTask = req.body;

    //add the new task from the post route into the array
    task.push(newTask);

    //after adding to the array go back to the root route
    res.send(JSON.stringify(task));
});


//the server is listening on port 3000 for connections
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
