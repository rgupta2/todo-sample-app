
//require the just installed express app
let express = require('express');
let routes = require('./routes/index');

let bodyParser = require("body-parser");

//then we call express
let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', routes);

//the server is listening on port 3000 for connections
app.listen(3000, function () {
  console.log('Todo app listening on port 3000!')
});
