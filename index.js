const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// All courses
app.get('/api/courses', (req, res) => {
    res.send([1,2,3]);
});

// Single course
app.get('/api/courses/:id', (req, res) => {
    res.send(req.params.id);
});


// Multiple route parametes
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);
});

// Query string parametes
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.query);
});


//Environment Variable called PORT
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on Port ${port}`));