const express = require('express');
const app = express();
app.use(express.json());
const courses = [
    {id: 1, name: 'courseOne'},
    {id: 2, name: 'courseTwo'},
    {id: 3, name: 'courseThree'},
]

/* GET */

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// All courses
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// Single course
app.get('/api/courses/:id', (req, res) => {
   const course = courses.find(c => c.id === parseInt(req.params.id));
   if (!course) res.status(404).send('The course with the requested ID was not found');
   res.send(course);
});


// Multiple route parametes
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);
});

// Query string parametes
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.query);
});


/* POST */

app.post('/api/courses', (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
})


//Environment Variable called PORT
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on Port ${port}`));