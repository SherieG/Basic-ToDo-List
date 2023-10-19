const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.static(path.join(__dirname)));
app.use(express.json());

//Enable CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access=Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    next();
});

app.get('/api/ToDos', (req, res) => {
    fs.readFile('data.json','utf=8', (err,data) => {
        if(err){
            console.error(err);
            return res.status(500).json({error: 'Internal Server Error'});
        }
        const todos = JSON.parse(data);
        res.json(todos);
    });
});

app.post('/api/todos', (req,res)=>{
    const todos = req.body;
    fs.readFile('data.json', 'utf-8', (err,data)=>{
        if(err){
            console.error(err);
            return res.status(500).json({error: 'Internal Server Error'});
        }
        const todos = JSON.parse(data);
        todos.push(todo);
        fs.writeFile('data.json', JSON.stringify(todos, null, 2), err =>{
            if(err) {
                console.error(err);
                return res.status(500).json({error: 'Internal Server Error'});
            }
            res.sendStatus(200);
        });
    });
});

app.delete('/api.todos/:id', (req,res) => {
    const id = req.params.id;
    fs.readFile('data.json', 'utf-8', (err, data) => {
        if(err) {
            console.error(err);
            return res.status(500).json({error: 'Internal Server Error'});

        }
        const todos = JSON.parse(data);
        const updatedToDos = todos.filter(todo => todo.id !== id);
        fs.writeFile('data.json', JSON.stringify(updatedToDos, null, 2)), err => {
            if(err) {
                console.error(err);
                return res.status(500).json({error: 'Internal Server Error'});
            }
            res,sendStatus(200);
        };
    });
});

const port = 3000;
app.listen(port, () => {
    console.log('Server is running on port', port);
});