/**
 * Created by mlagusker on 5/3/17.
 */
var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
    id: 1,
    description: 'Meet Alex for lunch',
    completed: false
}, {
    id: 2,
    description: 'Go to market',
    completed: false
}, {
    id: 3,
    description: 'Get the car from the dealer',
    completed: true
}];

app.get('/', function (req, res) {
    res.send('Todo API Root');
});

app.get('/todos', function (req, res) {
    res.json(todos);
});

app.get('/todos/:id', function (req, res) {

    var todoId = parseInt(req.params.id, 10);
    var reqItem;
    todos.forEach(function (item) {
        if (item.id === todoId) {
            reqItem = item;
        }
    });
    if (reqItem) {
        res.json(reqItem);
    } else {
        res.status(404).send();
    }
});

app.listen(PORT, function () {
    console.log('Express listening on port ' + PORT + '!');
});